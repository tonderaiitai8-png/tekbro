import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS, ThemeType, MIDNIGHT_THEME, OCEAN_THEME, SUNSET_THEME, FOREST_THEME, NEON_THEME, ROYAL_THEME, CYBERPUNK_THEME, MINIMAL_THEME, RETRO_THEME, COFFEE_THEME } from '../constants/theme';
import { Check, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../hooks/useTheme';

interface ThemeSelectorModalProps {
    visible: boolean;
    onClose: () => void;
}

const THEMES = [
    { id: 'midnight', label: 'Midnight', colors: ['#000000', '#1A1A1A'], def: MIDNIGHT_THEME },
    { id: 'ocean', label: 'Ocean', colors: ['#020617', '#1e293b'], def: OCEAN_THEME },
    { id: 'sunset', label: 'Sunset', colors: ['#2a0a2a', '#4a1a4a'], def: SUNSET_THEME },
    { id: 'forest', label: 'Forest', colors: ['#052e16', '#064e3b'], def: FOREST_THEME },
    { id: 'neon', label: 'Neon', colors: ['#050505', '#222'], def: NEON_THEME },
    { id: 'royal', label: 'Royal', colors: ['#0F0B1E', '#251D46'], def: ROYAL_THEME },
    { id: 'cyberpunk', label: 'Cyberpunk', colors: ['#000', '#111'], def: CYBERPUNK_THEME },
    { id: 'minimal', label: 'Minimal', colors: ['#FFF', '#F8F9FA'], def: MINIMAL_THEME },
    { id: 'retro', label: 'Retro', colors: ['#2B211E', '#463630'], def: RETRO_THEME },
    { id: 'coffee', label: 'Coffee', colors: ['#1C1917', '#44403C'], def: COFFEE_THEME },
];

const { height } = Dimensions.get('window');

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ visible, onClose }) => {
    const { theme, currentTheme, setTheme } = useTheme();

    const ThemeOption = ({ item }: { item: typeof THEMES[0] }) => {
        const isActive = currentTheme === item.id;
        const itemTheme = item.def;

        return (
            <TouchableOpacity
                style={[
                    styles.themeRow,
                    {
                        backgroundColor: itemTheme.bgElevated,
                        borderColor: isActive ? theme.primary : itemTheme.border,
                        borderWidth: isActive ? 2 : 1,
                    }
                ]}
                onPress={() => {
                    setTheme(item.id as ThemeType);
                    Haptics.selectionAsync();
                }}
                activeOpacity={0.8}
            >
                <View style={[styles.previewCircle, { backgroundColor: itemTheme.primary }]} />
                <View style={styles.themeInfo}>
                    <Text style={[styles.themeLabel, { color: itemTheme.text }]}>{item.label}</Text>
                    <Text style={[styles.themeSub, { color: itemTheme.textSub }]}>
                        {isActive ? 'Active Theme' : 'Tap to apply'}
                    </Text>
                </View>
                {isActive && (
                    <View style={[styles.checkBadge, { backgroundColor: theme.primary }]}>
                        <Check size={14} color="#000" strokeWidth={3} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={[styles.container, { backgroundColor: theme.bg }]}>
                <View style={[styles.header, { borderBottomColor: theme.border }]}>
                    <Text style={[styles.title, { color: theme.text }]}>Select Theme</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <X size={24} color={theme.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {THEMES.map((item) => (
                        <ThemeOption key={item.id} item={item} />
                    ))}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.lg,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: FONTS.bold,
    },
    closeButton: {
        padding: SPACING.xs,
    },
    content: {
        padding: SPACING.lg,
        gap: SPACING.md,
        paddingBottom: SPACING.xxl,
    },
    themeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        gap: SPACING.md,
    },
    previewCircle: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    themeInfo: {
        flex: 1,
    },
    themeLabel: {
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    themeSub: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    checkBadge: {
        width: 24,
        height: 24,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
