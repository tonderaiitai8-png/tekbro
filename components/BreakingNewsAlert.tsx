import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { AlertTriangle, TrendingUp, TrendingDown, Zap } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { NewsEvent } from '../types';
import { HapticPatterns } from '../utils/haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BreakingNewsAlertProps {
    news: NewsEvent | null;
    onDismiss: () => void;
    onTrade: (action: 'BUY' | 'SELL') => void;
}

export const BreakingNewsAlert: React.FC<BreakingNewsAlertProps> = ({ news, onDismiss, onTrade }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const pulseScale = useSharedValue(1);
    const countdown = useSharedValue(10);

    useEffect(() => {
        if (news) {
            // Trigger haptic
            HapticPatterns.newsAlert();

            // Entrance animation
            scale.value = withSpring(1, { damping: 15, stiffness: 150 });
            opacity.value = withTiming(1, { duration: 300 });

            // Pulse animation
            pulseScale.value = withSequence(
                withTiming(1.05, { duration: 500 }),
                withTiming(1, { duration: 500 })
            );

            // Auto-dismiss after 10 seconds
            const timer = setTimeout(() => {
                dismissAlert();
            }, 10000);

            return () => clearTimeout(timer);
        } else {
            dismissAlert();
        }
    }, [news]);

    const dismissAlert = () => {
        scale.value = withTiming(0, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        setTimeout(() => onDismiss(), 300);
    };

    const handleTrade = (action: 'BUY' | 'SELL') => {
        HapticPatterns.tradeExecuted();
        onTrade(action);
        dismissAlert();
    };

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
    }));

    if (!news) return null;

    const isPositive = news.impact > 0;
    const impactColor = isPositive ? COLORS.positive : COLORS.negative;

    return (
        <Modal
            visible={!!news}
            transparent
            animationType="none"
            onRequestClose={dismissAlert}
        >
            <BlurView intensity={80} tint="dark" style={styles.overlay}>
                <Animated.View style={[styles.container, containerStyle]}>
                    {/* Alert Icon */}
                    <Animated.View style={[styles.iconContainer, pulseStyle]}>
                        <View style={[styles.iconBg, { backgroundColor: `${impactColor}20` }]}>
                            <Zap size={48} color={impactColor} fill={impactColor} />
                        </View>
                    </Animated.View>

                    {/* Breaking News Badge */}
                    <View style={styles.badge}>
                        <AlertTriangle size={16} color={COLORS.warning} />
                        <Text style={styles.badgeText}>BREAKING NEWS</Text>
                    </View>

                    {/* Headline */}
                    <Text style={styles.headline}>{news.headline}</Text>

                    {/* Stock Symbol */}
                    {news.symbol && (
                        <View style={[styles.symbolContainer, { borderColor: impactColor }]}>
                            <Text style={[styles.symbolText, { color: impactColor }]}>
                                {news.symbol}
                            </Text>
                        </View>
                    )}

                    {/* Impact */}
                    <View style={styles.impactContainer}>
                        {isPositive ? (
                            <TrendingUp size={32} color={impactColor} strokeWidth={2.5} />
                        ) : (
                            <TrendingDown size={32} color={impactColor} strokeWidth={2.5} />
                        )}
                        <Text style={[styles.impactText, { color: impactColor }]}>
                            {isPositive ? '+' : ''}{(news.impact * 100).toFixed(1)}%
                        </Text>
                    </View>

                    {/* Urgency Message */}
                    <Text style={styles.urgencyText}>
                        ⚡ Act fast before price adjusts!
                    </Text>

                    {/* Action Buttons */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.buyButton]}
                            onPress={() => handleTrade('BUY')}
                            activeOpacity={0.8}
                        >
                            <TrendingUp size={20} color="#000" strokeWidth={2.5} />
                            <Text style={styles.actionButtonText}>BUY NOW</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.sellButton]}
                            onPress={() => handleTrade('SELL')}
                            activeOpacity={0.8}
                        >
                            <TrendingDown size={20} color="#000" strokeWidth={2.5} />
                            <Text style={styles.actionButtonText}>SELL NOW</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dismiss Button */}
                    <TouchableOpacity
                        style={styles.dismissButton}
                        onPress={dismissAlert}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.dismissText}>Dismiss</Text>
                    </TouchableOpacity>

                    {/* Countdown Timer */}
                    <View style={styles.timerContainer}>
                        <View style={styles.timerBar}>
                            <Animated.View
                                style={[
                                    styles.timerProgress,
                                    { backgroundColor: impactColor }
                                ]}
                            />
                        </View>
                        <Text style={styles.timerText}>Auto-dismiss in 10s</Text>
                    </View>
                </Animated.View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    container: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.xl,
        padding: SPACING.xxl,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
        elevation: 16,
    },
    iconContainer: {
        marginBottom: SPACING.lg,
    },
    iconBg: {
        width: 96,
        height: 96,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        backgroundColor: `${COLORS.warning}20`,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        marginBottom: SPACING.md,
    },
    badgeText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.bold,
        color: COLORS.warning,
        letterSpacing: 1,
    },
    headline: {
        fontSize: FONTS.sizes.lg,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: SPACING.lg,
    },
    symbolContainer: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        marginBottom: SPACING.lg,
    },
    symbolText: {
        fontSize: FONTS.sizes.xl,
        fontFamily: FONTS.bold,
        letterSpacing: 2,
    },
    impactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    impactText: {
        fontSize: 32,
        fontFamily: FONTS.bold,
    },
    urgencyText: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.semibold,
        color: COLORS.warning,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.md,
        width: '100%',
        marginBottom: SPACING.lg,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.xs,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.lg,
    },
    buyButton: {
        backgroundColor: COLORS.positive,
    },
    sellButton: {
        backgroundColor: COLORS.negative,
    },
    actionButtonText: {
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.bold,
        color: '#000',
        letterSpacing: 0.5,
    },
    dismissButton: {
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.lg,
    },
    dismissText: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
    },
    timerContainer: {
        width: '100%',
        marginTop: SPACING.md,
        alignItems: 'center',
    },
    timerBar: {
        width: '100%',
        height: 4,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    },
    timerProgress: {
        height: '100%',
        width: '100%',
    },
    timerText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.regular,
        color: COLORS.textMuted,
    },
});
