import { useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { useStore } from '../store/useStore';
import { initializeStocks, STOCK_CATALOG } from '../constants/stockData';
import { generateNewsEvent, shouldGenerateNews } from '../utils/NewsEngine';

/**
 * WORLD-CLASS MARKET ENGINE
 * 
 * Features:
 * - Realistic volatility-based price movements
 * - Sector correlation (related stocks move together)
 * - Market sentiment (bull/bear market cycles)
 * - Mean reversion (prices return to moving average)
 * - Momentum (trending stocks continue trending)
 * - News-driven events (One-time impact)
 * - Support/resistance levels
 * - Circuit breakers (limit extreme moves)
 */

export const useMarketEngine = () => {
    const {
        stocks,
        setStocks,
        updateStockPrice,
        activeNews,
        setActiveNews,
        marketSentiment,
        setMarketSentiment
    } = useStore();

    const [lastNewsTime, setLastNewsTime] = useState(Date.now());
    const [sectorMomentum, setSectorMomentum] = useState<Record<string, number>>({});

    // Initialize stocks
    useEffect(() => {
        const needsReset = stocks.length !== STOCK_CATALOG.length ||
            stocks.some(s => !s || !s.price || s.price < 1 || !s.history || s.history.length === 0 || !s.sector || typeof s.marketCap !== 'number');

        if (needsReset) {
            const initializedStocks = initializeStocks();
            setStocks(initializedStocks);
        }
    }, []);

    // News generation system with cooldown
    const [newsCooldown, setNewsCooldown] = useState(false);

    useEffect(() => {
        if (stocks.length === 0) return;

        const newsInterval = setInterval(() => {
            // Check cooldown first
            if (newsCooldown) {
                console.log('📰 News on cooldown, skipping...');
                return;
            }

            if (shouldGenerateNews(lastNewsTime)) {
                console.log('📰 Generating News Event...');
                const news = generateNewsEvent(stocks);
                if (news) {
                    console.log('📰 News Generated:', news.headline);
                    setActiveNews(news);
                    setLastNewsTime(Date.now());
                    setNewsCooldown(true);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

                    // Auto-dismiss after 15 seconds
                    setTimeout(() => {
                        setActiveNews(null);
                    }, 15000);

                    // Reset cooldown after 30 seconds  
                    setTimeout(() => {
                        setNewsCooldown(false);
                    }, 30000);

                    // APPLY NEWS IMPACT IMMEDIATELY (ONE-TIME)
                    // This prevents compounding gains/losses every tick
                    stocks.forEach(stock => {
                        let shouldApply = false;
                        let impactFactor = 0;

                        if (news.type === 'COMPANY' && news.symbol === stock.symbol) {
                            shouldApply = true;
                            impactFactor = news.impact;
                        } else if (news.type === 'SECTOR' && news.sector === stock.sector) {
                            shouldApply = true;
                            impactFactor = news.impact * 0.5; // Sector news has 50% impact
                        } else if (news.type === 'MARKET' || news.type === 'ECONOMIC') {
                            shouldApply = true;
                            impactFactor = news.impact * 0.25; // Market news has 25% impact
                        }

                        if (shouldApply) {
                            const newPrice = stock.price * (1 + impactFactor);
                            updateStockPrice(stock.symbol, newPrice);
                        }
                    });
                }
            }
        }, 30000); // Check every 30 seconds (for testing - change to 300000 for production)

        return () => clearInterval(newsInterval);
    }, [stocks, lastNewsTime, newsCooldown]);

    // World-class price update system (every 3 seconds)
    useEffect(() => {
        if (stocks.length === 0) return;

        const interval = setInterval(() => {
            // Update market sentiment gradually (random walk)
            const newSentiment = Math.max(-0.3, Math.min(0.4, marketSentiment + (Math.random() - 0.5) * 0.05));
            setMarketSentiment(newSentiment);

            // Calculate sector momentum
            const newSectorMomentum: Record<string, number> = {};
            const sectorPriceChanges: Record<string, number[]> = {};

            stocks.forEach(stock => {
                if (!sectorPriceChanges[stock.sector]) {
                    sectorPriceChanges[stock.sector] = [];
                }
                if (stock.history.length >= 2) {
                    const recentChange = (stock.price - stock.history[stock.history.length - 2].value) / stock.history[stock.history.length - 2].value;
                    sectorPriceChanges[stock.sector].push(recentChange);
                }
            });

            Object.keys(sectorPriceChanges).forEach(sector => {
                const avg = sectorPriceChanges[sector].reduce((a, b) => a + b, 0) / sectorPriceChanges[sector].length;
                newSectorMomentum[sector] = avg * 0.7; // 70% correlation
            });
            setSectorMomentum(newSectorMomentum);

            // Update each stock with professional algorithms
            stocks.forEach(stock => {
                if (!stock || !stock.price || stock.price < 1) return;

                let newPrice = stock.price;

                // 1. BASE VOLATILITY MOVEMENT
                const vol = stock.volatility;
                let baseMaxChange: number;

                if (vol <= 3) {
                    baseMaxChange = 0.005 + (vol / 3) * 0.008; // 0.5% - 1.3%
                } else if (vol <= 7) {
                    baseMaxChange = 0.013 + ((vol - 4) / 3) * 0.017; // 1.3% - 3.0%
                } else {
                    const isBigMove = Math.random() < 0.08;
                    baseMaxChange = isBigMove
                        ? 0.06 + Math.random() * 0.09 // 6% - 15% (rare)
                        : 0.03 + ((vol - 8) / 2) * 0.03; // 3% - 6%
                }

                // 2. MARKET SENTIMENT INFLUENCE
                const sentimentInfluence = marketSentiment * 0.4; // Market sent sentiment contributes up to 40%

                // 3. SECTOR CORRELATION
                const sectorInfluence = (sectorMomentum[stock.sector] || 0) * 0.5; // 50% sector correlation

                // 4. MEAN REVERSION (prices gravitate toward 10-period moving average)
                const ma10 = stock.history.slice(-10).reduce((sum, h) => sum + h.value, 0) / Math.min(10, stock.history.length);
                const distanceFromMA = (stock.price - ma10) / ma10;
                const meanReversionForce = -distanceFromMA * 0.15; // Pull back 15% of distance

                // 5. MOMENTUM (trending stocks continue trending)
                let momentum = 0;
                if (stock.history.length >= 5) {
                    const recent5 = stock.history.slice(-5);
                    const priceChanges = recent5.map((h, i) => i > 0 ? (h.value - recent5[i - 1].value) / recent5[i - 1].value : 0);
                    const avgMomentum = priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length;
                    momentum = avgMomentum * 0.3; // 30% momentum continuation
                }

                // COMBINE ALL FACTORS
                const baseChange = (Math.random() - 0.5) * baseMaxChange;
                const totalChange = baseChange + sentimentInfluence + sectorInfluence + meanReversionForce + momentum;

                // Apply change
                newPrice = stock.price * (1 + totalChange);

                // 7. CIRCUIT BREAKERS (limit extreme moves)
                const maxSingleMove = 0.12; // Maximum 12% move per update
                const minSingleMove = -0.12;
                const actualChange = (newPrice - stock.price) / stock.price;
                if (actualChange > maxSingleMove) {
                    newPrice = stock.price * (1 + maxSingleMove);
                } else if (actualChange < minSingleMove) {
                    newPrice = stock.price * (1 + minSingleMove);
                }

                // 8. SUPPORT LEVELS (soft floor prevents crashes)
                const historicLow = Math.min(...stock.history.map(h => h.value));
                if (newPrice < historicLow * 0.85) {
                    newPrice = historicLow * 0.85; // Can't drop more than 15% below historic low in one move
                }

                // 9. ABSOLUTE PRICE BOUNDS (prevent runaway prices)
                // Get base price from STOCK_CATALOG
                const baseStock = STOCK_CATALOG.find(s => s.symbol === stock.symbol);
                if (baseStock) {
                    const maxPrice = baseStock.price * 5; // Max 5x base price
                    const minPrice = baseStock.price * 0.2; // Min 20% of base price
                    newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));
                }

                // Ensure positive price
                newPrice = Math.max(1, newPrice);

                // Update the price
                updateStockPrice(stock.symbol, newPrice);
            });

            // Clear news after it's been applied for a while (just for UI)
            if (activeNews && Date.now() - activeNews.timestamp > 12000) {
                setActiveNews(null);
            }
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, [stocks, updateStockPrice, activeNews, marketSentiment, sectorMomentum]);

    return {
        dismissEvent: () => setActiveNews(null)
    };
};
