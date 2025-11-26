import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useCryptoStore } from '../store/useCryptoStore';
import { useStore } from '../store/useStore';
import * as Haptics from 'expo-haptics';

export const CryptoWalletCard = ({ onDeposit, onWithdraw }: { onDeposit: () => void, onWithdraw: () => void }) => {
    const { cryptoWallet, getTotalCryptoValue } = useCryptoStore();
    const { cash } = useStore();

    const totalValue = getTotalCryptoValue();
    const totalEquity = cryptoWallet + totalValue;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4A00E0', '#8E2DE2']} // Purple/Violet gradient for Crypto
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.label}>CRYPTO WALLET</Text>
                        <Text style={styles.balance}>£{cryptoWallet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </View>
                    <View style={styles.netWorthContainer}>
                        <Text style={styles.netWorthLabel}>CRYPTO ASSETS</Text>
                        <Text style={styles.netWorthValue}>£{totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.depositButton]}
                        onPress={onDeposit}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-down-circle-outline" size={20} color={COLORS.white} />
                        <Text style={styles.actionText}>Deposit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.withdrawButton]}
                        onPress={onWithdraw}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="arrow-up-circle-outline" size={20} color={COLORS.white} />
                        <Text style={styles.actionText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    card: {
        padding: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 4,
        letterSpacing: 1,
    },
    balance: {
        fontSize: 28,
        fontFamily: FONTS.bold,
        color: COLORS.white,
    },
    netWorthContainer: {
        alignItems: 'flex-end',
    },
    netWorthLabel: {
        fontSize: 10,
        fontFamily: FONTS.medium,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 2,
    },
    netWorthValue: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.white,
    },
    actionRow: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: RADIUS.lg,
        gap: 8,
    },
    depositButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    withdrawButton: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    actionText: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.card,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        padding: SPACING.xl,
        paddingBottom: SPACING.xxl,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    modalSubtitle: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
        marginBottom: SPACING.xl,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bg,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        marginBottom: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    currencySymbol: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginRight: SPACING.sm,
    },
    input: {
        flex: 1,
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    quickAmounts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    quickButton: {
        backgroundColor: COLORS.bg,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    quickButtonText: {
        color: COLORS.text,
        fontFamily: FONTS.medium,
    },
    confirmButton: {
        paddingVertical: 16,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
});
