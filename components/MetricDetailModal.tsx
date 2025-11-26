import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    SlideInDown,
    FadeIn
} from 'react-native-reanimated';
import { X, Info, TrendingUp, Wallet } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { HapticPatterns } from '../utils/haptics';

interface MetricDetailModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    value: string;
    description: string;
    type: 'netWorth' | 'buyingPower';
}

export const MetricDetailModal: React.FC<MetricDetailModalProps> = ({
    visible,
    onClose,
    title,
    value,
    description,
    type
}) => {
    if (!visible) return null;

    const Icon = type === 'netWorth' ? TrendingUp : Wallet;
    const iconColor = type === 'netWorth' ? COLORS.positive : COLORS.accent;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />

                    <TouchableWithoutFeedback>
                        <Animated.View
                            entering={SlideInDown.springify().damping(15)}
                            style={styles.modalContainer}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
                                    <Icon size={24} color={iconColor} />
                                </View>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={styles.closeButton}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <X size={20} color={COLORS.textSub} />
                                </TouchableOpacity>
                            </View>

                            {/* Content */}
                            <View style={styles.content}>
                                <Text style={styles.label}>{title}</Text>
                                <Text style={styles.value}>{value}</Text>

                                <View style={styles.divider} />

                                <View style={styles.infoRow}>
                                    <Info size={16} color={COLORS.textSub} style={{ marginTop: 2 }} />
                                    <Text style={styles.description}>{description}</Text>
                                </View>
                            </View>

                            {/* Action Button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    HapticPatterns.light();
                                    onClose();
                                }}
                            >
                                <Text style={styles.buttonText}>Got it</Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: COLORS.bgElevated,
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        padding: SPACING.xl,
        paddingBottom: SPACING.xxxl,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.full,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        padding: SPACING.xs,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.full,
    },
    content: {
        marginBottom: SPACING.xl,
    },
    label: {
        fontSize: 14,
        fontFamily: FONTS.medium,
        color: COLORS.textSub,
        marginBottom: SPACING.xs,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 36,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        letterSpacing: -1,
        marginBottom: SPACING.lg,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.lg,
    },
    infoRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    description: {
        flex: 1,
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    button: {
        backgroundColor: COLORS.card,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    }
});
