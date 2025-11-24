import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { TrendingUp, Shield, Trophy, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Learn to Trade',
        description: 'Master the stock market with real-time data and zero risk.',
        icon: <TrendingUp size={64} color={COLORS.accent} strokeWidth={1.5} />,
    },
    {
        id: '2',
        title: 'Risk-Free Practice',
        description: 'Start with £10,000 in virtual cash. Make mistakes here, not with real money.',
        icon: <Shield size={64} color={COLORS.positive} strokeWidth={1.5} />,
    },
    {
        id: '3',
        title: 'Compete & Win',
        description: 'Level up, unlock achievements, and become a top trader.',
        icon: <Trophy size={64} color={COLORS.warning} strokeWidth={1.5} />,
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleFinish = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        await AsyncStorage.setItem('onboarding_completed', 'true');
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <View style={styles.iconContainer}>
                            {item.icon}
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={currentIndex === SLIDES.length - 1 ? handleFinish : undefined}
                    activeOpacity={0.8}
                >
                    {currentIndex === SLIDES.length - 1 ? (
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>Get Started</Text>
                            <ArrowRight size={20} color={COLORS.bg} strokeWidth={2.5} />
                        </View>
                    ) : (
                        <Text style={[styles.buttonText, { opacity: 0.3 }]}>Swipe to continue</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xxxl,
    },
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.bgElevated,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xxxl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: SPACING.lg,
        fontFamily: FONTS.bold,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 16,
        color: COLORS.textSub,
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: FONTS.regular,
        maxWidth: 300,
    },
    footer: {
        paddingHorizontal: SPACING.xxxl,
        paddingBottom: SPACING.xxxl,
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.xxxl,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.textMuted,
    },
    activeDot: {
        backgroundColor: COLORS.accent,
        width: 24,
    },
    button: {
        backgroundColor: COLORS.accent,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xxxl,
        borderRadius: RADIUS.full,
        width: '100%',
        alignItems: 'center',
        height: 56,
        justifyContent: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    buttonText: {
        color: COLORS.bg,
        fontSize: 17,
        fontWeight: '700',
        fontFamily: FONTS.bold,
        letterSpacing: 0.3,
    },
});
