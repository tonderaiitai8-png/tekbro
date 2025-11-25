import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { HapticPatterns } from '../utils/haptics';
import { TrendingUp, Shield, Trophy, Zap, Rocket, ArrowRight } from 'lucide-react-native';
import { AnimatedDots } from '../components/AnimatedDots';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SLIDES = [
    {
        id: 0,
        title: 'Welcome to\nPaperTrader',
        subtitle: 'Master the stock market\nwith zero risk',
        icon: Rocket,
        color: COLORS.accent,
        gradient: ['#00FF9D', '#00D4FF'],
    },
    {
        id: 1,
        title: 'Real-Time\nSimulation',
        subtitle: 'Live market data\nRealistic price movements\nBreaking news alerts',
        icon: Zap,
        color: COLORS.positive,
        gradient: ['#00FF9D', '#7FFF00'],
    },
    {
        id: 2,
        title: 'Risk-Free\nPractice',
        subtitle: 'Start with $10,000 virtual cash\nMake mistakes here, not with real money\nLearn without losing',
        icon: Shield,
        color: COLORS.warning,
        gradient: ['#FFD700', '#FFA500'],
    },
    {
        id: 3,
        title: 'Gamified\nLearning',
        subtitle: 'Unlock 50+ achievements\nComplete daily challenges\nLevel up your skills',
        icon: Trophy,
        color: COLORS.accent,
        gradient: ['#9D00FF', '#FF00FF'],
    },
    {
        id: 4,
        title: 'Ready to\nStart Trading?',
        subtitle: 'Join thousands of traders\nmastering the market',
        icon: TrendingUp,
        color: COLORS.positive,
        gradient: ['#00FF9D', '#00FFD4'],
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const pagerRef = useRef<PagerView>(null);
    const scrollX = useSharedValue(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        scrollX.value = page;
        HapticPatterns.selection();
    };

    const handleNext = () => {
        if (currentPage < SLIDES.length - 1) {
            pagerRef.current?.setPage(currentPage + 1);
        }
    };

    const handleFinish = async () => {
        HapticPatterns.success();
        await AsyncStorage.setItem('onboarding_completed', 'true');
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Parallax Background */}
            <ParallaxBackground scrollX={scrollX} />

            {/* Pager */}
            <PagerView
                ref={pagerRef}
                style={styles.pager}
                initialPage={0}
                onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
            >
                {SLIDES.map((slide, index) => (
                    <View key={slide.id} style={styles.page}>
                        <SlideContent slide={slide} index={index} scrollX={scrollX} />
                    </View>
                ))}
            </PagerView>

            {/* Footer */}
            <View style={styles.footer}>
                {/* Animated Dots */}
                <AnimatedDots
                    data={SLIDES}
                    scrollX={scrollX}
                    dotSize={10}
                    activeDotWidth={30}
                />

                {/* Action Button */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor: currentPage === SLIDES.length - 1
                                ? COLORS.accent
                                : COLORS.bgElevated,
                        },
                    ]}
                    onPress={currentPage === SLIDES.length - 1 ? handleFinish : handleNext}
                    activeOpacity={0.8}
                >
                    {currentPage === SLIDES.length - 1 ? (
                        <View style={styles.buttonContent}>
                            <Text style={[styles.buttonText, { color: COLORS.bg }]}>
                                Let's Go!
                            </Text>
                            <Rocket size={20} color={COLORS.bg} />
                        </View>
                    ) : (
                        <View style={styles.buttonContent}>
                            <Text style={[styles.buttonText, { color: COLORS.text }]}>
                                Next
                            </Text>
                            <ArrowRight size={20} color={COLORS.text} />
                        </View>
                    )}
                </TouchableOpacity>

                {/* Skip Button */}
                {currentPage < SLIDES.length - 1 && (
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={handleFinish}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

// Slide Content Component
const SlideContent: React.FC<{ slide: typeof SLIDES[0]; index: number; scrollX: Animated.SharedValue<number> }> = ({
    slide,
    index,
    scrollX,
}) => {
    const Icon = slide.icon;

    const iconStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1), index, (index + 1)];

        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );

        const rotate = interpolate(
            scrollX.value,
            inputRange,
            [-20, 0, 20],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { scale: withSpring(scale, { damping: 15 }) },
                { rotate: `${rotate}deg` },
            ],
            opacity,
        };
    });

    const textStyle = useAnimatedStyle(() => {
        const inputRange = [(index - 1), index, (index + 1)];

        const translateY = interpolate(
            scrollX.value,
            inputRange,
            [50, 0, -50],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateY }],
            opacity,
        };
    });

    return (
        <View style={styles.slideContent}>
            {/* Icon */}
            <Animated.View style={[styles.iconContainer, iconStyle]}>
                <View style={[styles.iconBg, { backgroundColor: `${slide.color}20` }]}>
                    <Icon size={80} color={slide.color} strokeWidth={1.5} />
                </View>
            </Animated.View>

            {/* Text */}
            <Animated.View style={[styles.textContainer, textStyle]}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </Animated.View>
        </View>
    );
};

// Parallax Background Component
const ParallaxBackground: React.FC<{ scrollX: Animated.SharedValue<number> }> = ({ scrollX }) => {
    const layer1Style = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(scrollX.value, [0, SLIDES.length - 1], [0, -SCREEN_WIDTH * 0.3]) },
        ],
    }));

    const layer2Style = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(scrollX.value, [0, SLIDES.length - 1], [0, -SCREEN_WIDTH * 0.5]) },
        ],
    }));

    return (
        <View style={styles.backgroundContainer}>
            {/* Layer 1 - Slow */}
            <Animated.View style={[styles.backgroundLayer, layer1Style]}>
                <View style={[styles.orb, styles.orb1]} />
                <View style={[styles.orb, styles.orb2]} />
            </Animated.View>

            {/* Layer 2 - Medium */}
            <Animated.View style={[styles.backgroundLayer, layer2Style]}>
                <View style={[styles.orb, styles.orb3]} />
                <View style={[styles.orb, styles.orb4]} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    backgroundLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    orb: {
        position: 'absolute',
        borderRadius: 999,
        opacity: 0.1,
    },
    orb1: {
        width: 300,
        height: 300,
        backgroundColor: COLORS.accent,
        top: 100,
        left: -50,
    },
    orb2: {
        width: 200,
        height: 200,
        backgroundColor: COLORS.positive,
        bottom: 200,
        right: -30,
    },
    orb3: {
        width: 250,
        height: 250,
        backgroundColor: COLORS.warning,
        top: 300,
        right: -80,
    },
    orb4: {
        width: 180,
        height: 180,
        backgroundColor: COLORS.accent,
        bottom: 100,
        left: -60,
    },
    pager: {
        flex: 1,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xxxl,
    },
    iconContainer: {
        marginBottom: SPACING.xxxl * 2,
    },
    iconBg: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.lg,
        letterSpacing: -1,
        lineHeight: 48,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
        textAlign: 'center',
        lineHeight: 28,
        maxWidth: 320,
    },
    footer: {
        paddingHorizontal: SPACING.xxxl,
        paddingBottom: SPACING.xxl,
        alignItems: 'center',
        gap: SPACING.xl,
    },
    button: {
        width: '100%',
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        letterSpacing: 0.5,
    },
    skipButton: {
        paddingVertical: SPACING.sm,
    },
    skipText: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.medium,
        color: COLORS.textMuted,
    },
});
