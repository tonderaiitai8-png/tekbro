import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { X, Trophy, Star, Target } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Achievement } from '../types';
import { HapticPatterns } from '../utils/haptics';

interface AchievementDetailModalProps {
    visible: boolean;
    onClose: () => void;
    achievement: Achievement | null;
}

export const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({
    visible,
    onClose,
    achievement
}) => {
    if (!visible || !achievement) return null;

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'gold': return '#F59E0B';
            case 'silver': return '#9CA3AF';
            case 'bronze': return '#CD7F32';
            default: return COLORS.textSub;
        }
    };

    const tierColor = getTierColor(achievement.tier);
    const progressPercent = Math.min(100, (achievement.progress / achievement.target) * 100);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />

                    <TouchableWithoutFeedback>
                        <Animated.View
                            entering={SlideInDown.springify().damping(15)}
                            style={styles.modalContainer}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={[styles.iconContainer, { backgroundColor: `${tierColor}20` }]}>
                                    <Text style={{ fontSize: 32 }}>{achievement.icon}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <X size={20} color={COLORS.textSub} />
                                </TouchableOpacity>
                            </View>

                            {/* Content */}
                            <View style={styles.content}>
                                <View style={styles.titleRow}>
                                    <Text style={styles.title}>{achievement.title}</Text>
                                    <View style={[styles.tierBadge, { borderColor: tierColor }]}>
                                        <Trophy size={12} color={tierColor} />
                                        <Text style={[styles.tierText, { color: tierColor }]}>
                                            {achievement.tier.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.description}>{achievement.description}</Text>

                                {/* Progress Section */}
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressHeader}>
                                        <Text style={styles.progressLabel}>Progress</Text>
                                        <Text style={styles.progressValue}>
                                            {Math.floor(achievement.progress)} / {achievement.target}
                                        </Text>
                                    </View>
                                    <View style={styles.progressBarBg}>
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    width: `${progressPercent}%`,
                                                    backgroundColor: achievement.unlocked ? COLORS.positive : tierColor
                                                }
                                            ]}
                                        />
                                    </View>
                                </View>

                                {/* Reward Info */}
                                <View style={styles.rewardContainer}>
                                    <View style={styles.rewardIcon}>
                                        <Star size={20} color="#F59E0B" fill="#F59E0B" />
                                    </View>
                                    <View>
                                        <Text style={styles.rewardLabel}>Reward</Text>
                                        <Text style={styles.rewardValue}>+{achievement.xpReward} XP</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Action Button */}
                            <TouchableOpacity
                                style={[styles.button, { borderColor: achievement.unlocked ? COLORS.positive : COLORS.border }]}
                                onPress={() => {
                                    HapticPatterns.light();
                                    onClose();
                                }}
                            >
                                <Text style={[styles.buttonText, { color: achievement.unlocked ? COLORS.positive : COLORS.text }]}>
                                    {achievement.unlocked ? 'Completed' : 'Keep Going'}
                                </Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: COLORS.bgElevated,
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        padding: SPACING.xl,
        paddingBottom: SPACING.xxxl,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.lg,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: RADIUS.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        padding: SPACING.xs,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.full,
    },
    content: {
        marginBottom: SPACING.xl,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        flex: 1,
    },
    tierBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    tierText: {
        fontSize: 10,
        fontFamily: FONTS.bold,
    },
    description: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
        lineHeight: 22,
    },
    progressContainer: {
        marginBottom: SPACING.xl,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xs,
    },
    progressLabel: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
    },
    progressValue: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: RADIUS.full,
    },
    rewardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgSubtle,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        gap: SPACING.md,
    },
    rewardIcon: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rewardLabel: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
    },
    rewardValue: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: '#F59E0B',
    },
    button: {
        backgroundColor: COLORS.card,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    }
});
