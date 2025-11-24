import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';

interface StockChartProps {
    data: { timestamp: number; value: number }[];
    height?: number;
    showLabels?: boolean;
    color?: string;
}

export const StockChart: React.FC<StockChartProps> = ({
    data,
    height = 200,
    showLabels = false,
    color
}) => {
    if (!data || data.length === 0) return null;

    const { width } = Dimensions.get('window');
    const chartWidth = width - 48; // padding

    // Calculate min/max for scaling
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;

    // Determine color based on trend if not provided
    const isUp = values[values.length - 1] >= values[0];
    const chartColor = color || (isUp ? COLORS.chartUp : COLORS.chartDown);

    // Create points for View-based rendering
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * chartWidth;
        const y = height - ((d.value - minValue) / range) * (height - 20) - 10; // padding
        return { x, y };
    });

    return (
        <View style={[styles.container, { height }]}>
            {/* Grid Lines */}
            <View style={[styles.gridLine, { top: 0 }]} />
            <View style={[styles.gridLine, { top: height / 2 }]} />
            <View style={[styles.gridLine, { bottom: 0 }]} />

            {/* Chart Segments */}
            {points.slice(0, -1).map((point, index) => {
                const nextPoint = points[index + 1];
                const deltaX = nextPoint.x - point.x;
                const deltaY = nextPoint.y - point.y;
                const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                return (
                    <View
                        key={index}
                        style={[
                            styles.segment,
                            {
                                left: point.x,
                                top: point.y,
                                width: length,
                                backgroundColor: chartColor,
                                transform: [{ rotate: `${angle}deg` }],
                                shadowColor: chartColor,
                                shadowOpacity: 0.5,
                                shadowRadius: 4,
                            },
                        ]}
                    />
                );
            })}

            {/* End Point Dot */}
            <View style={[
                styles.dot,
                {
                    left: points[points.length - 1].x - 4,
                    top: points[points.length - 1].y - 4,
                    backgroundColor: chartColor,
                    shadowColor: chartColor
                }
            ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
    },
    gridLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#222',
    },
    segment: {
        position: 'absolute',
        height: 2,
        transformOrigin: 'left center', // Note: might need anchor point adjustment on some RN versions, but usually works
    },
    dot: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
    }
});
