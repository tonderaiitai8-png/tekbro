import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Check, DollarSign, Euro, PoundSterling, Bitcoin, JapaneseYen } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { useStore } from '../store/useStore';
import { FONTS, SPACING, RADIUS } from '../constants/theme';

interface CurrencyModalProps {
    visible: boolean;
    onClose: () => void;
}

const CURRENCIES = [
    { id: 'GBP', label: 'British Pound', symbol: '£', icon: PoundSterling },
    { id: 'USD', label: 'US Dollar', symbol: '$', icon: DollarSign },
    { id: 'EUR', label: 'Euro', symbol: '€', icon: Euro },
    { id: 'JPY', label: 'Japanese Yen', symbol: '¥', icon: JapaneseYen },
    { id: 'BTC', label: 'Bitcoin', symbol: '₿', icon: Bitcoin },
];

export default function CurrencyModal({ visible, onClose }: CurrencyModalProps) {
    const { theme } = useTheme();
    const { currency, setCurrency } = useStore();

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
                        <Text style={[styles.title, { color: theme.text }]}>Choose Currency</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {CURRENCIES.map((item) => {
                            const isActive = currency === item.id;
                            const Icon = item.icon;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.item,
                                        {
                                            backgroundColor: theme.card,
                                            borderColor: isActive ? theme.primary : theme.border
                                        }
                                    ]}
                                    onPress={() => {
                                        setCurrency(item.id);
                                        onClose();
                                    }}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: theme.bg }]}>
                                        <Icon size={24} color={isActive ? theme.primary : theme.textSecondary} />
                                    </View>
                                    <View style={styles.itemContent}>
                                        <Text style={[styles.itemLabel, { color: theme.text }]}>{item.label}</Text>
                                        <Text style={[styles.itemSymbol, { color: theme.textSecondary }]}>{item.symbol} - {item.id}</Text>
                                    </View>
                                    {isActive && (
                                        <View style={[styles.checkCircle, { backgroundColor: theme.primary }]}>
                                            <Check size={14} color="#FFF" strokeWidth={3} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
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
        height: '50%',
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
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    itemContent: {
        flex: 1,
    },
    itemLabel: {
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    itemSymbol: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        marginTop: 2,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
