import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface AppBackgroundProps {
    children: React.ReactNode;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
    const { currentTheme, theme } = useTheme();

    const getGradientColors = (): [string, string, string] => {
        switch (currentTheme) {
            case 'ocean':
                return ['#020617', '#0F172A', '#1E293B'];
            case 'sunset':
                return ['#180818', '#240A24', '#301030'];
            case 'forest':
                return ['#020A05', '#05140A', '#0A2112'];
            case 'neon':
                return ['#050505', '#111', '#1A1A1A'];
            case 'royal':
                return ['#0F0B1E', '#1A1432', '#251D46'];
            case 'cyberpunk':
                return ['#000000', '#0A0A0A', '#111'];
            case 'minimal':
                return ['#FFFFFF', '#F8F9FA', '#F1F3F5'];
            case 'retro':
                return ['#2B211E', '#382B26', '#463630'];
            case 'coffee':
                return ['#1C1917', '#292524', '#44403C'];
            case 'dracula':
                return ['#282a36', '#44475a', '#6272a4'];
            case 'nord':
                return ['#2e3440', '#3b4252', '#434c5e'];
            case 'monokai':
                return ['#272822', '#3e3d32', '#49483e'];
            case 'matrix':
                return ['#000000', '#0d0d0d', '#1a1a1a'];
            case 'synthwave':
                return ['#2b213a', '#241b35', '#201630'];
            case 'luxury':
                return ['#101010', '#1a1a1a', '#262626'];
            case 'botanical':
                return ['#2f3e46', '#354f52', '#52796f'];
            case 'crimson':
                return ['#1a0505', '#2b0a0a', '#3d0f0f'];
            case 'slate':
                return ['#1e293b', '#334155', '#475569'];
            case 'lavender':
                return ['#e6e6fa', '#f3f3ff', '#dcdcdc'];
            case 'midnight':
            default:
                return ['#000000', '#050A14', '#0A1525'];
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.bg }]}>
            <LinearGradient
                colors={getGradientColors()}
                locations={[0, 0.6, 1]}
                style={styles.background}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});
