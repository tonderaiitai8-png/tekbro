import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { X, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Trade } from '../types';
import { HapticPatterns } from '../utils/haptics';

interface CryptoHistoryModalProps {
    visible: boolean;
    onClose: () => void;
    trades: Trade[];
}

export const CryptoHistoryModal: React.FC<CryptoHistoryModalProps> = ({
    visible,
    onClose,
    trades
}) => {
    if (!visible) return null;

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
                                <View style={styles.titleRow}>
                                    <View style={styles.iconContainer}>
                                        <History size={24} color={COLORS.accent} />
                                    </View>
                                    <Text style={styles.title}>Crypto History</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <X size={20} color={COLORS.textSub} />
                                </TouchableOpacity>
                            </View>

                            {/* Content */}
                            <ScrollView
                                style={styles.scrollContent}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: SPACING.xl }}
                            >
                                {trades.length === 0 ? (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyText}>No crypto trades yet.</Text>
                                    </View>
                                ) : (
                                    trades.map((trade) => (
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
                                                    {new Date(trade.timestamp).toLocaleDateString()} • {new Date(trade.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </Text>
                                            </View>
                                            <View style={styles.amountContainer}>
                                                <Text style={[styles.transactionAmount, { color: trade.type === 'BUY' ? COLORS.negative : COLORS.positive }]}>
                                                    {trade.type === 'BUY' ? '-' : '+'}£{(trade.quantity * trade.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </Text>
                                                {trade.pnl !== undefined && (
                                                    <Text style={[styles.pnlText, { color: trade.pnl >= 0 ? COLORS.positive : COLORS.negative }]}>
                                                        {trade.pnl >= 0 ? '+' : ''}£{trade.pnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    ))
                                )}
                            </ScrollView>

                            {/* Action Button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    HapticPatterns.light();
                                    onClose();
                                }}
                            >
                                <Text style={styles.buttonText}>Close</Text>
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
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(139, 92, 246, 0.1)', // Purple tint
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    closeButton: {
        padding: SPACING.xs,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.full,
    },
    scrollContent: {
        marginBottom: SPACING.lg,
    },
    emptyState: {
        padding: SPACING.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSub,
        fontFamily: FONTS.medium,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    transactionIcon: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.bgSubtle,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 15,
        fontFamily: FONTS.medium,
        color: COLORS.text,
        marginBottom: 2,
    },
    transactionDate: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 15,
        fontFamily: FONTS.bold,
        marginBottom: 2,
    },
    pnlText: {
        fontSize: 11,
        fontFamily: FONTS.medium,
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
});
