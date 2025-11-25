import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring,
    withTiming,
    runOnJS,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { TrendingUp, TrendingDown, Clock, X } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { NewsEvent } from '../types';
import { HapticPatterns } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface NewsCardProps {
    news: NewsEvent;
    onDismiss: () => void;
    onPress?: () => void;
    onQuickTrade?: (action: 'BUY' | 'SELL') => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onDismiss, onPress, onQuickTrade }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx: any) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
            translateY.value = event.translationY * 0.1; // Subtle vertical movement

            // Scale down slightly while dragging
            scale.value = withSpring(0.95);
        },
        onEnd: (event) => {
            const shouldDismiss = Math.abs(translateX.value) > SWIPE_THRESHOLD;

            if (shouldDismiss) {
                // Swipe away
                const direction = translateX.value > 0 ? 1 : -1;
                translateX.value = withTiming(direction * SCREEN_WIDTH, { duration: 300 });
                translateY.value = withTiming(direction * 50, { duration: 300 });

                // Trigger haptic and callback
                runOnJS(HapticPatterns.swipeDismiss)();
                setTimeout(() => runOnJS(onDismiss)(), 300);

                // Check for quick trade action
                if (translateX.value > SWIPE_THRESHOLD && onQuickTrade) {
                    runOnJS(onQuickTrade)('BUY');
                } else if (translateX.value < -SWIPE_THRESHOLD && onQuickTrade) {
                    runOnJS(onQuickTrade)('SELL');
                }
            } else {
                // Spring back
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                scale.value = withSpring(1);
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [-10, 0, 10],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            Math.abs(translateX.value),
            [0, SWIPE_THRESHOLD],
            [1, 0.5],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotate}deg` },
                { scale: scale.value },
            ],
            opacity,
        };
    });

    const leftActionStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [0, SWIPE_THRESHOLD],
            [0, 1],
            Extrapolate.CLAMP
        );

        return { opacity };
    });

    const rightActionStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateX.value,
            [-SWIPE_THRESHOLD, 0],
            [1, 0],
            Extrapolate.CLAMP
        );

        return { opacity };
    });

    const getImpactColor = () => {
        if (news.impact > 0) return COLORS.positive;
        if (news.impact < 0) return COLORS.negative;
        return COLORS.textSub;
    };

    const getSeverityColor = () => {
        switch (news.severity) {
            case 'HIGH': return COLORS.warning;
            case 'MEDIUM': return COLORS.accent;
            case 'LOW': return COLORS.textSub;
            default: return COLORS.accent;
        }
    };

    const formatTimeAgo = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    return (
        <View style={styles.container}>
            {/* Swipe Action Indicators */}
            <Animated.View style={[styles.actionIndicator, styles.leftAction, leftActionStyle]}>
                <TrendingUp size={32} color={COLORS.positive} strokeWidth={2.5} />
                <Text style={[styles.actionText, { color: COLORS.positive }]}>BUY</Text>
            </Animated.View>

            <Animated.View style={[styles.actionIndicator, styles.rightAction, rightActionStyle]}>
                <TrendingDown size={32} color={COLORS.negative} strokeWidth={2.5} />
                <Text style={[styles.actionText, { color: COLORS.negative }]}>SELL</Text>
            </Animated.View>

            {/* News Card */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                        <TouchableOpacity
                            style={styles.content}
                            onPress={() => {
                                HapticPatterns.light();
                                onPress?.();
                            }}
                            activeOpacity={0.9}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.headerLeft}>
                                    {news.symbol && (
                                        <View style={[styles.symbolBadge, { borderColor: getSeverityColor() }]}>
                                            <Text style={styles.symbolText}>{news.symbol}</Text>
                                        </View>
                                    )}
                                    <View style={styles.timeContainer}>
                                        <Clock size={12} color={COLORS.textMuted} />
                                        <Text style={styles.timeText}>{formatTimeAgo(news.timestamp)}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        HapticPatterns.light();
                                        onDismiss();
                                    }}
                                    style={styles.closeButton}
                                >
                                    <X size={18} color={COLORS.textMuted} />
                                </TouchableOpacity>
                            </View>

                            {/* Headline */}
                            <Text style={styles.headline} numberOfLines={3}>
                                {news.headline}
                            </Text>

                            {/* Impact Indicator */}
                            <View style={styles.footer}>
                                <View style={[styles.impactBadge, { backgroundColor: `${getImpactColor()}20` }]}>
                                    {news.impact > 0 ? (
                                        <TrendingUp size={16} color={getImpactColor()} strokeWidth={2.5} />
                                    ) : (
                                        <TrendingDown size={16} color={getImpactColor()} strokeWidth={2.5} />
                                    )}
                                    <Text style={[styles.impactText, { color: getImpactColor() }]}>
                                        {news.impact > 0 ? '+' : ''}{(news.impact * 100).toFixed(1)}%
                                    </Text>
                                </View>

                                {news.suggestion && (
                                    <View style={[styles.suggestionBadge, {
                                        backgroundColor: news.suggestion === 'BUY' ? `${COLORS.positive}20` :
                                            news.suggestion === 'SELL' ? `${COLORS.negative}20` :
                                                `${COLORS.textSub}20`
                                    }]}>
                                        <Text style={[styles.suggestionText, {
                                            color: news.suggestion === 'BUY' ? COLORS.positive :
                                                news.suggestion === 'SELL' ? COLORS.negative :
                                                    COLORS.textSub
                                        }]}>
                                            {news.suggestion}
                                        </Text>
                                    </View>
                                )}
                            </View>

                            {/* Swipe Hint */}
                            <View style={styles.swipeHint}>
                                <Text style={styles.swipeHintText}>← Swipe to dismiss →</Text>
                            </View>
                        </TouchableOpacity>
                    </BlurView>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    card: {
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    blurContainer: {
        overflow: 'hidden',
        borderRadius: RADIUS.xl,
    },
    content: {
        padding: SPACING.lg,
        backgroundColor: `${COLORS.bgElevated}95`, // Semi-transparent for glassmorphism
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    symbolBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
        borderWidth: 1.5,
    },
    symbolText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.bold,
        color: COLORS.accent,
        letterSpacing: 0.5,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.regular,
        color: COLORS.textMuted,
    },
    closeButton: {
        padding: SPACING.xs,
    },
    headline: {
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.semibold,
        color: COLORS.text,
        lineHeight: 22,
        marginBottom: SPACING.md,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    impactBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    },
    impactText: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.bold,
    },
    suggestionBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    },
    suggestionText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    swipeHint: {
        marginTop: SPACING.sm,
        alignItems: 'center',
    },
    swipeHintText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.regular,
        color: COLORS.textMuted,
        opacity: 0.5,
    },
    actionIndicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        zIndex: -1,
    },
    leftAction: {
        left: 0,
    },
    rightAction: {
        right: 0,
    },
    actionText: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.bold,
        marginTop: SPACING.xs,
    },
});
