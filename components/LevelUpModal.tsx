import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Trophy, Star, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface LevelUpModalProps {
    visible: boolean;
    level: number;
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ visible, level, onClose }) => {
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.loop(
                    Animated.timing(rotateAnim, {
                        toValue: 1,
                        duration: 10000,
                        useNativeDriver: true
                    })
                )
            ]).start();
        } else {
            scaleAnim.setValue(0.5);
            opacityAnim.setValue(0);
            rotateAnim.setValue(0);
        }
    }, [visible]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: opacityAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}
                >
                    {/* Background Glow Effect */}
                    <Animated.View style={[styles.glow, { transform: [{ rotate: spin }] }]} />

                    <View style={styles.iconContainer}>
                        <Trophy size={64} color={COLORS.accent} fill={COLORS.accent} />
                    </View>

                    <Text style={styles.title}>LEVEL UP!</Text>

                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>{level}</Text>
                    </View>

                    <Text style={styles.subtitle}>You reached Level {level}</Text>

                    <View style={styles.rewardsContainer}>
                        <View style={styles.rewardRow}>
                            <Star size={20} color={COLORS.warning} fill={COLORS.warning} />
                            <Text style={styles.rewardText}>+1000 XP</Text>
                        </View>
                        <View style={styles.rewardRow}>
                            <Check size={20} color={COLORS.positive} />
                            <Text style={styles.rewardText}>New Features Unlocked</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            onClose();
                        }}
                    >
                        <Text style={styles.buttonText}>AWESOME!</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.85,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.accent,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.accent,
        opacity: 0.1,
        top: -50,
    },
    iconContainer: {
        marginBottom: SPACING.lg,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginBottom: SPACING.md,
        letterSpacing: 2,
    },
    levelBadge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.bg,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.accent,
        marginBottom: SPACING.md,
    },
    levelText: {
        fontSize: 36,
        fontFamily: FONTS.bold,
        color: COLORS.accent,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: FONTS.medium,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },
    rewardsContainer: {
        width: '100%',
        backgroundColor: COLORS.bg,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        marginBottom: SPACING.xl,
        gap: SPACING.sm,
    },
    rewardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    rewardText: {
        fontSize: 16,
        fontFamily: FONTS.medium,
        color: COLORS.text,
    },
    button: {
        backgroundColor: COLORS.accent,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: RADIUS.full,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.bg,
        fontSize: 18,
        fontFamily: FONTS.bold,
        letterSpacing: 1,
    }
});
