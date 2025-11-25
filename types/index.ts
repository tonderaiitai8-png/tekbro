export interface Challenge {
    id: string;
    title: string;
    description: string;
    reward: number; // XP reward
    progress: number;
    target: number;
    type: 'trade' | 'profit' | 'streak' | 'watchlist' | 'portfolio';
    completed: boolean;
}

export interface DailyChallenges {
    date: string; // YYYY-MM-DD format
    challenges: Challenge[];
}
