import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, TrendingUp, TrendingDown, Zap, ArrowUpRight, ArrowDownRight, Activity, Wallet, Skull, AlertTriangle, Flame, Rocket } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useCryptoStore } from '../../../store/useCryptoStore';
import { useMarketMoodStore } from '../../../store/useMarketMoodStore';
import { CryptoCard } from '../../../components/CryptoCard';
import { PortfolioDetailModal } from '../../../components/PortfolioDetailModal';
import { CryptoFearGreedModal } from '../../../components/CryptoFearGreedModal';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../constants/theme';
import { useCryptoEngine } from '../../../hooks/useCryptoEngine';
import { TransferModal } from '../../../components/TransferModal';
import { CryptoOnboardingModal } from '../../../components/CryptoOnboardingModal';
import { useStore } from '../../../store/useStore';
import { MarketCycleModal } from '../../../components/MarketCycleModal';
import { useTheme } from '../../../hooks/useTheme';
import { AppBackground } from '../../../components/AppBackground';
import { MarketDashboard } from '../../../components/MarketDashboard';
import EncyclopediaModal from '../../../components/EncyclopediaModal';
import { Book } from 'lucide-react-native';

export const CryptoScreen = () => {
    // Ensure engine is running
    useCryptoEngine();

    const router = useRouter();
    const cryptos = useCryptoStore(state => state.cryptos);
    const cryptoHoldings = useCryptoStore(state => state.cryptoHoldings);
    const cryptoWallet = useCryptoStore(state => state.cryptoWallet);
    const cryptoOnboardingCompleted = useStore(state => state.cryptoOnboardingCompleted);
    const setCryptoOnboardingCompleted = useStore(state => state.setCryptoOnboardingCompleted);
    const {
        cryptoFearGreedIndex,
        getCryptoMoodLabel,
        getCryptoMoodColor,
        marketCyclePhase,
        cryptoDominance,
        cryptoVolatility
    } = useMarketMoodStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [transferModalVisible, setTransferModalVisible] = useState(false);
    const [transferType, setTransferType] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT');
    const [onboardingVisible, setOnboardingVisible] = useState(false);
    const [portfolioModalVisible, setPortfolioModalVisible] = useState(false);
    const [fearGreedModalVisible, setFearGreedModalVisible] = useState(false);
    const [cycleModalVisible, setCycleModalVisible] = useState(false);
    const [encyclopediaVisible, setEncyclopediaVisible] = useState(false);

    // Trigger onboarding
    React.useEffect(() => {
        if (!cryptoOnboardingCompleted) {
            const timer = setTimeout(() => setOnboardingVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, [cryptoOnboardingCompleted]);

    // Calculate portfolio metrics
    const portfolioValue = useMemo(() => {
        return Object.values(cryptoHoldings).reduce((total, holding) => {
            const crypto = cryptos.find(c => c.symbol === holding.symbol);
            return total + (crypto ? holding.quantity * crypto.price : 0);
        }, 0) + cryptoWallet;
    }, [cryptoHoldings, cryptos, cryptoWallet]);

    const portfolioPnL = useMemo(() => {
        return Object.values(cryptoHoldings).reduce((total, holding) => {
            const crypto = cryptos.find(c => c.symbol === holding.symbol);
            if (!crypto) return total;
            const currentValue = holding.quantity * crypto.price;
            const costBasis = holding.quantity * holding.averageCost;
            return total + (currentValue - costBasis) * holding.leverage;
        }, 0);
    }, [cryptoHoldings, cryptos]);

    const portfolioPnLPercent = useMemo(() => {
        const invested = portfolioValue - portfolioPnL;
        return invested > 0 ? (portfolioPnL / invested) * 100 : 0;
    }, [portfolioValue, portfolioPnL]);

    const filteredCryptos = useMemo(() => {
        if (!searchQuery) return cryptos;
        const query = searchQuery.toLowerCase();
        return cryptos.filter(c =>
            c.symbol.toLowerCase().includes(query) ||
            c.name.toLowerCase().includes(query)
        );
    }, [cryptos, searchQuery]);

    const { theme } = useTheme();

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

    // Extracted Header Component
    const CryptoHeader = React.memo(({
        portfolioValue,
        portfolioPnL,
        portfolioPnLPercent,
        cryptoHoldings,
        cryptos,
        searchQuery,
        setSearchQuery,
        setPortfolioModalVisible,
        setTransferType,
        setTransferModalVisible,
        theme,
        router
    }: any) => {
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
                    <LinearGradient
                        colors={theme.cardGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.glassCard, { marginBottom: SPACING.lg, borderColor: 'rgba(255,255,255,0.1)' }]}
                    >
                        <View style={styles.portfolioContent}>
                            <View style={styles.portfolioHeader}>
                                <View style={styles.walletIconContainer}>
                                    <LinearGradient
                                        colors={[theme.primary, theme.accent]}
                                        style={styles.walletIconBg}
                                    >
                                        <Wallet size={20} color="#FFF" />
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

                            {/* Quick Actions */}
                            <View style={styles.quickActions}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => {
                                        setTransferType('DEPOSIT');
                                        setTransferModalVisible(true);
                                    }}
                                >
                                    <LinearGradient
                                        colors={[theme.positive, theme.success]}
                                        style={styles.actionGradient}
                                    >
                                        <TrendingUp size={16} color="#000" />
                                        <Text style={styles.actionText}>Deposit</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => {
                                        setTransferType('WITHDRAW');
                                        setTransferModalVisible(true);
                                    }}
                                >
                                    <LinearGradient
                                        colors={[theme.bgElevated, theme.bgSubtle]}
                                        style={[styles.actionGradient, { borderWidth: 1, borderColor: theme.border }]}
                                    >
                                        <TrendingDown size={16} color={theme.text} />
                                        <Text style={[styles.actionText, { color: theme.text }]}>Withdraw</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Holdings Carousel */}
                {
                    Object.keys(cryptoHoldings).length > 0 && (
                        <View style={styles.holdingsSection}>
                            <Text style={[styles.sectionTitle, { color: theme.textSub }]}>YOUR POSITIONS</Text>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.holdingsList}
                            >
                                {cryptos
                                    .filter((c: any) => cryptoHoldings[c.symbol]?.quantity > 0)
                                    .map((crypto: any) => {
                                        const holding = cryptoHoldings[crypto.symbol];
                                        const pnl = (crypto.price - holding.averageCost) * holding.quantity * holding.leverage;
                                        const pnlPercent = ((crypto.price - holding.averageCost) / holding.averageCost) * 100 * holding.leverage;

                                        return (
                                            <TouchableOpacity
                                                key={crypto.symbol}
                                                onPress={() => router.push(`/crypto/${crypto.symbol}`)}
                                            >
                                                {renderGlassCard(
                                                    <View style={styles.holdingCard}>
                                                        <View style={styles.holdingHeader}>
                                                            <Text style={[styles.holdingSymbol, { color: theme.text }]}>{crypto.symbol}</Text>
                                                            {holding.leverage > 1 && (
                                                                <View style={styles.leverageBadge}>
                                                                    <Text style={styles.leverageText}>{holding.leverage}x</Text>
                                                                </View>
                                                            )}
                                                        </View>
                                                        <Text style={[styles.holdingValue, { color: theme.text }]}>
                                                            £{(holding.quantity * crypto.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </Text>
                                                        <View style={styles.holdingPnl}>
                                                            {pnl >= 0 ? (
                                                                <TrendingUp size={12} color={theme.positive} />
                                                            ) : (
                                                                <TrendingDown size={12} color={theme.negative} />
                                                            )}
                                                            <Text style={[styles.holdingPnlText, { color: pnl >= 0 ? theme.positive : theme.negative }]}>
                                                                {pnlPercent.toFixed(1)}%
                                                            </Text>
                                                        </View>
                                                    </View>,
                                                    { marginRight: SPACING.md, width: 140 }
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>
                    )
                }

                {/* Search Bar */}
                {
                    renderGlassCard(
                        <View style={styles.searchContent}>
                            <Search size={18} color={theme.textSub} />
                            <TextInput
                                style={[styles.searchInput, { color: theme.text }]}
                                placeholder="Search crypto..."
                                placeholderTextColor={theme.textMuted}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>,
                        { marginBottom: SPACING.lg }
                    )
                }

                <Text style={styles.sectionTitle}>ALL MARKETS</Text>
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
                        <Text style={[styles.headerTitle, { color: theme.text }]}>Crypto</Text>
                        <Text style={[styles.headerSubtitle, { color: theme.textSub }]}>Digital Assets</Text>
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
                            <Wallet size={20} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                <MarketDashboard type="crypto" />

                <FlashListAny
                    data={filteredCryptos}
                    keyExtractor={(item: any) => item.symbol}
                    renderItem={({ item }: { item: any }) => <CryptoCard crypto={item} />}
                    ListHeaderComponent={
                        <CryptoHeader
                            portfolioValue={portfolioValue}
                            portfolioPnL={portfolioPnL}
                            portfolioPnLPercent={portfolioPnLPercent}
                            cryptoHoldings={cryptoHoldings}
                            cryptos={cryptos}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setPortfolioModalVisible={setPortfolioModalVisible}
                            setTransferType={setTransferType}
                            setTransferModalVisible={setTransferModalVisible}
                            theme={theme}
                            router={router}
                        />
                    }
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={140}
                />

                <TransferModal
                    visible={transferModalVisible}
                    onClose={() => setTransferModalVisible(false)}
                    type={transferType}
                />

                <CryptoOnboardingModal
                    visible={onboardingVisible}
                    onClose={() => {
                        setOnboardingVisible(false);
                        setCryptoOnboardingCompleted(true);
                    }}
                />

                <PortfolioDetailModal
                    visible={portfolioModalVisible}
                    onClose={() => setPortfolioModalVisible(false)}
                    type="crypto"
                />

                <MarketCycleModal
                    visible={cycleModalVisible}
                    onClose={() => setCycleModalVisible(false)}
                    phase={marketCyclePhase}
                    type="crypto"
                    cryptoDominance={cryptoDominance}
                    cryptoVolatility={cryptoVolatility}
                />

                <CryptoFearGreedModal
                    visible={fearGreedModalVisible}
                    onClose={() => setFearGreedModalVisible(false)}
                />

                <EncyclopediaModal
                    visible={encyclopediaVisible}
                    onClose={() => setEncyclopediaVisible(false)}
                    mode="CRYPTO"
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
        color: '#FFF',
        letterSpacing: -1,
    },
    headerSubtitle: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: 'rgba(255,255,255,0.4)',
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
    walletIconContainer: {
        width: 48,
        height: 48,
    },
    walletIconBg: {
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
    quickActions: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    actionButton: {
        flex: 1,
    },
    actionGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
    },
    actionText: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: '#000',
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    holdingSymbol: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    leverageBadge: {
        backgroundColor: 'rgba(255,215,0,0.2)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: RADIUS.sm,
        borderWidth: 1,
        borderColor: 'rgba(255,215,0,0.3)',
    },
    leverageText: {
        fontSize: 10,
        fontFamily: FONTS.bold,
        color: '#FFD700',
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
