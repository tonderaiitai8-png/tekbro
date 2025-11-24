import { Achievement } from '../types';

export const ACHIEVEMENT_CATALOG: Achievement[] = [
    // --- TRADING VOLUME (1-6) ---
    {
        id: 'first_trade',
        title: 'First Steps',
        description: 'Complete your first trade',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🎯',
        xpReward: 50
    },
    {
        id: 'getting_started',
        title: 'Getting Started',
        description: 'Complete 5 trades',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '👟',
        xpReward: 100
    },
    {
        id: 'day_trader',
        title: 'Day Trader',
        description: 'Complete 10 trades',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 10,
        icon: '📊',
        xpReward: 200
    },
    {
        id: 'active_investor',
        title: 'Active Investor',
        description: 'Complete 50 trades',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '💼',
        xpReward: 500
    },
    {
        id: 'wall_street_wolf',
        title: 'Wall Street Wolf',
        description: 'Complete 100 trades',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 100,
        icon: '🐺',
        xpReward: 1000
    },
    {
        id: 'market_maker',
        title: 'Market Maker',
        description: 'Complete 500 trades',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 500,
        icon: '🏦',
        xpReward: 5000
    },

    // --- PROFIT GOALS (7-13) ---
    {
        id: 'in_the_green',
        title: 'In The Green',
        description: 'Make your first profit',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🌱',
        xpReward: 50
    },
    {
        id: 'pocket_change',
        title: 'Pocket Change',
        description: 'Earn $100 in total profit',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 100,
        icon: '💵',
        xpReward: 100
    },
    {
        id: 'side_hustle',
        title: 'Side Hustle',
        description: 'Earn $1,000 in total profit',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 1000,
        icon: '💰',
        xpReward: 300
    },
    {
        id: 'salary_match',
        title: 'Salary Match',
        description: 'Earn $5,000 in total profit',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5000,
        icon: '💳',
        xpReward: 800
    },
    {
        id: 'six_figures',
        title: 'Big Earner',
        description: 'Earn $10,000 in total profit',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 10000,
        icon: '💎',
        xpReward: 1500
    },
    {
        id: 'high_roller',
        title: 'High Roller',
        description: 'Earn $50,000 in total profit',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50000,
        icon: '🛥️',
        xpReward: 3000
    },
    {
        id: 'tycoon',
        title: 'Tycoon',
        description: 'Earn $100,000 in total profit',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 100000,
        icon: '🏰',
        xpReward: 5000
    },

    // --- EQUITY MILESTONES (14-20) ---
    {
        id: 'saving_up',
        title: 'Saving Up',
        description: 'Reach $12,000 total equity',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 12000,
        icon: '🐖',
        xpReward: 100
    },
    {
        id: '15k_club',
        title: '$15K Club',
        description: 'Reach $15,000 total equity',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 15000,
        icon: '🥉',
        xpReward: 200
    },
    {
        id: '25k_club',
        title: '$25K Club',
        description: 'Reach $25,000 total equity',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 25000,
        icon: '🥈',
        xpReward: 500
    },
    {
        id: '50k_club',
        title: '$50K Club',
        description: 'Reach $50,000 total equity',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 50000,
        icon: '🥇',
        xpReward: 1000
    },
    {
        id: '100k_club',
        title: '$100K Club',
        description: 'Reach $100,000 total equity',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 100000,
        icon: '🏆',
        xpReward: 2000
    },
    {
        id: 'quarter_mil',
        title: 'Quarter Mil',
        description: 'Reach $250,000 total equity',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 250000,
        icon: '👑',
        xpReward: 4000
    },
    {
        id: 'millionaire',
        title: 'Millionaire',
        description: 'Reach $1,000,000 total equity',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 1000000,
        icon: '🚀',
        xpReward: 10000
    },

    // --- DIVERSIFICATION (21-26) ---
    {
        id: 'testing_waters',
        title: 'Testing Waters',
        description: 'Own 3 different stocks',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '🧪',
        xpReward: 50
    },
    {
        id: 'diversified',
        title: 'Diversified',
        description: 'Own 5 different stocks',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '📈',
        xpReward: 100
    },
    {
        id: 'portfolio_master',
        title: 'Portfolio Master',
        description: 'Own 10 different stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 10,
        icon: '💼',
        xpReward: 300
    },
    {
        id: 'fund_manager',
        title: 'Fund Manager',
        description: 'Own 15 different stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 15,
        icon: '🗂️',
        xpReward: 600
    },
    {
        id: 'index_fund',
        title: 'Index Fund',
        description: 'Own 20 different stocks',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 20,
        icon: '🌐',
        xpReward: 1000
    },
    {
        id: 'market_owner',
        title: 'Market Owner',
        description: 'Own 30 different stocks',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 30,
        icon: '🌍',
        xpReward: 2000
    },

    // --- WIN STREAKS (27-32) ---
    {
        id: 'lucky_break',
        title: 'Lucky Break',
        description: '2 profitable trades in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 2,
        icon: '🍀',
        xpReward: 50
    },
    {
        id: 'hot_streak',
        title: 'Hot Streak',
        description: '3 profitable trades in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '🔥',
        xpReward: 100
    },
    {
        id: 'on_fire',
        title: 'On Fire',
        description: '5 profitable trades in a row',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '🧨',
        xpReward: 300
    },
    {
        id: 'trader_pro',
        title: 'Trader Pro',
        description: '10 profitable trades in a row',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 10,
        icon: '🎓',
        xpReward: 800
    },
    {
        id: 'unstoppable',
        title: 'Unstoppable',
        description: '15 profitable trades in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 15,
        icon: '⚡',
        xpReward: 1500
    },
    {
        id: 'oracle',
        title: 'The Oracle',
        description: '20 profitable trades in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 20,
        icon: '🔮',
        xpReward: 3000
    },

    // --- LOGIN STREAKS (33-37) ---
    {
        id: 'newcomer',
        title: 'Newcomer',
        description: 'Login 2 days in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 2,
        icon: '👋',
        xpReward: 50
    },
    {
        id: 'regular',
        title: 'Regular',
        description: 'Login 3 days in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '📅',
        xpReward: 100
    },
    {
        id: 'dedicated',
        title: 'Dedicated',
        description: 'Login 7 days in a row',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 7,
        icon: '🗓️',
        xpReward: 500
    },
    {
        id: 'committed',
        title: 'Committed',
        description: 'Login 14 days in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 14,
        icon: '🔒',
        xpReward: 1000
    },
    {
        id: 'addicted',
        title: 'Addicted',
        description: 'Login 30 days in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 30,
        icon: '💉',
        xpReward: 2500
    },

    // --- SPECIAL / FUN (38-45) ---
    {
        id: 'penny_pincher',
        title: 'Penny Pincher',
        description: 'Buy a stock under $5',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🪙',
        xpReward: 50
    },
    {
        id: 'big_spender',
        title: 'Big Spender',
        description: 'Buy a stock over $100',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '💸',
        xpReward: 100
    },
    {
        id: 'whale_watcher',
        title: 'Whale Watcher',
        description: 'Buy a stock over $500',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🐋',
        xpReward: 300
    },
    {
        id: 'tech_enthusiast',
        title: 'Tech Head',
        description: 'Own 3 Tech stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '💻',
        xpReward: 200
    },
    {
        id: 'finance_bro',
        title: 'Finance Bro',
        description: 'Own 3 Finance stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '👔',
        xpReward: 200
    },
    {
        id: 'healthy_choice',
        title: 'Healthy Choice',
        description: 'Own 3 Healthcare stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '🏥',
        xpReward: 200
    },
    {
        id: 'yolo',
        title: 'YOLO',
        description: 'Invest > 50% cash in one trade',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🎰',
        xpReward: 500
    },
    {
        id: 'market_mover',
        title: 'Market Mover',
        description: 'Trade $1M total volume',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 1000000,
        icon: '🏗️',
        xpReward: 5000
    },

    // --- LEVELING (46-50) ---
    {
        id: 'level_5',
        title: 'Level 5',
        description: 'Reach Level 5',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '⭐',
        xpReward: 200
    },
    {
        id: 'level_10',
        title: 'Level 10',
        description: 'Reach Level 10',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 10,
        icon: '🌟',
        xpReward: 500
    },
    {
        id: 'level_20',
        title: 'Level 20',
        description: 'Reach Level 20',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 20,
        icon: '✨',
        xpReward: 1000
    },
    {
        id: 'level_50',
        title: 'Level 50',
        description: 'Reach Level 50',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '👑',
        xpReward: 5000
    },
    {
        id: 'legend',
        title: 'Legend',
        description: 'Unlock 40 Achievements',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 40,
        icon: '🏆',
        xpReward: 10000
    }
];
