import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { TrendingUp, TrendingDown, Wallet, Briefcase } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface MetricCardProps {
    label: string;
    value: string;
    variant?: 'default' | 'positive' | 'negative';
    onPress?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, variant = 'default', onPress }) => {
    // Liquid Glass Gradients
    const getGradientColors = (): [string, string] => {
        if (label.includes('Buying Power')) {
            return ['rgba(0,0,0,0.6)', 'rgba(80, 0, 120, 0.5)']; // Black -> Deep Purple Glass
        } else if (label.includes('Net Worth')) {
            return ['rgba(0,0,0,0.6)', 'rgba(0, 60, 150, 0.5)']; // Black -> Deep Blue Glass
        }
        return ['rgba(20,20,20,0.6)', 'rgba(40,40,40,0.4)']; // Default Glass
    };

    const getBorderColor = () => {
        if (label.includes('Buying Power')) return 'rgba(180, 100, 255, 0.3)'; // Purple Glow
        if (label.includes('Net Worth')) return 'rgba(100, 180, 255, 0.3)'; // Blue Glow
        return 'rgba(255,255,255,0.1)';
    };

    const getIcon = () => {
        if (label.includes('Buying Power')) return <Wallet size={18} color="#D0A0FF" />;
        if (label.includes('Net Worth')) return <Briefcase size={18} color="#A0D0FF" />;
        return null;
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}
            disabled={!onPress}
        >
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.card, { borderColor: getBorderColor() }]}
                >
                    <View style={styles.header}>
                        <Text style={styles.label}>{label}</Text>
                        {getIcon()}
                    </View>

                    <View style={styles.valueContainer}>
                        <Text
                            style={[
                                styles.value,
                                { fontSize: Math.max(18, 28 - (value.length - 8) * 1.5) }
                            ]}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                        >
                            {value}
                        </Text>
                    </View>

                    {/* Liquid Reflection Effect */}
                    <LinearGradient
                        colors={['rgba(255,255,255,0.1)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 0.5 }}
                        style={styles.reflection}
                    />
                </LinearGradient>
            </BlurView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    blurContainer: {
        flex: 1,
    },
    card: {
        padding: SPACING.lg,
        minHeight: 110,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: RADIUS.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.xs,
    },
    label: {
        fontSize: 12,
        fontFamily: FONTS.medium,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: SPACING.xs,
    },
    value: {
        fontFamily: FONTS.bold,
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    reflection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
    }
});
