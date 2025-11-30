import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appStorage } from '../utils/storage';
import { useMarketEngine } from '../hooks/useMarketEngine';
import { useCryptoEngine } from '../hooks/useCryptoEngine';
import { useStore } from '../store/useStore';
import { GameAlert } from '../components/GameAlert';
import { LevelUpModal } from '../components/LevelUpModal';
import { ToastContainer } from '../components/ToastContainer';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { COLORS } from '../constants/theme';
import { analytics } from '../utils/analytics';
import { initializeCryptoStore } from '../utils/cryptoStoreInit';
import { initDatabase } from '../src/shared/db/client';

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const [isReady, setIsReady] = useState(false);
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        initDatabase()
            .then(() => {
                // Initialize watchlist after DB is ready
                useStore.getState().initializeWatchlist();
            })
            .catch(err => console.error('DB Init Error:', err));
    }, []);

    // Run market engines globally
    useMarketEngine();
    useCryptoEngine();

    const activeNews = useStore(state => state.activeNews);
    const setActiveNews = useStore(state => state.setActiveNews);
    const checkLoginStreak = useStore(state => state.checkLoginStreak);
    const syncAchievements = useStore(state => state.syncAchievements);
    const onboardingCompleted = useStore(state => state.onboardingCompleted);

    const onboardingChecked = useRef(false);

    useEffect(() => {
        async function checkOnboarding() {
            if (onboardingChecked.current) return;

            try {
                // Initialize analytics
                analytics.init();
                analytics.trackAppOpened();

                // Initialize gamification
                checkLoginStreak();
                syncAchievements();

                // Initialize crypto store
                initializeCryptoStore();

                // Check onboarding status
                const completed = await appStorage.getStringAsync('onboarding_completed');

                if (!completed && segments[0] !== 'onboarding') {
                    onboardingChecked.current = true;
                    setIsReady(true);
                    router.replace('/onboarding');
                } else {
                    // Sync store if storage says completed but store might not
                    if (completed === 'true') {
                        useStore.getState().setOnboardingCompleted(true);
                    }
                    onboardingChecked.current = true;
                    setIsReady(true);
                }
            } catch (error) {
                console.error('Error checking onboarding:', error);
                analytics.trackError(error as Error, { context: 'onboarding_check' });
                onboardingChecked.current = true;
                setIsReady(true);
            }
        }

        if (rootNavigationState?.key && !onboardingChecked.current) {
            checkOnboarding();
        }
    }, [rootNavigationState?.key]);

    // Watch for store reset to trigger onboarding
    useEffect(() => {
        if (isReady && !onboardingCompleted && segments[0] !== 'onboarding') {
            router.replace('/onboarding');
        }
    }, [onboardingCompleted, isReady, segments]);

    // Show a loading screen or splash while checking onboarding
    if (!isReady && !rootNavigationState?.key) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ErrorBoundary>
                <SafeAreaProvider>
                    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                        <StatusBar style="light" />
                        <Stack screenOptions={{ headerShown: false }} />
                        <GameAlert
                            visible={!!activeNews && onboardingCompleted}
                            title={activeNews?.type === 'COMPANY' ? `NEWS: ${activeNews.symbol}` : 'MARKET UPDATE'}
                            message={activeNews?.headline || ''}
                            onDismiss={() => setActiveNews(null)}
                        />
                        <LevelUpModal />
                        <ToastContainer />
                    </View>
                </SafeAreaProvider>
            </ErrorBoundary>
        </GestureHandlerRootView>
    );
}
