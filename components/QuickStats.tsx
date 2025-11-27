import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, Activity, PieChart, Trophy } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useStore } from '../store/useStore';
import { useCryptoStore } from '../store/useCryptoStore';
import { StatDetailModal } from './StatDetailModal';
import * as Haptics from 'expo-haptics';

interface StatCardProps {
    label: string;
    value: string;
    subValue?: string;
    icon: React.ReactNode;
    color: string;
    onPress: () => void;
}

function StatCard({ label, value, subValue, icon, color, onPress }: StatCardProps) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.card}>
                <LinearGradient
                    colors={[COLORS.card, COLORS.cardHighlight]}
                    style={StyleSheet.absoluteFillObject}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
                        {icon}
                    </View>
                    {subValue && (
                        <Text style={[styles.subValue, { color: subValue.includes('+') ? COLORS.success : COLORS.error }]}>
                            {subValue}
                        </Text>
                    )}
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export function QuickStats() {
    const trades = useStore(state => state.trades);
    const holdings = useStore(state => state.holdings);
    const stocks = useStore(state => state.stocks);
    const [selectedStat, setSelectedStat] = useState<any>(null);

    // Calculate Stats
    const stats = useMemo(() => {
        // 1. Win Rate
        const sellTrades = trades.filter(t => t.type === 'SELL');
        const profitableTrades = sellTrades.filter(t => (t as any).pnl > 0).length;
        const winRate = sellTrades.length > 0
            ? Math.round((profitableTrades / sellTrades.length) * 100)
            : 0;

        // 2. Best Performer (Current Holdings)
        let bestPerformer = { symbol: '-', percent: -Infinity };
        let worstPerformer = { symbol: '-', percent: Infinity };

        Object.values(holdings).forEach(holding => {
            const stock = stocks.find(s => s.symbol === holding.symbol);
            if (stock && holding.quantity > 0) {
                const percentChange = ((stock.price - holding.averageCost) / holding.averageCost) * 100;

                if (percentChange > bestPerformer.percent) {
                    bestPerformer = { symbol: holding.symbol, percent: percentChange };
                }
                if (percentChange < worstPerformer.percent) {
                    worstPerformer = { symbol: holding.symbol, percent: percentChange };
                }
            }
        });

        // 3. Diversity Score (Unique Sectors)
        const sectors = new Set<string>();
        Object.values(holdings).forEach(holding => {
            const stock = stocks.find(s => s.symbol === holding.symbol);
            if (stock && holding.quantity > 0) {
                sectors.add(stock.sector);
            }
        });
        const sectorCount = sectors.size;
        let diversityScore = 'Low';
        if (sectorCount >= 5) diversityScore = 'High';
        else if (sectorCount >= 3) diversityScore = 'Medium';

        return {
            winRate,
            totalTrades: trades.length,
            bestPerformer: bestPerformer.percent !== -Infinity ? bestPerformer : null,
            diversityScore,
            sectorCount
        };
    }, [trades, holdings, stocks]);

    const handlePress = (type: string) => {
        Haptics.selectionAsync();
        switch (type) {
            case 'winRate':
                setSelectedStat({
                    title: 'Win Rate',
                    value: `${stats.winRate}%`,
                    description: 'The percentage of your closed trades that resulted in a profit.',
                    advice: 'Aim for a win rate above 50%, but remember that risk management (cutting losses early) is even more important than being right every time.',
                    icon: <Trophy size={24} color={COLORS.accent} />,
                    color: COLORS.accent
                });
                break;
            case 'bestPerformer':
                setSelectedStat({
                    title: 'Best Performer',
                    value: stats.bestPerformer ? stats.bestPerformer.symbol : '-',
                    description: 'Your single best performing asset currently in your portfolio based on percentage gain.',
                    advice: 'Analyze why this stock is doing well. Is it the sector? The timing? Try to replicate this success in future trades.',
                    icon: <TrendingUp size={24} color={COLORS.success} />,
                    color: COLORS.success
                });
                break;
            case 'diversity':
                setSelectedStat({
                    title: 'Diversity Score',
                    value: stats.diversityScore,
                    description: `You are currently invested in ${stats.sectorCount} different sectors.`,
                    advice: 'Don\'t put all your eggs in one basket. A well-diversified portfolio (5+ sectors) helps protect you from sector-specific downturns.',
                    icon: <PieChart size={24} color="#3B82F6" />,
                    color: "#3B82F6"
                });
                break;
            case 'activity':
                setSelectedStat({
                    title: 'Trading Activity',
                    value: stats.totalTrades.toString(),
                    description: 'The total number of buy and sell orders you have executed.',
                    advice: 'Consistency is key to understanding the market. Don\'t overtrade, but stay active to keep learning and earning XP.',
                    icon: <Activity size={24} color="#A855F7" />,
                    color: "#A855F7"
                });
                break;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <StatCard
                    label="Win Rate"
                    value={`${stats.winRate}%`}
                    icon={<Trophy size={20} color={COLORS.accent} />}
                    color={COLORS.accent}
                    subValue={stats.totalTrades > 0 ? `${stats.totalTrades} Trades` : undefined}
                    onPress={() => handlePress('winRate')}
                />

                {stats.bestPerformer && (
                    <StatCard
                        label="Best Performer"
                        value={stats.bestPerformer.symbol}
                        subValue={`+${stats.bestPerformer.percent.toFixed(1)}%`}
                        icon={<TrendingUp size={20} color={COLORS.success} />}
                        color={COLORS.success}
                        onPress={() => handlePress('bestPerformer')}
                    />
                )}

                <StatCard
                    label="Diversity"
                    value={stats.diversityScore}
                    icon={<PieChart size={20} color="#3B82F6" />}
                    color="#3B82F6"
                    onPress={() => handlePress('diversity')}
                />

                <StatCard
                    label="Activity"
                    value={stats.totalTrades.toString()}
                    icon={<Activity size={20} color="#A855F7" />}
                    color="#A855F7"
                    subValue="Total Trades"
                    onPress={() => handlePress('activity')}
                />
            </ScrollView>

            {selectedStat && (
                <StatDetailModal
                    visible={!!selectedStat}
                    onClose={() => setSelectedStat(null)}
                    {...selectedStat}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: SPACING.sm,
        paddingHorizontal: SPACING.md,
    },
    scrollContent: {
        paddingHorizontal: SPACING.md,
        gap: SPACING.md,
    },
    card: {
        width: 140,
        height: 100,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: COLORS.card,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        marginTop: SPACING.xs,
    },
    value: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
    },
    label: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontFamily: FONTS.medium,
    },
    subValue: {
        fontSize: 10,
        fontWeight: '700',
        fontFamily: FONTS.bold,
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    }
});
