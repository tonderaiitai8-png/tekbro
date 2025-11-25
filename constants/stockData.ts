import { Stock } from '../types';
import { STOCK_DATABASE } from './stocks';
import { CRYPTO_DATABASE } from './crypto';

// Combine stocks and crypto into unified catalog
export const STOCK_CATALOG: Omit<Stock, 'history'>[] = [
    // Convert stock database to catalog format
    ...STOCK_DATABASE.map((stock, index) => ({
        id: (index + 1).toString(),
        symbol: stock.symbol,
        name: stock.name,
        price: stock.basePrice,
        sector: stock.sector,
        marketCap: calculateMarketCap(stock.basePrice, stock.symbol),
        volatility: stock.volatility,
        description: stock.description,
        icon: stock.icon
    })),

    // Convert crypto database to catalog format
    ...CRYPTO_DATABASE.map((crypto, index) => ({
        id: (STOCK_DATABASE.length + index + 1).toString(),
        symbol: crypto.symbol,
        name: crypto.name,
        price: crypto.basePrice,
        sector: 'Crypto' as const,
        marketCap: parseMarketCap(crypto.marketCap),
        volatility: crypto.volatility,
        description: crypto.description,
        icon: crypto.icon
    }))
];

// Helper function to calculate realistic market cap based on price
function calculateMarketCap(price: number, symbol: string): number {
    // Rough estimates based on typical shares outstanding
    const multipliers: Record<string, number> = {
        // Mega caps (>$1T)
        'AAPL': 15000000000,
        'MSFT': 7400000000,
        'GOOGL': 12000000000,
        'AMZN': 10000000000,
        'NVDA': 2400000000,

        // Large caps ($100B-$1T)
        'META': 2500000000,
        'TSLA': 3000000000,
        'BRK.B': 1300000000,
        'V': 2000000000,
        'MA': 900000000,
        'JPM': 2800000000,
        'JNJ': 2400000000,
        'WMT': 2700000000,
        'LLY': 900000000,

        // Default multipliers by price range
        default: price > 500 ? 200000000 :
            price > 100 ? 1000000000 :
                price > 50 ? 2000000000 :
                    10000000000
    };

    const multiplier = multipliers[symbol] || multipliers.default;
    return price * multiplier;
}

// Helper to parse market cap strings like "$830B"
function parseMarketCap(marketCapStr: string): number {
    const value = parseFloat(marketCapStr.replace(/[^0-9.]/g, ''));
    if (marketCapStr.includes('T')) return value * 1000000000000;
    if (marketCapStr.includes('B')) return value * 1000000000;
    if (marketCapStr.includes('M')) return value * 1000000;
    return value;
}

/**
 * Initialize stocks with price history
 * Creates initial 2-point history for each stock
 */
export function initializeStocks(): Stock[] {
    return STOCK_CATALOG.map(stock => ({
        ...stock,
        history: [
            {
                timestamp: Date.now() - 3000,
                value: stock.price * (0.98 + Math.random() * 0.04)
            },
            {
                timestamp: Date.now(),
                value: stock.price
            }
        ]
    }));
}

// Export total count for validation
export const TOTAL_ASSETS = STOCK_CATALOG.length; // Should be 115
