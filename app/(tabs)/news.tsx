import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { NewsFeed } from '../../components/NewsFeed';
import { COLORS, FONTS, SPACING, RADIUS } from '../../constants/theme';
import { useStore } from '../../store/useStore';
import { generateNewsEvent } from '../../utils/NewsEngine';
import { NewsEvent } from '../../types';

const NEWS_REFRESH_INTERVAL = 3 * 60 * 1000; // 3 minutes
const NEWS_BATCH_SIZE = 4; // Generate 4 news items per refresh

export default function NewsScreen() {
    const { stocks } = useStore();
    const [newsHistory, setNewsHistory] = useState<NewsEvent[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const generateNewsBatch = useCallback(() => {
        const newNews: NewsEvent[] = [];

        for (let i = 0; i < NEWS_BATCH_SIZE; i++) {
            const news = generateNewsEvent(stocks);
            if (news) {
                newNews.push(news);
            }
        }

        // Replace old news with new batch (don't accumulate)
        setNewsHistory(newNews);
    }, [stocks]);

    // Auto-refresh every 3 minutes
    useEffect(() => {
        // Generate initial batch
        generateNewsBatch();

        // Set up interval for auto-refresh
        const interval = setInterval(() => {
            generateNewsBatch();
        }, NEWS_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [generateNewsBatch]);

    const handleDismissNews = useCallback((newsId: string) => {
        setNewsHistory(prev => prev.filter(n => n.id !== newsId));
    }, []);

    const filteredNews = newsHistory.filter(news =>
        news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <View style={styles.title}>News Feed</View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Search size={20} color={COLORS.textMuted} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor={COLORS.textMuted}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    <TouchableOpacity style={styles.filterButton}>
                        <SlidersHorizontal size={20} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                <NewsFeed
                    news={filteredNews}
                    onDismissNews={handleDismissNews}
                    refreshing={false}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },
    header: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    titleContainer: {
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: 32,
        fontFamily: FONTS.bold,
        color: COLORS.text,
    },
    searchContainer: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: FONTS.sizes.md,
        fontFamily: FONTS.regular,
        color: COLORS.text,
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
});
