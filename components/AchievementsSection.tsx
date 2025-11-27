import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, SectionList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Achievement } from '../types';
import { AchievementGrid } from './AchievementGrid';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { X, Trophy } from 'lucide-react-native';
import { AchievementCardSkeleton } from './LoadingSkeleton';
import { AchievementDetailModal } from './AchievementDetailModal';
import * as Haptics from 'expo-haptics';

interface Props {
    achievements: Achievement[];
}

export const AchievementsSection = React.memo(function AchievementsSection({ achievements }: Props) {
    const [viewAllVisible, setViewAllVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Trading', 'Portfolio', 'Social', 'Milestones'];

    const filteredAchievements = React.useMemo(() => {
        if (selectedCategory === 'All') return achievements;
        return achievements.filter(a => a.category === selectedCategory);
    }, [achievements, selectedCategory]);

    const handleAchievementPress = useCallback((achievement: Achievement) => {
        setSelectedAchievement(achievement);
        setDetailModalVisible(true);
    }, []);

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    // Group by Tier
    const sections = React.useMemo(() => [
        {
            title: 'Gold Tier 🏆',
            data: achievements.filter(a => a.tier === 'gold'),
            color: '#EAB308'
        },
        {
            title: 'Silver Tier 🥈',
            data: achievements.filter(a => a.tier === 'silver'),
            color: '#94A3B8'
        },
        {
            title: 'Bronze Tier 🥉',
            data: achievements.filter(a => a.tier === 'bronze'),
            color: '#A16207'
        }
    ], [achievements]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.title}>Achievements</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{unlockedCount}/{totalCount}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setViewAllVisible(true)}>
                    <Text style={styles.seeAll}>View All</Text>
                </TouchableOpacity>
            </View>

            {/* Category Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterContainer}
                style={styles.filterScroll}
            >
                {categories.map(cat => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => {
                            Haptics.selectionAsync();
                            setSelectedCategory(cat);
                        }}
                        style={[
                            styles.filterPill,
                            selectedCategory === cat && styles.filterPillActive
                        ]}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedCategory === cat && styles.filterTextActive
                        ]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {achievements.length === 0 ? (
                <View style={{ flexDirection: 'row', gap: SPACING.md, paddingHorizontal: SPACING.lg }}>
                    <AchievementCardSkeleton />
                    <AchievementCardSkeleton />
                    <AchievementCardSkeleton />
                </View>
            ) : (
                <AchievementGrid
                    achievements={filteredAchievements}
                    onAchievementPress={handleAchievementPress}
                />
            )}

            <Modal
                visible={viewAllVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setViewAllVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.headerTop}>
                            <View style={styles.modalTitleContainer}>
                                <Trophy size={28} color={COLORS.accent} />
                                <View>
                                    <Text style={styles.modalTitle}>Achievements</Text>
                                    <Text style={styles.modalSubtitle}>
                                        {unlockedCount} of {totalCount} unlocked
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => setViewAllVisible(false)}
                                style={styles.closeButton}
                            >
                                <X size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        {/* Progress Bar */}
                        <View style={styles.totalProgressContainer}>
                            <View style={styles.totalProgressBar}>
                                <View
                                    style={[
                                        styles.totalProgressFill,
                                        { width: `${(unlockedCount / totalCount) * 100}%` }
                                    ]}
                                />
                            </View>
                        </View>
                    </View>

                    <SectionList
                        sections={sections}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        stickySectionHeadersEnabled={false}
                        renderSectionHeader={({ section: { title, color } }) => (
                            <View style={styles.sectionHeader}>
                                <Text style={[styles.sectionHeaderText, { color }]}>{title}</Text>
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.card, !item.unlocked && styles.cardLocked]}
                                onPress={() => handleAchievementPress(item)}
                                activeOpacity={0.7}
                            >
                                {item.unlocked ? (
                                    <LinearGradient
                                        colors={['#000000', '#003300']} // Black to Deep Green
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={StyleSheet.absoluteFillObject}
                                    />
                                ) : null}

                                <View style={[styles.iconContainer, !item.unlocked && styles.iconLocked]}>
                                    <Text style={styles.icon}>{item.icon}</Text>
                                </View>

                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeaderRow}>
                                        <Text style={[styles.cardTitle, !item.unlocked && styles.textLocked]}>
                                            {item.title}
                                        </Text>
                                        {item.unlocked && (
                                            <View style={styles.xpBadge}>
                                                <Text style={styles.xpText}>+{item.xpReward} XP</Text>
                                            </View>
                                        )}
                                    </View>

                                    <Text style={[styles.cardDesc, !item.unlocked && styles.textLocked]}>
                                        {item.description}
                                    </Text>

                                    {!item.unlocked && (
                                        <View style={styles.progressContainer}>
                                            <View style={styles.progressBar}>
                                                <View
                                                    style={[
                                                        styles.progressFill,
                                                        { width: `${Math.min(100, ((item.progress ?? 0) / (item.target ?? 1)) * 100)}%` }
                                                    ]}
                                                />
                                            </View>
                                            <Text style={styles.progressText}>
                                                {(item.progress ?? 0).toFixed(0)} / {item.target}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>

            <AchievementDetailModal
                visible={detailModalVisible}
                onClose={() => setDetailModalVisible(false)}
                achievement={selectedAchievement}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
    },
    badge: {
        backgroundColor: COLORS.bgSubtle,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textSecondary,
        fontFamily: FONTS.semibold,
    },
    seeAll: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.accent,
        fontFamily: FONTS.semibold,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    modalHeader: {
        padding: SPACING.lg,
        paddingTop: SPACING.xl,
        backgroundColor: COLORS.bgElevated,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    modalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
    },
    modalSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontFamily: FONTS.medium,
    },
    closeButton: {
        padding: SPACING.sm,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: 20,
    },
    totalProgressContainer: {
        marginTop: SPACING.xs,
    },
    totalProgressBar: {
        height: 6,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: 3,
        overflow: 'hidden',
    },
    totalProgressFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
    },
    listContent: {
        padding: SPACING.lg,
        paddingBottom: 40,
        gap: SPACING.md,
    },
    sectionHeader: {
        paddingVertical: SPACING.md,
        marginTop: SPACING.sm,
        backgroundColor: COLORS.background, // Sticky header bg
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.bgElevated,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: SPACING.md,
        marginBottom: SPACING.sm,
        overflow: 'hidden', // Required for gradient
    },
    cardLocked: {
        // No special style needed, just default
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgSubtle,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLocked: {
        opacity: 0.3,
        backgroundColor: COLORS.bg,
    },
    icon: {
        fontSize: 24,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        fontFamily: FONTS.semibold,
    },
    textLocked: {
        color: COLORS.textMuted,
    },
    cardDesc: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontFamily: FONTS.regular,
        marginBottom: 8,
        lineHeight: 18,
    },
    xpBadge: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    xpText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#000',
        fontFamily: FONTS.bold,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: COLORS.bg,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
    },
    progressText: {
        fontSize: 11,
        color: COLORS.textMuted,
        fontFamily: FONTS.medium,
    },
    filterScroll: {
        marginBottom: SPACING.md,
    },
    filterContainer: {
        paddingHorizontal: SPACING.lg,
        gap: 8,
    },
    filterPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterPillActive: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    filterText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontFamily: FONTS.medium,
    },
    filterTextActive: {
        color: '#000',
        fontFamily: FONTS.bold,
    },
});
