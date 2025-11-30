import { useEffect, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import { useCryptoStore } from '../store/useCryptoStore';
import { useMarketMoodStore } from '../store/useMarketMoodStore';
import { useStore } from '../store/useStore';
import { CRYPTO_CATALOG, initializeCryptos } from '../constants/cryptoData';
import { generateCryptoNewsEvent } from '../utils/NewsEngine';

/**
 * 🚀 CRYPTO ENGINE V2: News-Driven State Machine
 * 
 * Core Logic:
 * 1. State Machine: The market has phases (Accumulation, Bull, Euphoria, Crash, Bear).
 * 2. News Driver: News events TRIGGER phase transitions.
 * 3. Sentiment Integration: The "Fire" meter determines the PROBABILITY of pumps vs dumps.
 * 4. Daily Reset: Every X ticks, we reset "Open Price" to fix the "stuck %" issue.
 */

// Lanczos approximation for Gamma function (Standard Math)
const gamma = (z: number): number => {
    const p = [
        676.5203681218851, -1259.1392167224028, 771.32342877765313,
        -176.61502916214059, 12.507343278686905, -0.13857109526572012,
        9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    z -= 1;
    let x = 0.99999999999980993;
    for (let i = 0; i < p.length; i++) x += p[i] / (z + i + 1);
    const t = z + p.length - 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
};

// Lévy Flight Generator (Fat Tail Volatility)
const levyRandom = (alpha = 1.5) => {
    const u = Math.random();
    const v = Math.random();
    const sigma = Math.pow((Math.sin(Math.PI * alpha / 2) * gamma(1 + alpha)) / ((Math.pow(2, (alpha - 1) / 2)) * Math.sin(Math.PI * alpha / 2) * gamma((1 + alpha) / 2) * alpha), 1 / alpha);
    let x = 0, y = 0;
    while (x === 0) x = Math.random();
    while (y === 0) y = Math.random();
    const normal_u = Math.sqrt(-2.0 * Math.log(x)) * Math.cos(2.0 * Math.PI * y);
    let x2 = 0, y2 = 0;
    while (x2 === 0) x2 = Math.random();
    while (y2 === 0) y2 = Math.random();
    const normal_v = Math.sqrt(-2.0 * Math.log(x2)) * Math.cos(2.0 * Math.PI * y2);
    return (normal_u * sigma) / Math.pow(Math.abs(normal_v), 1 / alpha);
};

export const useCryptoEngine = () => {
    const {
        setCryptos,
        updateCryptoPrices,
        checkCryptoLiquidation,
        dailyReset
    } = useCryptoStore();

    const {
        cryptoFearGreedIndex,
        cryptoCyclePhase,
        updateCryptoEngine,
        setAltSeason,
        altSeason,
        whaleAlert,
        setWhaleAlert
    } = useMarketMoodStore();

    const momentumRef = useRef<Record<string, number>>({});
    const tickCountRef = useRef(0);

    // 1. INITIALIZATION
    useEffect(() => {
        const currentCryptos = useCryptoStore.getState().cryptos;
        const needsReset = currentCryptos.length !== CRYPTO_CATALOG.length ||
            currentCryptos.some(c => !c || !c.price || c.price < 0.000001);

        if (needsReset) {
            const initializedCryptos = initializeCryptos();
            setCryptos(initializedCryptos);
            initializedCryptos.forEach(c => momentumRef.current[c.symbol] = 0);
        } else {
            currentCryptos.forEach(c => {
                if (momentumRef.current[c.symbol] === undefined) momentumRef.current[c.symbol] = 0;
            });
        }

        // Purely In-House Simulation - No External API Hydration
        // Initial prices are set by initializeCryptos() in constants/cryptoData.ts
    }, []);

    // 2. MAIN ENGINE LOOP (1s Ticks)
    useEffect(() => {
        const interval = setInterval(() => {
            const { cryptos } = useCryptoStore.getState();
            const {
                cryptoFearGreedIndex,
                cryptoCyclePhase,
                updateCryptoEngine,
                setWhaleAlert,
                altSeason,
                setAltSeason
            } = useMarketMoodStore.getState();

            // 0. RE-INITIALIZATION & SANITY CHECK
            if (cryptos.length === 0) {
                const initializedCryptos = initializeCryptos();
                setCryptos(initializedCryptos);
                initializedCryptos.forEach(c => momentumRef.current[c.symbol] = 0);
                return;
            }

            // EMERGENCY SANITY CHECK: If any crypto is > 20x base price, reset ALL to protect the game state.
            const isBroken = cryptos.some(c => {
                const base = CRYPTO_CATALOG.find(cat => cat.symbol === c.symbol)?.basePrice || 1;
                return c.price > base * 20;
            });

            if (isBroken) {
                const initializedCryptos = initializeCryptos();
                setCryptos(initializedCryptos);
                initializedCryptos.forEach(c => momentumRef.current[c.symbol] = 0);
                return; // Skip this tick
            }

            const priceUpdates: Record<string, number> = {};
            let totalMomentum = 0;
            let totalVolatility = 0;

            // --- FEAR & GREED DRIVER ---
            // Crypto is 10x more volatile than stocks.
            // 0-20: REKT Zone (Crash)
            // 21-40: Fear (Bearish)
            // 41-60: Accumulation (Chop)
            // 61-80: FOMO (Bullish)
            // 81-100: Moon Mission (Parabolic)

            // Base bias: -0.05% to +0.05% per tick based on F&G (Reduced from 0.5%)
            // Strict correlation: The meter dictates the candle color.
            const sentimentBias = ((cryptoFearGreedIndex - 50) / 50) * 0.0005;

            // PHASE LOGIC (Secondary Driver)
            // Phases amplify or dampen the F&G signal
            let phaseBias = 0;
            let phaseVolMultiplier = 1;

            switch (cryptoCyclePhase) {
                case 'accumulation':
                    phaseBias = 0.00001; // Very slight upward drift
                    phaseVolMultiplier = 0.3; // Low vol
                    break;
                case 'markup':
                    phaseBias = 0.0001; // Steady upward bias (was 0.0008)
                    phaseVolMultiplier = 0.8; // Moderate vol (was 1.2)
                    break;
                case 'distribution':
                    phaseBias = -0.00005; // Slight downward drift
                    phaseVolMultiplier = 1.2; // High vol
                    break;
                case 'markdown':
                    phaseBias = -0.0002; // Strong downward bias (was -0.001)
                    phaseVolMultiplier = 0.6;
                    break;
            }

            cryptos.forEach(crypto => {
                const catalogItem = CRYPTO_CATALOG.find(c => c.symbol === crypto.symbol);
                const basePrice = catalogItem?.basePrice || 1;

                // 1. Base Volatility
                // Reduced base volatility scaling
                const baseVol = (catalogItem?.volatility || 0.05) * 0.002;

                // 2. Momentum (Inertia)
                let currentMomentum = momentumRef.current[crypto.symbol] || 0;
                currentMomentum = (currentMomentum * 0.90) + (phaseBias * 0.1); // Faster decay (was 0.95)

                // MEAN REVERSION FORCE (Gravity)
                // If price > 5x base, pull it down hard.
                if (crypto.price > basePrice * 5) {
                    currentMomentum -= 0.005; // Strong gravity
                }

                momentumRef.current[crypto.symbol] = currentMomentum;

                // 3. Random Walk (Lévy Flight for Fat Tails)
                // Volatility scales with F&G Extremes
                const extremeFactor = Math.abs(cryptoFearGreedIndex - 50) / 50;
                const noise = levyRandom() * baseVol * phaseVolMultiplier * (1 + extremeFactor);

                // 4. Calculate Move
                // Move = Sentiment + Momentum + Noise
                const percentChange = sentimentBias + currentMomentum + noise;
                let newPrice = crypto.price * (1 + percentChange);

                // --- STRICT PRICE CAPS (Floors & Ceilings) ---
                // Floor: Never drop below 10% of base price (unless it's a meme coin, maybe 1%)
                const minPrice = basePrice * 0.10;
                // Ceiling: Cap at 10x base price (prevent infinite pumps)
                const maxPrice = basePrice * 10;

                if (newPrice < minPrice) {
                    newPrice = minPrice;
                    momentumRef.current[crypto.symbol] = Math.abs(momentumRef.current[crypto.symbol]) * 0.5; // Bounce
                } else if (newPrice > maxPrice) {
                    newPrice = maxPrice;
                    momentumRef.current[crypto.symbol] = -Math.abs(momentumRef.current[crypto.symbol]) * 0.5; // Reject
                }

                // Safety Clamps
                newPrice = Math.max(0.000001, newPrice);
                priceUpdates[crypto.symbol] = newPrice;

                totalMomentum += currentMomentum;
                totalVolatility += Math.abs(percentChange);
            });

            // Update Prices
            updateCryptoPrices(priceUpdates);
            checkCryptoLiquidation();

            // Update Mood Store
            updateCryptoEngine({
                momentum: totalMomentum / cryptos.length,
                volatility: totalVolatility / cryptos.length,
                dominance: 50, // Placeholder
                hype: cryptoFearGreedIndex
            });

            // --- EVENT SIMULATION ---
            // 1. Whale Alerts (Random, Rare)
            if (tickCountRef.current % 120 === 0) { // Check every 2 mins
                if (Math.random() > 0.7) { // 30% chance
                    const randomCrypto = CRYPTO_CATALOG[Math.floor(Math.random() * CRYPTO_CATALOG.length)];
                    const isBuy = Math.random() > 0.5;
                    setWhaleAlert({
                        symbol: randomCrypto.symbol,
                        type: isBuy ? 'buy' : 'sell',
                        amount: Math.floor(Math.random() * 1000000) + 500000 // 500k - 1.5M
                    });

                    // Clear alert after 10s
                    setTimeout(() => setWhaleAlert(null), 10000);
                }
            }

            // 2. Altcoin Season (Driven by Dominance - Placeholder logic)
            // If we had real dominance tracking, we'd use it. For now, random shifts.
            if (tickCountRef.current % 600 === 0) { // Every 10 mins
                if (Math.random() > 0.8) setAltSeason(!altSeason);
            }

            // DAILY RESET LOGIC
            tickCountRef.current += 1;
            if (tickCountRef.current >= 300) {
                dailyReset();
                tickCountRef.current = 0;
            }

            // Check Mission Progress (Survival)
            import('../utils/missionEngine').then(({ checkMissionProgress }) => {
                const { missions, updateMissionProgress, cash, holdings, stocks } = useStore.getState();
                checkMissionProgress('TICK', {}, missions, updateMissionProgress, {
                    cash,
                    holdings,
                    stocks,
                    cryptoHoldings: useCryptoStore.getState().cryptoHoldings,
                    getTotalCryptoValue: useCryptoStore.getState().getTotalCryptoValue
                });
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []); // Empty dependency array = Runs once, never resets

    // 3. NEWS & PHASE CONTROLLER (Deprecated - Phase now driven by Store)
    // We keep news generation but remove the local setMarketPhase calls
    const lastNewsTimeRef = useRef(Date.now());
    const { setActiveNews } = useStore();

    useEffect(() => {
        const checkNews = () => {
            if (Date.now() - lastNewsTimeRef.current > 120000 + Math.random() * 120000) {
                const { cryptos } = useCryptoStore.getState();
                if (cryptos.length === 0) return;

                const news = generateCryptoNewsEvent(cryptos);
                if (news) {
                    setActiveNews(news);
                    lastNewsTimeRef.current = Date.now();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                    // Note: Phase transitions are now handled by useMarketMoodStore's updateCryptoEngine
                    // based on F&G and Hype, not directly by news here, though news affects F&G.

                    // Immediate Price Impact
                    const priceUpdates: Record<string, number> = {};
                    cryptos.forEach(c => {
                        if ((news.type === 'COMPANY' && news.symbol === c.symbol) ||
                            (news.type === 'SECTOR' && news.sector === 'Crypto')) {

                            const jump = news.impact * (cryptoCyclePhase === 'markup' ? 1.5 : 1);
                            priceUpdates[c.symbol] = c.price * (1 + jump);
                            momentumRef.current[c.symbol] += jump * 0.5;
                        }
                    });

                    if (Object.keys(priceUpdates).length > 0) {
                        updateCryptoPrices(priceUpdates);
                    }
                }
            }
        };

        const newsInterval = setInterval(checkNews, 5000);
        return () => clearInterval(newsInterval);
    }, [cryptoCyclePhase]);
};
