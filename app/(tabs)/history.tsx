import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../../store/useStore';
import { Header } from '../../components/Header';
import { COLORS, FONTS, SPACING, RADIUS } from '../../constants/theme';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

type FilterType = 'all' | 'buy' | 'sell';

export default function HistoryScreen() {
    const { trades } = useStore();
    const [filter, setFilter] = useState<FilterType>('all');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const filteredTrades = useMemo(() => {
        if (filter === 'all') return trades;
        return trades.filter(trade => trade.type.toLowerCase() === filter);
    }, [trades, filter]);

    const getRelativeTime = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    const renderTradeItem = ({ item }: { item: any }) => {
        const isBuy = item.type === 'BUY';
        const pnl = item.pnl || 0;
        const color = isBuy ? COLORS.accent : COLORS.negative;

        return (
            <View style={[styles.tradeItem, { borderColor: isBuy ? COLORS.accent + '30' : COLORS.negative + '30' }]}>
                <View style={styles.tradeHeader}>
                    <View style={styles.tradeSymbol}>
                        <View style={[styles.iconBox, { backgroundColor: color + '15', borderColor: color + '30' }]}>
                            {isBuy ? (
                                <TrendingUp size={16} color={color} />
                            ) : (
                                <TrendingDown size={16} color={color} />
                            )}
                        </View>
                        <View>
                            <Text style={styles.symbol}>{item.symbol}</Text>
                            <Text style={[styles.type, { color }]}>{item.type}</Text>
                        </View>
                    </View>
                    <Text style={styles.timestamp}>{getRelativeTime(item.timestamp)}</Text>
                </View>

                <View style={styles.tradeDetails}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Price</Text>
                        <Text style={styles.detailValue}>£{item.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Qty</Text>
                        <Text style={styles.detailValue}>{item.quantity}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total</Text>
                        <Text style={styles.detailValue}>£{(item.quantity * item.price).toFixed(2)}</Text>
                    </View>

                    {!isBuy && pnl !== 0 && (
                        <View style={[styles.detailRow, styles.pnlRow]}>
                            <Text style={styles.detailLabel}>P&L</Text>
                            <Text style={[styles.pnlValue, { color: pnl >= 0 ? COLORS.positive : COLORS.negative }]}>
                                {pnl >= 0 ? '+' : ''}£{pnl.toFixed(2)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    const renderEmpty = () => (
        <View style={styles.empty}>
            <Text style={styles.emptyText}>No trades yet</Text>
            <Text style={styles.emptySubtext}>
                Start trading from the Market tab to see your history here
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Trade History" />

            <View style={styles.filters}>
                {(['all', 'buy', 'sell'] as FilterType[]).map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[
                            styles.filterButton,
                            filter === f && styles.filterButtonActive,
                        ]}
                        onPress={() => {
                            setFilter(f);
                            Haptics.selectionAsync();
                        }}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                            {f.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredTrades}
                renderItem={renderTradeItem}
                keyExtractor={(item, index) => `${item.symbol}-${item.timestamp}-${index}`}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    filters: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        gap: SPACING.md,
    },
    filterButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: COLORS.accentSubtle,
        borderColor: COLORS.accent,
    },
    filterText: {
        color: COLORS.textSub,
        fontSize: 12,
        fontWeight: '700',
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    filterTextActive: {
        color: COLORS.accent,
    },
    listContent: {
        paddingHorizontal: SPACING.xl,
        paddingBottom: 100,
    },
    tradeItem: {
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
    },
    tradeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.lg,
        paddingBottom: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tradeSymbol: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    symbol: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: FONTS.bold,
    },
    type: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
        fontFamily: FONTS.semibold,
    },
    timestamp: {
        color: COLORS.textSub,
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    tradeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: SPACING.lg,
    },
    detailRow: {
        alignItems: 'flex-start',
    },
    pnlRow: {
        alignItems: 'flex-end',
        flex: 1,
    },
    detailLabel: {
        color: COLORS.textSub,
        fontSize: 11,
        marginBottom: 4,
        fontFamily: FONTS.medium,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS.semibold,
    },
    pnlValue: {
        fontSize: 16,
        fontWeight: '700',
        fontFamily: FONTS.bold,
    },
    empty: {
        padding: 60,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: FONTS.semibold,
        marginBottom: SPACING.sm,
    },
    emptySubtext: {
        color: COLORS.textSub,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: FONTS.regular,
    },
});
