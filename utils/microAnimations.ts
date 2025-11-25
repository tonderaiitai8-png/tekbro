import React from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Confetti particle animation for celebrations
 * Call this when achievements unlock or level up
 */
export const createConfetti = () => {
    const particles = Array.from({ length: 30 }, () => ({
        position: new Animated.ValueXY({ x: 0, y: 0 }),
        rotation: new Animated.Value(0),
        opacity: new Animated.Value(1),
    }));

    const animations = particles.map((particle, index) => {
        const angle = (Math.PI * 2 * index) / particles.length;
        const velocity = 150 + Math.random() * 100;

        return Animated.parallel([
            Animated.timing(particle.position, {
                toValue: {
                    x: Math.cos(angle) * velocity,
                    y: Math.sin(angle) * velocity - 200,
                },
                duration: 1200 + Math.random() * 400,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(particle.rotation, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
                toValue: 0,
                duration: 1200,
                delay: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]);
    });

    return {
        particles,
        animate: () => Animated.stagger(20, animations).start(),
    };
};

/**
 * Screen flash animation for level up
 */
export const createLevelUpFlash = (opacity: Animated.Value) => {
    return Animated.sequence([
        Animated.timing(opacity, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
        }),
        Animated.timing(opacity, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }),
    ]);
};

/**
 * Challenge progress bar fill animation
 */
export const animateProgressBar = (
    progress: Animated.Value,
    toValue: number,
    duration = 600
) => {
    return Animated.spring(progress, {
        toValue,
        tension: 50,
        friction: 7,
        useNativeDriver: false, // Can't use native driver for width
    });
};

/**
 * Number count-up animation
 */
export const animateNumberCountUp = (
    value: Animated.Value,
    toValue: number,
    duration = 800
) => {
    return Animated.timing(value, {
        toValue,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
    });
};

/**
 * Card lift animation (for hover/long press)
 */
export const createCardLiftAnimation = (
    translateY: Animated.Value,
    scale: Animated.Value
) => {
    const liftUp = Animated.parallel([
        Animated.spring(translateY, {
            toValue: -8,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
        }),
        Animated.spring(scale, {
            toValue: 1.02,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
        }),
    ]);

    const liftDown = Animated.parallel([
        Animated.spring(translateY, {
            toValue: 0,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
        }),
        Animated.spring(scale, {
            toValue: 1,
            tension: 300,
            friction: 20,
            useNativeDriver: true,
        }),
    ]);

    return { liftUp, liftDown };
};

/**
 * Achievement card flip animation
 */
export const createAchievementFlip = (rotateY: Animated.Value) => {
    return Animated.sequence([
        Animated.timing(rotateY, {
            toValue: 90,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }),
        Animated.timing(rotateY, {
            toValue: 0,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }),
    ]);
};

/**
 * Trade button press animation with scale + haptic
 */
export const createTradeButtonAnimation = (scale: Animated.Value) => {
    return Animated.sequence([
        Animated.spring(scale, {
            toValue: 0.92,
            tension: 500,
            friction: 15,
            useNativeDriver: true,
        }),
        Animated.spring(scale, {
            toValue: 1,
            tension: 500,
            friction: 15,
            useNativeDriver: true,
        }),
    ]);
};

/**
 * Interpolate rotation for confetti particles
 */
export const interpolateRotation = (rotationValue: Animated.Value) => {
    return rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });
};
