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
        xpReward: 100
    },
    {
        id: 'getting_started',
        title: 'Getting Started',
        description: 'Complete 50 trades',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '👟',
        xpReward: 500
    },
    {
        id: 'day_trader',
        title: 'Day Trader',
        description: 'Complete 250 trades',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 250,
        icon: '📊',
        xpReward: 1500
    },
    {
        id: 'active_investor',
        title: 'Active Investor',
        description: 'Complete 1,000 trades',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 1000,
        icon: '💼',
        xpReward: 3000
    },
    {
        id: 'wall_street_wolf',
        title: 'Wall Street Wolf',
        description: 'Complete 5,000 trades',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 5000,
        icon: '🐺',
        xpReward: 10000
    },
    {
        id: 'market_maker',
        title: 'Market Maker',
        description: 'Complete 10,000 trades',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 10000,
        icon: '🏦',
        xpReward: 25000
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
        xpReward: 100
    },
    {
        id: 'pocket_change',
        title: 'Pocket Change',
        description: 'Earn £50,000 in total profit',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 50000,
        icon: '💵',
        xpReward: 1000
    },
    {
        id: 'side_hustle',
        title: 'Side Hustle',
        description: 'Earn £250,000 in total profit',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 250000,
        icon: '💰',
        xpReward: 2500
    },
    {
        id: 'salary_match',
        title: 'Salary Match',
        description: 'Earn £500,000 in total profit',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 500000,
        icon: '💳',
        xpReward: 5000
    },
    {
        id: 'six_figures',
        title: 'Big Earner',
        description: 'Earn £1,000,000 in total profit',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 1000000,
        icon: '💎',
        xpReward: 10000
    },
    {
        id: 'high_roller',
        title: 'High Roller',
        description: 'Earn £5,000,000 in total profit',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 5000000,
        icon: '🛥️',
        xpReward: 25000
    },
    {
        id: 'tycoon',
        title: 'Tycoon',
        description: 'Earn £10,000,000 in total profit',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 10000000,
        icon: '🏰',
        xpReward: 50000
    },

    // --- EQUITY MILESTONES (14-20) ---
    {
        id: 'saving_up',
        title: 'Making Moves',
        description: 'Reach £1,200,000 total equity',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1200000,
        icon: '📈',
        xpReward: 1000
    },
    {
        id: '15k_club',
        title: 'The 1% Club',
        description: 'Reach £1,500,000 total equity',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1500000,
        icon: '🥉',
        xpReward: 2000
    },
    {
        id: '25k_club',
        title: 'Multi-Millionaire',
        description: 'Reach £2,500,000 total equity',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 2500000,
        icon: '🥈',
        xpReward: 5000
    },
    {
        id: '50k_club',
        title: 'Whale',
        description: 'Reach £5,000,000 total equity',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5000000,
        icon: '🥇',
        xpReward: 10000
    },
    {
        id: '100k_club',
        title: 'Titan',
        description: 'Reach £10,000,000 total equity',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 10000000,
        icon: '🏆',
        xpReward: 25000
    },
    {
        id: 'quarter_mil',
        title: 'Empire Builder',
        description: 'Reach £50,000,000 total equity',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50000000,
        icon: '👑',
        xpReward: 50000
    },
    {
        id: 'millionaire',
        title: 'Stratton Oakmont',
        description: 'Reach £100,000,000 total equity',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 100000000,
        icon: '🚀',
        xpReward: 100000
    },

    // --- DIVERSIFICATION (21-26) ---
    {
        id: 'testing_waters',
        title: 'Testing Waters',
        description: 'Own 5 different stocks',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '🧪',
        xpReward: 200
    },
    {
        id: 'diversified',
        title: 'Diversified',
        description: 'Own 10 different stocks',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 10,
        icon: '📈',
        xpReward: 500
    },
    {
        id: 'portfolio_master',
        title: 'Portfolio Master',
        description: 'Own 20 different stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 20,
        icon: '💼',
        xpReward: 1000
    },
    {
        id: 'fund_manager',
        title: 'Fund Manager',
        description: 'Own 30 different stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 30,
        icon: '🗂️',
        xpReward: 2500
    },
    {
        id: 'index_fund',
        title: 'Index Fund',
        description: 'Own 40 different stocks',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 40,
        icon: '🌐',
        xpReward: 5000
    },
    {
        id: 'market_owner',
        title: 'Market Owner',
        description: 'Own 50 different stocks',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '🌍',
        xpReward: 10000
    },

    // --- WIN STREAKS (27-32) ---
    {
        id: 'lucky_break',
        title: 'Lucky Break',
        description: '3 profitable trades in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '🍀',
        xpReward: 200
    },
    {
        id: 'hot_streak',
        title: 'Hot Streak',
        description: '5 profitable trades in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '🔥',
        xpReward: 500
    },
    {
        id: 'on_fire',
        title: 'On Fire',
        description: '10 profitable trades in a row',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 10,
        icon: '🧨',
        xpReward: 1000
    },
    {
        id: 'trader_pro',
        title: 'Trader Pro',
        description: '20 profitable trades in a row',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 20,
        icon: '🎓',
        xpReward: 2500
    },
    {
        id: 'unstoppable',
        title: 'Unstoppable',
        description: '30 profitable trades in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 30,
        icon: '⚡',
        xpReward: 5000
    },
    {
        id: 'oracle',
        title: 'The Oracle',
        description: '50 profitable trades in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '🔮',
        xpReward: 10000
    },

    // --- LOGIN STREAKS (33-37) ---
    {
        id: 'newcomer',
        title: 'Newcomer',
        description: 'Login 3 days in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 3,
        icon: '👋',
        xpReward: 200
    },
    {
        id: 'regular',
        title: 'Regular',
        description: 'Login 7 days in a row',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 7,
        icon: '📅',
        xpReward: 500
    },
    {
        id: 'dedicated',
        title: 'Dedicated',
        description: 'Login 14 days in a row',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 14,
        icon: '🗓️',
        xpReward: 1000
    },
    {
        id: 'committed',
        title: 'I\'m Not Leaving',
        description: 'Login 30 days in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 30,
        icon: '🎤',
        xpReward: 5000
    },
    {
        id: 'addicted',
        title: 'Addicted',
        description: 'Login 60 days in a row',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 60,
        icon: '💉',
        xpReward: 10000
    },

    // --- SPECIAL / FUN (38-45) ---
    {
        id: 'penny_pincher',
        title: 'Penny Pincher',
        description: 'Buy a stock under £5',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🪙',
        xpReward: 100
    },
    {
        id: 'big_spender',
        title: 'Big Spender',
        description: 'Buy a stock over £500',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '💸',
        xpReward: 200
    },
    {
        id: 'whale_watcher',
        title: 'Whale Watcher',
        description: 'Buy a stock over £1,000',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🐋',
        xpReward: 500
    },
    {
        id: 'tech_enthusiast',
        title: 'Tech Head',
        description: 'Own 5 Tech stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '💻',
        xpReward: 500
    },
    {
        id: 'finance_bro',
        title: 'Finance Bro',
        description: 'Own 5 Finance stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '👔',
        xpReward: 500
    },
    {
        id: 'healthy_choice',
        title: 'Healthy Choice',
        description: 'Own 5 Healthcare stocks',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '🏥',
        xpReward: 500
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
        xpReward: 2500
    },
    {
        id: 'market_mover',
        title: 'Market Mover',
        description: 'Trade £10M total volume',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 10000000,
        icon: '🏗️',
        xpReward: 10000
    },
    {
        id: 'fun_coupons',
        title: 'Fun Coupons',
        description: 'Make > £100k profit in one trade',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 100000,
        icon: '🎫',
        xpReward: 5000
    },
    {
        id: 'pump_numbers',
        title: 'Pump Those Numbers',
        description: 'Complete 50 trades in one day',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '💪',
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
        xpReward: 500
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
        xpReward: 1000
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
        xpReward: 2500
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
        xpReward: 10000
    },
    // --- CRYPTO (51-55) ---
    {
        id: 'crypto_curious',
        title: 'Fugayzi, Fugazi',
        description: 'Complete your first crypto trade',
        tier: 'bronze',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '🌪️',
        xpReward: 200
    },
    {
        id: 'altcoin_hunter',
        title: 'Altcoin Hunter',
        description: 'Own 5 different cryptocurrencies',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 5,
        icon: '🔍',
        xpReward: 500
    },
    {
        id: 'leverage_master',
        title: 'Leverage Master',
        description: 'Execute a 10x leverage trade',
        tier: 'silver',
        unlocked: false,
        progress: 0,
        target: 1,
        icon: '⚖️',
        xpReward: 1000
    },
    {
        id: 'crypto_whale',
        title: 'Crypto Whale',
        description: 'Reach £500,000 in crypto wallet',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 500000,
        icon: '🐋',
        xpReward: 10000
    },
    {
        id: 'to_the_moon',
        title: 'To The Moon',
        description: 'Earn £100,000 profit from crypto',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 100000,
        icon: '🚀',
        xpReward: 5000
    },

    {
        id: 'legend',
        title: 'Legend',
        description: 'Unlock 50 Achievements',
        tier: 'gold',
        unlocked: false,
        progress: 0,
        target: 50,
        icon: '🏆',
        xpReward: 50000
    }
];
