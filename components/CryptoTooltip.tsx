import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Info, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface CryptoTooltipProps {
    title: string;
    content: string;
    size?: number;
    color?: string;
}

export const CryptoTooltip: React.FC<CryptoTooltipProps> = ({
    title,
    content,
    size = 16,
    color = COLORS.textSub
}) => {
    const [visible, setVisible] = useState(false);

    const handlePress = () => {
        Haptics.selectionAsync();
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Info size={size} color={color} />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={handleClose}
            >
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View style={styles.backdrop}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContainer}>
                                <LinearGradient
                                    colors={[COLORS.bgElevated, COLORS.card]}
                                    style={styles.modalContent}
                                >
                                    <View style={styles.header}>
                                        <Text style={styles.title}>{title}</Text>
                                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                                            <X size={20} color={COLORS.text} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.content}>{content}</Text>
                                </LinearGradient>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 320,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    modalContent: {
        padding: SPACING.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    title: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        color: COLORS.accent,
    },
    closeButton: {
        padding: 4,
        backgroundColor: COLORS.bgSubtle,
        borderRadius: RADIUS.full,
    },
    content: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        color: COLORS.text,
        lineHeight: 22,
    },
});
