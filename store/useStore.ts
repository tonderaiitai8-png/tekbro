import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage, appStorage } from '../utils/storage';
import { AppState as AppStateType, LeaderboardEntry, NewsEvent, DailyChallenges, NewsItem, Mission, TradingStats } from '../types';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';
import { ACHIEVEMENT_CATALOG } from '../constants/achievements';
import { ThemeType } from '../constants/theme';
import { generateDailyChallenges, shouldResetChallenges } from '../utils/dailyChallenges';
import { analytics } from '../utils/analytics';
import { useCryptoStore, setMainStoreHelpers } from './useCryptoStore';

const INITIAL_CASH = 1000000;

interface AppState extends AppStateType {
    setActiveNews: (news: NewsEvent | null) => void;
    setMarketSentiment: (sentiment: number) => void;
    checkAndUnlockAchievements: () => void;
    toggleWatchlist: (symbol: string) => void;
    initializeWatchlist: () => Promise<void>;
    updateChallengeProgress: (type: string, amount: number) => void;
    checkLoginStreak: () => number;
    updateLeaderboard: () => void;
    syncAchievements: () => void;
    updateMarketPrices: (updates: Record<string, number>) => void;
    cryptoOnboardingCompleted: boolean;
    setCryptoOnboardingCompleted: (completed: boolean) => void;
    lastAchievementCheck: number;

    setNews: (news: NewsItem[]) => void;
    addAlert: (alert: any) => void;
    removeAlert: (id: string) => void;
    addXp: (amount: number) => void;
    setProfile: (username: string, avatar: string) => void;
    buyStock: (symbol: string, quantity: number, price: number) => void;
    sellStock: (symbol: string, quantity: number, price: number) => void;
    updateStockPrice: (symbol: string, newPrice: number) => void;
    setStocks: (stocks: any[]) => void;
    unlockAchievement: (id: string) => void;
    reset: () => void;
    dismissNews: (id: string) => void;
    setOnboardingCompleted: (completed: boolean) => void;

    addCash: (amount: number) => void;

    currentTheme: ThemeType;
    setTheme: (theme: ThemeType) => void;

    currency: string;
    setCurrency: (currency: string) => void;

    missions: Mission[];
    setMissions: (missions: Mission[]) => void;
    updateMissionProgress: (id: string, progress: number) => void;

    activeMissionAlert: { title: string; xp: number } | null;
    setActiveMissionAlert: (alert: { title: string; xp: number } | null) => void;

    tradingStats: TradingStats;

    levelUpNotification: { level: number; rewards: string[] } | null;
    setLevelUpNotification: (notification: { level: number; rewards: string[] } | null) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Initial state
            username: 'Trader',
            avatar: 'default',
            cash: INITIAL_CASH,
            stocks: [],
            holdings: {},
            watchlist: [],
            trades: [],
            news: [],
            activeNews: null,
            marketSentiment: 50,
            xp: 0,
            level: 1,
            achievements: ACHIEVEMENT_CATALOG.map(ach => ({
                ...ach,
                progress: 0,
                target: ach.target ?? ach.condition.value,
                xpReward: ach.xpReward,
                tier: ach.tier ?? 'bronze',
                unlocked: false
            })),
            loginStreak: 0,
            lastLoginDate: '',
            dailyChallenges: generateDailyChallenges(),
            leaderboard: [],
            equityHistory: [],
            cryptoOnboardingCompleted: false,
            lastAchievementCheck: 0,
            alerts: [],
            highScore: 0,
            onboardingCompleted: false,
            currentTheme: 'midnight',
            currency: 'GBP',
            missions: [],
            activeMissionAlert: null,
            levelUpNotification: null,
            tradingStats: {
                totalProfit: 0,
                totalLoss: 0,
                winStreak: 0,
                currentWinStreak: 0,
                maxGain: 0,
                maxLoss: 0,
                profitableTradesCount: 0,
                totalTradesCount: 0
            },

            setLevelUpNotification: (notification) => set({ levelUpNotification: notification }),
            setActiveMissionAlert: (alert) => set({ activeMissionAlert: alert }),

            addCash: (amount) => set((state) => ({ cash: state.cash + amount })),

            setMissions: (missions) => set({ missions }),

            updateMissionProgress: (id, progress) => {
                const { missions } = get();
                const updatedMissions = missions.map(m => {
                    if (m.id === id && m.status === 'ACTIVE') {
                        const newProgress = m.progress + progress;
                        const isComplete = newProgress >= m.target;

                        if (isComplete) {
                            get().addXp(m.reward.xp);
                            if (m.reward.cash) {
                                set(state => ({ cash: state.cash + m.reward.cash! }));
                            }
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                            // Trigger Mission Alert
                            get().setActiveMissionAlert({ title: m.title, xp: m.reward.xp });

                            return { ...m, progress: m.target, status: 'COMPLETED' as const };
                        }
                        return { ...m, progress: newProgress };
                    }
                    return m;
                });
                set({ missions: updatedMissions });
            },

            setTheme: (theme) => set({ currentTheme: theme }),

            setCurrency: (currency) => set({ currency }),

            setProfile: (username, avatar) => set({ username, avatar }),

            reset: () => {
                get().updateLeaderboard();
                set({
                    cash: INITIAL_CASH,
                    holdings: {},
                    watchlist: [],
                    trades: [],
                    xp: 0,
                    level: 1,
                    achievements: ACHIEVEMENT_CATALOG.map(ach => ({
                        ...ach,
                        progress: 0,
                        target: ach.target ?? ach.condition.value,
                        xpReward: ach.xpReward,
                        tier: ach.tier ?? 'bronze',
                        unlocked: false
                    })),
                    loginStreak: 0,
                    lastLoginDate: '',
                    equityHistory: [],
                    cryptoOnboardingCompleted: false,
                    dailyChallenges: generateDailyChallenges(),
                    alerts: [],
                    activeNews: null,
                    onboardingCompleted: false, // Reset state
                    currency: 'GBP',
                    currentTheme: 'midnight',
                    tradingStats: {
                        totalProfit: 0,
                        totalLoss: 0,
                        winStreak: 0,
                        currentWinStreak: 0,
                        maxGain: 0,
                        maxLoss: 0,
                        profitableTradesCount: 0,
                        totalTradesCount: 0
                    },
                    missions: [],
                    activeMissionAlert: null,
                    levelUpNotification: null
                });
                // Reset Crypto Store as well
                useCryptoStore.getState().resetCrypto();
                // Reset Onboarding (Async)
                appStorage.setAsync('onboarding_completed', 'false');
            },

            buyStock: (symbol, quantity, price) => {
                const { cash, holdings, trades, stocks, missions, updateMissionProgress } = get();
                const cost = quantity * price;

                if (cash >= cost) {
                    const currentHolding = holdings[symbol] || { symbol, quantity: 0, averagePrice: 0, averageCost: 0 };
                    const newQuantity = currentHolding.quantity + quantity;
                    // Fix average price calculation
                    const currentTotalCost = currentHolding.averagePrice * currentHolding.quantity;
                    const newAveragePrice = (currentTotalCost + cost) / newQuantity;

                    set({
                        cash: cash - cost,
                        holdings: {
                            ...holdings,
                            [symbol]: { ...currentHolding, quantity: newQuantity, averagePrice: newAveragePrice, averageCost: newAveragePrice }
                        },
                        trades: [
                            {
                                id: Date.now().toString(),
                                symbol,
                                type: 'BUY',
                                quantity,
                                price,
                                timestamp: Date.now()
                            },
                            ...trades
                        ]
                    });

                    get().addXp(10);
                    get().updateChallengeProgress('volume', 1);
                    const stock = stocks.find(s => s.symbol === symbol);
                    if (stock?.sector === 'Tech') {
                        get().updateChallengeProgress('sector', 1);
                    }

                    // Check Mission Progress
                    import('../utils/missionEngine').then(({ checkMissionProgress }) => {
                        const { getTotalCryptoValue } = require('./useCryptoStore').useCryptoStore.getState();
                        checkMissionProgress('BUY', { symbol, quantity, price }, missions, updateMissionProgress, {
                            cash: get().cash,
                            holdings: get().holdings,
                            stocks: get().stocks,
                            getTotalCryptoValue
                        });
                    });

                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    get().checkAndUnlockAchievements();
                    analytics.trackTrade('BUY', symbol, quantity, price);
                } else {
                    Alert.alert('Insufficient Funds', 'You do not have enough cash for this trade.');
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                }
            },

            sellStock: (symbol, quantity, price) => {
                const { cash, holdings, trades, missions, updateMissionProgress } = get();
                const currentHolding = holdings[symbol];

                if (currentHolding && currentHolding.quantity >= quantity) {
                    const revenue = quantity * price;
                    const newQuantity = currentHolding.quantity - quantity;
                    const profit = (price - currentHolding.averagePrice) * quantity;
                    const pnlPercent = ((price - currentHolding.averagePrice) / currentHolding.averagePrice) * 100;

                    // Remove holding if quantity is 0
                    const newHoldings = { ...holdings };
                    if (newQuantity > 0) {
                        newHoldings[symbol] = { ...currentHolding, quantity: newQuantity };
                    } else {
                        delete newHoldings[symbol];
                    }

                    set({
                        cash: cash + revenue,
                        holdings: newHoldings,
                        trades: [
                            {
                                id: Date.now().toString(),
                                symbol,
                                type: 'SELL',
                                quantity,
                                price,
                                timestamp: Date.now(),
                                pnl: profit,
                                pnlPercent
                            } as any,
                            ...trades
                        ]
                    });

                    // Update Trading Stats
                    const { tradingStats } = get();
                    const isWin = profit > 0;
                    const newCurrentWinStreak = isWin ? tradingStats.currentWinStreak + 1 : 0;

                    const newStats = {
                        totalProfit: isWin ? tradingStats.totalProfit + profit : tradingStats.totalProfit,
                        totalLoss: !isWin ? tradingStats.totalLoss + Math.abs(profit) : tradingStats.totalLoss,
                        winStreak: Math.max(tradingStats.winStreak, newCurrentWinStreak),
                        currentWinStreak: newCurrentWinStreak,
                        maxGain: Math.max(tradingStats.maxGain, pnlPercent),
                        maxLoss: !isWin ? Math.max(tradingStats.maxLoss, Math.abs(pnlPercent)) : tradingStats.maxLoss,
                        profitableTradesCount: isWin ? tradingStats.profitableTradesCount + 1 : tradingStats.profitableTradesCount,
                        totalTradesCount: tradingStats.totalTradesCount + 1
                    };

                    set({ tradingStats: newStats });

                    // XP Logic
                    get().addXp(10);
                    if (profit > 0) {
                        const multiplier = Math.min(20, Math.max(1, pnlPercent / 2));
                        const profitXp = Math.floor(50 * multiplier);
                        get().addXp(profitXp);
                        get().updateChallengeProgress('profit', profit);
                    } else {
                        get().addXp(5);
                    }

                    // Check Mission Progress
                    import('../utils/missionEngine').then(({ checkMissionProgress }) => {
                        const { getTotalCryptoValue } = require('./useCryptoStore').useCryptoStore.getState();
                        checkMissionProgress('SELL', { symbol, quantity, price, pnl: profit, pnlPercent }, missions, updateMissionProgress, {
                            cash: get().cash,
                            holdings: get().holdings,
                            stocks: get().stocks,
                            getTotalCryptoValue
                        });
                    });

                    get().updateChallengeProgress('volume', 1);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    get().checkAndUnlockAchievements();
                    analytics.trackTrade('SELL', symbol, quantity, price);
                } else {
                    Alert.alert('Invalid Trade', 'You do not own enough shares to sell.');
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                }
            },

            setStocks: (stocks) => set({ stocks }),

            setActiveNews: (news) => set({ activeNews: news }),

            setNews: (news) => set({ news }),

            dismissNews: (id) => set((state) => ({
                news: state.news.filter((n) => n.id !== id)
            })),

            setMarketSentiment: (sentiment) => set({ marketSentiment: sentiment }),

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
                if (!Number.isFinite(amount) || amount <= 0) return;

                let newXp = xp + amount;
                if (!Number.isFinite(newXp)) newXp = xp; // Safety fallback

                let newLevel = level;
                let leveledUp = false;
                let loopCount = 0;

                // Handle multiple level ups (with safety break)
                while (loopCount < 100) { // Max 100 levels at once to prevent freeze
                    const nextLevelXp = Math.floor(1000 * Math.pow(newLevel, 1.5));
                    if (newXp >= nextLevelXp) {
                        newLevel++;
                        leveledUp = true;
                    } else {
                        break;
                    }
                    loopCount++;
                }

                if (leveledUp) {
                    set({ xp: newXp, level: newLevel });
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                    // Trigger non-blocking UI
                    set({
                        levelUpNotification: {
                            level: newLevel,
                            rewards: ['New Features Unlocked', 'XP Bonus'] // Placeholder rewards
                        }
                    });
                } else {
                    set({ xp: newXp });
                }
            },

            checkAndUnlockAchievements: () => {
                const { achievements, cash, holdings, trades, stocks, lastAchievementCheck } = get();
                const now = Date.now();

                // Throttle checks to once every 2 seconds
                if (now - lastAchievementCheck < 2000) return;
                set({ lastAchievementCheck: now });

                // Run calculations in a non-blocking way if possible, but for now just optimize the loop
                // Calculate metrics ONCE
                // Calculate metrics ONCE (Optimized)
                const portfolioValue = Object.values(holdings).reduce((sum, h) => {
                    const stock = stocks.find(s => s.symbol === h.symbol);
                    return sum + (h.quantity * (stock?.price || 0));
                }, 0);

                const totalEquity = cash + portfolioValue; // + crypto value ideally

                // Use cached stats if available, otherwise fallback (migration)
                let { tradingStats } = get();
                if (!tradingStats) {
                    // Migration logic: Calculate from scratch if missing
                    const sellTrades = trades.filter(t => t.type === 'SELL');
                    const profitableTrades = sellTrades.filter(t => (t as any).pnl > 0);

                    let winStreak = 0;
                    let currentWinStreak = 0;
                    for (const trade of sellTrades) {
                        if ((trade as any).pnl > 0) {
                            currentWinStreak++;
                            winStreak = Math.max(winStreak, currentWinStreak);
                        } else {
                            currentWinStreak = 0;
                        }
                    }

                    tradingStats = {
                        totalProfit: sellTrades.reduce((sum, t) => sum + Math.max(0, (t as any).pnl || 0), 0),
                        totalLoss: sellTrades.reduce((sum, t) => sum + Math.abs(Math.min(0, (t as any).pnl || 0)), 0),
                        winStreak,
                        currentWinStreak,
                        maxGain: sellTrades.reduce((max, t) => Math.max(max, (t as any).pnlPercent || 0), 0),
                        maxLoss: sellTrades.reduce((max, t) => {
                            const pnlP = (t as any).pnlPercent || 0;
                            return pnlP < 0 ? Math.max(max, Math.abs(pnlP)) : max;
                        }, 0),
                        profitableTradesCount: profitableTrades.length,
                        totalTradesCount: sellTrades.length
                    };
                    set({ tradingStats });
                }

                const winRate = tradingStats.totalTradesCount > 0 ? (tradingStats.profitableTradesCount / tradingStats.totalTradesCount) * 100 : 0;
                const uniqueHoldings = Object.keys(holdings).length;

                let maxConcentration = 0;
                if (portfolioValue > 0) {
                    Object.values(holdings).forEach(item => {
                        const stock = stocks.find(s => s.symbol === item.symbol);
                        if (stock) {
                            const value = item.quantity * stock.price;
                            const percent = (value / totalEquity) * 100;
                            maxConcentration = Math.max(maxConcentration, percent);
                        }
                    });
                }

                const maxTradeVal = trades.reduce((max, t) => Math.max(max, t.quantity * t.price), 0);

                // Batch updates
                const newlyUnlockedIds: string[] = [];
                const updatedAchievements = achievements.map((ach) => {
                    if (ach.unlocked) return ach;

                    let progress = ach.progress;
                    const { type, value } = ach.condition;

                    switch (type) {
                        case 'netWorth': progress = totalEquity; break;
                        case 'trades': progress = trades.length; break;
                        case 'profit_trade': progress = tradingStats.profitableTradesCount > 0 ? 1 : 0; break;
                        case 'gain_percent': progress = tradingStats.maxGain; break;
                        case 'win_streak': progress = tradingStats.winStreak; break;
                        case 'win_rate': progress = trades.length >= 50 ? winRate : 0; break;
                        case 'diversity': progress = uniqueHoldings; break;
                        case 'concentration': progress = maxConcentration; break;
                        case 'trade_size': progress = maxTradeVal; break;
                        case 'low_cash': progress = cash <= value ? value : 0; break;
                        case 'loss_percent': progress = tradingStats.maxLoss; break;
                        case 'profit_total': progress = tradingStats.totalProfit; break;
                        case 'loss_total': progress = tradingStats.totalLoss; break;
                        case 'login_streak': progress = get().loginStreak; break;
                        case 'crypto_own': progress = 0; break; // Placeholder
                    }

                    // Special check for Cash Heavy
                    if (type === 'concentration' && value === 0) {
                        if (trades.length === 0 && uniqueHoldings === 0) {
                            progress = 0;
                        } else {
                            const cashPercent = (cash / totalEquity) * 100;
                            progress = cashPercent >= 90 ? 0 : 100;
                        }
                    }

                    const isUnlocked = progress >= ach.target;
                    if (isUnlocked) {
                        newlyUnlockedIds.push(ach.id);
                    }

                    return { ...ach, progress, unlocked: isUnlocked };
                });

                // Only update state if something changed
                const hasChanges = JSON.stringify(achievements) !== JSON.stringify(updatedAchievements);

                if (hasChanges) {
                    set({ achievements: updatedAchievements });

                    // Notify for newly unlocked achievements (limit to 1 to avoid spam)
                    if (newlyUnlockedIds.length > 0) {
                        const firstId = newlyUnlockedIds[0];
                        const ach = updatedAchievements.find(a => a.id === firstId);
                        if (ach) {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            Alert.alert(
                                `${ach.icon} Achievement Unlocked!`,
                                ach.title,
                                [{ text: 'Nice!', style: 'default' }]
                            );
                            get().addXp(ach.xpReward);
                            analytics.trackAchievementUnlocked(ach.id, ach.tier, ach.xpReward);
                        }
                    }
                }
            },

            toggleWatchlist: async (symbol) => {
                const { watchlist } = get();
                const isWatched = watchlist.includes(symbol);

                // Optimistic update
                if (isWatched) {
                    set({ watchlist: watchlist.filter(s => s !== symbol) });
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    // Persist removal
                    import('../src/features/watchlist/watchlistService').then(({ WatchlistService }) => {
                        WatchlistService.removeFromWatchlist(symbol).catch(console.error);
                    });
                } else {
                    set({ watchlist: [...watchlist, symbol] });
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    // Persist addition (Defaulting to STOCK for now, logic might need to distinguish type)
                    import('../src/features/watchlist/watchlistService').then(({ WatchlistService }) => {
                        // TODO: Determine type dynamically or pass it as argument
                        WatchlistService.addToWatchlist(symbol, 'STOCK').catch(console.error);
                    });
                }
            },

            initializeWatchlist: async () => {
                try {
                    const { WatchlistService } = await import('../src/features/watchlist/watchlistService');
                    const items = await WatchlistService.getWatchlist();
                    set({ watchlist: items.map(i => i.symbol) });
                } catch (error) {
                    console.error('Failed to load watchlist:', error);
                }
            },

            updateChallengeProgress: (type, amount) => {
                const { dailyChallenges } = get();
                if (!dailyChallenges) return;

                const updatedChallenges = dailyChallenges.challenges.map(challenge => {
                    if (challenge.type === type && !challenge.completed) {
                        const newProgress = challenge.progress + amount;
                        const isComplete = newProgress >= challenge.target;

                        if (isComplete && !challenge.completed) {
                            get().addXp(challenge.reward.xp);
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            Alert.alert(
                                '🎉 Challenge Complete!',
                                `${challenge.title}\n+${challenge.reward.xp} XP`,
                                [{ text: 'Nice!', style: 'default' }]
                            );
                            analytics.trackChallengeCompleted(challenge.type, { xp: challenge.reward.xp });
                        }

                        return { ...challenge, progress: Math.min(newProgress, challenge.target), completed: isComplete };
                    }
                    return challenge;
                });

                set({ dailyChallenges: { ...dailyChallenges, challenges: updatedChallenges } });
            },

            checkLoginStreak: () => {
                const { lastLoginDate, loginStreak, dailyChallenges } = get();
                const today = new Date().toISOString().split('T')[0];

                if (shouldResetChallenges(dailyChallenges?.date || null)) {
                    const newChallenges = generateDailyChallenges();
                    const updatedChallenges = {
                        ...newChallenges,
                        challenges: newChallenges.challenges.map(c =>
                            c.type === 'streak' ? { ...c, progress: 1, completed: true } : c
                        )
                    };
                    set({ dailyChallenges: updatedChallenges });
                    const streakChallenge = updatedChallenges.challenges.find(c => c.type === 'streak');
                    if (streakChallenge) get().addXp(streakChallenge.reward.xp);
                    analytics.trackChallengeStarted('daily_challenges_generated');
                }

                if (lastLoginDate === today) return loginStreak;

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                const newStreak = lastLoginDate === yesterdayStr ? loginStreak + 1 : 1;
                set({ lastLoginDate: today, loginStreak: newStreak });

                if (newStreak > 1) get().addXp(newStreak * 10);

                return newStreak;
            },

            updateLeaderboard: () => {
                const { username, cash, holdings, stocks, level, achievements, leaderboard, equityHistory } = get();
                const { getTotalCryptoValue } = useCryptoStore.getState();

                const stockValue = Object.values(holdings).reduce((sum, h) => {
                    const stock = stocks.find(s => s.symbol === h.symbol);
                    return sum + (h.quantity * (stock?.price || 0));
                }, 0);

                const totalEquity = cash + stockValue + getTotalCryptoValue();
                const achievementsUnlocked = achievements.filter(a => a.unlocked).length;

                const newEntry: LeaderboardEntry = {
                    id: Date.now().toString(),
                    username,
                    equity: totalEquity,
                    level,
                    achievementsUnlocked,
                    timestamp: Date.now()
                };

                const updatedBoard = [...leaderboard, newEntry].sort((a, b) => b.equity - a.equity).slice(0, 10);
                const newHistory = [...equityHistory, { timestamp: Date.now(), value: totalEquity }].slice(-50);

                set({
                    leaderboard: updatedBoard,
                    highScore: Math.max(totalEquity, get().highScore),
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
                        target: catalogItem.target ?? catalogItem.condition.value,
                        xpReward: catalogItem.xpReward,
                        tier: catalogItem.tier ?? 'bronze'
                    };
                });
                set({ achievements: syncedAchievements });
            },

            updateMarketPrices: (updates) => {
                const { stocks } = get();
                set({
                    stocks: stocks.map(stock => {
                        if (updates[stock.symbol]) {
                            const newPrice = updates[stock.symbol];
                            // Use the first history point as the "open" price for the session
                            const openPrice = stock.history.length > 0 ? stock.history[0].value : stock.price;
                            const change = ((newPrice - openPrice) / openPrice) * 100;

                            return {
                                ...stock,
                                price: newPrice,
                                change: change,
                                history: [...stock.history.slice(-49), { timestamp: Date.now(), value: newPrice }]
                            };
                        }
                        return stock;
                    })
                });
            },

            updateStockPrice: (symbol, newPrice) => {
                const { stocks } = get();
                set({
                    stocks: stocks.map(stock => {
                        if (stock.symbol === symbol) {
                            const openPrice = stock.history.length > 0 ? stock.history[0].value : stock.price;
                            const change = ((newPrice - openPrice) / openPrice) * 100;

                            return {
                                ...stock,
                                price: newPrice,
                                change: change,
                                history: [...stock.history.slice(-49), { timestamp: Date.now(), value: newPrice }]
                            };
                        }
                        return stock;
                    })
                });
            },

            setCryptoOnboardingCompleted: (completed) => set({ cryptoOnboardingCompleted: completed }),

            setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

            unlockAchievement: (id) => {
                const { achievements } = get();
                const updated = achievements.map(a => a.id === id ? { ...a, unlocked: true } : a);
                set({ achievements: updated });
            }
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Ensure missions is initialized
                    if (!state.missions) state.missions = [];
                    // Ensure tradingStats is initialized
                    if (!state.tradingStats) {
                        state.tradingStats = {
                            totalProfit: 0,
                            totalLoss: 0,
                            winStreak: 0,
                            currentWinStreak: 0,
                            maxGain: 0,
                            maxLoss: 0,
                            profitableTradesCount: 0,
                            totalTradesCount: 0
                        };
                    }
                }
            },
            partialize: (state) => {
                // Exclude transient UI states from persistence
                const {
                    activeNews,
                    activeMissionAlert,
                    levelUpNotification,
                    ...persistedState
                } = state;
                return persistedState;
            }
        }
    )
);

// Initialize Crypto Store Helpers
// This wires up the two stores so Crypto can access Cash/XP/Achievements
setMainStoreHelpers(
    () => useStore.getState().cash,
    (amount) => useStore.setState({ cash: amount }),
    (amount) => useStore.getState().addXp(amount),
    (id) => useStore.getState().unlockAchievement(id),
    () => useStore.getState().checkAndUnlockAchievements(),
    (type, amount) => useStore.getState().updateChallengeProgress(type, amount),
    () => useStore.getState().missions,
    (id, progress) => useStore.getState().updateMissionProgress(id, progress)
);
