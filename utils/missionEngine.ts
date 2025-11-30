import { Mission } from '../types';
import { useMarketMoodStore } from '../store/useMarketMoodStore';
// import { useStore } from '../store/useStore';

export const generateMissions = (): Mission[] => {
    const { earningsSeason, fedMeeting, whaleAlert, altSeason, marketCyclePhase } = useMarketMoodStore.getState();
    const missions: Mission[] = [];
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // 1. Earnings Season Mission
    if (earningsSeason) {
        missions.push({
            id: `earnings_${now}`,
            title: 'Earnings Play',
            description: 'Buy a stock and make >5% profit during Earnings Season',
            type: 'EARNINGS_PLAY',
            status: 'ACTIVE',
            progress: 0,
            target: 5, // 5% profit
            reward: { xp: 500, cash: 1000 },
            expiresAt: now + ONE_DAY
        });
    }

    // 2. Fed Meeting Mission
    if (fedMeeting === 'scheduled') {
        missions.push({
            id: `fed_${now}`,
            title: 'Fed Watcher',
            description: 'Hold >50% cash before the Fed Meeting',
            type: 'FED_PLAY',
            status: 'ACTIVE',
            progress: 0,
            target: 50, // 50% cash
            reward: { xp: 300 },
            expiresAt: now + (ONE_DAY / 2)
        });
    }

    // 3. Whale Watch Mission
    if (whaleAlert) {
        missions.push({
            id: `whale_${now}`,
            title: 'Whale Hunter',
            description: `Follow the whale! Buy ${whaleAlert.symbol}`,
            type: 'WHALE_WATCH',
            status: 'ACTIVE',
            progress: 0,
            target: 1,
            reward: { xp: 1000, cash: 5000 },
            expiresAt: now + (10 * 60 * 1000) // 10 mins
        });
    }

    // 4. Alt Season Mission
    if (altSeason) {
        missions.push({
            id: `alt_${now}`,
            title: 'Alt Season Rider',
            description: 'Hold 3 different Altcoins',
            type: 'ALT_SEASON_RIDER',
            status: 'ACTIVE',
            progress: 0,
            target: 3,
            reward: { xp: 750 },
            expiresAt: now + ONE_DAY
        });
    }

    // 5. Crash Survivor (Markdown Phase)
    if (marketCyclePhase === 'markdown') {
        missions.push({
            id: `crash_${now}`,
            title: 'Diamond Hands',
            description: 'Don\'t sell any assets during the crash',
            type: 'SURVIVE_CRASH',
            status: 'ACTIVE',
            progress: 0,
            target: 100, // 100 ticks? Or just boolean check
            reward: { xp: 2000, cash: 10000 },
            expiresAt: now + ONE_DAY
        });
    }

    return missions;
};

export const checkMissionProgress = (
    actionType: string,
    data: any,
    missions: Mission[],
    updateMissionProgress: (id: string, progress: number) => void,
    context: {
        cash: number;
        holdings: any;
        stocks: any[];
        cryptoHoldings?: any;
        getTotalCryptoValue?: () => number;
    }
) => {
    missions.forEach(mission => {
        if (mission.status !== 'ACTIVE') return;

        switch (mission.type) {
            case 'EARNINGS_PLAY':
                if (actionType === 'SELL' && data.pnlPercent >= 5) {
                    updateMissionProgress(mission.id, 5);
                }
                break;

            case 'FED_PLAY':
                // Check cash ratio
                const stockValue = Object.values(context.holdings).reduce((sum: number, h: any) => {
                    const stock = context.stocks.find(s => s.symbol === h.symbol);
                    return sum + (h.quantity * (stock?.price || 0));
                }, 0);

                const cryptoValue = context.getTotalCryptoValue ? context.getTotalCryptoValue() : 0;
                const totalEquity = context.cash + stockValue + cryptoValue;
                const cashPercent = totalEquity > 0 ? (context.cash / totalEquity) * 100 : 0;

                if (cashPercent >= 50) {
                    updateMissionProgress(mission.id, 50);
                }
                break;

            case 'WHALE_WATCH':
                if (actionType === 'BUY_CRYPTO' && data.symbol === mission.description.split('Buy ')[1]) {
                    updateMissionProgress(mission.id, 1);
                }
                break;

            case 'ALT_SEASON_RIDER':
                if (actionType === 'BUY_CRYPTO' && context.cryptoHoldings) {
                    // Check unique alts held
                    const uniqueAlts = Object.keys(context.cryptoHoldings).length;
                    if (uniqueAlts >= 3) {
                        updateMissionProgress(mission.id, 3);
                    }
                }
                break;

            case 'SURVIVE_CRASH':
                if (actionType === 'SELL' || actionType === 'SELL_CRYPTO') {
                    // Failed!
                    // We might need a failMission action, or just reset progress
                    // For now, let's just not update progress
                } else if (actionType === 'TICK') {
                    updateMissionProgress(mission.id, 1);
                }
                break;
        }
    });
};

