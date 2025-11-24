import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface MetricCardProps {
    label: string;
    value: string;
    subtitle?: string;
    variant?: 'default' | 'positive' | 'negative';
}

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    subtitle,
    variant = 'default'
}) => {
    const getVariantColor = () => {
        switch (variant) {
            case 'positive': return COLORS.positive;
            case 'negative': return COLORS.negative;
            default: return COLORS.text;
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, { color: getVariantColor() }]}>{value}</Text>
            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    label: {
        color: COLORS.textSub,
        fontSize: 11,
        fontFamily: FONTS.medium,
        marginBottom: SPACING.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: FONTS.bold,
        marginBottom: 4,
    },
    subtitle: {
        color: COLORS.textMuted,
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
});
