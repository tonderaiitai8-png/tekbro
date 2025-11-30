import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { X } from 'lucide-react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useStore } from '../store/useStore';
import { MissionCard } from './MissionCard';

interface MissionsModalProps {
    visible: boolean;
    onClose: () => void;
}

export const MissionsModal = ({ visible, onClose }: MissionsModalProps) => {
    const { missions } = useStore();
    const activeMissions = missions.filter(m => m.status === 'ACTIVE');
    const completedMissions = missions.filter(m => m.status === 'COMPLETED');

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <BlurView intensity={80} tint="dark" style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Missions</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color={COLORS.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {activeMissions.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Active Missions</Text>
                                {activeMissions.map(mission => (
                                    <MissionCard key={mission.id} mission={mission} />
                                ))}
                            </View>
                        )}

                        {completedMissions.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Completed</Text>
                                {completedMissions.map(mission => (
                                    <MissionCard key={mission.id} mission={mission} />
                                ))}
                            </View>
                        )}

                        {activeMissions.length === 0 && completedMissions.length === 0 && (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>No active missions. Check back later!</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        height: '80%',
        padding: SPACING.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: 24,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    closeButton: {
        padding: 8,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.full,
    },
    scrollContent: {
        paddingBottom: SPACING.xl,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: FONTS.bold,
        color: COLORS.textSecondary,
        marginBottom: SPACING.md,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    emptyState: {
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: FONTS.medium,
        color: COLORS.textSecondary,
    },
});
