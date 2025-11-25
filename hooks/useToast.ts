import { useCallback } from 'react';
import { useToastStore, ToastType } from '../store/toastStore';
import * as Haptics from 'expo-haptics';

export const useToast = () => {
    const addToast = useToastStore((state) => state.addToast);
    const removeToast = useToastStore((state) => state.removeToast);
    const clearAll = useToastStore((state) => state.clearAll);

    const show = useCallback((
        message: string,
        type: ToastType = 'info',
        action?: { label: string; onPress: () => void }
    ) => {
        // Haptic feedback based on type
        if (type === 'success') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else if (type === 'error') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } else if (type === 'warning') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        addToast({ type, message, action });
    }, [addToast]);

    const success = useCallback((message: string, action?: { label: string; onPress: () => void }) => {
        show(message, 'success', action);
    }, [show]);

    const error = useCallback((message: string, action?: { label: string; onPress: () => void }) => {
        show(message, 'error', action);
    }, [show]);

    const info = useCallback((message: string, action?: { label: string; onPress: () => void }) => {
        show(message, 'info', action);
    }, [show]);

    const warning = useCallback((message: string, action?: { label: string; onPress: () => void }) => {
        show(message, 'warning', action);
    }, [show]);

    return {
        show,
        success,
        error,
        info,
        warning,
        remove: removeToast,
        clearAll,
    };
};
