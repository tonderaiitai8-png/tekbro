import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MarketEvent } from '../utils/marketEvents';
import { COLORS, FONTS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

interface Props {
    event: MarketEvent | null;
    onDismiss: () => void;
}

export function MarketEventAlert({ event, onDismiss }: Props) {
    const slideAnim = new Animated.Value(-100);

    useEffect(() => {
        if (event) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

            // Slide in
            Animated.spring(slideAnim, {
                toValue: 20,
                useNativeDriver: true,
                tension: 50,
                friction: 7
            }).start();

            // Auto dismiss after duration
            const timer = setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true
                }).start(() => onDismiss());
            }, event.duration);

            return () => clearTimeout(timer);
        }
    }, [event]);

    if (!event) return null;

    const isPositive = event.priceImpact > 0;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY: slideAnim }],
                    backgroundColor: isPositive ? COLORS.success + '20' : COLORS.danger + '20',
                    borderColor: isPositive ? COLORS.success : COLORS.danger,
                }
            ]}
        >
            <Text style={styles.icon}>{event.icon}</Text>
            <View style={styles.content}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.description}>{event.description}</Text>
                {event.sector && (
                    <Text style={styles.sector}>{event.sector} Sector</Text>
                )}
                <Text style={[styles.impact, { color: isPositive ? COLORS.success : COLORS.danger }]}>
                    {isPositive ? '+' : ''}{(event.priceImpact * 100).toFixed(1)}%
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    icon: {
        fontSize: 32,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontFamily: FONTS.regular,
        marginBottom: 4,
    },
    sector: {
        fontSize: 11,
        color: COLORS.primary,
        fontFamily: FONTS.medium,
        marginBottom: 2,
    },
    impact: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: FONTS.bold,
    },
});
