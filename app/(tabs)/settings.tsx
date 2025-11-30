import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, User, Bell, Smartphone, Trash2, Info, ChevronRight, LogOut, Shield, CreditCard, Palette, Check, Wrench, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../hooks/useTheme';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import DevSettingsModal from '../../components/DevSettingsModal';
import ThemeModal from '../../components/ThemeModal';
import CurrencyModal from '../../components/CurrencyModal';

export default function SettingsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { reset } = useStore();
    const [devModalVisible, setDevModalVisible] = useState(false);
    const [themeModalVisible, setThemeModalVisible] = useState(false);
    const [currencyModalVisible, setCurrencyModalVisible] = useState(false);

    const handleReset = () => {
        Alert.alert(
            "Reset App",
            "Are you sure you want to reset all data? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: () => {
                        reset();
                        router.replace('/');
                    }
                }
            ]
        );
    };

    const renderItem = (icon: React.ReactNode, title: string, subtitle?: string, onPress?: () => void, showChevron = true, rightElement?: React.ReactNode) => (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={[styles.iconBox, { backgroundColor: theme.card }]}>
                {icon}
            </View>
            <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, { color: theme.text }]}>{title}</Text>
                {subtitle && <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
            </View>
            {rightElement}
            {showChevron && !rightElement && <ChevronRight size={20} color={theme.textSecondary} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Profile Section */}
                <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.bg, borderColor: theme.primary }]}>
                        <User size={30} color={theme.primary} />
                    </View>
                    <View>
                        <Text style={[styles.profileName, { color: theme.text }]}>Trader</Text>
                        <Text style={[styles.profileStatus, { color: theme.textSecondary }]}>Pro Member</Text>
                    </View>
                </View>

                {/* Appearance & Currency */}
                <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>Personalization</Text>
                <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    {renderItem(
                        <Palette size={20} color={theme.primary} />,
                        "App Theme",
                        "Customize look and feel",
                        () => setThemeModalVisible(true)
                    )}
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    {renderItem(
                        <DollarSign size={20} color={theme.primary} />,
                        "Currency",
                        "Choose display currency",
                        () => setCurrencyModalVisible(true)
                    )}
                </View>

                {/* Account Settings */}
                <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>Account</Text>
                <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    {renderItem(<User size={20} color={theme.primary} />, "Personal Information", "Update your details", () => { })}
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    {renderItem(<Shield size={20} color={theme.primary} />, "Security", "Password, 2FA", () => { })}
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    {renderItem(<CreditCard size={20} color={theme.primary} />, "Payment Methods", "Manage cards", () => { })}
                </View>

                {/* App Settings */}
                <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>App Settings</Text>
                <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    {renderItem(<Bell size={20} color={theme.primary} />, "Notifications", "Manage alerts", () => { })}
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    {renderItem(<Smartphone size={20} color={theme.primary} />, "App Icon", "Change appearance", () => { })}
                </View>

                {/* Support */}
                <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>Support</Text>
                <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    {renderItem(<Info size={20} color={theme.primary} />, "Help Center", "FAQ, Contact Support", () => { })}
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    {renderItem(
                        <Wrench size={20} color={theme.accent} />,
                        "Developer Tools",
                        "Debug & Testing",
                        () => setDevModalVisible(true)
                    )}
                </View>

                {/* Danger Zone */}
                <Text style={[styles.sectionHeader, { color: theme.negative }]}>Danger Zone</Text>
                <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
                    {renderItem(
                        <Trash2 size={20} color={theme.negative} />,
                        "Reset App Data",
                        "Clear all data and progress",
                        handleReset,
                        false
                    )}
                    <View style={[styles.divider, { backgroundColor: theme.border }]} />
                    {renderItem(
                        <LogOut size={20} color={theme.negative} />,
                        "Log Out",
                        undefined,
                        () => router.replace('/'),
                        false
                    )}
                </View>

                <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                    Version 1.0.0 (Build 104)
                </Text>

            </ScrollView>

            <DevSettingsModal
                visible={devModalVisible}
                onClose={() => setDevModalVisible(false)}
            />
            <ThemeModal
                visible={themeModalVisible}
                onClose={() => setThemeModalVisible(false)}
            />
            <CurrencyModal
                visible={currencyModalVisible}
                onClose={() => setCurrencyModalVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: FONTS.bold,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 100,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        marginBottom: SPACING.xl,
        borderWidth: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.lg,
        borderWidth: 2,
    },
    profileName: {
        fontSize: 20,
        fontFamily: FONTS.bold,
    },
    profileStatus: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        marginTop: 2,
    },
    sectionHeader: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        marginBottom: SPACING.sm,
        marginLeft: SPACING.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    section: {
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        marginBottom: SPACING.xl,
        borderWidth: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    itemContent: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    itemTitle: {
        fontSize: 16,
        fontFamily: FONTS.medium,
    },
    itemSubtitle: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        marginTop: 2,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        marginLeft: 60,
    },
    footerText: {
        textAlign: 'center',
        fontFamily: FONTS.medium,
        fontSize: 12,
        marginTop: SPACING.lg,
    },
});
