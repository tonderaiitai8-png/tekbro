import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Lightbulb } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface StatDetailModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    value: string;
    description: string;
    advice: string;
    icon?: React.ReactNode;
    color?: string;
}

export function StatDetailModal({ visible, onClose, title, value, description, advice, icon, color = COLORS.primary }: StatDetailModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />

                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.header}>
                                <View style={styles.titleRow}>
                                    {icon && <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>{icon}</View>}
                                    <Text style={styles.title}>{title}</Text>
                                </View>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <X size={24} color={COLORS.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.content}>
                                <Text style={[styles.value, { color }]}>{value}</Text>
                                <Text style={styles.description}>{description}</Text>

                                <View style={styles.adviceContainer}>
                                    <View style={styles.adviceHeader}>
                                        <Lightbulb size={16} color={COLORS.warning} />
                                        <Text style={styles.adviceTitle}>Pro Tip</Text>
                                    </View>
                                    <Text style={styles.adviceText}>{advice}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.lg,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        fontFamily: FONTS.bold,
    },
    closeButton: {
        padding: 4,
    },
    content: {
        alignItems: 'center',
    },
    value: {
        fontSize: 32,
        fontWeight: '700',
        fontFamily: FONTS.bold,
        marginBottom: SPACING.md,
    },
    description: {
        fontSize: 16,
        color: COLORS.textSecondary,
        fontFamily: FONTS.regular,
        textAlign: 'center',
        marginBottom: SPACING.xl,
        lineHeight: 22,
    },
    adviceContainer: {
        width: '100%',
        backgroundColor: `${COLORS.warning}10`,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: `${COLORS.warning}30`,
    },
    adviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    },
    adviceTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.warning,
        fontFamily: FONTS.bold,
    },
    adviceText: {
        fontSize: 14,
        color: COLORS.text,
        fontFamily: FONTS.medium,
        lineHeight: 20,
    },
});
