import { DailyChallenge, DailyChallenges } from '../types';

/**
 * Generate 5 unique daily challenges
 */
export function generateDailyChallenges(): DailyChallenges {
    const today = new Date().toISOString().split('T')[0];

    const challenges: DailyChallenge[] = [
        // Challenge 1: Trade Volume
        {
            id: 'trade-volume',
            date: today,
            title: 'Active Trader',
            description: 'Make 10 trades today',
            type: 'volume',
            target: 10,
            progress: 0,
            reward: { xp: 50 },
            completed: false,
            icon: '📊'
        },
        // Challenge 2: Profit Target
        {
            id: 'profit-target',
            date: today,
            title: 'Profit Master',
            description: 'Earn £500 profit today',
            type: 'profit',
            target: 500,
            progress: 0,
            reward: { xp: 75 },
            completed: false,
            icon: '💰'
        },
        // Challenge 3: Streak Maintenance
        {
            id: 'login-streak',
            date: today,
            title: 'Consistency King',
            description: 'Maintain your login streak',
            type: 'streak',
            target: 1,
            progress: 0,
            reward: { xp: 25 },
            completed: false,
            icon: '🔥'
        },
        // Challenge 4: Sector Focus
        {
            id: 'sector-focus',
            date: today,
            title: 'Tech Investor',
            description: 'Trade 5 Tech stocks',
            type: 'sector',
            target: 5,
            progress: 0,
            reward: { xp: 40 },
            completed: false,
            icon: '💻'
        },
        // Challenge 5: Portfolio Growth
        {
            id: 'portfolio-growth',
            date: today,
            title: 'Portfolio Builder',
            description: 'Increase net worth by 2%',
            type: 'growth',
            target: 2,
            progress: 0,
            reward: { xp: 60 },
            completed: false,
            icon: '📈'
        }
    ];

    return {
        date: today,
        challenges
    };
}

/**
 * Check if challenges need to be reset (new day)
 */
export function shouldResetChallenges(lastChallengeDate: string | null): boolean {
    const today = new Date().toISOString().split('T')[0];
    return !lastChallengeDate || lastChallengeDate !== today;
}
