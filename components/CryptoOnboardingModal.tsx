import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface CryptoOnboardingModalProps {
    visible: boolean;
    onClose: () => void;
}

const ONBOARDING_STEPS = [
    {
        title: 'Welcome to Crypto',
        description: 'Trade volatile assets 24/7. High risk, high reward.',
        icon: 'logo-bitcoin',
        color: '#F7931A'
    },
    {
        title: 'Market Mood',
        description: 'Watch the Fear & Greed Index. Buy when others are fearful, sell when they are greedy.',
        icon: 'speedometer-outline',
        color: '#00CC00'
    },
    {
        title: 'Leverage Trading',
        description: 'Amplify your gains (and losses) with leverage. Be careful of liquidation!',
        icon: 'trending-up-outline',
        color: '#FF4444'
    }
];

export const CryptoOnboardingModal: React.FC<CryptoOnboardingModalProps> = ({ visible, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (currentStep < ONBOARDING_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const step = ONBOARDING_STEPS[currentStep];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }} // Prevent closing by back button
        >
            <View style={styles.overlay}>
                <LinearGradient
                    colors={[COLORS.card, COLORS.bg]}
                    style={styles.modalContent}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name={step.icon as any} size={64} color={step.color} />
                    </View>

                    <Text style={styles.title}>{step.title}</Text>
                    <Text style={styles.description}>{step.description}</Text>

                    <View style={styles.dotsContainer}>
                        {ONBOARDING_STEPS.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === currentStep && styles.activeDot,
                                    { backgroundColor: index === currentStep ? step.color : COLORS.border }
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: step.color }]}
                        onPress={handleNext}
                    >
                        <Text style={styles.buttonText}>
                            {currentStep === ONBOARDING_STEPS.length - 1 ? 'Start Trading' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    modalContent: {
        width: '100%',
        padding: SPACING.xxl,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.white,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        color: COLORS.textSub,
        textAlign: 'center',
        marginBottom: SPACING.xxl,
        lineHeight: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: SPACING.xl,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        width: 24,
    },
    button: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONTS.bold,
    },
});
