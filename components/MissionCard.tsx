import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Mission } from '../types';
import { Target, Clock, CheckCircle, XCircle, Trophy } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface MissionCardProps {
    mission: Mission;
}

export const MissionCard = ({ mission }: MissionCardProps) => {
    const progressPercent = Math.min(100, (mission.progress / mission.target) * 100);
    const timeLeft = Math.max(0, mission.expiresAt - Date.now());
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    const getStatusColor = () => {
        switch (mission.status) {
            case 'COMPLETED': return COLORS.success;
            case 'FAILED': return COLORS.error;
            default: return COLORS.primary;
        }
    };

    const getIcon = () => {
        switch (mission.status) {
            case 'COMPLETED': return <CheckCircle size={20} color={COLORS.success} />;
            case 'FAILED': return <XCircle size={20} color={COLORS.error} />;
            default: return <Target size={20} color={COLORS.primary} />;
        }
    };

    return (
        <View style={[styles.container, { borderColor: getStatusColor() + '40' }]}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    {getIcon()}
                    <Text style={styles.title}>{mission.title}</Text>
                </View>
                {mission.status === 'ACTIVE' && (
                    <View style={styles.timer}>
                        <Clock size={12} color={COLORS.textSecondary} />
                        <Text style={styles.timerText}>{hoursLeft}h {minsLeft}m</Text>
                    </View>
                )}
            </View>

            <Text style={styles.description}>{mission.description}</Text>

            <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: `${progressPercent}%`,
                                backgroundColor: getStatusColor()
                            }
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {mission.progress} / {mission.target}
                </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.rewardBadge}>
                    <Trophy size={12} color="#FFD700" />
                    <Text style={styles.rewardText}>+{mission.reward.xp} XP</Text>
                </View>
                {mission.reward.cash && (
                    <View style={styles.rewardBadge}>
                        <Text style={[styles.rewardText, { color: COLORS.success }]}>+${mission.reward.cash}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    title: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    timer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
    },
    timerText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.textSecondary,
    },
    description: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        marginBottom: SPACING.md,
    },
    progressContainer: {
        marginBottom: SPACING.md,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: RADIUS.full,
        marginBottom: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: RADIUS.full,
    },
    progressText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.textSecondary,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    rewardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,215,0,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.sm,
        borderWidth: 1,
        borderColor: 'rgba(255,215,0,0.2)',
    },
    rewardText: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: '#FFD700',
    },
});
