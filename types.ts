// Simplified types for Phase 1
export interface PricePoint {
    timestamp: number;
    value: number;
}

export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    history: PricePoint[];
    sector: 'Tech' | 'Finance' | 'Healthcare' | 'Consumer' | 'Energy' | 'Crypto' | 'Entertainment' | 'Index';
    marketCap: number;
    volatility: number; // 1-10 scale, affects price movement
    description: string;
}

export interface PortfolioItem {
    symbol: string;
    quantity: number;
    averageCost: number;
}

export interface Trade {
    id: string;
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    timestamp: number;
}

// Sprint 2: Achievement type
export interface Achievement {
    id: string;
    title: string;
    description: string;
    tier: 'bronze' | 'silver' | 'gold';
    unlocked: boolean;
    progress: number; // Current progress value
    target: number; // Target value to unlock
    icon: string;
    xpReward: number;
}

export interface NewsItem {
    id: string;
    headline: string;
    timestamp: number;
}

export interface PriceAlert {
    id: string;
    symbol: string;
    targetPrice: number;
    type: 'ABOVE' | 'BELOW';
    active: boolean;
}

export interface DailyChallenge {
    id: string;
    date: string; // YYYY-MM-DD
    title: string;
    description: string;
    type: 'profit' | 'volume' | 'sector' | 'streak';
    target: number;
    progress: number;
    reward: { xp: number; cash?: number };
    completed: boolean;
}

export interface LeaderboardEntry {
    id: string;
    username: string;
    equity: number;
    level: number;
    isUser?: boolean;
    rank?: number;
    achievementsUnlocked: number;
    timestamp?: number;
}

export interface NewsEvent {
    id: string;
    timestamp: number;
    type: 'COMPANY' | 'SECTOR' | 'MARKET' | 'ECONOMIC';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    headline: string;
    symbol?: string; // For company-specific news
    sector?: string; // For sector news
    impact: number; // -1 to 1 (negative to positive)
    suggestion?: 'BUY' | 'SELL' | 'HOLD';
}

export interface AppState {
    // Core state
    cash: number;
    holdings: Record<string, PortfolioItem>;
    stocks: Stock[];
    trades: Trade[];
    achievements: Achievement[];
    watchlist: string[];
    news: NewsItem[];
    alerts: PriceAlert[];
    xp: number;
    level: number;
    username: string;
    avatar: string;
    dailyChallenge: DailyChallenge | null;
    loginStreak: number;
    lastLoginDate: string;
    highScore: number;
    leaderboard: LeaderboardEntry[];
    onboardingCompleted: boolean;
    equityHistory: PricePoint[];
    activeNews: NewsEvent | null;
    marketSentiment: number;

    // Actions
    buyStock: (symbol: string, quantity: number, price: number) => void;
    sellStock: (symbol: string, quantity: number, price: number) => void;
    updateStockPrice: (symbol: string, newPrice: number) => void;
    setStocks: (stocks: Stock[]) => void;
    unlockAchievement: (id: string) => void;
    setNews: (news: NewsItem[]) => void;
    addAlert: (alert: PriceAlert) => void;
    removeAlert: (id: string) => void;
    addXp: (amount: number) => void;
    setProfile: (username: string, avatar: string) => void;
    reset: () => void;
    checkLoginStreak: () => void;
    setActiveNews: (news: NewsEvent | null) => void;
    setMarketSentiment: (sentiment: number) => void;
}
