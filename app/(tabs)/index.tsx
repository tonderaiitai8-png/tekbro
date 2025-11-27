import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, Alert, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCryptoStore } from '../../store/useCryptoStore';
import { useStore } from '../../store/useStore';
import { CryptoCard } from '../../components/CryptoCard';
import { StockCard } from '../../components/StockCard';
import { StatsHeader } from '../../components/StatsHeader';
import { Header } from '../../components/Header';
import { MetricCard } from '../../components/MetricCard';
import { MetricDetailModal } from '../../components/MetricDetailModal';
import { AchievementsSection } from '../../components/AchievementsSection';
import { AssetTabs } from '../../components/AssetTabs';
import { EmptyPortfolioState } from '../../components/EmptyPortfolioState';
import { QuickStats } from '../../components/QuickStats';
import { COLORS, SPACING, FONTS, RADIUS } from '../../constants/theme';
import { AppBackground } from '../../components/AppBackground';

export default function PortfolioScreen() {
    // OPTIMIZATION: Split selectors to prevent re-renders when unrelated data changes
    const stocks = useStore(state => state.stocks);
    const cash = useStore(state => state.cash);
    const holdings = useStore(state => state.holdings);
    const trades = useStore(state => state.trades);
    const xp = useStore(state => state.xp);
    const level = useStore(state => state.level);
    const loginStreak = useStore(state => state.loginStreak);
    const achievements = useStore(state => state.achievements);
    const watchlist = useStore(state => state.watchlist);
    const username = useStore(state => state.username);
    const reset = useStore(state => state.reset);
    const checkLoginStreak = useStore(state => state.checkLoginStreak);
    const syncAchievements = useStore(state => state.syncAchievements);
    const equityHistory = useStore(state => state.equityHistory);
    const router = useRouter();

    // Crypto Store
    const {
        cryptoWallet,
        cryptos,
        cryptoHoldings,
        cryptoTrades,
        getTotalCryptoValue
    } = useCryptoStore();

    useEffect(() => {
        checkLoginStreak();
        syncAchievements();
    }, []);
    const FlashListAny = FlashList as any;

    const [activeModal, setActiveModal] = useState<'netWorth' | 'buyingPower' | null>(null);
    const [activeTab, setActiveTab] = useState('All');
    const [refreshing, setRefreshing] = useState(false);

    // Calculate total equity (Stocks + Crypto + Cash + Crypto Wallet)
    const stockValue = React.useMemo(() => {
        return stocks.reduce((sum, stock) => {
            const quantity = holdings[stock.symbol]?.quantity || 0;
            return sum + (stock.price * quantity);
        }, 0);
    }, [stocks, holdings]);

    const cryptoValue = getTotalCryptoValue();
    const totalEquity = cash + stockValue + cryptoWallet + cryptoValue;

    // Calculate performance stats for net worth modal
    const INITIAL_CAPITAL = 1000000;
    const allTimePnL = totalEquity - INITIAL_CAPITAL;
    const allTimePnLPercent = (allTimePnL / INITIAL_CAPITAL) * 100;

    // Calculate Daily Change
    const { dailyChange, dailyChangePercent } = React.useMemo(() => {
        if (!equityHistory || equityHistory.length === 0) {
            return { dailyChange: 0, dailyChangePercent: 0 };
        }

        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;

        // Find the history point closest to 24h ago
        // Since history is sorted by time, we can find the first entry >= oneDayAgo
        // Or just take the oldest if all are recent
        let previousEquity = INITIAL_CAPITAL; // Default to initial if no history

        // Find the first entry that is at least 24h old, or the oldest one available
        const pastEntry = equityHistory.find(entry => entry.timestamp >= oneDayAgo);

        if (pastEntry) {
            // If we found an entry within the last 24h, we actually want the one BEFORE it
            // But simpler logic: just take the oldest entry in the last 24h window?
            // Actually, we want the value from ~24h ago.
            // If we have history: [oldest, ..., newest]
            // We want the entry closest to 24h ago.

            // Let's just take the first entry in the array if it's older than 24h?
            // No, equityHistory is sliced to last 50 entries.
            // Let's assume the oldest entry in the history buffer is the best reference for "start of period"
            previousEquity = equityHistory[0].value;
        } else if (equityHistory.length > 0) {
            previousEquity = equityHistory[0].value;
        }

        const change = totalEquity - previousEquity;
        const percent = previousEquity > 0 ? (change / previousEquity) * 100 : 0;

        return { dailyChange: change, dailyChangePercent: percent };
    }, [equityHistory, totalEquity]);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // Filter stocks: Owned OR Watched
    const allAssets = React.useMemo(() => {
        let assets: any[] = [];

        // Helper to check ownership
        const isOwnedStock = (symbol: string) => holdings[symbol]?.quantity > 0;
        const isOwnedCrypto = (symbol: string) => cryptoHoldings[symbol]?.quantity > 0;
        const isWatched = (symbol: string) => watchlist.includes(symbol);

        if (activeTab === 'All') {
            // Show all OWNED assets (Stocks + Crypto)
            const ownedStocks = stocks.filter(s => isOwnedStock(s.symbol));
            const ownedCryptos = cryptos.filter(c => isOwnedCrypto(c.symbol));
            assets = [...ownedStocks, ...ownedCryptos];
        } else if (activeTab === 'Stocks') {
            // Show OWNED stocks only
            assets = stocks.filter(s => isOwnedStock(s.symbol));
        } else if (activeTab === 'Crypto') {
            // Show OWNED crypto only
            assets = cryptos.filter(c => isOwnedCrypto(c.symbol));
        } else if (activeTab === 'Watchlist') {
            // Show WATCHED stocks (regardless of ownership)
            assets = stocks.filter(s => isWatched(s.symbol));
        }

        // Sort Logic
        return assets.sort((a, b) => {
            // Always sort by value descending for owned assets
            // For watchlist, maybe sort by symbol or price change?
            // For now, consistent value sort (even if 0 value for watchlist items not owned)

            const getValue = (item: any) => {
                if ('logo' in item) { // Crypto
                    const holding = cryptoHoldings[item.symbol];
                    return holding ? holding.quantity * item.price : 0;
                } else { // Stock
                    const holding = holdings[item.symbol];
                    return holding ? holding.quantity * item.price : 0;
                }
            };

            const valA = getValue(a);
            const valB = getValue(b);

            // If both have value, sort by value desc
            if (valA > 0 || valB > 0) {
                return valB - valA;
            }

            // Fallback to name/symbol
            return a.symbol.localeCompare(b.symbol);
        });
    }, [stocks, holdings, watchlist, cryptos, cryptoHoldings, activeTab]);

    const renderItem = useCallback(({ item }: { item: any }) => {
        if ('logo' in item) {
            return <CryptoCard crypto={item} />;
        }
        return <StockCard stock={item} />;
    }, []);

    const handleReset = () => {
        Alert.alert(
            "Reset Game?",
            "This will wipe all progress and start over with £1M. Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: async () => {
                        reset();
                        await AsyncStorage.removeItem('onboarding_completed');
                        router.replace('/onboarding');
                    }
                }
            ]
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]} edges={['top']}>
                <StatusBar style="light" />

                <Header
                    title={`Hello, ${username}.`}
                    rightComponent={
                        <TouchableOpacity onPress={handleReset}>
                            <Text style={{ color: COLORS.textSub, fontSize: 12 }}>RESET</Text>
                        </TouchableOpacity>
                    }
                />

                <View style={styles.content}>
                    {(FlashList as any) && (
                        <FlashListAny
                            ListHeaderComponent={
                                <View style={styles.headerContent}>
                                    <StatsHeader
                                        xp={xp}
                                        level={level}
                                        loginStreak={loginStreak}
                                    />

                                    <View style={styles.statsRow}>
                                        <MetricCard
                                            label="Buying Power"
                                            value={`£${cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            onPress={() => {
                                                Haptics.selectionAsync();
                                                setActiveModal('buyingPower');
                                            }}
                                        />
                                        <View style={{ width: SPACING.md }} />
                                        <MetricCard
                                            label="Net Worth"
                                            value={`£${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            variant={totalEquity >= 10000 ? 'positive' : 'default'}
                                            onPress={() => {
                                                Haptics.selectionAsync();
                                                setActiveModal('netWorth');
                                            }}
                                        />
                                    </View>

                                    <QuickStats />

                                    <AchievementsSection achievements={achievements} />

                                    <View style={styles.sectionHeader}>
                                        <View>
                                            <Text style={styles.sectionTitle}>Your Assets</Text>
                                            <Text style={styles.sectionSubtitle}>
                                                {activeTab === 'Watchlist'
                                                    ? `${allAssets.length} Watched`
                                                    : `${allAssets.length} Owned`
                                                }
                                            </Text>
                                        </View>
                                    </View>

                                    <AssetTabs
                                        tabs={['All', 'Stocks', 'Crypto', 'Watchlist']}
                                        activeTab={activeTab}
                                        onTabChange={setActiveTab}
                                    />
                                </View>
                            }
                            data={allAssets}
                            keyExtractor={(item: any) => item.symbol}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContent}
                            estimatedItemSize={100}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    tintColor={COLORS.accent}
                                    colors={[COLORS.accent]}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <EmptyPortfolioState activeTab={activeTab} />
                            }
                        />
                    )}
                </View>

                {/* Metric Detail Modals */}
                <MetricDetailModal
                    visible={activeModal === 'buyingPower'}
                    onClose={() => setActiveModal(null)}
                    title="Buying Power"
                    value={`£${cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    description="This is your available cash balance. You can use this to buy new stocks. Selling stocks will increase this balance."
                    type="buyingPower"
                    transactions={[...trades, ...cryptoTrades].sort((a, b) => b.timestamp - a.timestamp)}
                />

                <MetricDetailModal
                    visible={activeModal === 'netWorth'}
                    onClose={() => setActiveModal(null)}
                    title="Net Worth"
                    value={`£${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    description="Your total financial value. This includes your available cash plus the current market value of all stocks you own."
                    type="netWorth"
                    breakdown={{
                        cash: cash + cryptoWallet,
                        stocks: stockValue,
                        crypto: cryptoValue
                    }}
                    performance={{
                        dailyChange,
                        dailyChangePercent,
                        allTimePnL,
                        allTimePnLPercent
                    }}
                />
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    headerContent: {
        marginBottom: SPACING.md,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: SPACING.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.xs,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontFamily: FONTS.medium,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
        paddingTop: 8,
    },
    emptyState: {
        padding: SPACING.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.xl,
    },
    emptyText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: FONTS.medium,
        marginBottom: 8,
    },
    emptySubtext: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontFamily: FONTS.regular,
    },
});
