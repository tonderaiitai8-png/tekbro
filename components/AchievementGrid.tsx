import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Achievement } from '../types';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

interface Props {
    achievements: Achievement[];
}

export function AchievementGrid({ achievements }: Props) {
    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'gold': return '#EAB308'; // Amber-500
            case 'silver': return '#94A3B8'; // Slate-400
            case 'bronze': return '#A16207'; // Amber-700
            default: return COLORS.textMuted;
        }
    };

    const handlePress = (achievement: Achievement) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.grid}
            >
                {achievements.map((ach) => (
                    <TouchableOpacity
                        key={ach.id}
                        style={styles.card}
                        onPress={() => handlePress(ach)}
                        activeOpacity={0.7}
                    >
                        {/* Icon */}
                        <View style={[
                            styles.iconContainer,
                            !ach.unlocked && styles.iconLocked
                        ]}>
                            <Text style={styles.icon}>{ach.icon}</Text>
                        </View>

                        {/* Title */}
                        <Text style={[
                            styles.title,
                            !ach.unlocked && styles.textLocked
                        ]} numberOfLines={1}>
                            {ach.title}
                        </Text>

                        {/* Description */}
                        <Text style={[
                            styles.description,
                            !ach.unlocked && styles.textLocked
                        ]} numberOfLines={2}>
                            {ach.description}
                        </Text>

                        {/* Progress or Reward */}
                        {!ach.unlocked ? (
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                width: `${Math.min(100, ((ach.progress ?? 0) / (ach.target ?? 1)) * 100)}%`,
                                                backgroundColor: COLORS.accent
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    {(ach.progress ?? 0).toFixed(0)}/{ach.target ?? 0}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.rewardBadge}>
                                <Text style={styles.rewardText}>
                                    +{ach.xpReward ?? 0} XP
                                </Text>
                            </View>
                        )}

                        {/* Tier indicator */}
                        <View style={[styles.tierIndicator, { backgroundColor: getTierColor(ach.tier ?? 'bronze') }]} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    grid: {
        paddingHorizontal: SPACING.xl,
        gap: SPACING.md,
    },
    card: {
        width: 140,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgSubtle,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.sm,
    },
    iconLocked: {
        opacity: 0.3,
    },
    icon: {
        fontSize: 24,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        marginBottom: 4,
    },
    description: {
        fontSize: 11,
        color: COLORS.textSub,
        fontFamily: FONTS.regular,
        marginBottom: SPACING.sm,
        lineHeight: 14,
    },
    textLocked: {
        opacity: 0.5,
    },
    progressContainer: {
        marginTop: 'auto',
    },
    progressBar: {
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressFill: {
        height: '100%',
    },
    progressText: {
        fontSize: 10,
        color: COLORS.textMuted,
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
    rewardBadge: {
        marginTop: 'auto',
        backgroundColor: COLORS.accentSubtle,
        paddingVertical: 6,
        paddingHorizontal: SPACING.sm,
        borderRadius: RADIUS.sm,
        alignItems: 'center',
    },
    rewardText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.accent,
        fontFamily: FONTS.semibold,
    },
    tierIndicator: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
