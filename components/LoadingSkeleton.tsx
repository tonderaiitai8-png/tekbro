import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface SkeletonProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = 20,
    borderRadius = RADIUS.sm,
    style
}) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        );

        animation.start();

        return () => animation.stop();
    }, [shimmerAnim]);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 300],
    });

    return (
        <View
            style={[
                styles.skeleton,
                {
                    width,
                    height,
                    borderRadius,
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={[
                        COLORS.border,
                        'rgba(255,255,255,0.1)',
                        COLORS.border,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

export const StockCardSkeleton: React.FC = () => {
    return (
        <View style={styles.stockCard}>
            <View style={styles.stockCardLeft}>
                <Skeleton width={48} height={48} borderRadius={RADIUS.md} />
                <View style={styles.stockCardInfo}>
                    <Skeleton width={60} height={16} />
                    <Skeleton width={100} height={12} style={{ marginTop: 6 }} />
                </View>
            </View>
            <View style={styles.stockCardRight}>
                <Skeleton width={70} height={18} />
                <Skeleton width={50} height={14} style={{ marginTop: 6 }} />
            </View>
        </View>
    );
};

export const PortfolioItemSkeleton: React.FC = () => {
    return (
        <View style={styles.portfolioItem}>
            <View style={styles.portfolioLeft}>
                <Skeleton width={40} height={40} borderRadius={RADIUS.md} />
                <View style={styles.portfolioInfo}>
                    <Skeleton width={50} height={16} />
                    <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
                </View>
            </View>
            <View style={styles.portfolioRight}>
                <Skeleton width={90} height={18} />
                <Skeleton width={60} height={14} style={{ marginTop: 4 }} />
            </View>
        </View>
    );
};

export const TradeRowSkeleton: React.FC = () => {
    return (
        <View style={styles.tradeRow}>
            <View style={styles.tradeLeft}>
                <Skeleton width={32} height={32} borderRadius={RADIUS.sm} />
                <View style={styles.tradeInfo}>
                    <Skeleton width={70} height={14} />
                    <Skeleton width={100} height={12} style={{ marginTop: 4 }} />
                </View>
            </View>
            <View style={styles.tradeRight}>
                <Skeleton width={80} height={16} />
                <Skeleton width={50} height={12} style={{ marginTop: 4 }} />
            </View>
        </View>
    );
};

export const NewsCardSkeleton: React.FC = () => {
    return (
        <View style={styles.newsCard}>
            <Skeleton width={140} height={80} borderRadius={RADIUS.md} />
            <View style={styles.newsContent}>
                <Skeleton width="100%" height={16} />
                <Skeleton width="90%" height={14} style={{ marginTop: 6 }} />
                <Skeleton width={80} height={12} style={{ marginTop: 8 }} />
            </View>
        </View>
    );
};

export const StatsHeaderSkeleton: React.FC = () => {
    return (
        <View style={styles.statsHeader}>
            <Skeleton width={56} height={56} borderRadius={12} />
            <View style={styles.statsHeaderContent}>
                <View style={styles.statsHeaderRow}>
                    <Skeleton width={80} height={10} />
                    <Skeleton width={100} height={12} />
                </View>
                <Skeleton width="100%" height={6} borderRadius={3} style={{ marginTop: 8 }} />
            </View>
            <Skeleton width={60} height={40} borderRadius={8} />
        </View>
    );
};

export const AchievementCardSkeleton: React.FC = () => {
    return (
        <View style={styles.achievementCard}>
            <Skeleton width={40} height={40} borderRadius={RADIUS.md} />
            <Skeleton width="100%" height={14} style={{ marginTop: 8 }} />
            <Skeleton width="80%" height={10} style={{ marginTop: 4 }} />
            <Skeleton width="100%" height={6} borderRadius={3} style={{ marginTop: 8 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: COLORS.border,
        overflow: 'hidden',
    },
    stockCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    stockCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    stockCardInfo: {
        marginLeft: SPACING.md,
    },
    stockCardRight: {
        alignItems: 'flex-end',
    },
    portfolioItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    portfolioLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    portfolioInfo: {
        marginLeft: SPACING.md,
    },
    portfolioRight: {
        alignItems: 'flex-end',
    },
    tradeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.sm,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.xs,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tradeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    tradeInfo: {
        marginLeft: SPACING.sm,
    },
    tradeRight: {
        alignItems: 'flex-end',
    },
    newsCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    newsContent: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    statsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        gap: SPACING.lg,
    },
    statsHeaderContent: {
        flex: 1,
    },
    statsHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    achievementCard: {
        backgroundColor: COLORS.card,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
});
