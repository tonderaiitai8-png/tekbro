import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState as AppStateType, LeaderboardEntry, NewsEvent, DailyChallenges } from '../types';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';
import { ACHIEVEMENT_CATALOG } from '../constants/achievements';
import { generateDailyChallenges, shouldResetChallenges } from '../utils/dailyChallenges';
import { analytics } from '../utils/analytics';
import { useCryptoStore } from './useCryptoStore';

// Error-safe AsyncStorage wrapper
const asyncStorageWrapper: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        try {
            const value = await AsyncStorage.getItem(name);
            return value;
        } catch (error) {
            console.error('AsyncStorage getItem error:', error);
            return null;
        }
    },
    setItem: async (name: string, value: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(name, value);
        } catch (error) {
            console.error('AsyncStorage setItem error:', error);
            Alert.alert(
                'Storage Error',
                'Unable to save your progress. Your data may not persist after closing the app.',
                [{ text: 'OK', style: 'default' }]
            );
        }
    },
    removeItem: async (name: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(name);
        } catch (error) {
            console.error('AsyncStorage removeItem error:', error);
        }
    },
};

interface AppState extends AppStateType {
    setActiveNews: (news: NewsEvent | null) => void;
    setMarketSentiment: (sentiment: number) => void;
    checkAndUnlockAchievements: () => void;
    toggleWatchlist: (symbol: string) => void;
    updateChallengeProgress: (type: string, amount: number) => void;
    checkLoginStreak: () => number;
    updateLeaderboard: () => void;
    syncAchievements: () => void;
    updateMarketPrices: (updates: Record<string, number>) => void;
    cryptoOnboardingCompleted: boolean;
    setCryptoOnboardingCompleted: (completed: boolean) => void;
    lastAchievementCheck: number;
}

const INITIAL_CASH = 1000000;

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Initial state
            cash: INITIAL_CASH,
            holdings: {},
            stocks: [],
            trades: [],
            achievements: ACHIEVEMENT_CATALOG.map(ach => ({
                ...ach,
                progress: ach.progress ?? 0,
                target: ach.target ?? 0,
                xpReward: ach.xpReward ?? 0,
                tier: ach.tier ?? 'bronze',
                unlocked: false
            })),
            watchlist: [],
            news: [],
            alerts: [],
            xp: 0,
            level: 1,
            username: 'Trader',
            avatar: 'default',
            dailyChallenges: null, // Changed to plural
            loginStreak: 0,
            lastLoginDate: '',
            highScore: 0,
            leaderboard: [],
            onboardingCompleted: false,
            equityHistory: [],
            activeNews: null,
            marketSentiment: 0.15,
            cryptoOnboardingCompleted: false,
            lastAchievementCheck: 0,

            setCryptoOnboardingCompleted: (completed: boolean) => set({ cryptoOnboardingCompleted: completed }),

            // Actions
            setActiveNews: (news) => set({ activeNews: news }),
            setMarketSentiment: (sentiment) => set({ marketSentiment: sentiment }),

            toggleWatchlist: (symbol) => {
                const { watchlist } = get();
                const exists = watchlist.includes(symbol);
                if (exists) {
                    set({ watchlist: watchlist.filter((s: string) => s !== symbol) });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                } else {
                    set({ watchlist: [...watchlist, symbol] });
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            },

            setNews: (news) => set({ news }),

            addAlert: (alert) => {
                set((state) => ({ alerts: [...state.alerts, alert] }));
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            },

            removeAlert: (id) => {
                set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) }));
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },

            addXp: (amount) => {
                const { xp, level } = get();
                const newXp = xp + amount;
                // Harder XP Curve: 2500 * level
                const nextLevelXp = level * 2500;

                if (newXp >= nextLevelXp) {
                    set({ xp: newXp, level: level + 1 });
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    Alert.alert('Level Up!', `You reached Level ${level + 1}!`);
                } else {
                    set({ xp: newXp });
                }
            },

            setProfile: (username, avatar) => set({ username, avatar }),

            buyStock: (symbol, quantity, price) => {
                const { cash, holdings, trades, stocks } = get();
                const totalCost = quantity * price;

                if (cash < totalCost) {
                    return;
                }

                const currentHolding = holdings[symbol] || { symbol, quantity: 0, averageCost: 0 };
                const newQuantity = currentHolding.quantity + quantity;
                const newAverageCost =
                    ((currentHolding.averageCost * currentHolding.quantity) + totalCost) / newQuantity;

                set({
                    cash: cash - totalCost,
                    holdings: {
                        ...holdings,
                        [symbol]: {
                            symbol,
                            quantity: newQuantity,
                            averageCost: newAverageCost,
                        },
                    },
                    trades: [
                        {
                            id: Date.now().toString(),
                            symbol,
                            type: 'BUY' as const,
                            quantity,
                            price,
                            timestamp: Date.now(),
                        },
                        ...trades,
                    ],
                });

                get().addXp(10);

                // Update challenges - track volume and sector trades
                get().updateChallengeProgress('volume', 1);
                const stock = stocks.find(s => s.symbol === symbol);
                if (stock?.sector === 'Tech') {
                    get().updateChallengeProgress('sector', 1);
                }

                get().checkAndUnlockAchievements();
                analytics.trackTrade('BUY', symbol, quantity, price);
            },

            sellStock: (symbol, quantity, price) => {
                const { cash, holdings, trades } = get();
                const currentHolding = holdings[symbol];

                if (!currentHolding || currentHolding.quantity < quantity) {
                    return;
                }

                const newQuantity = currentHolding.quantity - quantity;
                const totalValue = quantity * price;
                const pnl = (price - currentHolding.averageCost) * quantity;

                const newHoldings = { ...holdings };
                if (newQuantity === 0) {
                    delete newHoldings[symbol];
                } else {
                    newHoldings[symbol] = {
                        ...currentHolding,
                        quantity: newQuantity,
                    };
                }

                set({
                    cash: cash + totalValue,
                    holdings: newHoldings,
                    trades: [
                        {
                            id: Date.now().toString(),
                            symbol,
                            type: 'SELL' as const,
                            quantity,
                            price,
                            timestamp: Date.now(),
                            pnl,
                        } as any,
                        ...trades,
                    ],
                });

                get().addXp(10);
                if (pnl > 0) {
                    get().addXp(20);
                    get().updateChallengeProgress('profit', pnl);
                }
                get().updateChallengeProgress('volume', 1);
                get().checkAndUnlockAchievements();
                analytics.trackTrade('SELL', symbol, quantity, price);
            },

            updateStockPrice: (symbol, newPrice) => {
                const { stocks } = get();
                set({
                    stocks: stocks.map((stock) =>
                        stock.symbol === symbol
                            ? {
                                ...stock,
                                price: newPrice,
                                history: [
                                    ...stock.history.slice(-49),
                                    { timestamp: Date.now(), value: newPrice }
                                ],
                            }
                            : stock
                    ),
                });
            },

            updateMarketPrices: (updates) => {
                const { stocks } = get();
                set({
                    stocks: stocks.map((stock) => {
                        if (updates[stock.symbol]) {
                            const newPrice = updates[stock.symbol];
                            return {
                                ...stock,
                                price: newPrice,
                                history: [
                                    ...stock.history.slice(-49),
                                    { timestamp: Date.now(), value: newPrice }
                                ],
                            };
                        }
                        return stock;
                    }),
                });
            },

            setStocks: (stocks) => set({ stocks }),

            unlockAchievement: (id) => {
                const { achievements } = get();
                const achievement = achievements.find((a) => a.id === id);

                if (achievement && !achievement.unlocked) {
                    set({
                        achievements: achievements.map((a) =>
                            a.id === id ? { ...a, unlocked: true } : a
                        ),
                    });

                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    Alert.alert(
                        `${achievement.icon} Achievement Unlocked!`,
                        achievement.title,
                        [{ text: 'Nice!', style: 'default' }]
                    );
                    get().addXp(achievement.xpReward);
                    analytics.trackAchievementUnlocked(achievement.id, achievement.tier, achievement.xpReward);
                }
            },

            checkAndUnlockAchievements: () => {
                const { cash, holdings, stocks, trades, achievements, lastAchievementCheck } = get();
                const now = Date.now();

                // Performance Optimization: Debounce check (max once per 2 seconds)
                // Unless it's a critical milestone check (can be forced if needed, but 2s is fine for UI)
                if (now - lastAchievementCheck < 2000) {
                    return;
                }
                set({ lastAchievementCheck: now });

                // Use setTimeout to unblock the main thread for UI animations
                setTimeout(() => {
                    const portfolioValue = Object.values(holdings).reduce((total, item) => {
                        const stock = stocks.find((s) => s.symbol === item.symbol);
                        if (!stock) return total;
                        return total + (item.quantity * stock.price);
                    }, 0);
                    const totalEquity = cash + portfolioValue;

                    const totalProfit = trades.reduce((sum, trade) => {
                        if (trade.type === 'SELL' && (trade as any).pnl) {
                            return sum + (trade as any).pnl;
                        }
                        return sum;
                    }, 0);

                    let winStreak = 0;
                    // Optimize: Only check last 50 trades for streak if list is huge
                    const recentTrades = trades.slice(0, 50);
                    for (const trade of recentTrades) {
                        if (trade.type === 'SELL' && (trade as any).pnl) {
                            if ((trade as any).pnl > 0) {
                                winStreak++;
                            } else {
                                break;
                            }
                        }
                    }

                    const updatedAchievements = achievements.map((ach) => {
                        // Skip if already unlocked to save processing
                        if (ach.unlocked) return ach;

                        let progress = ach.progress;

                        if (['first_trade', 'getting_started', 'day_trader', 'active_investor', 'wall_street_wolf', 'market_maker'].includes(ach.id)) {
                            progress = trades.length;
                        }
                        else if (['in_the_green', 'pocket_change', 'side_hustle', 'salary_match', 'six_figures', 'high_roller', 'tycoon'].includes(ach.id)) {
                            progress = Math.max(0, totalProfit);
                        }
                        else if (['saving_up', '15k_club', '25k_club', '50k_club', '100k_club', 'quarter_mil', 'millionaire'].includes(ach.id)) {
                            progress = totalEquity;
                        }
                        else if (['testing_waters', 'diversified', 'portfolio_master', 'fund_manager', 'index_fund', 'market_owner'].includes(ach.id)) {
                            progress = Object.keys(holdings).length;
                        }
                        else if (['lucky_break', 'hot_streak', 'on_fire', 'trader_pro', 'unstoppable', 'oracle'].includes(ach.id)) {
                            progress = winStreak;
                        }
                        // Wolf of Wall Street Specials
                        else if (ach.id === 'fun_coupons') {
                            // Check max profit in single trade
                            const maxTradeProfit = trades.reduce((max, t) => Math.max(max, (t as any).pnl || 0), 0);
                            progress = maxTradeProfit;
                        }
                        else if (ach.id === 'pump_numbers') {
                            // Check trades today
                            const today = new Date().toDateString();
                            const tradesToday = trades.filter(t => new Date(t.timestamp).toDateString() === today).length;
                            progress = tradesToday;
                        }

                        return { ...ach, progress };
                    });

                    // Batch updates to avoid multiple re-renders
                    let hasUpdates = false;
                    const finalAchievements = updatedAchievements.map(ach => {
                        if (!ach.unlocked && ach.progress >= ach.target) {
                            hasUpdates = true;
                            // Trigger alert in next tick to avoid freeze
                            setTimeout(() => get().unlockAchievement(ach.id), 100);
                            return { ...ach, unlocked: true }; // Optimistic update
                        }
                        return ach;
                    });

                    if (hasUpdates) {
                        set({ achievements: finalAchievements });
                    }
                }, 0);
            },

            // Updated for 5-challenge system
            updateChallengeProgress: (type, amount) => {
                const { dailyChallenges } = get();
                if (!dailyChallenges) return;

                const updatedChallenges = dailyChallenges.challenges.map(challenge => {
                    if (challenge.type === type && !challenge.completed) {
                        const newProgress = challenge.progress + amount;
                        const isComplete = newProgress >= challenge.target;

                        if (isComplete && !challenge.completed) {
                            // Award XP for completion
                            get().addXp(challenge.reward.xp);

                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            Alert.alert(
                                '🎉 Challenge Complete!',
                                `${challenge.title}\n+${challenge.reward.xp} XP`,
                                [{ text: 'Nice!', style: 'default' }]
                            );
                            analytics.trackChallengeCompleted(challenge.type, { xp: challenge.reward.xp });
                        }

                        return {
                            ...challenge,
                            progress: Math.min(newProgress, challenge.target),
                            completed: isComplete
                        };
                    }
                    return challenge;
                });

                set({
                    dailyChallenges: {
                        ...dailyChallenges,
                        challenges: updatedChallenges
                    }
                });
            },

            checkLoginStreak: () => {
                const today = new Date().toISOString().split('T')[0];
                const { lastLoginDate, loginStreak, dailyChallenges } = get();

                // Generate new challenges if needed
                if (shouldResetChallenges(dailyChallenges?.date || null)) {
                    const newChallenges = generateDailyChallenges();

                    // Auto-complete the streak challenge
                    const updatedChallenges: DailyChallenges = {
                        ...newChallenges,
                        challenges: newChallenges.challenges.map(c =>
                            c.type === 'streak' ? { ...c, progress: 1, completed: true } : c
                        )
                    };

                    set({ dailyChallenges: updatedChallenges });

                    // Award XP for streak challenge
                    const streakChallenge = updatedChallenges.challenges.find(c => c.type === 'streak');
                    if (streakChallenge) {
                        get().addXp(streakChallenge.reward.xp);
                    }

                    analytics.trackChallengeStarted('daily_challenges_generated');
                }

                if (lastLoginDate === today) {
                    return loginStreak;
                }

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                const newStreak = lastLoginDate === yesterdayStr ? loginStreak + 1 : 1;

                set({
                    loginStreak: newStreak,
                    lastLoginDate: today
                });

                if (newStreak > 1) {
                    const bonusXp = newStreak * 10;
                    get().addXp(bonusXp);
                }

                return newStreak;
            },

            updateLeaderboard: () => {
                const { cash, holdings, stocks, username, level, achievements, leaderboard, equityHistory } = get();

                const portfolioValue = Object.values(holdings).reduce((total, item) => {
                    const stock = stocks.find((s) => s.symbol === item.symbol);
                    if (!stock) return total;
                    return total + (item.quantity * stock.price);
                }, 0);
                const equity = cash + portfolioValue;
                const achievementsUnlocked = achievements.filter((a) => a.unlocked).length;

                const newEntry: LeaderboardEntry = {
                    id: Date.now().toString(),
                    username,
                    equity,
                    level,
                    achievementsUnlocked,
                    timestamp: Date.now()
                };

                const updatedBoard = [...leaderboard, newEntry]
                    .sort((a, b) => b.equity - a.equity)
                    .slice(0, 10);

                const newHistory = [...equityHistory, { timestamp: Date.now(), value: equity }].slice(-50);

                set({
                    leaderboard: updatedBoard,
                    highScore: Math.max(equity, get().highScore),
                    equityHistory: newHistory
                });
            },

            syncAchievements: () => {
                const { achievements } = get();
                const syncedAchievements = ACHIEVEMENT_CATALOG.map(catalogItem => {
                    const existing = achievements.find(a => a.id === catalogItem.id);
                    return {
                        ...catalogItem,
                        progress: existing ? existing.progress : 0,
                        unlocked: existing ? existing.unlocked : false,
                        target: catalogItem.target ?? 0,
                        xpReward: catalogItem.xpReward ?? 0,
                        tier: catalogItem.tier ?? 'bronze'
                    };
                });

                set({ achievements: syncedAchievements });
            },

            reset: () => {
                get().updateLeaderboard();

                set({
                    cash: INITIAL_CASH,
                    holdings: {},
                    trades: [],
                    achievements: ACHIEVEMENT_CATALOG.map(ach => ({
                        ...ach,
                        progress: 0,
                        unlocked: false
                    })),
                    watchlist: [],
                    alerts: [],
                    dailyChallenges: null,
                    xp: 0,
                    level: 1,
                    cryptoOnboardingCompleted: false,
                });

                // Reset Crypto Store as well
                useCryptoStore.getState().reset();
            },
        }),
        {
            name: 'paper-trader-storage',
            storage: createJSONStorage(() => asyncStorageWrapper),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Error rehydrating state:', error);
                    Alert.alert(
                        'Data Recovery Error',
                        'Unable to restore your previous session. Starting fresh.',
                        [{ text: 'OK', style: 'default' }]
                    );
                }
            },
        }
    )
);
