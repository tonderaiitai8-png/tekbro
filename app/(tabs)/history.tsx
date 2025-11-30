import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../../store/useStore';
import { useCryptoStore } from '../../store/useCryptoStore';
import { FONTS, SPACING, RADIUS } from '../../constants/theme';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react-native';
import { AppBackground } from '../../components/AppBackground';
import { TradeHistoryModal } from '../../components/TradeHistoryModal';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/currency';

type FilterType = 'ALL' | 'STOCK' | 'CRYPTO' | 'PROFIT' | 'LOSS';

export default function HistoryScreen() {
    const { trades: stockTrades } = useStore();
    const { cryptoTrades } = useCryptoStore();
    const { theme } = useTheme();
    const [filter, setFilter] = useState<FilterType>('ALL');
    const [selectedTradeId, setSelectedTradeId] = useState<string | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    // Combine and sort trades
    const allTrades = useMemo(() => {
        const stocks = stockTrades.map(t => ({ ...t, assetType: 'STOCK' }));
        const cryptos = cryptoTrades.map(t => ({ ...t, assetType: 'CRYPTO' }));
        return [...stocks, ...cryptos].sort((a, b) => b.timestamp - a.timestamp);
    }, [stockTrades, cryptoTrades]);

    const filteredTrades = useMemo(() => {
        return allTrades.filter(t => {
            if (filter === 'ALL') return true;
            if (filter === 'STOCK') return t.assetType === 'STOCK';
            if (filter === 'CRYPTO') return t.assetType === 'CRYPTO';
            if (filter === 'PROFIT') return (t.pnl || 0) > 0;
            if (filter === 'LOSS') return (t.pnl || 0) < 0;
            return true;
        });
    }, [allTrades, filter]);

    const renderTradeItem = ({ item }: { item: any }) => {
        const isProfit = (item.pnl || 0) >= 0;

        return (
            <TouchableOpacity
                style={[styles.tradeItem, { backgroundColor: theme.card, borderColor: theme.border }]}
                onPress={() => {
                    setSelectedTradeId(item.id);
                    setModalVisible(true);
                }}
            >
                <View style={styles.tradeLeft}>
                    <View style={[styles.iconBox, {
                        backgroundColor: isProfit ? `${theme.success}20` : `${theme.negative}20`
                    }]}>
                        {isProfit ?
                            <TrendingUp size={20} color={theme.success} /> :
                            <TrendingDown size={20} color={theme.negative} />
                        }
                    </View>
                    <View>
                        <Text style={[styles.symbol, { color: theme.text }]}>{item.symbol}</Text>
                        <Text style={[styles.type, { color: theme.textSecondary }]}>{item.assetType} • {item.type}</Text>
                    </View>
                </View>
                <View style={styles.tradeRight}>
                    <Text style={[styles.amount, { color: isProfit ? theme.success : theme.negative }]}>
                        {isProfit ? '+' : ''}{formatCurrency(Math.abs(item.pnl || 0))}
                    </Text>
                    <Text style={[styles.date, { color: theme.textTertiary }]}>{new Date(item.timestamp).toLocaleDateString()}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>Trade History</Text>
                </View>

                <View style={styles.filters}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {(['ALL', 'STOCK', 'CRYPTO', 'PROFIT', 'LOSS'] as FilterType[]).map((f) => (
                            <TouchableOpacity
                                key={f}
                                style={[
                                    styles.filterChip,
                                    { backgroundColor: filter === f ? theme.primary : theme.card, borderColor: theme.border },
                                    filter === f && { borderColor: theme.primary }
                                ]}
                                onPress={() => setFilter(f)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    { color: filter === f ? '#FFF' : theme.textSecondary }
                                ]}>
                                    {f}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <FlatList
                    data={filteredTrades}
                    renderItem={renderTradeItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Activity size={48} color={theme.textTertiary} />
                            <Text style={[styles.emptyText, { color: theme.textTertiary }]}>No trades found</Text>
                        </View>
                    }
                />

                <TradeHistoryModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    initialTradeId={selectedTradeId}
                />
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    },
    title: {
        fontSize: 28,
        fontFamily: FONTS.bold,
    },
    filters: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    filterChip: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        marginRight: SPACING.sm,
        borderWidth: 1,
    },
    filterText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    list: {
        padding: SPACING.lg,
    },
    tradeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.md,
        borderWidth: 1,
    },
    tradeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    symbol: {
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    type: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    tradeRight: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
    date: {
        fontSize: 12,
        fontFamily: FONTS.regular,
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        gap: SPACING.md,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: FONTS.medium,
    },
});
