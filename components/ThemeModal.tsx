import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { AVAILABLE_THEMES, ThemeType, FONTS, SPACING, RADIUS } from '../constants/theme';

interface ThemeModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ThemeModal({ visible, onClose }: ThemeModalProps) {
    const { theme, currentTheme, setTheme, isDark } = useTheme();

    const renderThemeCard = (item: typeof AVAILABLE_THEMES[0]) => {
        const isActive = currentTheme === item.id;

        return (
            <TouchableOpacity
                key={item.id}
                style={[
                    styles.themeCard,
                    { borderColor: isActive ? theme.primary : 'transparent' }
                ]}
                onPress={() => setTheme(item.id as ThemeType)}
            >
                <LinearGradient
                    colors={item.cardGradient}
                    style={styles.themeCardGradient}
                >
                    <View style={styles.themeCardContent}>
                        <Text style={styles.themeCardLabel}>{item.label}</Text>
                        <View style={[styles.themeCardIndicator, { backgroundColor: isActive ? '#FFF' : 'rgba(255,255,255,0.3)' }]} />
                    </View>
                </LinearGradient>
                {isActive && (
                    <View style={[styles.activeBadge, { backgroundColor: theme.primary }]}>
                        <Check size={12} color="#FFF" strokeWidth={3} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <BlurView intensity={20} style={styles.container}>
                <View style={[styles.content, { backgroundColor: theme.bg }]}>
                    <View style={[styles.header, { borderBottomColor: theme.border }]}>
                        <Text style={[styles.title, { color: theme.text }]}>Choose Theme</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.grid}>
                            {AVAILABLE_THEMES.map(renderThemeCard)}
                        </View>
                    </ScrollView>
                </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    content: {
        height: '80%',
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
    },
    themeCard: {
        width: '47%',
        height: 100,
        borderRadius: RADIUS.xl,
        borderWidth: 2,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    themeCardGradient: {
        flex: 1,
        padding: SPACING.md,
        justifyContent: 'flex-end',
    },
    themeCardContent: {
        gap: 4,
    },
    themeCardLabel: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    themeCardIndicator: {
        width: 20,
        height: 4,
        borderRadius: RADIUS.full,
    },
    activeBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
