import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { GRADIENTS } from '../constants/gradients';

interface AssetTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const AssetTabs: React.FC<AssetTabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => {
                                if (activeTab !== tab) {
                                    Haptics.selectionAsync();
                                    onTabChange(tab);
                                }
                            }}
                            activeOpacity={0.7}
                            style={styles.tabWrapper}
                        >
                            {isActive ? (
                                <LinearGradient
                                    colors={GRADIENTS.portfolio}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.activeTab}
                                >
                                    <Text style={styles.activeTabText}>{tab}</Text>
                                </LinearGradient>
                            ) : (
                                <View style={styles.inactiveTab}>
                                    <Text style={styles.inactiveTabText}>{tab}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    scrollContent: {
        paddingHorizontal: SPACING.md,
        gap: SPACING.sm,
    },
    tabWrapper: {
        borderRadius: RADIUS.full,
        overflow: 'hidden',
    },
    activeTab: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
    },
    inactiveTab: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgSubtle,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeTabText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: 14,
    },
    inactiveTabText: {
        color: COLORS.textSub,
        fontFamily: FONTS.medium,
        fontSize: 14,
    },
});
