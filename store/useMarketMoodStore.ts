import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../utils/storage';

type MarketCyclePhase = 'accumulation' | 'markup' | 'distribution' | 'markdown';
type Sector = 'Tech' | 'Finance' | 'Healthcare' | 'Consumer' | 'Energy' | 'Real Estate';

interface MarketMoodStore {
    // --- CORE ENGINE STATE (The Heartbeat) ---
    tickCount: number;

    // Stock Market Engine
    fearGreedIndex: number; // 0-100
    marketCyclePhase: MarketCyclePhase;
    volatilityIndex: number; // 0-100 (VIX)
    marketMomentum: number; // -100 to 100

    // Crypto Market Engine (Hype Cycle)
    cryptoFearGreedIndex: number; // 0-100
    cryptoCyclePhase: MarketCyclePhase;
    cryptoVolatility: number; // 0-100
    cryptoHype: number; // 0-100 (Social Sentiment)
    cryptoDominance: number; // BTC Dominance %

    // Macro State
    interestRate: number;
    gdpGrowth: number;
    inflation: number;
    earningsSeason: boolean;
    fedMeeting: 'none' | 'scheduled' | 'hawkish' | 'dovish';
    whaleAlert: { symbol: string; type: 'buy' | 'sell'; amount: number } | null;
    altSeason: boolean;

    // --- ACTIONS ---
    tick: () => void; // The heartbeat function
    updateMarketEngine: (metrics: any) => void;
    updateCryptoEngine: (metrics: any) => void;
    reset: () => void;

    // Getters
    getMoodLabel: () => string;
    getMoodColor: () => string;
    getCryptoMoodLabel: () => string;
    getCryptoMoodColor: () => string;
    getSectorMultiplier: (sector: Sector, phase?: MarketCyclePhase) => number;
    setMacroMetrics: (metrics: { interestRate: number; gdpGrowth: number; inflation: number }) => void;
    setEarningsSeason: (active: boolean) => void;
    setFedMeeting: (status: 'none' | 'scheduled' | 'hawkish' | 'dovish') => void;
    setWhaleAlert: (alert: { symbol: string; type: 'buy' | 'sell'; amount: number } | null) => void;
    setAltSeason: (active: boolean) => void;

    // Event Engine
    activeEvents: MarketEvent[];
    triggerEvent: (event: MarketEvent) => void;
    decayEvents: () => void;

    // Dev Tools
    forcePhase: (phase: MarketCyclePhase) => void;
    forceCryptoPhase: (phase: MarketCyclePhase) => void;
}

export interface MarketEvent {
    id: string;
    type: 'BULL_RUN' | 'BEAR_RAID' | 'CRASH' | 'RUG_PULL' | 'TECH_BOOM' | 'LIQUIDITY_CRISIS';
    name: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
    duration: number; // Remaining ticks
    impact: {
        sector?: string; // If null, applies to all
        priceChangePerTick: number; // e.g., 0.005 (+0.5% per tick)
        volatilityMultiplier: number; // e.g., 2.0 (2x volatility)
    };
}

const SECTOR_MULTIPLIERS: Record<MarketCyclePhase, Record<Sector, number>> = {
    accumulation: { Tech: 0.02, Finance: 0.01, Healthcare: 0, Consumer: 0.01, Energy: 0, 'Real Estate': -0.005 },
    markup: { Tech: 0.01, Finance: 0.01, Healthcare: 0, Consumer: 0.01, Energy: 0.01, 'Real Estate': 0.005 },
    distribution: { Tech: -0.01, Finance: 0.02, Healthcare: 0, Consumer: -0.01, Energy: 0.02, 'Real Estate': 0.01 },
    markdown: { Tech: -0.02, Finance: -0.03, Healthcare: 0.02, Consumer: -0.02, Energy: -0.01, 'Real Estate': -0.015 }
};

export const useMarketMoodStore = create<MarketMoodStore>()(
    persist(
        (set, get) => ({
            tickCount: 0,

            // Stock Init
            fearGreedIndex: 50,
            marketCyclePhase: 'accumulation',
            volatilityIndex: 20,
            marketMomentum: 0,

            // Crypto Init
            cryptoFearGreedIndex: 50,
            cryptoCyclePhase: 'accumulation',
            cryptoVolatility: 50,
            cryptoHype: 20,
            cryptoDominance: 52.4,

            // Macro Init
            interestRate: 2.5,
            gdpGrowth: 2.0,
            inflation: 2.0,
            earningsSeason: false,
            fedMeeting: 'none',
            whaleAlert: null,
            altSeason: false,
            activeEvents: [],

            triggerEvent: (event) => set((state) => ({ activeEvents: [...state.activeEvents, event] })),

            decayEvents: () => set((state) => ({
                activeEvents: state.activeEvents
                    .map(e => ({ ...e, duration: e.duration - 1 }))
                    .filter(e => e.duration > 0)
            })),

            tick: () => {
                const state = get();
                const newTick = state.tickCount + 1;

                // --- THE BEATING HEART LOGIC ---
                // Every tick (second), the market "breathes" based on its phase

                // 1. Stock Heartbeat
                let fgiDrift = 0;
                let volDrift = 0;

                switch (state.marketCyclePhase) {
                    case 'accumulation':
                        // Slow, steady heartbeat. Low volatility. Fear fading to Neutral.
                        fgiDrift = Math.random() > 0.6 ? 0.5 : -0.2; // Slight upward drift
                        volDrift = (15 - state.volatilityIndex) * 0.1; // Pull towards 15
                        break;
                    case 'markup':
                        // Strong, fast heartbeat. Increasing greed.
                        fgiDrift = Math.random() > 0.4 ? 0.8 : -0.3; // Strong upward drift
                        volDrift = (25 - state.volatilityIndex) * 0.1; // Pull towards 25
                        break;
                    case 'distribution':
                        // Erratic heartbeat. High volatility. Greed turning to Fear.
                        fgiDrift = Math.random() > 0.5 ? -0.5 : 0.5; // Choppy
                        volDrift = (40 - state.volatilityIndex) * 0.2; // Pull towards 40
                        break;
                    case 'markdown':
                        // Fast, panicked heartbeat. Extreme volatility. Fear.
                        fgiDrift = Math.random() > 0.3 ? -0.8 : 0.2; // Strong downward drift
                        volDrift = (60 - state.volatilityIndex) * 0.1; // Pull towards 60
                        break;
                }

                // Earnings Season Amplifier
                if (state.earningsSeason) {
                    volDrift += 0.5; // Higher volatility baseline
                    fgiDrift *= 1.2; // More emotional swings
                }

                // Fed Meeting Anxiety
                if (state.fedMeeting === 'scheduled') {
                    volDrift += 0.2; // Uncertainty
                    fgiDrift -= 0.1; // Slight fear bias
                }

                // 2. Crypto Heartbeat (Hyperactive)
                let cryptoFgiDrift = 0;
                let cryptoVolDrift = 0;

                switch (state.cryptoCyclePhase) {
                    case 'accumulation':
                        cryptoFgiDrift = Math.random() > 0.5 ? 0.3 : -0.3; // Slower Chop
                        cryptoVolDrift = (30 - state.cryptoVolatility) * 0.1;
                        break;
                    case 'markup':
                        cryptoFgiDrift = Math.random() > 0.3 ? 0.8 : -0.2; // Slower Moon mission
                        cryptoVolDrift = (60 - state.cryptoVolatility) * 0.1;
                        break;
                    case 'distribution':
                        cryptoFgiDrift = Math.random() > 0.5 ? -0.6 : 0.6; // Slower Swings
                        cryptoVolDrift = (80 - state.cryptoVolatility) * 0.2;
                        break;
                    case 'markdown':
                        cryptoFgiDrift = Math.random() > 0.3 ? -1.0 : 0.2; // Slower Crash
                        cryptoVolDrift = (90 - state.cryptoVolatility) * 0.1;
                        break;
                }

                set({
                    tickCount: newTick,
                    fearGreedIndex: Math.max(0, Math.min(100, state.fearGreedIndex + fgiDrift)),
                    volatilityIndex: Math.max(10, Math.min(100, state.volatilityIndex + volDrift)),
                    cryptoFearGreedIndex: Math.max(0, Math.min(100, state.cryptoFearGreedIndex + cryptoFgiDrift)),
                    cryptoVolatility: Math.max(10, Math.min(100, state.cryptoVolatility + cryptoVolDrift)),
                });
            },

            updateMarketEngine: (metrics) => {
                const state = get();

                // Cycle Transition Logic (The Brain)
                let nextPhase = state.marketCyclePhase;
                const fgi = state.fearGreedIndex;

                if (state.marketCyclePhase === 'accumulation' && fgi > 60) nextPhase = 'markup';
                else if (state.marketCyclePhase === 'markup' && fgi > 80) nextPhase = 'distribution';
                else if (state.marketCyclePhase === 'distribution' && fgi < 40) nextPhase = 'markdown';
                else if (state.marketCyclePhase === 'markdown' && fgi < 20) nextPhase = 'accumulation';

                set({
                    marketCyclePhase: nextPhase,
                    marketMomentum: metrics.momentum,
                    volatilityIndex: metrics.volatility
                });
            },

            updateCryptoEngine: (metrics) => {
                const state = get();

                // Crypto Cycle Logic (The Hype Machine)
                let nextPhase = state.cryptoCyclePhase;
                const fgi = state.cryptoFearGreedIndex;

                // Adjusted Thresholds for longer phases
                if (state.cryptoCyclePhase === 'accumulation' && fgi > 65) nextPhase = 'markup';
                else if (state.cryptoCyclePhase === 'markup' && fgi > 95) nextPhase = 'distribution';
                else if (state.cryptoCyclePhase === 'distribution' && fgi < 35) nextPhase = 'markdown';
                else if (state.cryptoCyclePhase === 'markdown' && fgi < 5) nextPhase = 'accumulation';

                if (nextPhase !== state.cryptoCyclePhase) {
                    console.log(`[CryptoEngine] Transition: ${state.cryptoCyclePhase} -> ${nextPhase} (FGI: ${fgi})`);
                }

                set({
                    cryptoCyclePhase: nextPhase,
                    cryptoHype: metrics.hype,
                    cryptoDominance: metrics.dominance
                });
            },

            getMoodLabel: () => {
                const index = get().fearGreedIndex;
                if (index <= 24) return 'Extreme Fear';
                if (index <= 49) return 'Fear';
                if (index <= 55) return 'Neutral';
                if (index <= 75) return 'Greed';
                return 'Extreme Greed';
            },

            getMoodColor: () => {
                const index = get().fearGreedIndex;
                if (index <= 24) return '#FF4444';
                if (index <= 49) return '#FF8800';
                if (index <= 55) return '#FFD700';
                if (index <= 75) return '#00CC00';
                return '#00FF00';
            },

            getCryptoMoodLabel: () => {
                const index = get().cryptoFearGreedIndex;
                if (index <= 20) return 'REKT Zone';
                if (index <= 40) return 'Fear & FUD';
                if (index <= 60) return 'Accumulation';
                if (index <= 80) return 'FOMO';
                return 'Moon Mission';
            },

            getCryptoMoodColor: () => {
                const index = get().cryptoFearGreedIndex;
                if (index <= 20) return '#FF0000';
                if (index <= 40) return '#FF4500';
                if (index <= 60) return '#00D9FF';
                if (index <= 80) return '#00FF00';
                return '#B026FF';
            },

            getSectorMultiplier: (sector, phase) => {
                const currentPhase = phase || get().marketCyclePhase;
                return SECTOR_MULTIPLIERS[currentPhase][sector] || 0;
            },

            setMacroMetrics: (metrics) => set(metrics),
            setEarningsSeason: (active) => set({ earningsSeason: active }),
            setFedMeeting: (status) => set({ fedMeeting: status }),
            setWhaleAlert: (alert) => set({ whaleAlert: alert }),
            setAltSeason: (active) => set({ altSeason: active }),

            // FORCE ACTIONS (Dev Tools)
            forcePhase: (phase) => {
                let targetFgi = 50;
                let targetMomentum = 0;

                switch (phase) {
                    case 'accumulation': targetFgi = 45; targetMomentum = 5; break;
                    case 'markup': targetFgi = 75; targetMomentum = 50; break;
                    case 'distribution': targetFgi = 60; targetMomentum = -20; break;
                    case 'markdown': targetFgi = 20; targetMomentum = -80; break;
                }

                set({
                    marketCyclePhase: phase,
                    fearGreedIndex: targetFgi,
                    marketMomentum: targetMomentum
                });
            },

            forceCryptoPhase: (phase) => {
                let targetFgi = 50;
                let targetHype = 20;

                // Set FGI to start of phase to allow run room
                switch (phase) {
                    case 'accumulation': targetFgi = 40; targetHype = 30; break;
                    case 'markup': targetFgi = 70; targetHype = 80; break;
                    case 'distribution': targetFgi = 60; targetHype = 60; break;
                    case 'markdown': targetFgi = 30; targetHype = 10; break;
                }

                console.log(`[DevTools] Forcing Crypto Phase: ${phase} (Target FGI: ${targetFgi})`);

                set({
                    cryptoCyclePhase: phase,
                    cryptoFearGreedIndex: targetFgi,
                    cryptoHype: targetHype
                });
            },

            reset: () => set({
                tickCount: 0,
                fearGreedIndex: 50,
                marketCyclePhase: 'accumulation',
                volatilityIndex: 20,
                marketMomentum: 0,
                cryptoFearGreedIndex: 50,
                cryptoCyclePhase: 'accumulation',
                cryptoVolatility: 50,
                cryptoHype: 20,
                cryptoDominance: 52.4,
                interestRate: 2.5,
                gdpGrowth: 2.0,
                inflation: 2.0,
                earningsSeason: false,
                fedMeeting: 'none',
                whaleAlert: null,
                altSeason: false,
                activeEvents: []
            })
        }),
        {
            name: 'market-mood-storage',
            storage: createJSONStorage(() => zustandStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const validPhases = ['accumulation', 'markup', 'distribution', 'markdown'];
                    if (!validPhases.includes(state.marketCyclePhase)) state.marketCyclePhase = 'accumulation';
                    if (!validPhases.includes(state.cryptoCyclePhase)) state.cryptoCyclePhase = 'accumulation';
                }
            }
        }
    )
);
