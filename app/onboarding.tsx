import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    runOnJS,
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideOutUp
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { HapticPatterns } from '../utils/haptics';
import { AppBackground } from '../components/AppBackground';
import { ArrowRight, Check, Lock, ShieldCheck } from 'lucide-react-native';
import { useStore } from '../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 🎬 ELITE ONBOARDING FLOW
// Step 0: The Selection (Intro)
// Step 1: Identity (Name)
// Step 2: The Grant (Money)

export default function OnboardingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const { setProfile } = useStore();

    // Step 2: Money Counter
    const [displayMoney, setDisplayMoney] = useState(0);
    const moneyAnim = useSharedValue(0);

    const handleNext = () => {
        HapticPatterns.selection();
        setStep(prev => prev + 1);
    };

    const handleFinish = async () => {
        HapticPatterns.success();
        setProfile(name || 'Trader', 'default');
        await AsyncStorage.setItem('onboarding_completed', 'true');
        router.replace('/(tabs)');
    };

    // 💰 MONEY ANIMATION LOGIC
    useEffect(() => {
        if (step === 2) {
            // Delay start slightly for dramatic effect
            setTimeout(() => {
                moneyAnim.value = withTiming(500000, { duration: 2500 }, (finished) => {
                    if (finished) {
                        runOnJS(HapticPatterns.success)();
                    }
                });
            }, 500);
        }
    }, [step]);

    // Sync shared value to state for text rendering
    // We use a listener to update the text and trigger haptics during the count
    useEffect(() => {
        if (step === 2) {
            const interval = setInterval(() => {
                const current = Math.floor(moneyAnim.value);
                setDisplayMoney(current);

                // Haptic feedback during counting (every ~50k)
                if (current > 0 && current < 500000 && current % 50000 < 2000) {
                    HapticPatterns.light();
                }
            }, 16); // ~60fps
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <AppBackground>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.content}>

                            {/* ————————————————————————————————————————————————————————————————————————————————
                               STEP 0: THE SELECTION
                               "You have been selected."
                            ———————————————————————————————————————————————————————————————————————————————— */}
                            {step === 0 && (
                                <Animated.View
                                    entering={FadeIn.duration(1000)}
                                    exiting={FadeOut.duration(500)}
                                    style={styles.stepContainer}
                                >
                                    <View style={styles.iconContainer}>
                                        <Lock size={48} color={COLORS.accent} />
                                    </View>
                                    <Text style={styles.title}>Restricted Access</Text>
                                    <Text style={styles.subtitle}>
                                        You have been selected for the PaperTrader Elite program.
                                    </Text>
                                    <Text style={[styles.subtitle, { marginTop: 20, color: COLORS.text }]}>
                                        Do you accept the invitation?
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.primaryButton}
                                        onPress={handleNext}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.buttonText}>Initialize Protocol</Text>
                                        <ArrowRight size={20} color="#000" />
                                    </TouchableOpacity>
                                </Animated.View>
                            )}

                            {/* ————————————————————————————————————————————————————————————————————————————————
                               STEP 1: IDENTITY
                               "Who are you?"
                            ———————————————————————————————————————————————————————————————————————————————— */}
                            {step === 1 && (
                                <Animated.View
                                    entering={SlideInDown.springify().damping(20)}
                                    exiting={FadeOut.duration(300)}
                                    style={styles.stepContainer}
                                >
                                    <Text style={styles.stepLabel}>STEP 1 / 2</Text>
                                    <Text style={styles.title}>Identity Verification</Text>
                                    <Text style={styles.subtitle}>
                                        Enter your trading alias to establish your secure ledger.
                                    </Text>

                                    <View style={styles.inputWrapper}>
                                        <BlurView intensity={20} tint="light" style={styles.blurInput}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Enter Alias"
                                                placeholderTextColor="rgba(255,255,255,0.3)"
                                                value={name}
                                                onChangeText={setName}
                                                autoCapitalize="words"
                                                autoCorrect={false}
                                                autoFocus
                                            />
                                        </BlurView>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.primaryButton, !name && styles.disabledButton]}
                                        onPress={handleNext}
                                        disabled={!name}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.buttonText}>Confirm Identity</Text>
                                        <Check size={20} color="#000" />
                                    </TouchableOpacity>
                                </Animated.View>
                            )}

                            {/* ————————————————————————————————————————————————————————————————————————————————
                               STEP 2: THE GRANT
                               "£500,000.00"
                            ———————————————————————————————————————————————————————————————————————————————— */}
                            {step === 2 && (
                                <Animated.View
                                    entering={FadeIn.duration(800)}
                                    style={styles.stepContainer}
                                >
                                    <View style={styles.iconContainer}>
                                        <ShieldCheck size={64} color={COLORS.positive} />
                                    </View>

                                    <Text style={styles.stepLabel}>FINAL STEP</Text>
                                    <Text style={styles.title}>Capital Allocation</Text>
                                    <Text style={styles.subtitle}>
                                        Transferring initial liquidity to your portfolio...
                                    </Text>

                                    <View style={styles.moneyContainer}>
                                        <Text style={styles.currencySymbol}>£</Text>
                                        <Text style={styles.moneyText}>
                                            {displayMoney.toLocaleString()}
                                        </Text>
                                    </View>

                                    {displayMoney >= 500000 && (
                                        <Animated.View
                                            entering={SlideInDown.springify()}
                                            style={styles.stampContainer}
                                        >
                                            <View style={styles.stamp}>
                                                <Text style={styles.stampText}>FUNDS AVAILABLE</Text>
                                            </View>
                                        </Animated.View>
                                    )}

                                    <View style={{ flex: 1 }} />

                                    {displayMoney >= 500000 && (
                                        <Animated.View entering={FadeIn.delay(500)}>
                                            <TouchableOpacity
                                                style={styles.primaryButton}
                                                onPress={handleFinish}
                                                activeOpacity={0.8}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                                    <Text style={styles.buttonText}>Enter Market</Text>
                                                    <ArrowRight size={20} color="#000" />
                                                </View>
                                            </TouchableOpacity>
                                        </Animated.View>
                                    )}
                                </Animated.View>
                            )}

                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: SPACING.xxl,
        justifyContent: 'center',
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(6, 182, 212, 0.1)', // Cyan tint
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.accent,
    },
    stepLabel: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: COLORS.accent,
        letterSpacing: 2,
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.md,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: SPACING.md,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.accent,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: RADIUS.full,
        gap: 8,
        marginTop: SPACING.xxxl,
        width: '100%',
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    disabledButton: {
        backgroundColor: COLORS.bgElevated,
        opacity: 0.5,
        shadowOpacity: 0,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: '#000',
        letterSpacing: 0.5,
    },
    inputWrapper: {
        width: '100%',
        marginTop: SPACING.xxl,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    blurInput: {
        padding: SPACING.lg,
    },
    input: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        textAlign: 'center',
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: SPACING.xxl,
    },
    currencySymbol: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.positive,
        marginTop: 8,
        marginRight: 4,
    },
    moneyText: {
        fontSize: 56,
        fontFamily: FONTS.bold,
        color: COLORS.positive,
        letterSpacing: -1,
    },
    stampContainer: {
        marginTop: SPACING.xxl,
        transform: [{ rotate: '-5deg' }],
    },
    stamp: {
        borderWidth: 4,
        borderColor: COLORS.positive,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    stampText: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.positive,
        letterSpacing: 2,
    },
});
