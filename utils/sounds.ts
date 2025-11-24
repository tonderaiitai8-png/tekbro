import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// Placeholder for sound files
// You would need to add these files to your assets folder
// const sounds = {
//     buy: require('../assets/sounds/buy.mp3'),
//     sell_profit: require('../assets/sounds/cash.mp3'),
//     sell_loss: require('../assets/sounds/loss.mp3'),
//     level_up: require('../assets/sounds/fanfare.mp3'),
// };

export const playSound = async (type: 'buy' | 'sell_profit' | 'sell_loss' | 'level_up') => {
    try {
        // Haptic feedback as fallback/complement
        switch (type) {
            case 'buy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                break;
            case 'sell_profit':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                break;
            case 'sell_loss':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                break;
            case 'level_up':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                break;
        }

        // Audio implementation (commented out until files exist)
        // const { sound } = await Audio.Sound.createAsync(sounds[type]);
        // await sound.playAsync();
    } catch (error) {
        console.log('Error playing sound:', error);
    }
};
