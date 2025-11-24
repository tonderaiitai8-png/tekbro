import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../../store/useStore';
import { COLORS, FONTS, SPACING, RADIUS } from '../../constants/theme';
import { Trophy, Medal, TrendingUp, Shield, Crown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LeaderboardEntry } from '../../types';

// Mock Data Generator
const generateMockLeaderboard = (userEquity: number, username: string): LeaderboardEntry[] => {
    const bots = [
        { id: '1', username: 'Warren B.', equity: 150000, level: 42, achievementsUnlocked: 15 },
        { id: '2', username: 'Elon M.', equity: 125000, level: 38, achievementsUnlocked: 12 },
        { id: '3', username: 'Nancy P.', equity: 98000, level: 35, achievementsUnlocked: 10 },
        { id: '4', username: 'RoaringKitty', equity: 85000, level: 30, achievementsUnlocked: 8 },
        { id: '5', username: 'Satoshi', equity: 72000, level: 28, achievementsUnlocked: 7 },
        { id: '6', username: 'WolfOfWallSt', equity: 65000, level: 25, achievementsUnlocked: 6 },
        { id: '7', username: 'DiamondHands', equity: 55000, level: 22, achievementsUnlocked: 5 },
        { id: '8', username: 'ApeStrong', equity: 45000, level: 20, achievementsUnlocked: 4 },
        { id: '9', username: 'PaperHands', equity: 12000, level: 5, achievementsUnlocked: 1 },
    ];

    const userEntry: LeaderboardEntry = {
        id: 'user',
        username: username || 'You',
        equity: userEquity,
        level: useStore.getState().level,
        achievementsUnlocked: useStore.getState().achievements.filter(a => a.unlocked).length,
        isUser: true,
    };

    const allEntries = [...bots, userEntry].sort((a, b) => b.equity - a.equity);

    return allEntries.map((entry, index) => ({
        ...entry,
        rank: index + 1,
    }));
};

export default function LeaderboardScreen() {
    const { cash, holdings, stocks, username } = useStore();
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const calculateTotalEquity = () => {
        const portfolioValue = Object.values(holdings).reduce((total, item) => {
            const stock = stocks.find(s => s.symbol === item.symbol);
            if (!stock || !stock.price) return total;
            return total + (item.quantity * stock.price);
        }, 0);
        return cash + portfolioValue;
    };

    const loadData = () => {
        const equity = calculateTotalEquity();
        const data = generateMockLeaderboard(equity, username);
        setLeaderboardData(data);
    };

    useEffect(() => {
        loadData();
    }, [cash, holdings, stocks]); // Update when portfolio changes

    const onRefresh = () => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
            loadData();
            setRefreshing(false);
        }, 1000);
    };

    const renderItem = ({ item }: { item: LeaderboardEntry }) => {
        const isTop3 = item.rank && item.rank <= 3;

        let RankIcon;
        let rankColor;

        if (item.rank === 1) {
            RankIcon = Crown;
            rankColor = '#FFD700'; // Gold
        } else if (item.rank === 2) {
            RankIcon = Medal;
            rankColor = '#C0C0C0'; // Silver
        } else if (item.rank === 3) {
            RankIcon = Medal;
            rankColor = '#CD7F32'; // Bronze
        } else {
            RankIcon = Shield;
            rankColor = COLORS.textMuted;
        }

        return (
            <View style={[
                styles.card,
                item.isUser && styles.userCard,
                isTop3 && styles.top3Card
            ]}>
                <View style={styles.rankContainer}>
                    {isTop3 ? (
                        <RankIcon size={24} color={rankColor} fill={item.rank === 1 ? rankColor : 'none'} />
                    ) : (
                        <Text style={styles.rankText}>#{item.rank}</Text>
                    )}
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.username, item.isUser && styles.userText]}>
                        {item.username} {item.isUser && '(You)'}
                    </Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.levelText}>Lvl {item.level}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.achievementsText}>{item.achievementsUnlocked} 🏆</Text>
                    </View>
                </View>

                <View style={styles.equityContainer}>
                    <Text style={[styles.equityText, item.isUser && styles.userText]}>
                        £{item.equity.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                    </Text>
                </View>
            </View>
        );
    };

    const userRank = leaderboardData.find(e => e.isUser);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Global Leaderboard</Text>
                <Trophy size={24} color={COLORS.warning} />
            </View>

            <FlatList
                data={leaderboardData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.accent} />
                }
            />

            {/* Sticky User Rank at Bottom if not visible? Optional, but good for UX */}
            {userRank && (
                <View style={styles.footer}>
                    <View style={styles.footerContent}>
                        <Text style={styles.footerLabel}>Your Rank:</Text>
                        <Text style={styles.footerRank}>#{userRank.rank}</Text>
                        <View style={{ flex: 1 }} />
                        <Text style={styles.footerEquity}>
                            £{userRank.equity.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                        </Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        fontWeight: '800',
    },
    listContent: {
        padding: SPACING.lg,
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    userCard: {
        borderColor: COLORS.accent,
        backgroundColor: COLORS.accentSubtle,
    },
    top3Card: {
        borderColor: COLORS.warning,
        borderWidth: 1,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankText: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.textSub,
        fontWeight: '700',
    },
    infoContainer: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    username: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        fontWeight: '600',
        marginBottom: 2,
    },
    userText: {
        color: COLORS.accent,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    levelText: {
        fontSize: 12,
        color: COLORS.textSub,
        fontFamily: FONTS.medium,
    },
    dot: {
        fontSize: 12,
        color: COLORS.textSub,
        marginHorizontal: 4,
    },
    achievementsText: {
        fontSize: 12,
        color: COLORS.textSub,
        fontFamily: FONTS.medium,
    },
    equityContainer: {
        alignItems: 'flex-end',
    },
    equityText: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        fontWeight: '700',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.bgElevated,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        padding: SPACING.lg,
        paddingBottom: SPACING.xxl, // For safe area
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    footerLabel: {
        fontSize: 14,
        color: COLORS.textSub,
        fontFamily: FONTS.medium,
    },
    footerRank: {
        fontSize: 20,
        color: COLORS.text,
        fontFamily: FONTS.bold,
        fontWeight: '800',
    },
    footerEquity: {
        fontSize: 18,
        color: COLORS.accent,
        fontFamily: FONTS.bold,
        fontWeight: '700',
    },
});
