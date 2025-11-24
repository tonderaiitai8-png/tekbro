import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'danger' | 'secondary';
    disabled?: boolean;
    style?: any;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    style
}) => {
    const getBackgroundColor = () => {
        if (disabled) return COLORS.accent;
        switch (variant) {
            case 'danger': return COLORS.danger;
            case 'secondary': return COLORS.card;
            default: return COLORS.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return COLORS.textSecondary;
        switch (variant) {
            case 'secondary': return COLORS.text;
            default: return '#000000';
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                style
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: FONTS.bold,
    },
});
