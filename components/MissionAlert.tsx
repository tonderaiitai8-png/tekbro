import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    runOnJS
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2, Trophy, X } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface MissionAlertProps {
    visible: boolean;
    title: string;
    xp: number;
    onDismiss: () => void;
}

export const MissionAlert = ({ visible, title, xp, onDismiss }: MissionAlertProps) => {
    const translateY = useSharedValue(-200);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            translateY.value = withSpring(0, { damping: 12 });
            opacity.value = withTiming(1, { duration: 300 });

            // Auto dismiss after 4 seconds
            const timer = setTimeout(() => {
                handleDismiss();
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            translateY.value = withTiming(-200, { duration: 300 });
            opacity.value = withTiming(0, { duration: 200 });
        }
    }, [visible]);

    const handleDismiss = () => {
        translateY.value = withTiming(-200, { duration: 300 }, (finished) => {
            if (finished) runOnJS(onDismiss)();
        });
        opacity.value = withTiming(0, { duration: 200 });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value
    }));

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <LinearGradient
                colors={['rgba(0, 255, 136, 0.15)', 'rgba(0, 0, 0, 0.95)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <BlurView intensity={80} tint="dark" style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Trophy size={24} color="#00FF88" />
                        <View style={styles.glow} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.label}>MISSION ACCOMPLISHED</Text>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <Text style={styles.xp}>+{xp} XP</Text>
                    </View>

                    <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
                        <X size={16} color="rgba(255,255,255,0.5)" />
                    </TouchableOpacity>
                </BlurView>

                {/* Neon Border Bottom */}
                <View style={styles.neonBorder} />
            </LinearGradient>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60, // Below status bar
        left: SPACING.md,
        right: SPACING.md,
        zIndex: 1000,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        shadowColor: '#00FF88',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    gradient: {
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 136, 0.3)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        gap: SPACING.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 136, 0.3)',
    },
    glow: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#00FF88',
        opacity: 0.2,
        shadowColor: '#00FF88',
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 10,
        fontFamily: FONTS.bold,
        color: '#00FF88',
        letterSpacing: 1,
        marginBottom: 2,
    },
    title: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: '#FFF',
        marginBottom: 2,
    },
    xp: {
        fontSize: 12,
        fontFamily: FONTS.bold,
        color: '#FFD700',
    },
    closeButton: {
        padding: 8,
    },
    neonBorder: {
        height: 2,
        backgroundColor: '#00FF88',
        width: '100%',
        shadowColor: '#00FF88',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
    }
});
