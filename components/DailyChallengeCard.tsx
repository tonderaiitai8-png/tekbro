import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DailyChallenge } from '../types';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { Zap } from 'lucide-react-native';

interface Props {
    challenge: DailyChallenge | null;
}

export function DailyChallengeCard({ challenge }: Props) {
    if (!challenge) return null;

    const progress = Math.min(100, (challenge.progress / challenge.target) * 100);
    const isComplete = challenge.completed;

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isComplete && styles.containerComplete
            ]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.labelContainer}>
                    <Zap size={14} color={COLORS.warning} fill={COLORS.warning} />
                    <Text style={styles.label}>DAILY CHALLENGE</Text>
                </View>
                {isComplete && (
                    <View style={styles.completeBadge}>
                        <Text style={styles.completeText}>✓ COMPLETE</Text>
                    </View>
                )}
            </View>

            {/* Title */}
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress}%` },
                            isComplete && styles.progressComplete
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {challenge.progress.toFixed(0)} / {challenge.target}
                </Text>
            </View>

            {/* Rewards */}
            <View style={styles.rewardContainer}>
                <Text style={styles.rewardLabel}>REWARD:</Text>
                <Text style={styles.rewardText}>
                    +{challenge.reward.xp} XP{challenge.reward.cash && ` · +$${challenge.reward.cash}`}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        borderWidth: 2,
        borderColor: COLORS.warning + '40',
    },
    containerComplete: {
        borderColor: COLORS.success,
        backgroundColor: COLORS.successDim,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.warning,
        fontFamily: FONTS.bold,
        letterSpacing: 1,
    },
    completeBadge: {
        backgroundColor: COLORS.success,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: 6,
    },
    completeText: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.background,
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: SPACING.xs,
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontFamily: FONTS.regular,
        marginBottom: SPACING.lg,
    },
    progressContainer: {
        marginBottom: SPACING.md,
    },
    progressBar: {
        height: 8,
        backgroundColor: COLORS.borderLight,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: SPACING.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.warning,
        borderRadius: 4,
    },
    progressComplete: {
        backgroundColor: COLORS.success,
    },
    progressText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontFamily: FONTS.semibold,
        textAlign: 'center',
    },
    rewardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
    rewardLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.textTertiary,
        fontFamily: FONTS.bold,
        letterSpacing: 1,
    },
    rewardText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
});
