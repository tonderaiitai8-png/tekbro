import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';
import { formatCurrency } from '../utils/currency';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InteractiveChartProps {
    data: Array<{ value: number; timestamp: number }>;
    color?: string;
    height?: number;
}

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
    data,
    color = COLORS.accent,
    height = 250,
}) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
    const [pointerIndex, setPointerIndex] = useState(-1);

    const chartData = useMemo(() => {
        if (!data || data.length < 2) return [{ value: 0 }];
        // In a real app, filtering by timeframe would happen here
        // For now, we just show the available history
        return data.map(point => ({
            value: point.value,
            timestamp: point.timestamp,
            label: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
    }, [data, selectedTimeframe]);

    const currentPrice = pointerIndex !== -1
        ? chartData[pointerIndex].value
        : (chartData[chartData.length - 1]?.value || 0);

    const priceChange = chartData.length > 1
        ? currentPrice - chartData[0].value
        : 0;

    const percentChange = chartData.length > 1 && chartData[0].value !== 0
        ? (priceChange / chartData[0].value) * 100
        : 0;

    const isPositive = priceChange >= 0;
    const displayColor = isPositive ? COLORS.positive : COLORS.negative;

    return (
        <View style={styles.container}>
            {/* Header Info */}
            <View style={styles.header}>
                <Text style={styles.price}>{formatCurrency(currentPrice)}</Text>
                <Text style={[styles.change, { color: displayColor }]}>
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
                </Text>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
                <LineChart
                    data={chartData}
                    height={height}
                    width={SCREEN_WIDTH - 40} // Adjust for padding
                    color={displayColor}
                    thickness={2}
                    startFillColor={displayColor}
                    endFillColor={displayColor}
                    startOpacity={0.2}
                    endOpacity={0.0}
                    areaChart
                    hideDataPoints
                    hideRules
                    hideYAxisText
                    hideAxesAndRules
                    curved
                    isAnimated
                    animationDuration={300}
                    pointerConfig={{
                        pointerStripHeight: height,
                        pointerStripColor: 'rgba(255, 255, 255, 0.2)',
                        pointerStripWidth: 2,
                        pointerColor: displayColor,
                        radius: 6,
                        pointerLabelWidth: 100,
                        pointerLabelHeight: 90,
                        activatePointersOnLongPress: false,
                        autoAdjustPointerLabelPosition: false,
                        pointerLabelComponent: (items: any) => {
                            const item = items[0];
                            return (
                                <View style={styles.pointerLabel}>
                                    <Text style={styles.pointerDate}>{item.label}</Text>
                                    <Text style={styles.pointerValue}>{formatCurrency(item.value)}</Text>
                                </View>
                            );
                        },
                    }}
                />
            </View>

            {/* Timeframe Selector */}
            <View style={styles.timeframeContainer}>
                {TIMEFRAMES.map((tf) => (
                    <TouchableOpacity
                        key={tf}
                        style={[
                            styles.timeframeButton,
                            selectedTimeframe === tf && { backgroundColor: displayColor + '20' }
                        ]}
                        onPress={() => {
                            setSelectedTimeframe(tf);
                            Haptics.selectionAsync();
                        }}
                    >
                        <Text style={[
                            styles.timeframeText,
                            selectedTimeframe === tf && { color: displayColor, fontFamily: FONTS.bold }
                        ]}>
                            {tf}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    header: {
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    price: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.white,
    },
    change: {
        fontSize: 16,
        fontFamily: FONTS.medium,
        marginTop: 4,
    },
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pointerLabel: {
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        padding: 8,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    pointerDate: {
        color: COLORS.textSub,
        fontSize: 10,
        fontFamily: FONTS.regular,
        marginBottom: 2,
    },
    pointerValue: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: FONTS.bold,
    },
    timeframeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        marginTop: SPACING.md,
    },
    timeframeButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: RADIUS.md,
    },
    timeframeText: {
        color: COLORS.textSub,
        fontSize: 12,
        fontFamily: FONTS.medium,
    },
});
