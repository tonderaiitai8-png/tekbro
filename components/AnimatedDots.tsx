import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    interpolateColor,
    Extrapolate,
    withSpring,
} from 'react-native-reanimated';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface AnimatedDotsProps {
    data: any[];
    scrollX: Animated.SharedValue<number>;
    dotSize?: number;
    activeDotWidth?: number;
    spacing?: number;
}

export const AnimatedDots: React.FC<AnimatedDotsProps> = ({
    data,
    scrollX,
    dotSize = 8,
    activeDotWidth = 24,
    spacing = SPACING.sm,
}) => {
    return (
        <View style={styles.container}>
            {data.map((_, index) => {
                const inputRange = [
                    (index - 1) * 1,
                    index * 1,
                    (index + 1) * 1,
                ];

                const animatedStyle = useAnimatedStyle(() => {
                    // Width animation - expands when active
                    const width = interpolate(
                        scrollX.value,
                        inputRange,
                        [dotSize, activeDotWidth, dotSize],
                        Extrapolate.CLAMP
                    );

                    // Scale animation - subtle pulse
                    const scale = interpolate(
                        scrollX.value,
                        inputRange,
                        [0.8, 1.2, 0.8],
                        Extrapolate.CLAMP
                    );

                    // Opacity animation
                    const opacity = interpolate(
                        scrollX.value,
                        inputRange,
                        [0.3, 1, 0.3],
                        Extrapolate.CLAMP
                    );

                    // Color animation - morphs through accent colors
                    const backgroundColor = interpolateColor(
                        scrollX.value,
                        [0, 1, 2],
                        [COLORS.accent, COLORS.positive, COLORS.warning]
                    );

                    return {
                        width: withSpring(width, { damping: 15, stiffness: 150 }),
                        transform: [{ scale: withSpring(scale, { damping: 12 }) }],
                        opacity,
                        backgroundColor,
                    };
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                height: dotSize,
                                marginHorizontal: spacing / 2,
                            },
                            animatedStyle,
                        ]}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        borderRadius: RADIUS.full,
    },
});
