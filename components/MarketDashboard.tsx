import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useMarketMoodStore } from '../store/useMarketMoodStore';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { TrendingUp, TrendingDown, Activity, Zap, DollarSign, AlertTriangle, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { CryptoFearGreedModal } from './CryptoFearGreedModal';
import { MarketCycleModal } from './MarketCycleModal';
import { StockFearGreedModal } from './StockFearGreedModal';
import { MissionsModal } from './MissionsModal';
import { useStore } from '../store/useStore';

const { width } = Dimensions.get('window');

interface MarketDashboardProps {
    type?: 'stock' | 'crypto';
}

export const MarketDashboard = ({ type = 'stock' }: MarketDashboardProps) => {
    const isCrypto = type === 'crypto';

    // Local State for Modals
    const [fearGreedModalVisible, setFearGreedModalVisible] = useState(false);
    const [cycleModalVisible, setCycleModalVisible] = useState(false);
    const [missionsModalVisible, setMissionsModalVisible] = useState(false);

    const {
        fearGreedIndex,
        cryptoFearGreedIndex,
        marketCyclePhase,
        cryptoCyclePhase,
        activeEvents,
        earningsSeason,
        fedMeeting,
        whaleAlert,
        altSeason,
        cryptoDominance,
        cryptoVolatility
    } = useMarketMoodStore();

    const { missions } = useStore();
    const activeMissionsCount = missions.filter(m => m.status === 'ACTIVE').length;

    const getMoodColor = () => {
        const index = isCrypto ? cryptoFearGreedIndex : fearGreedIndex;
        if (index >= 75) return COLORS.success;
        if (index >= 55) return '#90EE90'; // Light Green
        if (index >= 45) return COLORS.textSecondary; // Neutral
        if (index >= 25) return '#FFA500'; // Orange
        return COLORS.error;
    };

    const moodColor = getMoodColor();
    const currentFGI = isCrypto ? cryptoFearGreedIndex : fearGreedIndex;
    const currentPhase = isCrypto ? cryptoCyclePhase : marketCyclePhase;

    const getMoodLabel = (index: number) => {
        if (index >= 75) return 'Extreme Greed';
        if (index >= 55) return 'Greed';
        if (index >= 45) return 'Neutral';
        if (index >= 25) return 'Fear';
        return 'Extreme Fear';
    };

    const moodLabel = getMoodLabel(currentFGI);

    const getPhaseLabel = (phase: string) => {
        switch (phase) {
            case 'accumulation': return 'Accumulation';
            case 'markup': return 'Bull Run (Markup)';
            case 'distribution': return 'Distribution';
            case 'markdown': return 'Bear Market (Markdown)';
            default: return phase;
        }
    };

    const getPhaseIcon = (phase: string) => {
        switch (phase) {
            case 'accumulation': return <Activity size={20} color={COLORS.textSecondary} />;
            case 'markup': return <TrendingUp size={20} color={COLORS.success} />;
            case 'distribution': return <Activity size={20} color={COLORS.warning} />;
            case 'markdown': return <TrendingDown size={20} color={COLORS.error} />;
            default: return <Activity size={20} color={COLORS.textSecondary} />;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>{isCrypto ? 'Crypto Market' : 'Stock Market'} Dashboard</Text>
                <TouchableOpacity
                    style={styles.missionButton}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setMissionsModalVisible(true);
                    }}
                >
                    <Target size={20} color={COLORS.primary} />
                    {activeMissionsCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{activeMissionsCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Main Grid */}
            <View style={styles.grid}>

                {/* Fear & Greed Card */}
                <TouchableOpacity
                    style={[styles.card, { borderLeftColor: moodColor, borderLeftWidth: 4 }]}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setFearGreedModalVisible(true);
                    }}
                >
                    <View style={styles.cardHeader}>
                        <Zap size={16} color={moodColor} />
                        <Text style={[styles.cardTitle, { color: moodColor }]}>Sentiment</Text>
                    </View>
                    <Text style={styles.cardValue}>{currentFGI.toFixed(0)}</Text>
                    <Text style={styles.cardSub}>{moodLabel}</Text>
                </TouchableOpacity>

                {/* Market Cycle Card */}
                <TouchableOpacity
                    style={[styles.card, { borderLeftColor: COLORS.primary, borderLeftWidth: 4 }]}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setCycleModalVisible(true);
                    }}
                >
                    <View style={styles.cardHeader}>
                        {getPhaseIcon(currentPhase)}
                        <Text style={[styles.cardTitle, { color: COLORS.primary }]}>Cycle</Text>
                    </View>
                    <Text style={[styles.cardValue, { fontSize: 16 }]} numberOfLines={1} adjustsFontSizeToFit>
                        {getPhaseLabel(currentPhase)}
                    </Text>
                    <Text style={styles.cardSub}>Phase</Text>
                </TouchableOpacity>
            </View>

            {/* Active Events Ticker Tape */}
            {(activeEvents.length > 0 || (earningsSeason && !isCrypto) || fedMeeting !== 'none' || whaleAlert || altSeason) && (
                <LinearGradient
                    colors={activeEvents.some(e => e.severity === 'EXTREME') ?
                        ['rgba(255, 68, 68, 0.1)', 'rgba(255, 68, 68, 0.05)'] :
                        ['rgba(0, 217, 255, 0.1)', 'rgba(0, 217, 255, 0.05)']}
                    style={styles.eventBanner}
                >
                    <View style={styles.tickerContainer}>
                        <View style={styles.pulsingDot} />
                        <Text style={styles.eventTitle}>MARKET WIRE</Text>
                    </View>

                    <View style={styles.eventRow}>
                        {activeEvents.map(event => (
                            <View key={event.id} style={[styles.eventBadge, {
                                borderColor: event.type === 'CRASH' || event.type === 'BEAR_RAID' ? COLORS.error : COLORS.success,
                                backgroundColor: event.type === 'CRASH' || event.type === 'BEAR_RAID' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 255, 136, 0.1)'
                            }]}>
                                <AlertTriangle size={14} color={event.type === 'CRASH' || event.type === 'BEAR_RAID' ? COLORS.error : COLORS.success} />
                                <Text style={styles.eventText}>{event.name}: {event.description}</Text>
                            </View>
                        ))}

                        {earningsSeason && !isCrypto && (
                            <View style={styles.eventBadge}>
                                <DollarSign size={14} color="#FFD700" />
                                <Text style={styles.eventText}>Earnings Season Active</Text>
                            </View>
                        )}
                        {fedMeeting !== 'none' && (
                            <View style={[styles.eventBadge, { borderColor: fedMeeting === 'hawkish' ? COLORS.error : COLORS.success }]}>
                                <AlertTriangle size={14} color={fedMeeting === 'hawkish' ? COLORS.error : COLORS.success} />
                                <Text style={styles.eventText}>
                                    Fed Update: {fedMeeting === 'scheduled' ? 'Meeting Soon' : fedMeeting === 'hawkish' ? 'Rate Hike' : 'Rate Cut'}
                                </Text>
                            </View>
                        )}
                    </View>
                </LinearGradient>
            )}

            {/* Modals */}
            {isCrypto ? (
                <CryptoFearGreedModal
                    visible={fearGreedModalVisible}
                    onClose={() => setFearGreedModalVisible(false)}
                />
            ) : (
                <StockFearGreedModal
                    visible={fearGreedModalVisible}
                    onClose={() => setFearGreedModalVisible(false)}
                />
            )}

            <MarketCycleModal
                visible={cycleModalVisible}
                onClose={() => setCycleModalVisible(false)}
                phase={currentPhase}
                type={type === 'stock' ? 'stocks' : 'crypto'}
                cryptoDominance={isCrypto ? cryptoDominance : undefined}
                cryptoVolatility={isCrypto ? cryptoVolatility : undefined}
            />

            <MissionsModal
                visible={missionsModalVisible}
                onClose={() => setMissionsModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: SPACING.lg,
        marginBottom: SPACING.sm,
    },
    title: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        paddingHorizontal: SPACING.lg,
    },
    missionButton: {
        padding: 8,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.full,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: COLORS.error,
        borderRadius: RADIUS.full,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.bg,
    },
    badgeText: {
        fontSize: 10,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    grid: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    cardTitle: {
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
    cardValue: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        marginVertical: SPACING.xs,
    },
    cardSub: {
        fontSize: 12,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
    },
    eventBanner: {
        marginTop: SPACING.md,
        marginHorizontal: SPACING.lg,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    eventTitle: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
        textTransform: 'uppercase',
    },
    eventRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    eventBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
        gap: 8,
    },
    pulsingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.error,
    },
    eventText: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: COLORS.text,
    },
});
