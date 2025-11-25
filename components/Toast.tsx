import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react-native';
import { Toast as ToastType } from '../store/toastStore';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface ToastProps {
    toast: ToastType;
    onDismiss: () => void;
}

const GRADIENT_COLORS = {
    success: ['#0D4D4D', '#1A5F5F'] as const,
    error: ['#4D0D0D', '#5F1A1A'] as const,
    info: ['#0D1A4D', '#1A2A5F'] as const,
    warning: ['#4D2D0D', '#5F3A1A'] as const,
};

const ICONS = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
    const translateY = useRef(new Animated.Value(-100)).current;
    const progress = useRef(new Animated.Value(1)).current;
    const Icon = ICONS[toast.type];
    const duration = toast.duration || 3000;

    useEffect(() => {
        // Slide in with spring animation
        Animated.spring(translateY, {
            toValue: 0,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
        }).start();

        // Progress bar animation
        Animated.timing(progress, {
            toValue: 0,
            duration,
            useNativeDriver: false,
        }).start();

        // Slide out before auto-dismiss
        const slideOutTimer = setTimeout(() => {
            Animated.spring(translateY, {
                toValue: -100,
                tension: 300,
                friction: 20,
                useNativeDriver: true,
            }).start(() => onDismiss());
        }, duration - 300);

        return () => clearTimeout(slideOutTimer);
    }, []);

    const handleDismiss = () => {
        Animated.spring(translateY, {
            toValue: -100,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
        }).start(() => onDismiss());
    };

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                },
            ]}
        >
            <LinearGradient
                colors={GRADIENT_COLORS[toast.type]}
                style={styles.toast}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.content}>
                    <Icon size={24} color="#FFF" style={styles.icon} />

                    <View style={styles.textContainer}>
                        <Text style={styles.message} numberOfLines={2}>
                            {toast.message}
                        </Text>
                    </View>

                    {toast.action && (
                        <TouchableOpacity
                            onPress={() => {
                                toast.action?.onPress();
                                handleDismiss();
                            }}
                            style={styles.actionButton}
                        >
                            <Text style={styles.actionText}>{toast.action.label}</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
                        <Text style={styles.dismissText}>✕</Text>
                    </TouchableOpacity>
                </View>

                {/* Progress bar */}
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: progressWidth,
                        },
                    ]}
                />
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60,
        left: SPACING.md,
        right: SPACING.md,
        zIndex: 9999,
    },
    toast: {
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
    },
    icon: {
        marginRight: SPACING.sm,
    },
    textContainer: {
        flex: 1,
    },
    message: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.medium,
        color: '#FFF',
        lineHeight: 20,
    },
    actionButton: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        marginLeft: SPACING.sm,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: RADIUS.sm,
    },
    actionText: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.bold,
        color: '#FFF',
    },
    dismissButton: {
        marginLeft: SPACING.sm,
        padding: SPACING.xs,
    },
    dismissText: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: FONTS.medium,
    },
    progressBar: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
});
