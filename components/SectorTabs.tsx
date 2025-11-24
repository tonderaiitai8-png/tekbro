import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import * as Haptics from 'expo-haptics';

interface Props {
    onSelectSector: (sector: string) => void;
    selectedSector: string;
}

const SECTORS = [
    { id: 'ALL', label: 'All' },
    { id: 'Tech', label: 'Tech' },
    { id: 'Finance', label: 'Finance' },
    { id: 'Healthcare', label: 'Healthcare' },
    { id: 'Consumer', label: 'Consumer' },
    { id: 'Energy', label: 'Energy' },
    { id: 'Crypto', label: 'Crypto' },
    { id: 'Entertainment', label: 'Entertainment' },
];

export function SectorTabs({ onSelectSector, selectedSector }: Props) {
    const handleSelect = (sectorId: string) => {
        Haptics.selectionAsync();
        onSelectSector(sectorId);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {SECTORS.map((sector) => (
                    <TouchableOpacity
                        key={sector.id}
                        style={[
                            styles.tab,
                            selectedSector === sector.id && styles.tabActive
                        ]}
                        onPress={() => handleSelect(sector.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.label,
                            selectedSector === sector.id && styles.labelActive
                        ]}>
                            {sector.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.lg,
    },
    scrollContent: {
        paddingHorizontal: SPACING.xl,
        gap: SPACING.sm,
    },
    tab: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tabActive: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSub,
        fontFamily: FONTS.semibold,
    },
    labelActive: {
        color: COLORS.bg,
        fontWeight: '700',
        fontFamily: FONTS.bold,
    },
});
