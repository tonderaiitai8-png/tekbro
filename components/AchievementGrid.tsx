import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Achievement } from '../types';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 140;
const CARD_GAP = SPACING.md;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

interface Props {
    achievements: Achievement[];
    onAchievementPress?: (achievement: Achievement) => void;
}

export function AchievementGrid({ achievements, onAchievementPress }: Props) {
    const scrollX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'gold': return '#EAB308'; // Amber-500
            case 'silver': return '#94A3B8'; // Slate-400
            case 'bronze': return '#A16207'; // Amber-700
            default: return COLORS.textMuted;
        }
    };

    const handlePress = (achievement: Achievement) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (onAchievementPress) {
            onAchievementPress(achievement);
        }
    };

    const renderItem = ({ item, index }: { item: Achievement; index: number }) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
            >
                {item.unlocked && (
                    <LinearGradient
                        colors={['#000000', '#003300']} // Black to Deep Green
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                    />
                )}

                {/* Icon */}
                <View style={[
                    styles.iconContainer,
                    !item.unlocked && styles.iconLocked
                ]}>
                    <Text style={styles.icon}>{item.icon}</Text>
                </View>

                {/* Title */}
                <Text style={[
                    styles.title,
                    !item.unlocked && styles.textLocked
                ]} numberOfLines={1}>
                    {item.title}
                </Text>

                {/* Description */}
                <Text style={[
                    styles.description,
                    !item.unlocked && styles.textLocked
                ]} numberOfLines={2}>
                    {item.description}
                </Text>

                {/* Progress or Reward */}
                {!item.unlocked ? (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${Math.min(100, ((item.progress ?? 0) / (item.target ?? 1)) * 100)}%`,
                                        backgroundColor: COLORS.accent
                                    }
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {(item.progress ?? 0).toFixed(0)}/{item.target ?? 0}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.rewardBadge}>
                        <Text style={styles.rewardText}>
                            +{item.xpReward ?? 0} XP
                        </Text>
                    </View>
                )}

                {/* Tier indicator */}
                <View style={[styles.tierIndicator, { backgroundColor: getTierColor(item.tier ?? 'bronze') }]} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={achievements}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.grid}
                snapToInterval={SNAP_INTERVAL}
                decelerationRate="fast"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
            />

            {/* Fluid Dots Indicator - REMOVED for cleaner UI */}
            {/* The horizontal scroll is intuitive enough without dots cluttering the view */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.xxl,
    },
    grid: {
        paddingHorizontal: SPACING.xl,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgSubtle,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.sm,
    },
    iconLocked: {
        opacity: 0.3,
    },
    icon: {
        fontSize: 24,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.text,
        fontFamily: FONTS.semibold,
        marginBottom: 4,
    },
    description: {
        fontSize: 11,
        color: COLORS.textSub,
        fontFamily: FONTS.regular,
        marginBottom: SPACING.sm,
        lineHeight: 14,
    },
    textLocked: {
        opacity: 0.5,
    },
    progressContainer: {
        marginTop: 'auto',
    },
    progressBar: {
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 6,
    },
    progressFill: {
        height: '100%',
    },
    progressText: {
        fontSize: 10,
        color: COLORS.textMuted,
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
    rewardBadge: {
        marginTop: 'auto',
        backgroundColor: COLORS.accentSubtle,
        paddingVertical: 6,
        paddingHorizontal: SPACING.sm,
        borderRadius: RADIUS.sm,
        alignItems: 'center',
    },
    rewardText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.accent,
        fontFamily: FONTS.semibold,
    },
    tierIndicator: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.md,
        gap: 6,
    },
    dot: {
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.accent,
    },
});
