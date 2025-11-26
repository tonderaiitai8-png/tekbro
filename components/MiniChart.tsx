import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { COLORS, FONTS } from '../constants/theme';

interface MiniChartProps {
    data: Array<{ value: number; timestamp: number }>;
    color?: string;
    width?: number;
    height?: number;
}

export const MiniChart: React.FC<MiniChartProps> = React.memo(({
    data,
    color = COLORS.accent,
    width = 80,
    height = 40,
}) => {
    const chartData = React.useMemo(() => {
        if (!data || data.length < 2) return [];
        return data.slice(-10).map(point => ({
            value: point.value,
        }));
    }, [data]);

    if (chartData.length === 0) {
        return <View style={[styles.container, { width, height }]} />;
    }

    return (
        <View style={[styles.container, { width, height }]}>
            <LineChart
                data={chartData}
                width={width}
                height={height}
                curved
                hideDataPoints
                hideAxesAndRules
                hideYAxisText
                color={color}
                thickness={2}
                areaChart
                startFillColor={color}
                endFillColor={color}
                startOpacity={0.4}
                endOpacity={0.1}
                backgroundColor="transparent"
                yAxisColor="transparent"
                xAxisColor="transparent"
                hideOrigin
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
