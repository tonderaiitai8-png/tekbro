import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface MetricCardProps {
    label: string;
    value: string;
    variant?: 'default' | 'positive' | 'negative';
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, variant = 'default' }) => {
    const getGradientColors = (): [string, string] => {
        switch (variant) {
            case 'positive':
                return ['#1A3F5F', '#2A4F6F']; // Blue gradient
            case 'negative':
                return ['#5F1A1A', '#6F2A2A']; // Red gradient
            default:
                return ['#2F1A5F', '#3F2A6F']; // Purple gradient
        }
    };

    const getIconColor = () => {
        switch (variant) {
            case 'positive':
                return COLORS.positive;
            case 'negative':
                return COLORS.negative;
            default:
                return COLORS.accent;
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <Text style={styles.label}>{label}</Text>
                <View style={styles.valueContainer}>
                    <Text style={styles.value}>{value}</Text>
                    {variant === 'positive' && (
                        <TrendingUp size={20} color={getIconColor()} strokeWidth={2.5} />
                    )}
                    {variant === 'negative' && (
                        <TrendingDown size={20} color={getIconColor()} strokeWidth={2.5} />
                    )}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        minHeight: 100,
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 11,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        letterSpacing: 0.5,
        marginBottom: SPACING.xs,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    value: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
});
