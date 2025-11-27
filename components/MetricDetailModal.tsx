import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    SlideInDown,
    FadeIn
} from 'react-native-reanimated';
import { X, Info, TrendingUp, Wallet, ArrowUpRight, ArrowDownLeft, PieChart } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Trade } from '../types';
import { HapticPatterns } from '../utils/haptics';

interface MetricDetailModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    value: string;
    description: string;
    type: 'netWorth' | 'buyingPower';
    transactions?: Trade[];
    breakdown?: {
        cash: number;
        stocks: number;
        crypto: number;
    };
    performance?: {
        dailyChange: number;
        dailyChangePercent: number;
        allTimePnL: number;
        allTimePnLPercent: number;
    };
}

export const MetricDetailModal: React.FC<MetricDetailModalProps> = ({
    visible,
    onClose,
    title,
    value,
    description,
    type,
    transactions,
    breakdown,
    performance
}) => {
    if (!visible) return null;

    const Icon = type === 'netWorth' ? TrendingUp : Wallet;
    const iconColor = type === 'netWorth' ? COLORS.positive : COLORS.accent;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />

                    <TouchableWithoutFeedback>
                        <Animated.View
                            entering={SlideInDown.springify().damping(15)}
                            style={styles.modalContainer}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
                                    <Icon size={24} color={iconColor} />
                                </View>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <X size={20} color={COLORS.textSub} />
                                </TouchableOpacity>
                            </View>

                            {/* Content - Scrollable */}
                            <ScrollView
                                style={styles.scrollContent}
                                showsVerticalScrollIndicator={false}
                                bounces={false}
                            >
                                <View style={styles.content}>
                                    <Text style={styles.label}>{title}</Text>
                                    <Text style={styles.value}>{value}</Text>

                                    <View style={styles.divider} />

                                    <View style={styles.infoRow}>
                                        <Info size={16} color={COLORS.textSub} style={{ marginTop: 2 }} />
                                        <Text style={styles.description}>{description}</Text>
                                    </View>

                                    {/* Transaction History for Buying Power */}
                                    {type === 'buyingPower' && transactions && transactions.length > 0 && (
                                        <View style={styles.sectionContainer}>
                                            <Text style={styles.sectionTitle}>Recent Transactions</Text>
                                            {transactions.slice(0, 5).map((trade) => (
                                                <View key={trade.id} style={styles.transactionItem}>
                                                    <View style={styles.transactionIcon}>
                                                        {trade.type === 'BUY' ? (
                                                            <ArrowDownLeft size={18} color={COLORS.negative} />
                                                        ) : (
                                                            <ArrowUpRight size={18} color={COLORS.positive} />
                                                        )}
                                                    </View>
                                                    <View style={styles.transactionDetails}>
                                                        <Text style={styles.transactionTitle}>
                                                            {trade.type === 'BUY' ? 'Bought' : 'Sold'} {trade.quantity} {trade.symbol}
                                                        </Text>
                                                        <Text style={styles.transactionDate}>
                                                            {new Date(trade.timestamp).toLocaleDateString()}
                                                        </Text>
                                                    </View>
                                                    <Text style={[styles.transactionAmount, { color: trade.type === 'BUY' ? COLORS.negative : COLORS.positive }]}>
                                                        {trade.type === 'BUY' ? '-' : '+'}£{(trade.quantity * trade.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    {/* Net Worth Breakdown */}
                                    {type === 'netWorth' && breakdown && (
                                        <View style={styles.sectionContainer}>
                                            <Text style={styles.sectionTitle}>Breakdown</Text>
                                            <View style={styles.breakdownRow}>
                                                <View style={[styles.breakdownDot, { backgroundColor: '#8B5CF6' }]} />
                                                <Text style={styles.breakdownLabel}>Cash</Text>
                                                <Text style={styles.breakdownValue}>£{breakdown.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                                <Text style={styles.breakdownPercent}>
                                                    {((breakdown.cash / (breakdown.cash + breakdown.stocks + breakdown.crypto)) * 100).toFixed(1)}%
                                                </Text>
                                            </View>
                                            <View style={styles.breakdownRow}>
                                                <View style={[styles.breakdownDot, { backgroundColor: '#06B6D4' }]} />
                                                <Text style={styles.breakdownLabel}>Stocks</Text>
                                                <Text style={styles.breakdownValue}>£{breakdown.stocks.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                                <Text style={styles.breakdownPercent}>
                                                    {((breakdown.stocks / (breakdown.cash + breakdown.stocks + breakdown.crypto)) * 100).toFixed(1)}%
                                                </Text>
                                            </View>
                                            <View style={styles.breakdownRow}>
                                                <View style={[styles.breakdownDot, { backgroundColor: '#F59E0B' }]} />
                                                <Text style={styles.breakdownLabel}>Crypto</Text>
                                                <Text style={styles.breakdownValue}>£{breakdown.crypto.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                                <Text style={styles.breakdownPercent}>
                                                    {((breakdown.crypto / (breakdown.cash + breakdown.stocks + breakdown.crypto)) * 100).toFixed(1)}%
                                                </Text>
                                            </View>
                                        </View>
                                    )}

                                    {/* Performance Stats */}
                                    {type === 'netWorth' && performance && (
                                        <View style={styles.sectionContainer}>
                                            <Text style={styles.sectionTitle}>Performance</Text>
                                            <View style={styles.perfRow}>
                                                <Text style={styles.perfLabel}>Daily Change</Text>
                                                <Text style={[styles.perfValue, { color: performance.dailyChange >= 0 ? COLORS.positive : COLORS.negative }]}>
                                                    {performance.dailyChange >= 0 ? '+' : ''}£{performance.dailyChange.toLocaleString(undefined, { minimumFractionDigits: 2 })} ({performance.dailyChangePercent >= 0 ? '+' : ''}{performance.dailyChangePercent.toFixed(2)}%)
                                                </Text>
                                            </View>
                                            <View style={styles.perfRow}>
                                                <Text style={styles.perfLabel}>All-Time P&L</Text>
                                                <Text style={[styles.perfValue, { color: performance.allTimePnL >= 0 ? COLORS.positive : COLORS.negative }]}>
                                                    {performance.allTimePnL >= 0 ? '+' : ''}£{performance.allTimePnL.toLocaleString(undefined, { minimumFractionDigits: 2 })} ({performance.allTimePnLPercent >= 0 ? '+' : ''}{performance.allTimePnLPercent.toFixed(2)}%)
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </ScrollView>

                            {/* Action Button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    HapticPatterns.light();
                                    onClose();
                                }}
                            >
                                <Text style={styles.buttonText}>Got it</Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: COLORS.bgElevated,
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        padding: SPACING.xl,
        paddingBottom: SPACING.xxxl,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        padding: SPACING.xs,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.full,
    },
    scrollContent: {
        maxHeight: 400,
    },
    content: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        marginBottom: SPACING.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 36,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        letterSpacing: -1,
        marginBottom: SPACING.lg,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.lg,
    },
    infoRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    description: {
        flex: 1,
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    button: {
        backgroundColor: COLORS.card,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    sectionContainer: {
        marginTop: SPACING.lg,
        padding: SPACING.md,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: COLORS.textSub,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: SPACING.sm,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    transactionIcon: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.bgElevated,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.sm,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.text,
    },
    transactionDate: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
        marginTop: 2,
    },
    transactionAmount: {
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    breakdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    breakdownDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: SPACING.sm,
    },
    breakdownLabel: {
        flex: 1,
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.text,
    },
    breakdownValue: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginRight: SPACING.sm,
    },
    breakdownPercent: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        minWidth: 50,
        textAlign: 'right',
    },
    perfRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACING.sm,
    },
    perfLabel: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
    },
    perfValue: {
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
});
