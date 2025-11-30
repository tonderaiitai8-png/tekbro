import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, LayoutAnimation, Platform, UIManager } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Search, BookOpen, ChevronDown, ChevronUp, HelpCircle, Book } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { FONTS, SPACING, RADIUS } from '../constants/theme';
import { MARKET_CONTENT, CRYPTO_CONTENT, EncyclopediaItem } from '../constants/encyclopediaData';
import * as Haptics from 'expo-haptics';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface EncyclopediaModalProps {
    visible: boolean;
    onClose: () => void;
    mode: 'MARKET' | 'CRYPTO';
}

type FilterType = 'ALL' | 'TERM' | 'FAQ';

export default function EncyclopediaModal({ visible, onClose, mode }: EncyclopediaModalProps) {
    const { theme, isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const content = mode === 'MARKET' ? MARKET_CONTENT : CRYPTO_CONTENT;
    const accentColor = mode === 'MARKET' ? theme.positive : theme.accent;
    const icon = mode === 'MARKET' ? Book : BookOpen;

    const filteredContent = useMemo(() => {
        return content.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'ALL' || item.type === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [content, searchQuery, activeFilter]);

    const toggleExpand = (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const renderItem = (item: EncyclopediaItem) => {
        const isExpanded = expandedId === item.id;
        const Icon = item.type === 'FAQ' ? HelpCircle : Book;

        return (
            <TouchableOpacity
                key={item.id}
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.card,
                        borderColor: isExpanded ? accentColor : theme.border,
                    }
                ]}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.9}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: isExpanded ? accentColor : theme.bgSubtle }]}>
                        <Icon size={16} color={isExpanded ? '#FFF' : theme.textSecondary} />
                    </View>
                    <View style={styles.cardTitleContainer}>
                        <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
                        <View style={styles.badges}>
                            <View style={[styles.badge, { backgroundColor: theme.bgSubtle }]}>
                                <Text style={[styles.badgeText, { color: theme.textSecondary }]}>{item.category}</Text>
                            </View>
                        </View>
                    </View>
                    {isExpanded ? (
                        <ChevronUp size={20} color={theme.textSecondary} />
                    ) : (
                        <ChevronDown size={20} color={theme.textSecondary} />
                    )}
                </View>

                {isExpanded && (
                    <View style={styles.cardContent}>
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Text style={[styles.cardBody, { color: theme.textSub }]}>
                            {item.content}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <BlurView intensity={isDark ? 40 : 20} style={styles.container}>
                <View style={[styles.content, { backgroundColor: theme.bg }]}>
                    {/* Header */}
                    <View style={[styles.header, { borderBottomColor: theme.border }]}>
                        <View style={styles.headerTop}>
                            <View style={styles.titleRow}>
                                <View style={[styles.mainIcon, { backgroundColor: accentColor }]}>
                                    <BookOpen size={20} color="#FFF" />
                                </View>
                                <View>
                                    <Text style={[styles.title, { color: theme.text }]}>
                                        {mode === 'MARKET' ? 'Market Encyclopedia' : 'Crypto Academy'}
                                    </Text>
                                    <Text style={[styles.subtitle, { color: theme.textSub }]}>
                                        {filteredContent.length} Topics Available
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: theme.bgSubtle }]}>
                                <X size={20} color={theme.text} />
                            </TouchableOpacity>
                        </View>

                        {/* Search Bar */}
                        <View style={[styles.searchContainer, { backgroundColor: theme.bgSubtle }]}>
                            <Search size={18} color={theme.textSecondary} />
                            <TextInput
                                style={[styles.searchInput, { color: theme.text, fontFamily: FONTS.medium }]}
                                placeholder="Search definitions, questions..."
                                placeholderTextColor={theme.textSecondary}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <X size={16} color={theme.textSecondary} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Filters */}
                        <View style={styles.filterRow}>
                            {(['ALL', 'TERM', 'FAQ'] as FilterType[]).map((filter) => (
                                <TouchableOpacity
                                    key={filter}
                                    style={[
                                        styles.filterChip,
                                        {
                                            backgroundColor: activeFilter === filter ? accentColor : theme.bgSubtle,
                                        }
                                    ]}
                                    onPress={() => {
                                        Haptics.selectionAsync();
                                        setActiveFilter(filter);
                                    }}
                                >
                                    <Text style={[
                                        styles.filterText,
                                        {
                                            color: activeFilter === filter ? '#FFF' : theme.textSecondary,
                                            fontFamily: activeFilter === filter ? FONTS.bold : FONTS.medium
                                        }
                                    ]}>
                                        {filter === 'ALL' ? 'All Topics' : filter === 'TERM' ? 'Terms' : 'FAQs'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Content */}
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {filteredContent.length > 0 ? (
                            <View style={styles.list}>
                                {filteredContent.map(renderItem)}
                            </View>
                        ) : (
                            <View style={styles.emptyState}>
                                <Search size={48} color={theme.textSecondary} style={{ opacity: 0.5 }} />
                                <Text style={[styles.emptyText, { color: theme.textSub }]}>
                                    No results found for "{searchQuery}"
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    content: {
        height: '92%',
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        overflow: 'hidden',
    },
    header: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        gap: SPACING.md,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    mainIcon: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: FONTS.sizes.lg,
        fontFamily: FONTS.bold,
    },
    subtitle: {
        fontSize: FONTS.sizes.xs,
        fontFamily: FONTS.medium,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        height: 44,
        borderRadius: RADIUS.lg,
        gap: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: FONTS.sizes.md,
    },
    filterRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    filterChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
    },
    filterText: {
        fontSize: FONTS.sizes.sm,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 50,
    },
    list: {
        gap: SPACING.md,
    },
    card: {
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        gap: SPACING.md,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitleContainer: {
        flex: 1,
        gap: 4,
    },
    cardTitle: {
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.bold,
    },
    badges: {
        flexDirection: 'row',
    },
    badge: {
        paddingHorizontal: SPACING.xs,
        paddingVertical: 2,
        borderRadius: RADIUS.sm,
    },
    badgeText: {
        fontSize: 10,
        fontFamily: FONTS.bold,
    },
    cardContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
    },
    divider: {
        height: 1,
        marginBottom: SPACING.md,
        opacity: 0.5,
    },
    cardBody: {
        fontSize: FONTS.sizes.sm,
        fontFamily: FONTS.regular,
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACING.xxl,
        gap: SPACING.md,
    },
    emptyText: {
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.medium,
    }
});
