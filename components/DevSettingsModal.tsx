import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Trash2, Zap, TrendingUp, TrendingDown, DollarSign, Award, RefreshCw, Database, Activity, Layers, Settings, Shield } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store/useStore';
import { useCryptoStore } from '../store/useCryptoStore';
import { useMarketMoodStore } from '../store/useMarketMoodStore';
import { FONTS, SPACING, RADIUS } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

interface DevSettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

type Tab = 'PLAYER' | 'MARKET' | 'CRYPTO' | 'SYSTEM';

export default function DevSettingsModal({ visible, onClose }: DevSettingsModalProps) {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState<Tab>('PLAYER');

    const { addCash, addXp, resetStore, setOnboardingCompleted, level, xp } = useStore();
    const { resetCrypto } = useCryptoStore();
    const {
        forcePhase,
        forceCryptoPhase,
        setFearGreedIndex,
        triggerEvent,
        marketCyclePhase,
        fearGreedIndex,
        cryptoCyclePhase,
        cryptoFearGreedIndex
    } = useMarketMoodStore();

    const handleAction = (action: () => void, feedback: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) => {
        Haptics.impactAsync(feedback);
        action();
    };

    const confirmAction = (title: string, message: string, action: () => void) => {
        Alert.alert(
            title,
            message,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    style: 'destructive',
                    onPress: () => handleAction(action, Haptics.ImpactFeedbackStyle.Heavy)
                }
            ]
        );
    };

    const renderTabButton = (tab: Tab, icon: React.ReactNode) => (
        <TouchableOpacity
            style={[
                styles.tabButton,
                activeTab === tab && { backgroundColor: theme.primary + '20', borderColor: theme.primary }
            ]}
            onPress={() => {
                Haptics.selectionAsync();
                setActiveTab(tab);
            }}
        >
            {icon}
            <Text style={[
                styles.tabText,
                { color: activeTab === tab ? theme.primary : theme.textSecondary }
            ]}>{tab}</Text>
        </TouchableOpacity>
    );

    const renderButton = (label: string, onPress: () => void, color: string, icon?: React.ReactNode, active?: boolean) => (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: active ? color : `${color}10`, borderColor: active ? color : `${color}30` }
            ]}
            onPress={() => handleAction(onPress)}
        >
            {icon}
            <Text style={[styles.buttonText, { color: active ? '#FFF' : color }]}>{label}</Text>
        </TouchableOpacity>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'PLAYER':
                return (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Player Stats</Text>
                        <View style={styles.grid}>
                            {renderButton('+ £10k Cash', () => addCash(10000), theme.success, <DollarSign size={16} color={theme.success} />)}
                            {renderButton('+ £100k Cash', () => addCash(100000), theme.success, <DollarSign size={16} color={theme.success} />)}
                            {renderButton('+ 1k XP', () => addXp(1000), theme.accent, <Zap size={16} color={theme.accent} />)}
                            {renderButton('Level Up (+5k XP)', () => addXp(5000), theme.accent, <Zap size={16} color={theme.accent} />)}
                        </View>

                        <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Current Level: <Text style={{ color: theme.text, fontFamily: FONTS.bold }}>{level}</Text></Text>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Current XP: <Text style={{ color: theme.text, fontFamily: FONTS.bold }}>{xp}</Text></Text>
                        </View>
                    </View>
                );
            case 'MARKET':
                return (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Market Cycle Override</Text>
                        <View style={styles.grid}>
                            {renderButton('Accumulation', () => forcePhase('accumulation'), '#00D9FF', <Activity size={16} color="#00D9FF" />, marketCyclePhase === 'accumulation')}
                            {renderButton('Bull Run', () => forcePhase('markup'), '#00FF88', <TrendingUp size={16} color="#00FF88" />, marketCyclePhase === 'markup')}
                            {renderButton('Distribution', () => forcePhase('distribution'), '#FFD700', <Activity size={16} color="#FFD700" />, marketCyclePhase === 'distribution')}
                            {renderButton('Bear Market', () => forcePhase('markdown'), '#FF4444', <TrendingDown size={16} color="#FF4444" />, marketCyclePhase === 'markdown')}
                        </View>

                        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: SPACING.xl }]}>Event Triggers</Text>
                        <View style={styles.grid}>
                            {renderButton('Trigger Crash', () => {
                                triggerEvent({
                                    id: Date.now().toString(),
                                    type: 'CRASH',
                                    name: 'Flash Crash',
                                    description: 'Dev Tool Triggered Crash',
                                    severity: 'EXTREME',
                                    duration: 30,
                                    impact: { priceChangePerTick: -0.01, volatilityMultiplier: 3.0 }
                                });
                                onClose();
                            }, '#FF4444', <TrendingDown size={16} color="#FF4444" />)}

                            {renderButton('Trigger Rally', () => {
                                triggerEvent({
                                    id: Date.now().toString(),
                                    type: 'BULL_RUN',
                                    name: 'Dev Rally',
                                    description: 'Dev Tool Triggered Rally',
                                    severity: 'HIGH',
                                    duration: 60,
                                    impact: { priceChangePerTick: 0.005, volatilityMultiplier: 1.5 }
                                });
                                onClose();
                            }, '#00FF88', <TrendingUp size={16} color="#00FF88" />)}
                        </View>
                    </View>
                );
            case 'CRYPTO':
                return (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Crypto Cycle Override</Text>
                        <View style={styles.grid}>
                            {renderButton('Accumulation', () => forceCryptoPhase('accumulation'), '#00D9FF', <Activity size={16} color="#00D9FF" />, cryptoCyclePhase === 'accumulation')}
                            {renderButton('Moon Mission', () => forceCryptoPhase('markup'), '#B026FF', <TrendingUp size={16} color="#B026FF" />, cryptoCyclePhase === 'markup')}
                            {renderButton('Distribution', () => forceCryptoPhase('distribution'), '#FFD700', <Activity size={16} color="#FFD700" />, cryptoCyclePhase === 'distribution')}
                            {renderButton('REKT Zone', () => forceCryptoPhase('markdown'), '#FF4444', <TrendingDown size={16} color="#FF4444" />, cryptoCyclePhase === 'markdown')}
                        </View>

                        <View style={[styles.infoCard, { backgroundColor: theme.card, marginTop: SPACING.lg }]}>
                            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Crypto F&G: <Text style={{ color: theme.text, fontFamily: FONTS.bold }}>{cryptoFearGreedIndex.toFixed(0)}</Text></Text>
                        </View>
                    </View>
                );
            case 'SYSTEM':
                return (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>System Actions</Text>
                        <View style={styles.grid}>
                            {renderButton(
                                'Reset Onboarding',
                                () => {
                                    setOnboardingCompleted(false);
                                    onClose();
                                },
                                theme.text,
                                <RefreshCw size={16} color={theme.text} />
                            )}

                            <TouchableOpacity
                                style={[styles.dangerButton, { backgroundColor: `${theme.negative}20`, borderColor: theme.negative }]}
                                onPress={() => confirmAction(
                                    'Wipe All Data',
                                    'This will reset cash, portfolio, and all progress. This cannot be undone.',
                                    () => {
                                        resetStore();
                                        resetCrypto();
                                        onClose();
                                    }
                                )}
                            >
                                <Trash2 size={18} color={theme.negative} />
                                <Text style={[styles.dangerButtonText, { color: theme.negative }]}>WIPE ALL DATA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
        }
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
                    <Text style={[styles.title, { color: theme.text }]}>Developer Tools</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <X size={24} color={theme.text} />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={[styles.tabs, { borderBottomColor: theme.border }]}>
                    {renderTabButton('PLAYER', <Award size={16} color={activeTab === 'PLAYER' ? theme.primary : theme.textSecondary} />)}
                    {renderTabButton('MARKET', <TrendingUp size={16} color={activeTab === 'MARKET' ? theme.primary : theme.textSecondary} />)}
                    {renderTabButton('CRYPTO', <Zap size={16} color={activeTab === 'CRYPTO' ? theme.primary : theme.textSecondary} />)}
                    {renderTabButton('SYSTEM', <Settings size={16} color={activeTab === 'SYSTEM' ? theme.primary : theme.textSecondary} />)}
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    {renderContent()}

                    <Text style={[styles.disclaimer, { color: theme.textMuted }]}>
                        App Version: 1.0.0 (Dev) | Build: 2025.11.29
                    </Text>
                </ScrollView>
            </View>
        </Modal>
    );
}

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
        padding: SPACING.sm,
    },
    tabs: {
        flexDirection: 'row',
        padding: SPACING.md,
        borderBottomWidth: 1,
        gap: SPACING.sm,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    tabText: {
        fontSize: 10,
        fontFamily: FONTS.bold,
    },
    content: {
        padding: SPACING.lg,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        marginBottom: SPACING.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        flexGrow: 1,
        justifyContent: 'center',
        minWidth: '45%',
    },
    buttonText: {
        fontSize: 12,
        fontFamily: FONTS.bold,
    },
    infoCard: {
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginTop: SPACING.md,
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        marginBottom: 4,
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        width: '100%',
        marginTop: SPACING.sm,
    },
    dangerButtonText: {
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    disclaimer: {
        textAlign: 'center',
        fontSize: 10,
        fontFamily: FONTS.regular,
        marginTop: SPACING.xl,
        marginBottom: SPACING.xl,
    },
});
