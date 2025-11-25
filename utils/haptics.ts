import * as Haptics from 'expo-haptics';

/**
 * Haptic Feedback Patterns
 * Provides consistent haptic feedback throughout the app
 */

export const HapticPatterns = {
    /**
     * Light tap - for button presses, selections
     */
    light: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },

    /**
     * Medium impact - for confirmations, toggles
     */
    medium: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },

    /**
     * Heavy impact - for important actions, errors
     */
    heavy: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    },

    /**
     * Success pattern - for successful trades, achievements
     */
    success: async () => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },

    /**
     * Warning pattern - for risky actions
     */
    warning: async () => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    },

    /**
     * Error pattern - for failed actions
     */
    error: async () => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },

    /**
     * Selection changed - for carousel, tabs
     */
    selection: () => {
        Haptics.selectionAsync();
    },

    /**
     * Custom: Trade execution pattern
     * Double tap with increasing intensity
     */
    tradeExecuted: async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }, 100);
    },

    /**
     * Custom: Achievement unlock pattern
     * Triple tap celebration
     */
    achievementUnlock: async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }, 80);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }, 160);
    },

    /**
     * Custom: News alert pattern
     * Quick double tap
     */
    newsAlert: async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }, 50);
    },

    /**
     * Custom: Swipe dismiss pattern
     * Light feedback
     */
    swipeDismiss: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },

    /**
     * Custom: Level up pattern
     * Ascending intensity
     */
    levelUp: async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }, 100);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }, 200);
        setTimeout(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }, 300);
    },
};

/**
 * Haptic feedback wrapper with error handling
 */
export async function triggerHaptic(pattern: keyof typeof HapticPatterns) {
    try {
        const hapticFn = HapticPatterns[pattern];
        if (hapticFn) {
            await hapticFn();
        }
    } catch (error) {
        // Silently fail - haptics not critical
        console.warn('Haptic feedback failed:', error);
    }
}
