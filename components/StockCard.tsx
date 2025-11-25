import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, TrendingDown, Zap, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Polyline } from 'react-native-svg';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Stock } from '../types';
import { useStore } from '../store/useStore';
import { HapticPatterns } from '../utils/haptics';

interface StockCardProps {
    stock: Stock;
}

// Company icons mapping (using emojis for now - can be replaced with actual icons)
const COMPANY_ICONS: Record<string, string> = {
    'AAPL': '🍎',
    'NVDA': '🎮',
    'TSLA': '🚗',
    'MSFT': '💻',
    'GOOGL': '🔍',
    'AMZN': '📦',
    'META': '👥',
    'NFLX': '🎬',
    'PLTR': '🛡️',
    'COIN': '🪙',
    'ABNB': '🏠',
    'UBER': '🚕',
    'SHOP': '🛍️',
    'SQ': '💳',
    'RBLX': '🎮',
    'SNAP': '👻',
    'SPOT': '🎵',
    'TWTR': '🐦',
    'ZM': '📹',
    'DOCU': '📝',
};

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
    const router = useRouter();
    const { watchlist, toggleWatchlist, buyStock, cash } = useStore();
    const isWatchlisted = watchlist.includes(stock.symbol);

    // Calculate price change
    const priceChange = stock.history.length >= 2
        ? stock.price - stock.history[stock.history.length - 2].value
        : 0;
    const changePercent = stock.history.length >= 2
        ? (priceChange / stock.history[stock.history.length - 2].value) * 100
        : 0;

    const isPositive = priceChange >= 0;

    // Generate mini chart points - FIX NaN issue
    const generateChartPoints = () => {
        if (!stock.history || stock.history.length < 2) {
            // Not enough data, return flat line
            return '0,50 100,50';
        }

        const recentHistory = stock.history.slice(-20);
        if (recentHistory.length < 2) {
            return '0,50 100,50';
        }

        const values = recentHistory.map(p => p.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const range = maxValue - minValue;

        // Prevent division by zero
        if (range === 0 || isNaN(range)) {
            return '0,50 100,50';
        }

        const points = recentHistory.map((point, index) => {
            const x = (index / (recentHistory.length - 1)) * 100;
            const normalizedY = ((point.value - minValue) / range);
            const y = 100 - (normalizedY * 100); // Invert Y axis

            // Validate numbers
            if (isNaN(x) || isNaN(y)) {
                return null;
            }

            return `${x.toFixed(2)},${y.toFixed(2)}`;
        }).filter(p => p !== null);

        return points.length > 0 ? points.join(' ') : '0,50 100,50';
    };

    const polylinePoints = generateChartPoints();

    const handleQuickBuy = (e: any) => {
        e.stopPropagation();
        if (cash >= stock.price) {
            buyStock(stock.symbol, 1, stock.price);
            HapticPatterns.tradeExecuted();
        } else {
            HapticPatterns.error();
        }
    };

    const handleToggleWatchlist = (e: any) => {
        e.stopPropagation();
        toggleWatchlist(stock.symbol);
        HapticPatterns.light();
    };

    // Get gradient colors based on stock performance
    const getGradientColors = (): [string, string] => {
        if (isPositive) {
            return ['#0D4D4D', '#1A5F5F']; // Teal gradient for positive
        } else {
            return ['#4D1A1A', '#5F2626']; // Red gradient for negative
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => router.push(`/stock/${stock.symbol}`)}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                {/* Left: Company Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Text style={styles.iconText}>{COMPANY_ICONS[stock.symbol] || '📈'}</Text>
                    </View>
                </View>

                {/* Middle: Symbol, Name, and Chart */}
                <View style={styles.middleSection}>
                    <Text style={styles.symbol}>{stock.symbol}</Text>
                    <Text style={styles.name} numberOfLines={1}>{stock.name}</Text>

                    {/* Mini Chart */}
                    <View style={styles.chartContainer}>
                        <Svg height="30" width="100" style={styles.chart}>
                            <Polyline
                                points={polylinePoints}
                                fill="none"
                                stroke={isPositive ? COLORS.positive : COLORS.negative}
                                strokeWidth="2"
                            />
                        </Svg>
                    </View>
                </View>

                {/* Right: Price and Actions */}
                <View style={styles.rightSection}>
                    <Text style={styles.price}>£{stock.price.toFixed(2)}</Text>
                    <View style={styles.changeContainer}>
                        {isPositive ? (
                            <TrendingUp size={12} color={COLORS.positive} strokeWidth={2.5} />
                        ) : (
                            <TrendingDown size={12} color={COLORS.negative} strokeWidth={2.5} />
                        )}
                        <Text style={[styles.changeText, { color: isPositive ? COLORS.positive : COLORS.negative }]}>
                            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                        </Text>
                    </View>

                    {/* Action Icons */}
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleQuickBuy}
                        >
                            <Zap size={18} color={COLORS.accent} fill={COLORS.accent} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleToggleWatchlist}
                        >
                            <Star
                                size={18}
                                color={isWatchlisted ? COLORS.warning : COLORS.textMuted}
                                fill={isWatchlisted ? COLORS.warning : 'none'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconContainer: {
        marginRight: SPACING.md,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.md,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 24,
    },
    middleSection: {
        flex: 1,
        marginRight: SPACING.md,
    },
    symbol: {
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginBottom: 2,
    },
    name: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
        marginBottom: SPACING.xs,
    },
    chartContainer: {
        height: 30,
        width: 100,
    },
    chart: {
        opacity: 0.7,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: FONTS.sizes.lg,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginBottom: 2,
    },
    changeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: SPACING.sm,
    },
    changeText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.bold,
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.xs,
    },
    actionButton: {
        padding: 4,
    },
});
