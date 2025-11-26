import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Zap } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import { StockCard } from '../../components/StockCard';
import { COLORS, FONTS, SPACING, RADIUS } from '../../constants/theme';
import { GRADIENTS } from '../../constants/gradients';
import { useMarketEngine } from '../../hooks/useMarketEngine';

type SectorFilter = 'All' | 'Tech' | 'Finance' | 'Healthcare' | 'Energy' | 'Crypto';

export default function MarketScreen() {
    useMarketEngine();
    const router = useRouter();
    const stocks = useStore(state => state.stocks);
    const marketSentiment = useStore(state => state.marketSentiment);
    const [searchQuery, setSearchQuery] = useState('');
    const [sectorFilter, setSectorFilter] = useState<SectorFilter>('All');

    const sectors: SectorFilter[] = ['All', 'Tech', 'Finance', 'Healthcare', 'Energy', 'Crypto'];

    const filteredStocks = useMemo(() => {
        let result = stocks;

        // Filter by sector
        if (sectorFilter !== 'All') {
            result = result.filter(s => s.sector === sectorFilter);
        }

        // Filter by search
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

    const getSentimentColor = (value: number) => {
        if (value <= 25) return '#FF4444'; // Extreme Fear
        if (value <= 45) return '#FF8800'; // Fear
        if (value <= 55) return '#FFD700'; // Neutral
        if (value <= 75) return '#00CC00'; // Greed
        return '#00FF00'; // Extreme Greed
    };

    const getSentimentLabel = (value: number) => {
        if (value <= 25) return 'Extreme Fear';
        if (value <= 45) return 'Fear';
        if (value <= 55) return 'Neutral';
        if (value <= 75) return 'Greed';
        return 'Extreme Greed';
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.titleRow}>
                <Text style={styles.headerTitle}>Stock Market</Text>
                {/* Market Temperament Meter */}
                <View style={styles.sentimentContainer}>
                    <Text style={styles.sentimentLabel}>Market Mood</Text>
                    <View style={[styles.sentimentBadge, { borderColor: getSentimentColor(marketSentiment) }]}>
                        <Zap size={12} color={getSentimentColor(marketSentiment)} fill={getSentimentColor(marketSentiment)} />
                        <Text style={[styles.sentimentValue, { color: getSentimentColor(marketSentiment) }]}>
                            {Math.round(marketSentiment)} - {getSentimentLabel(marketSentiment)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Search Bar */}
            <LinearGradient
                colors={['rgba(6, 182, 212, 0.1)', 'rgba(6, 182, 212, 0.05)']}
                style={styles.searchContainer}
            >
                <Search size={20} color={COLORS.textSub} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search stocks..."
                    placeholderTextColor={COLORS.textMuted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </LinearGradient>

            {/* Sector Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersScroll}
                contentContainerStyle={styles.filtersContainer}
            >
                {sectors.map(sector => (
                    <TouchableOpacity
                        key={sector}
                        onPress={() => handleSectorFilter(sector)}
                        activeOpacity={0.7}
                    >
                        {sectorFilter === sector ? (
                            <LinearGradient
                                colors={GRADIENTS.portfolio}
                                style={styles.filterChip}
                            >
                                <Text style={styles.filterChipTextActive}>{sector}</Text>
                            </LinearGradient>
                        ) : (
                            <View style={styles.filterChipInactive}>
                                <Text style={styles.filterChipText}>{sector}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderStockCard = ({ item }: { item: any }) => (
        <StockCard stock={item} />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <FlashList
                ListHeaderComponent={renderHeader}
                data={filteredStocks}
                keyExtractor={(item: any) => item.symbol}
                renderItem={renderStockCard}
                contentContainerStyle={[styles.listContent, { paddingHorizontal: 16 }]}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={140}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    headerContainer: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    sentimentContainer: {
        alignItems: 'flex-end',
    },
    sentimentLabel: {
        fontSize: 10,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        marginBottom: 2,
    },
    sentimentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    sentimentValue: {
        fontSize: 10,
        fontFamily: FONTS.bold,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: 'rgba(6, 182, 212, 0.3)',
        marginBottom: SPACING.lg,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: 16,
        color: COLORS.text,
        fontFamily: FONTS.regular,
    },
    filtersScroll: {
        marginBottom: SPACING.md,
    },
    filtersContainer: {
        gap: SPACING.sm,
    },
    filterChip: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
    },
    filterChipInactive: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgSubtle,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    filterChipTextActive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        fontFamily: FONTS.semibold,
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSub,
        fontFamily: FONTS.semibold,
    },
    listContent: {
        paddingBottom: SPACING.xl,
    },
});
