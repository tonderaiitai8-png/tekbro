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
import { COLORS, SPACING, FONTS, RADIUS } from '../../constants/theme';
import { AppBackground } from '../../components/AppBackground';

export default function PortfolioScreen() {
    // OPTIMIZATION: Split selectors to prevent re-renders when unrelated data changes
    const stocks = useStore(state => state.stocks);
    const cash = useStore(state => state.cash);
    const holdings = useStore(state => state.holdings);
    const xp = useStore(state => state.xp);
    const level = useStore(state => state.level);
    const loginStreak = useStore(state => state.loginStreak);
    const achievements = useStore(state => state.achievements);
    const watchlist = useStore(state => state.watchlist);
    const username = useStore(state => state.username);
    const reset = useStore(state => state.reset);
    const checkLoginStreak = useStore(state => state.checkLoginStreak);
    const router = useRouter(); // Use router for navigation

    // Crypto Store
    const {
        cryptoWallet,
        cryptos,
        cryptoHoldings,
        getTotalCryptoValue
    } = useCryptoStore();

    useEffect(() => {
        checkLoginStreak();
    }, []);
    const FlashListAny = FlashList as any;

    const [activeModal, setActiveModal] = useState<'netWorth' | 'buyingPower' | null>(null);
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // Filter stocks: Owned OR Watched
    const allAssets = React.useMemo(() => {
        // 1. Get relevant stocks
        const relevantStocks = stocks.filter(stock => {
            const isOwned = holdings[stock.symbol]?.quantity > 0;
            const isWatched = watchlist.includes(stock.symbol);
            return isOwned || isWatched;
        });

        // 2. Get owned cryptos (we don't have a crypto watchlist yet, so just owned)
        const ownedCryptos = cryptos.filter(crypto => {
            return cryptoHoldings[crypto.symbol]?.quantity > 0;
        });

        // 3. Combine and sort by value (owned first, then by value)
        const combined = [...relevantStocks, ...ownedCryptos];

        return combined.sort((a, b) => {
            // Determine ownership and value for A
            const aIsStock = 'description' in a && !('logo' in a); // Simple check, or use 'logo' check
            // Actually, Crypto has 'logo', Stock doesn't (in our current types, Stock has 'sector' maybe? let's check types if needed, but 'logo' is a safe bet for Crypto)
            const aIsCrypto = 'logo' in a;

            let aOwned = false;
            let aValue = 0;

            if (aIsCrypto) {
                const holding = cryptoHoldings[a.symbol];
                if (holding && holding.quantity > 0) {
                    aOwned = true;
                    aValue = holding.quantity * a.price;
                }
            } else {
                const holding = holdings[a.symbol];
                if (holding && holding.quantity > 0) {
                    aOwned = true;
                    aValue = holding.quantity * a.price;
                }
            }

            // Determine ownership and value for B
            const bIsCrypto = 'logo' in b;
            let bOwned = false;
            let bValue = 0;

            if (bIsCrypto) {
                const holding = cryptoHoldings[b.symbol];
                if (holding && holding.quantity > 0) {
                    bOwned = true;
                    bValue = holding.quantity * b.price;
                }
            } else {
                const holding = holdings[b.symbol];
                if (holding && holding.quantity > 0) {
                    bOwned = true;
                    bValue = holding.quantity * b.price;
                }
            }

            // Sort Logic: Owned first, then by Value Descending
            if (aOwned && !bOwned) return -1;
            if (!aOwned && bOwned) return 1;

            if (aOwned && bOwned) {
                return bValue - aValue; // Higher value first
            }

            return 0; // Both not owned (watched), keep original order or sort by name?
        });
    }, [stocks, holdings, watchlist, cryptos, cryptoHoldings]);

    const renderItem = useCallback(({ item }: { item: any }) => {
        if ('logo' in item) {
            return <CryptoCard crypto={item} />;
        }
        return <StockCard stock={item} />;
    }, []);

    const handleReset = () => {
        Alert.alert(
            "Reset Game?",
            "This will wipe all progress and start over with £500k. Are you sure?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: async () => {
                        reset();
                        // Force onboarding flag clear
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

                                    <AchievementsSection achievements={achievements} />

                                    <View style={styles.sectionHeader}>
                                        <View>
                                            <Text style={styles.sectionTitle}>Your Assets</Text>
                                            <Text style={styles.sectionSubtitle}>
                                                {Object.keys(holdings).length + Object.keys(cryptoHoldings).length} Owned • {watchlist.length} Watched
                                            </Text>
                                        </View>
                                    </View>
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
                                <View style={styles.emptyState}>
                                    <Text style={styles.emptyText}>No assets owned or watched yet.</Text>
                                    <Text style={styles.emptySubtext}>Visit the Market or Crypto tab to start trading!</Text>
                                </View>
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
                />

                <MetricDetailModal
                    visible={activeModal === 'netWorth'}
                    onClose={() => setActiveModal(null)}
                    title="Net Worth"
                    value={`£${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    description="Your total financial value. This includes your available cash plus the current market value of all stocks you own."
                    type="netWorth"
                />
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.background, // REMOVED
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
    debugButton: {
        margin: SPACING.xl,
        padding: SPACING.md,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    debugText: {
        color: COLORS.warning,
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    testButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        borderRadius: RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.accent,
    },
    testButtonText: {
        color: COLORS.accent,
        fontSize: 10,
        fontFamily: FONTS.bold,
    }
});
