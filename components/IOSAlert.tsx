import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface IOSAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onDismiss: () => void;
}

export const IOSAlert: React.FC<IOSAlertProps> = ({ visible, title, message, onDismiss }) => {
    const handleDismiss = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onDismiss();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleDismiss}
        >
            <View style={styles.overlay}>
                <View style={styles.alertContainer}>
                    {/* Title */}
                    <Text style={styles.title}>{title}</Text>

                    {/* Message */}
                    <Text style={styles.message}>{message}</Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* OK Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleDismiss}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    alertContainer: {
        width: '85%',
        maxWidth: 320,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 14,
        overflow: 'hidden',
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        paddingTop: 20,
        paddingHorizontal: 16,
        fontFamily: FONTS.semibold,
    },
    message: {
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 20,
        lineHeight: 18,
        fontFamily: FONTS.regular,
    },
    divider: {
        height: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    button: {
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#007AFF',
        fontFamily: FONTS.semibold,
    },
});
