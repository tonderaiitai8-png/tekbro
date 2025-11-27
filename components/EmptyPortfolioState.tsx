import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { TrendingUp, Search, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    activeTab: string;
}

export function EmptyPortfolioState({ activeTab }: Props) {
    const router = useRouter();

    const getContent = () => {
        switch (activeTab) {
            case 'Watchlist':
                return {
                    icon: <Search size={48} color={COLORS.accent} />,
                    title: 'Your watchlist is empty',
                    description: 'Keep track of stocks you are interested in by adding them to your watchlist.',
                    buttonText: 'Browse Market',
                    action: () => router.push('/(tabs)/market')
                };
            case 'Crypto':
                return {
                    icon: <TrendingUp size={48} color={COLORS.accent} />,
                    title: 'No crypto assets yet',
                    description: 'Start building your crypto portfolio today. Explore available cryptocurrencies.',
                    buttonText: 'Explore Crypto',
                    action: () => router.push('/(tabs)/crypto')
                };
            default: // All or Stocks
                return {
                    icon: <TrendingUp size={48} color={COLORS.accent} />,
                    title: 'Start your trading journey',
                    description: 'Your portfolio is currently empty. Visit the market to make your first investment.',
                    buttonText: 'Go to Market',
                    action: () => router.push('/(tabs)/market')
                };
        }
    };

    const content = getContent();

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {content.icon}
            </View>

            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.description}>{content.description}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={content.action}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={[COLORS.accent, '#2E8B57']} // Green gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>{content.buttonText}</Text>
                    <ArrowRight size={16} color="#000" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.xl,
        marginTop: SPACING.xl,
        backgroundColor: COLORS.bgElevated,
        marginHorizontal: SPACING.lg,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.bgSubtle,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
        marginBottom: SPACING.sm,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontFamily: FONTS.regular,
        textAlign: 'center',
        marginBottom: SPACING.xl,
        lineHeight: 20,
        maxWidth: 260,
    },
    button: {
        width: '100%',
        maxWidth: 200,
        height: 44,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        fontFamily: FONTS.semibold,
    },
});
