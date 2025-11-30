import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, Star, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store/useStore';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

export const LevelUpModal = () => {
    const { levelUpNotification, setLevelUpNotification } = useStore();
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (levelUpNotification) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
            scaleAnim.setValue(0.5);
            opacityAnim.setValue(0);
        }
    }, [levelUpNotification]);

    if (!levelUpNotification) return null;

    const handleClose = () => {
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setLevelUpNotification(null);
        });
    };

    return (
        <Modal
            transparent
            visible={!!levelUpNotification}
            animationType="none"
            onRequestClose={handleClose}
        >
            <BlurView intensity={60} tint="dark" style={styles.container}>
                <Animated.View style={[
                    styles.content,
                    {
                        opacity: opacityAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}>
                    <LinearGradient
                        colors={['#FFD700', '#FFA500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.card}
                    >
                        <View style={styles.iconContainer}>
                            <Crown size={48} color="#FFF" fill="#FFF" />
                        </View>

                        <Text style={styles.title}>LEVEL UP!</Text>
                        <Text style={styles.levelText}>You reached Level {levelUpNotification.level}</Text>

                        <View style={styles.divider} />

                        <View style={styles.rewardsContainer}>
                            <Text style={styles.rewardsTitle}>REWARDS UNLOCKED</Text>
                            {levelUpNotification.rewards.map((reward, index) => (
                                <View key={index} style={styles.rewardItem}>
                                    <Star size={16} color="#FFF" fill="#FFF" />
                                    <Text style={styles.rewardText}>{reward}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity onPress={handleClose} style={styles.button}>
                            <Text style={styles.buttonText}>AWESOME</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </Animated.View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        width: width * 0.85,
        alignItems: 'center',
    },
    card: {
        width: '100%',
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        alignItems: 'center',
        shadowColor: "#FFD700",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    iconContainer: {
        marginBottom: SPACING.lg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.black,
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 2,
        marginBottom: SPACING.xs,
    },
    levelText: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: SPACING.lg,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: SPACING.lg,
    },
    rewardsContainer: {
        width: '100%',
        marginBottom: SPACING.xl,
    },
    rewardsTitle: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: SPACING.md,
        textAlign: 'center',
        letterSpacing: 1,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: SPACING.sm,
        borderRadius: RADIUS.full,
    },
    rewardText: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    button: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: RADIUS.full,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FONTS.black,
        color: '#FFA500',
        letterSpacing: 1,
    },
});
