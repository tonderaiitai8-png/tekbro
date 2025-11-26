import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useCryptoStore } from '../../store/useCryptoStore';
import { CryptoWalletCard } from '../../components/CryptoWalletCard';
import { CryptoCard } from '../../components/CryptoCard';
import { COLORS, FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useCryptoEngine } from '../../hooks/useCryptoEngine';
import { TransferModal } from '../../components/TransferModal';
import { CryptoOnboardingModal } from '../../components/CryptoOnboardingModal';
import { useStore } from '../../store/useStore';

export default function CryptoScreen() {
    // Ensure engine is running (though it's global in _layout, good for safety)
    useCryptoEngine();

    const router = useRouter();
    const { cryptos, fearGreedIndex, cryptoHoldings } = useCryptoStore();
    const { cryptoOnboardingCompleted, setCryptoOnboardingCompleted } = useStore();
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [transferModalVisible, setTransferModalVisible] = useState(false);
    const [transferType, setTransferType] = useState<'DEPOSIT' | 'WITHDRAW'>('DEPOSIT');
    const [onboardingVisible, setOnboardingVisible] = useState(false);

    // Trigger onboarding check
    React.useEffect(() => {
        if (!cryptoOnboardingCompleted) {
            // Small delay to ensure screen is ready
            const timer = setTimeout(() => {
                setOnboardingVisible(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cryptoOnboardingCompleted]);

    const handleOnboardingComplete = () => {
        setOnboardingVisible(false);
        setCryptoOnboardingCompleted(true);
    };

    const openTransferModal = (type: 'DEPOSIT' | 'WITHDRAW') => {
        setTransferType(type);
        setTransferModalVisible(true);
    };

    const filteredCryptos = useMemo(() => {
        if (!searchQuery) return cryptos;
        const query = searchQuery.toLowerCase();
        return cryptos.filter(c =>
            c.symbol.toLowerCase().includes(query) ||
            c.name.toLowerCase().includes(query)
        );
    }, [cryptos, searchQuery]);

    const getFearGreedColor = (value: number) => {
        if (value <= 25) return '#FF4444'; // Extreme Fear
        if (value <= 45) return '#FF8800'; // Fear
        if (value <= 55) return '#FFD700'; // Neutral
        if (value <= 75) return '#00CC00'; // Greed
        return '#00FF00'; // Extreme Greed
    };

    const getFearGreedLabel = (value: number) => {
        if (value <= 25) return 'Extreme Fear';
        if (value <= 45) return 'Fear';
        if (value <= 55) return 'Neutral';
        if (value <= 75) return 'Greed';
        return 'Extreme Greed';
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.titleRow}>
                <Text style={styles.headerTitle}>Crypto Market</Text>
                <View style={styles.fearGreedContainer}>
                    <Text style={styles.fearGreedLabel}>Market Mood</Text>
                    <View style={[styles.fearGreedBadge, { borderColor: getFearGreedColor(fearGreedIndex) }]}>
                        <Zap size={12} color={getFearGreedColor(fearGreedIndex)} fill={getFearGreedColor(fearGreedIndex)} />
                        <Text style={[styles.fearGreedValue, { color: getFearGreedColor(fearGreedIndex) }]}>
                            {Math.round(fearGreedIndex)} - {getFearGreedLabel(fearGreedIndex)}
                        </Text>
                    </View>
                </View>
            </View>

            <CryptoWalletCard
                onDeposit={() => openTransferModal('DEPOSIT')}
                onWithdraw={() => openTransferModal('WITHDRAW')}
            />

            {/* Your Holdings Section */}
            {Object.keys(cryptoHoldings).length > 0 && (
                <View style={styles.holdingsSection}>
                    <Text style={styles.sectionTitle}>Your Assets</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.holdingsList}
                    >
                        {cryptos
                            .filter(c => cryptoHoldings[c.symbol]?.quantity > 0)
                            .map(crypto => (
                                <View key={crypto.symbol} style={styles.holdingCardWrapper}>
                                    <CryptoCard crypto={crypto} />
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            )}

            {/* Search Bar */}
            <LinearGradient
                colors={['rgba(142, 45, 226, 0.1)', 'rgba(74, 0, 224, 0.05)']}
                style={styles.searchContainer}
            >
                <Search size={20} color={COLORS.textSub} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search coins..."
                    placeholderTextColor={COLORS.textMuted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </LinearGradient>
        </View>
    );

    const FlashListAny = FlashList as any;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <FlashListAny
                data={filteredCryptos}
                keyExtractor={(item: any) => item.symbol}
                renderItem={({ item }: { item: any }) => <CryptoCard crypto={item} />}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={140}
            />
            estimatedItemSize={140}
            />

            <TransferModal
                visible={transferModalVisible}
                onClose={() => setTransferModalVisible(false)}
                type={transferType}
            />

            <CryptoOnboardingModal
                visible={onboardingVisible}
                onClose={handleOnboardingComplete}
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
        marginBottom: SPACING.md,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.sm,
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    fearGreedContainer: {
        alignItems: 'flex-end',
    },
    fearGreedLabel: {
        fontSize: 10,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        marginBottom: 2,
    },
    fearGreedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: RADIUS.full,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    fearGreedValue: {
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
        borderColor: 'rgba(142, 45, 226, 0.3)',
        marginBottom: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.sm,
        fontSize: 16,
        color: COLORS.text,
        fontFamily: FONTS.regular,
    },
    listContent: {
        padding: SPACING.xl,
        paddingTop: SPACING.lg,
        gap: SPACING.md,
    },
    holdingsSection: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.sm,
    },
    holdingsList: {
        paddingHorizontal: SPACING.sm,
        gap: SPACING.md,
    },
    holdingCardWrapper: {
        width: 300, // Fixed width for horizontal scroll items
    },
});
