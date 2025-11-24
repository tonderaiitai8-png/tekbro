import { DailyChallenge } from '../types';

const CHALLENGE_TEMPLATES = [
    {
        id: 'volume_trader',
        title: 'Volume Trader',
        description: 'Trade 5 different stocks today',
        type: 'volume',
        target: 5,
        reward: { xp: 100, cash: 50 }
    },
    {
        id: 'profit_hunter',
        title: 'Profit Hunter',
        description: 'Make £500 in profit today',
        type: 'profit',
        target: 500,
        reward: { xp: 150, cash: 100 }
    },
    {
        id: 'big_spender',
        title: 'Big Spender',
        description: 'Invest £2,000 in a single trade',
        type: 'invest',
        target: 2000,
        reward: { xp: 120 }
    },
    {
        id: 'diversifier',
        title: 'Diversifier',
        description: 'Hold stocks in 3 different sectors',
        type: 'diversity',
        target: 3,
        reward: { xp: 100 }
    },
    {
        id: 'market_mover',
        title: 'Market Mover',
        description: 'Complete 10 trades today',
        type: 'trades',
        target: 10,
        reward: { xp: 200, cash: 150 }
    }
];

export const generateDailyChallenge = (): DailyChallenge => {
    const randomIndex = Math.floor(Math.random() * CHALLENGE_TEMPLATES.length);
    const template = CHALLENGE_TEMPLATES[randomIndex];

    // Add some variance to targets
    const variance = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const target = Math.max(1, template.target + variance);

    return {
        id: `${template.id}_${Date.now()}`,
        title: template.title,
        description: template.description.replace(template.target.toString(), target.toString()),
        type: template.type as any,
        target: target,
        progress: 0,
        completed: false,
        reward: template.reward,
        date: new Date().toISOString().split('T')[0]
    };
};
