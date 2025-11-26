import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

interface AppBackgroundProps {
    children: React.ReactNode;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({ children }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                // Deep Black to Dark Blue Gradient
                colors={['#000000', '#050A14', '#0A1525']}
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
        backgroundColor: '#000', // Fallback
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});
