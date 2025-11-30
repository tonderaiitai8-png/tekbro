import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Search, Cpu, Building2, Heart, ShoppingBag, Zap as Lightning,
    Home, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, Briefcase
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useStore } from '../../../store/useStore';
import { useMarketMoodStore } from '../../../store/useMarketMoodStore';
import { StockCard } from '../../../components/StockCard';
import { StockFearGreedModal } from '../../../components/StockFearGreedModal';
import { PortfolioDetailModal } from '../../../components/PortfolioDetailModal';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../constants/theme';
import { useMarketEngine } from '../../../hooks/useMarketEngine';
import { MarketCycleModal } from '../../../components/MarketCycleModal';
import { AppBackground } from '../../../components/AppBackground';
import { MarketDashboard } from '../../../components/MarketDashboard';
import EncyclopediaModal from '../../../components/EncyclopediaModal';
import { Book } from 'lucide-react-native';

type SectorFilter = 'All' | 'Tech' | 'Finance' | 'Healthcare' | 'Consumer' | 'Energy' | 'Real Estate';

// Premium sector icon mapping
const SECTOR_ICONS = {
    Tech: Cpu,
    Finance: Building2,
    Healthcare: Heart,
    Consumer: ShoppingBag,
    Energy: Lightning,
    'Real Estate': Home,
};

const SECTOR_COLORS = {
    Tech: ['#00D9FF', '#0099FF'],
    Finance: ['#FFD700', '#FFA500'],
    Healthcare: ['#FF6B9D', '#C44569'],
    Consumer: ['#00FF88', '#00CC66'],
    Energy: ['#FFD93D', '#FF8C00'],
    'Real Estate': ['#A855F7', '#7C3AED'],
} as const;

import { useTheme } from '../../../hooks/useTheme';

export const MarketScreen = () => {
    const { theme } = useTheme();
    useMarketEngine();
    const router = useRouter();
    const stocks = useStore(state => state.stocks);
    const holdings = useStore(state => state.holdings);
    const cash = useStore(state => state.cash);
    const fearGreedIndex = useMarketMoodStore(state => state.fearGreedIndex);
    const getMoodLabel = useMarketMoodStore(state => state.getMoodLabel);
    const getMoodColor = useMarketMoodStore(state => state.getMoodColor);
    const marketCyclePhase = useMarketMoodStore(state => state.marketCyclePhase);
    const interestRate = useMarketMoodStore(state => state.interestRate);
    const gdpGrowth = useMarketMoodStore(state => state.gdpGrowth);
    const inflation = useMarketMoodStore(state => state.inflation);

    const [searchQuery, setSearchQuery] = useState('');
    const [sectorFilter, setSectorFilter] = useState<SectorFilter>('All');
    const [portfolioModalVisible, setPortfolioModalVisible] = useState(false);
    const [fearGreedModalVisible, setFearGreedModalVisible] = useState(false);
    const [cycleModalVisible, setCycleModalVisible] = useState(false);
    const [encyclopediaVisible, setEncyclopediaVisible] = useState(false);

    const sectors: SectorFilter[] = ['All', 'Tech', 'Finance', 'Healthcare', 'Consumer', 'Energy', 'Real Estate'];
    // Calculate portfolio metrics
    const portfolioValue = useMemo(() => {
        const holdingsValue = Object.values(holdings).reduce((total, holding) => {
            const stock = stocks.find(s => s.symbol === holding.symbol);
            return total + (stock ? holding.quantity * stock.price : 0);
        }, 0);
        return holdingsValue + cash;
    }, [holdings, stocks, cash]);

    const portfolioPnL = useMemo(() => {
        return Object.values(holdings).reduce((total, holding) => {
            const stock = stocks.find(s => s.symbol === holding.symbol);
            if (!stock) return total;
            const currentValue = holding.quantity * stock.price;
            const costBasis = holding.quantity * holding.averageCost;
            return total + (currentValue - costBasis);
        }, 0);
    }, [holdings, stocks]);

    const portfolioPnLPercent = useMemo(() => {
        const invested = portfolioValue - portfolioPnL;
        return invested > 0 ? (portfolioPnL / invested) * 100 : 0;
    }, [portfolioValue, portfolioPnL]);

    // 🚀 PERFORMANCE: Memoize holdings to prevent carousel scroll interruption
    const holdingsData = useMemo(() => {
        return stocks
            .filter(s => holdings[s.symbol]?.quantity > 0)
            .map(stock => ({
                ...stock,
                holding: holdings[stock.symbol],
                pnl: (stock.price - holdings[stock.symbol].averageCost) * holdings[stock.symbol].quantity,
                pnlPercent: ((stock.price - holdings[stock.symbol].averageCost) / holdings[stock.symbol].averageCost) * 100,
            }));
    }, [stocks, holdings]); // Re-calculates when stocks update, but we can optimize further if needed

    const filteredStocks = useMemo(() => {
        let result = stocks;

        if (sectorFilter !== 'All') {
            result = result.filter(s => s.sector === sectorFilter);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(s =>
                s.symbol.toLowerCase().includes(query) ||
                s.name.toLowerCase().includes(query)
            );
        }

        return result;
    }, [stocks, searchQuery, sectorFilter]);

    const handleSectorFilter = (sector: SectorFilter) => {
        setSectorFilter(sector);
        Haptics.selectionAsync();
    };

    const getCyclePhaseColor = () => {
        switch (marketCyclePhase) {
            case 'accumulation': return '#00FF88';
            case 'markup': return '#00CCFF';
            case 'distribution': return '#FFD700';
            case 'markdown': return '#FF4444';
            default: return '#888';
        }
    };

    const getCyclePhaseLabel = () => {
        switch (marketCyclePhase) {
            case 'accumulation': return 'Accumulation';
            case 'markup': return 'Markup';
            case 'distribution': return 'Distribution';
            case 'markdown': return 'Markdown';
            default: return 'Unknown';
        }
    };

    // Extracted Header Component to prevent re-mounting
    const MarketHeader = React.memo(({
        portfolioValue,
        portfolioPnL,
        portfolioPnLPercent,
        holdingsData,
        sectorFilter,
        setSectorFilter,
        searchQuery,
        setSearchQuery,
        setPortfolioModalVisible,

        router
    }: any) => {
        const { theme } = useTheme();
        const sectors: SectorFilter[] = ['All', 'Tech', 'Finance', 'Healthcare', 'Consumer', 'Energy', 'Real Estate'];

        const renderGlassCard = (children: React.ReactNode, style?: any) => (
            <LinearGradient
                colors={[theme.bgElevated, theme.bgSubtle]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.glassCard, { borderColor: theme.border }, style]}
            >
                {children}
            </LinearGradient>
        );

        return (
            <View style={styles.headerContainer}>
                {/* Portfolio Glass Card */}
                <TouchableOpacity onPress={() => {
                    setPortfolioModalVisible(true);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}>
                    {renderGlassCard(
                        <View style={styles.portfolioContent}>
                            <View style={styles.portfolioHeader}>
                                <View style={styles.briefcaseIconContainer}>
                                    <LinearGradient
                                        colors={['#00D9FF', '#0099FF']}
                                        style={styles.briefcaseIconBg}
                                    >
                                        <Briefcase size={20} color="#FFF" />
                                    </LinearGradient>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.portfolioLabel, { color: theme.textSub }]}>TOTAL PORTFOLIO</Text>
                                    <Text style={[styles.portfolioValue, { color: theme.text }]}>
                                        £{portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.pnlContainer, { borderTopColor: theme.border }]}>
                                <View style={styles.pnlRow}>
                                    {portfolioPnL >= 0 ? (
                                        <ArrowUpRight size={16} color={theme.positive} />
                                    ) : (
                                        <ArrowDownRight size={16} color={theme.negative} />
                                    )}
                                    <Text style={[styles.pnlText, { color: portfolioPnL >= 0 ? theme.positive : theme.negative }]}>
                                        {portfolioPnL >= 0 ? '+' : ''}£{Math.abs(portfolioPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                    <Text style={[styles.pnlPercent, { color: portfolioPnL >= 0 ? theme.positive : theme.negative }]}>
                                        ({portfolioPnL >= 0 ? '+' : ''}{portfolioPnLPercent.toFixed(2)}%)
                                    </Text>
                                </View>
                            </View>
                        </View>,
                        { marginBottom: SPACING.lg }
                    )}
                </TouchableOpacity>

                {/* Holdings Carousel */}
                {
                    holdingsData.length > 0 && (
                        <View style={styles.holdingsSection}>
                            <Text style={[styles.sectionTitle, { color: theme.textSub }]}>YOUR POSITIONS</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.holdingsList}
                                removeClippedSubviews={true}
                                scrollEventThrottle={16}
                            >
                                {holdingsData.map((item: any) => {
                                    const SectorIcon = SECTOR_ICONS[item.sector as keyof typeof SECTOR_ICONS] || Cpu;
                                    const sectorColors = SECTOR_COLORS[item.sector as keyof typeof SECTOR_COLORS] || ['#888', '#666'];

                                    return (
                                        <TouchableOpacity
                                            key={item.symbol}
                                            onPress={() => router.push(`/stock/${item.symbol}`)}
                                        >
                                            {renderGlassCard(
                                                <View style={styles.holdingCard}>
                                                    <View style={styles.holdingHeader}>
                                                        <LinearGradient
                                                            colors={sectorColors}
                                                            style={styles.sectorIconBg}
                                                        >
                                                            <SectorIcon size={14} color="#FFF" />
                                                        </LinearGradient>
                                                        <Text style={[styles.holdingSymbol, { color: theme.text }]}>{item.symbol}</Text>
                                                    </View>
                                                    <Text style={[styles.holdingValue, { color: theme.text }]}>
                                                        £{(item.holding.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Text>
                                                    <View style={styles.holdingPnl}>
                                                        {item.pnl >= 0 ? (
                                                            <TrendingUp size={12} color={theme.positive} />
                                                        ) : (
                                                            <TrendingDown size={12} color={theme.negative} />
                                                        )}
                                                        <Text style={[styles.holdingPnlText, { color: item.pnl >= 0 ? theme.positive : theme.negative }]}>
                                                            {item.pnlPercent.toFixed(1)}%
                                                        </Text>
                                                    </View>
                                                </View>,
                                                { marginRight: SPACING.md, width: 140 }
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView >
                        </View >
                    )
                }

                {/* Sector Filter Pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.sectorFilters}
                >
                    {sectors.map(sector => {
                        const isActive = sector === sectorFilter;
                        const SectorIcon = sector === 'All' ? Activity : SECTOR_ICONS[sector as keyof typeof SECTOR_ICONS];
                        const sectorColors = sector === 'All' ? ['#666', '#444'] as const : SECTOR_COLORS[sector as keyof typeof SECTOR_COLORS];

                        return (
                            <TouchableOpacity
                                key={sector}
                                onPress={() => {
                                    setSectorFilter(sector);
                                    Haptics.selectionAsync();
                                }}
                            >
                                <LinearGradient
                                    colors={isActive ? sectorColors : [theme.bgElevated, theme.bgSubtle]}
                                    style={[
                                        styles.sectorPill,
                                        isActive && { borderColor: sectorColors[0] },
                                        !isActive && { borderColor: theme.border }
                                    ]}
                                >
                                    {SectorIcon && <SectorIcon size={14} color={isActive ? '#FFF' : theme.textSub} />}
                                    <Text style={[styles.sectorPillText, { color: isActive ? '#FFF' : theme.textSub }]}>
                                        {sector}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Search Bar */}
                {
                    renderGlassCard(
                        <View style={styles.searchContent}>
                            <Search size={18} color={theme.textSub} />
                            <TextInput
                                style={[styles.searchInput, { color: theme.text }]}
                                placeholder="Search stocks..."
                                placeholderTextColor={theme.textMuted}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>,
                        { marginBottom: SPACING.lg }
                    )
                }

                <Text style={[styles.sectionTitle, { color: theme.textSub }]}>
                    {sectorFilter === 'All' ? 'ALL STOCKS' : `${sectorFilter.toUpperCase()} SECTOR`}
                </Text>
            </View >
        );
    });

    const FlashListAny = FlashList as any;

    return (
        <AppBackground>
            <SafeAreaView style={styles.container} edges={['top']}>
                {/* Fixed Header */}
                <View style={[styles.topBar, { paddingHorizontal: SPACING.md }]}>
                    <View>
                        <Text style={[styles.headerTitle, { color: theme.text }]}>Market</Text>
                        <Text style={[styles.headerSubtitle, { color: theme.textSub }]}>Stock Exchange</Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: theme.bgSubtle }]}
                            onPress={() => setEncyclopediaVisible(true)}
                        >
                            <Book size={20} color={theme.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: theme.bgSubtle }]}
                            onPress={() => router.push('/(tabs)/settings')}
                        >
                            <Briefcase size={20} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                <MarketDashboard />

                <FlashListAny
                    data={filteredStocks}
                    keyExtractor={(item: any) => item.symbol}
                    renderItem={({ item }: { item: any }) => <StockCard stock={item} />}
                    ListHeaderComponent={
                        <MarketHeader
                            portfolioValue={portfolioValue}
                            portfolioPnL={portfolioPnL}
                            portfolioPnLPercent={portfolioPnLPercent}
                            holdingsData={holdingsData}
                            sectorFilter={sectorFilter}
                            setSectorFilter={setSectorFilter}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setPortfolioModalVisible={setPortfolioModalVisible}
                            router={router}
                        />
                    }
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={140}
                />

            </SafeAreaView >
        </AppBackground >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    headerContainer: {
        marginBottom: SPACING.md,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.xl,
        zIndex: 10,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 36,
        fontFamily: FONTS.bold,
        color: COLORS.text, // Will be overridden by inline style if needed, but better to use theme
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    indicators: {
        gap: SPACING.sm,
        alignItems: 'flex-end',
    },
    cycleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    cycleText: {
        fontSize: 9,
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    moodBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    moodLabel: {
        fontSize: 10,
        fontFamily: FONTS.bold,
        color: 'rgba(255,255,255,0.6)',
    },
    moodValue: {
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    glassCard: {
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        padding: SPACING.lg,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    portfolioContent: {
        gap: SPACING.md,
    },
    portfolioHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    briefcaseIconContainer: {
        width: 48,
        height: 48,
    },
    briefcaseIconBg: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    portfolioLabel: {
        fontSize: 10,
        fontFamily: FONTS.bold,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 1,
    },
    portfolioValue: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: '#FFF',
        letterSpacing: -1,
    },
    pnlContainer: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: SPACING.md,
    },
    pnlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    pnlText: {
        fontSize: 18,
        fontFamily: FONTS.bold,
    },
    pnlPercent: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        opacity: 0.8,
    },
    holdingsSection: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: FONTS.bold,
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: SPACING.md,
    },
    holdingsList: {
        paddingRight: SPACING.md,
    },
    holdingCard: {
        gap: 8,
    },
    holdingHeader: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    sectorIconBg: {
        width: 24,
        height: 24,
        borderRadius: RADIUS.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    holdingSymbol: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    holdingValue: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    holdingPnl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    holdingPnlText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    sectorFilters: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.lg,
        paddingRight: SPACING.md,
    },
    sectorPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    sectorPillText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    searchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: '#FFF',
        paddingVertical: 0,
    },
});
