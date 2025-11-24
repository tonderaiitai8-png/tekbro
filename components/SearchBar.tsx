import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...' }: Props) {
    return (
        <View style={styles.container}>
            <Search size={18} color={COLORS.textMuted} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgElevated,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.md,
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        fontFamily: FONTS.regular,
    },
});
