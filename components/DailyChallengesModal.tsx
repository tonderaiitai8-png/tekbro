import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useStore } from '../store/useStore';

interface DailyChallengesModalProps {
    visible: boolean;
    onClose: () => void;
}

export const DailyChallengesModal: React.FC<DailyChallengesModalProps> = ({ visible, onClose }) => {
    const { dailyChallenge } = useStore();

    if (!dailyChallenge) {
        return null;
    }

    const progressPercent = Math.min((dailyChallenge.progress / dailyChallenge.target) * 100, 100);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <LinearGradient
                    colors={['#0A0E1A', '#1A1F2E']}
                    style={styles.container}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Daily Challenge</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {/* Single Challenge Card */}
                        <LinearGradient
                            colors={dailyChallenge.completed ? ['#0D4D4D', '#1A5F5F'] : ['#1A1F2E', '#252B3A']}
                            style={styles.challengeCard}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.icon}>{dailyChallenge.title.includes('trade') ? '📊' : '💰'}</Text>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.challengeTitle}>{dailyChallenge.title}</Text>
                                    <Text style={styles.challengeDescription}>{dailyChallenge.description}</Text>
                                </View>
                                <View style={styles.xpBadge}>
                                    <Text style={styles.xpText}>{dailyChallenge.reward.xp} XP</Text>
                                </View>
                            </View>

                            {/* Progress Bar */}
                            <View style={styles.progressSection}>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                                </View>
                                <Text style={styles.progressText}>
                                    {dailyChallenge.progress} / {dailyChallenge.target}
                                </Text>
                            </View>

                            {dailyChallenge.completed && (
                                <View style={styles.completedBadge}>
                                    <Text style={styles.completedText}>✓ Completed!</Text>
                                </View>
                            )}
                        </LinearGradient>

                        <Text style={styles.note}>
                            Complete challenges to earn XP and level up faster!
                        </Text>
                    </ScrollView>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    container: {
        height: '80%',
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        padding: SPACING.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: FONTS.sizes.xxl,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    closeButton: {
        padding: SPACING.sm,
    },
    content: {
        flex: 1,
    },
    challengeCard: {
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    icon: {
        fontSize: 32,
        marginRight: SPACING.md,
    },
    cardInfo: {
        flex: 1,
    },
    challengeTitle: {
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginBottom: 4,
    },
    challengeDescription: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
    },
    xpBadge: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.sm,
    },
    xpText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.bold,
        color: '#000',
    },
    progressSection: {
        marginTop: SPACING.sm,
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: RADIUS.sm,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
        borderRadius: RADIUS.sm,
    },
    progressText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        textAlign: 'right',
    },
    completedBadge: {
        marginTop: SPACING.sm,
        alignSelf: 'flex-start',
        backgroundColor: COLORS.positive,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    },
    completedText: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.bold,
        color: '#000',
    },
    note: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.regular,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    },
});
