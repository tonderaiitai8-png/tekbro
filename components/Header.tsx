import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

interface Props {
    title: string;
    rightComponent?: React.ReactNode;
}

export function Header({ title, rightComponent }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>{title}</Text>
            {rightComponent && <View style={styles.right}>{rightComponent}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    title: {
        flex: 1,
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        fontFamily: FONTS.bold,
        letterSpacing: -0.5,
        marginRight: SPACING.md,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
});
