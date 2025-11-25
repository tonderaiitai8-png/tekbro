import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Globe, DollarSign, X } from 'lucide-react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { NewsEvent } from '../types';

interface NewsBannerProps {
    news: NewsEvent | null;
    onDismiss: () => void;
}

const { width } = Dimensions.get('window');

const GRADIENTS = {
    COMPANY: ['#3B82F6', '#2563EB'] as const,    // Blue
    SECTOR: ['#8B5CF6', '#7C3AED'] as const,      // Purple
    MARKET: ['#10B981', '#059669'] as const,      // Green
    ECONOMIC: ['#F59E0B', '#D97706'] as const,    // Orange
};

const ICONS = {
    COMPANY: TrendingUp,
    SECTOR: Globe,
    MARKET: TrendingUp,
    ECONOMIC: DollarSign,
};

export const NewsBanner: React.FC<NewsBannerProps> = ({ news, onDismiss }) => {
    const translateY = useRef(new Animated.Value(-200)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (news) {
            // Slide down and fade in
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 0,
                    tension: 100,
                    friction: 10,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Pulse animation for icon
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.2,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // Auto-dismiss after 6 seconds
            const timer = setTimeout(() => {
                handleDismiss();
            }, 6000);

            return () => clearTimeout(timer);
        } else {
            // Slide up and fade out
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: -200,
                    tension: 100,
                    friction: 10,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [news]);

    const handleDismiss = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onDismiss();
    };

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: translateY } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.END) {
            if (event.nativeEvent.translationY < -50) {
                // Swiped up - dismiss
                handleDismiss();
            } else {
                // Snap back
                Animated.spring(translateY, {
                    toValue: 0,
                    tension: 100,
                    friction: 10,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    // Always render but hide when no news (needed for animations)
    const gradientColors = news ? (GRADIENTS[news.type] || GRADIENTS.COMPANY) : GRADIENTS.COMPANY;
    const Icon = news ? (ICONS[news.type] || TrendingUp) : TrendingUp;
    const isPositive = news ? news.impact >= 0 : true;
    const impactColor = isPositive ? '#10B981' : '#EF4444';

    return (
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            enabled={!!news}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateY }],
                        opacity,
                    },
                ]}
                pointerEvents={news ? 'auto' : 'none'}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {/* Icon */}
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
                        <Icon size={20} color="#FFF" strokeWidth={2.5} />
                    </Animated.View>

                    {/* Headline */}
                    <Text style={styles.headline} numberOfLines={1}>
                        {news?.headline || 'Loading...'}
                    </Text>

                    {/* Impact Badge */}
                    <View style={[styles.impactBadge, { backgroundColor: `${impactColor}30` }]}>
                        <Text style={[styles.impactText, { color: impactColor }]}>
                            {isPositive ? '+' : ''}{((news?.impact || 0) * 100).toFixed(1)}%
                        </Text>
                    </View>

                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={handleDismiss}
                        style={styles.closeButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <X size={16} color="#FFF" strokeWidth={3} />
                    </TouchableOpacity>
                </LinearGradient>

                {/* Swipe Indicator */}
                <View style={styles.swipeIndicator}>
                    <View style={styles.swipeLine} />
                </View>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50, // Below status bar
        left: SPACING.md,
        right: SPACING.md,
        zIndex: 9999,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        gap: SPACING.sm,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        flex: 1,
        fontSize: 14,
        fontFamily: FONTS.semibold,
        color: '#FFF',
        letterSpacing: -0.2,
    },
    impactBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.sm,
    },
    impactText: {
        fontSize: 12,
        fontFamily: FONTS.bold,
    },
    closeButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    swipeIndicator: {
        position: 'absolute',
        bottom: 4,
        left: '50%',
        marginLeft: -15,
    },
    swipeLine: {
        width: 30,
        height: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
});
