import { DailyChallenge } from '../types';

const CHALLENGE_TEMPLATES = [
    {
        type: 'profit' as const,
        title: 'Profit Hunter',
        description: 'Make $500 in profit today',
        target: 500,
        reward: { xp: 200, cash: 100 }
    },
    {
        type: 'volume' as const,
        title: 'Active Trader',
        description: 'Complete 10 trades today',
        target: 10,
        reward: { xp: 150 }
    },
    {
        type: 'sector' as const,
        title: 'Tech Investor',
        description: 'Trade 5 different Tech stocks',
        target: 5,
        reward: { xp: 100 }
    },
    {
        type: 'sector' as const,
        title: 'Finance Focus',
        description: 'Trade 3 Finance stocks',
        target: 3,
        reward: { xp: 100 }
    },
    {
        type: 'streak' as const,
        title: 'Winning Streak',
        description: 'Make 5 profitable trades in a row',
        target: 5,
        reward: { xp: 250, cash: 200 }
    },
    {
        type: 'profit' as const,
        title: 'Big Gains',
        description: 'Make $1,000 in profit today',
        target: 1000,
        reward: { xp: 300, cash: 250 }
    }
];

export function generateDailyChallenge(): DailyChallenge {
    const today = new Date().toISOString().split('T')[0];
    const template = CHALLENGE_TEMPLATES[Math.floor(Math.random() * CHALLENGE_TEMPLATES.length)];

    return {
        id: `challenge_${today}`,
        date: today,
        title: template.title,
        description: template.description,
        type: template.type,
        target: template.target,
        progress: 0,
        reward: template.reward,
        completed: false
    };
}

export function shouldGenerateNewChallenge(currentChallenge: DailyChallenge | null): boolean {
    const today = new Date().toISOString().split('T')[0];
    return !currentChallenge || currentChallenge.date !== today;
}
