import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Circle } from 'react-native-svg';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { DailyChallengesModal } from './DailyChallengesModal';

interface StatsHeaderProps {
    xp: number;
    level: number;
    loginStreak: number;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ xp, level, loginStreak }) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Memoize calculations
    const stats = useMemo(() => {
        const xpForCurrentLevel = level * 1000;
        const xpForNextLevel = (level + 1) * 1000;
        const xpProgress = xp - xpForCurrentLevel;
        const xpNeeded = xpForNextLevel - xpForCurrentLevel;
        const progressPercent = (xpProgress / xpNeeded) * 100;

        const radius = 32;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

        return {
            xpForCurrentLevel,
            xpForNextLevel,
            xpProgress,
            xpNeeded,
            progressPercent,
            radius,
            circumference,
            strokeDashoffset
        };
    }, [xp, level]);

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                <LinearGradient
                    colors={['#1A2F3F', '#0D1F2D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    {/* Left: Circular Level Indicator */}
                    <View style={styles.levelContainer}>
                        <Svg width="80" height="80">
                            {/* Background Circle */}
                            <Circle
                                cx="40"
                                cy="40"
                                r={stats.radius}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="6"
                                fill="none"
                            />
                            {/* Progress Circle */}
                            <Circle
                                cx="40"
                                cy="40"
                                r={stats.radius}
                                stroke={COLORS.accent}
                                strokeWidth="6"
                                fill="none"
                                strokeDasharray={stats.circumference}
                                strokeDashoffset={stats.strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin="40, 40"
                            />
                        </Svg>
                        <View style={styles.levelBadge}>
                            <Text style={styles.levelLabel}>LVL</Text>
                            <Text style={styles.levelNumber}>{level}</Text>
                        </View>
                    </View>

                    {/* Middle: XP Progress */}
                    <View style={styles.progressContainer}>
                        <Text style={styles.experienceLabel}>EXPERIENCE</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${Math.min(stats.progressPercent, 100)}%` }]} />
                        </View>
                        <Text style={styles.xpText}>
                            {xp.toLocaleString()} / {stats.xpForNextLevel.toLocaleString()}
                        </Text>
                    </View>

                    {/* Right: Streak */}
                    <View style={styles.streakContainer}>
                        <Text style={styles.streakLabel}>Streak</Text>
                        <View style={styles.streakBadge}>
                            <Text style={styles.streakEmoji}>🔥</Text>
                            <Text style={styles.streakNumber}>{loginStreak}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>

            {/* Daily Challenges Modal */}
            <DailyChallengesModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    levelContainer: {
        position: 'relative',
        marginRight: SPACING.lg,
    },
    levelBadge: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelLabel: {
        fontSize: 10,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        letterSpacing: 0.5,
    },
    levelNumber: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.accent,
    },
    progressContainer: {
        flex: 1,
        marginRight: SPACING.lg,
    },
    experienceLabel: {
        fontSize: 10,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        letterSpacing: 0.5,
        marginBottom: SPACING.xs,
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
        borderRadius: RADIUS.full,
    },
    xpText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.text,
    },
    streakContainer: {
        alignItems: 'center',
    },
    streakLabel: {
        fontSize: 10,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        marginBottom: SPACING.xs,
    },
    streakBadge: {
        alignItems: 'center',
    },
    streakEmoji: {
        fontSize: 24,
        marginBottom: 2,
    },
    streakNumber: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.warning,
    },
});
