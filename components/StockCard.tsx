import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, TrendingDown, Zap, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Stock } from '../types';
import { useStore } from '../store/useStore';
import { HapticPatterns } from '../utils/haptics';

interface StockCardProps {
    stock: Stock;
}

// Company icons mapping
const COMPANY_ICONS: Record<string, string> = {
    'AAPL': '🍎', 'NVDA': '🎮', 'TSLA': '🚗', 'MSFT': '💻', 'GOOGL': '🔍',
    'AMZN': '📦', 'META': '👥', 'NFLX': '🎬', 'PLTR': '🛡️', 'COIN': '🪙',
    'ABNB': '🏠', 'UBER': '🚕', 'SHOP': '🛍️', 'SQ': '💳', 'RBLX': '🎮',
    'SNAP': '👻', 'SPOT': '🎵', 'TWTR': '🐦', 'ZM': '📹', 'DOCU': '📝',
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

    const getGradientColors = (): [string, string] => {
        if (isPositive) {
            return ['#0D4D4D', '#1A5F5F'];
        } else {
            return ['#4D1A1A', '#5F2626'];
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
                {/* Company Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Text style={styles.iconText}>{COMPANY_ICONS[stock.symbol] || '📈'}</Text>
                    </View>
                </View>

                {/* Symbol, Name, Trend */}
                <View style={styles.middleSection}>
                    <Text style={styles.symbol}>{stock.symbol}</Text>
                    <Text style={styles.name} numberOfLines={1}>{stock.name}</Text>
                    <Text style={[styles.trendText, { color: isPositive ? COLORS.positive : COLORS.negative }]}>
                        {isPositive ? '↗' : '↘'} Trending {isPositive ? 'Up' : 'Down'}
                    </Text>
                </View>

                {/* Price and Actions */}
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

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleQuickBuy}>
                            <Zap size={18} color={COLORS.accent} fill={COLORS.accent} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={handleToggleWatchlist}>
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
    trendText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.medium,
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
