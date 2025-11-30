import React from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { X, CheckCircle2, Lock, Trophy } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

interface Props {
    visible: boolean;
    onClose: () => void;
    level: number;
    xp: number;
}

export const LevelDetailModal = ({ visible, onClose, level, xp }: Props) => {
    const { theme } = useTheme();

    const nextLevelXp = Math.floor(1000 * Math.pow(level, 1.5));
    const prevLevelXp = Math.floor(1000 * Math.pow(level - 1, 1.5));
    const currentLevelProgress = xp - prevLevelXp;
    const levelRange = nextLevelXp - prevLevelXp;
    const progressPercent = Math.min(100, Math.max(0, (currentLevelProgress / levelRange) * 100));

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <BlurView intensity={20} style={styles.overlay}>
                <View style={[styles.container, { borderColor: theme.border, shadowColor: theme.accent }]}>
                    <LinearGradient
                        colors={[theme.bgElevated, theme.bg]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.content}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={[styles.levelBadge, { backgroundColor: theme.accentSubtle, borderColor: theme.accent }]}>
                                <Text style={[styles.levelText, { color: theme.accent }]}>LEVEL {level}</Text>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <X size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        {/* Main Icon */}
                        <View style={styles.mainIcon}>
                            <Trophy size={64} color={theme.accent} />
                        </View>

                        <Text style={[styles.title, { color: theme.text }]}>Level {level} Trader</Text>
                        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Keep trading to reach the next milestone!</Text>

                        {/* XP Progress */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressLabels}>
                                <Text style={[styles.xpText, { color: theme.textTertiary }]}>{Math.floor(currentLevelProgress)} XP</Text>
                                <Text style={[styles.xpText, { color: theme.textTertiary }]}>{Math.floor(levelRange)} XP</Text>
                            </View>
                            <View style={[styles.progressBarBg, { backgroundColor: theme.bgSubtle }]}>
                                <LinearGradient
                                    colors={[theme.accent, theme.primary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    container: {
        width: '100%',
        maxWidth: 400,
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    content: {
        padding: SPACING.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    levelBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
    },
    levelText: {
        fontFamily: FONTS.bold,
        fontSize: 14,
        letterSpacing: 1,
    },
    closeButton: {
        padding: 4,
    },
    mainIcon: {
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        textAlign: 'center',
        marginBottom: SPACING.xl,
    },
    progressContainer: {
        marginBottom: SPACING.md,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    xpText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    progressBarBg: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
});
