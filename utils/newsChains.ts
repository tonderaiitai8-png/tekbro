import { NewsEvent } from '../types';

/**
 * News Chain System
 * Creates follow-up news events based on previous news to build narratives
 */

interface NewsChain {
    triggerNewsId: string;
    followUpNews: NewsEvent[];
    probability: number; // 0-1 chance of triggering
    delayMinutes: number; // How long to wait before follow-up
}

const NEWS_CHAINS: Record<string, NewsChain[]> = {
    // NVIDIA chip announcement chains
    'nvda_chip_launch': [
        {
            triggerNewsId: 'nvda_chip_launch',
            probability: 0.7,
            delayMinutes: 5,
            followUpNews: [{
                id: 'nvda_chip_preorder',
                timestamp: Date.now(),
                type: 'COMPANY',
                severity: 'HIGH',
                headline: '🔥 NVIDIA chip pre-orders sold out in 24 hours - unprecedented demand',
                symbol: 'NVDA',
                impact: 0.08,
                suggestion: 'BUY'
            }]
        },
        {
            triggerNewsId: 'nvda_chip_preorder',
            probability: 0.6,
            delayMinutes: 10,
            followUpNews: [{
                id: 'nvda_guidance_raise',
                timestamp: Date.now(),
                type: 'COMPANY',
                severity: 'HIGH',
                headline: '📈 NVIDIA raises full-year guidance on strong chip demand',
                symbol: 'NVDA',
                impact: 0.12,
                suggestion: 'BUY'
            }]
        }
    ],

    // Tesla delivery chains
    'tsla_delivery_record': [
        {
            triggerNewsId: 'tsla_delivery_record',
            probability: 0.8,
            delayMinutes: 3,
            followUpNews: [{
                id: 'tsla_analyst_upgrade',
                timestamp: Date.now(),
                type: 'COMPANY',
                severity: 'MEDIUM',
                headline: '📊 Wall Street analysts upgrade Tesla price target by 20%',
                symbol: 'TSLA',
                impact: 0.06,
                suggestion: 'BUY'
            }]
        }
    ],

    // Apple product launch chains
    'aapl_product_launch': [
        {
            triggerNewsId: 'aapl_product_launch',
            probability: 0.75,
            delayMinutes: 7,
            followUpNews: [{
                id: 'aapl_sales_surge',
                timestamp: Date.now(),
                type: 'COMPANY',
                severity: 'HIGH',
                headline: '🎉 Apple reports record first-week sales for new product',
                symbol: 'AAPL',
                impact: 0.09,
                suggestion: 'BUY'
            }]
        },
        {
            triggerNewsId: 'aapl_sales_surge',
            probability: 0.5,
            delayMinutes: 15,
            followUpNews: [{
                id: 'aapl_supply_constraint',
                timestamp: Date.now(),
                type: 'COMPANY',
                severity: 'MEDIUM',
                headline: '⚠️ Apple warns of supply constraints - delivery times extend to 6 weeks',
                symbol: 'AAPL',
                impact: 0.04,
                suggestion: 'HOLD'
            }]
        }
    ],

    // Negative news chains
    'regulatory_investigation': [
        {
            triggerNewsId: 'regulatory_investigation',
            probability: 0.6,
            delayMinutes: 8,
            followUpNews: [{
                id: 'regulatory_fine',
                timestamp: Date.now(),
                type: 'COMPANY',
                severity: 'HIGH',
                headline: '💸 Company fined $2B in regulatory settlement',
                symbol: 'META', // Example
                impact: -0.10,
                suggestion: 'SELL'
            }]
        }
    ],

    // Sector-wide chains
    'tech_rally': [
        {
            triggerNewsId: 'tech_rally',
            probability: 0.5,
            delayMinutes: 12,
            followUpNews: [{
                id: 'tech_profit_taking',
                timestamp: Date.now(),
                type: 'SECTOR',
                severity: 'MEDIUM',
                headline: '📉 Tech sector sees profit-taking after strong rally',
                sector: 'Tech',
                impact: -0.03,
                suggestion: 'HOLD'
            }]
        }
    ]
};

/**
 * Track triggered news chains
 */
const triggeredChains = new Map<string, number>(); // newsId -> timestamp

/**
 * Check if a news event should trigger a follow-up
 */
export function checkNewsChains(newsEvent: NewsEvent): NewsEvent | null {
    const chains = NEWS_CHAINS[newsEvent.id];
    if (!chains) return null;

    const now = Date.now();

    for (const chain of chains) {
        // Check if already triggered
        const lastTriggered = triggeredChains.get(chain.triggerNewsId);
        if (lastTriggered && now - lastTriggered < chain.delayMinutes * 60 * 1000) {
            continue; // Too soon
        }

        // Check probability
        if (Math.random() < chain.probability) {
            // Trigger follow-up
            triggeredChains.set(chain.triggerNewsId, now);

            const followUp = chain.followUpNews[0];
            return {
                ...followUp,
                timestamp: now,
                id: `${followUp.id}_${now}` // Unique ID
            };
        }
    }

    return null;
}

/**
 * Get related news for a stock symbol
 */
export function getRelatedNews(newsHistory: NewsEvent[], symbol: string): NewsEvent[] {
    return newsHistory
        .filter(news => news.symbol === symbol)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5); // Last 5 news items
}

/**
 * Calculate news impact on stock price
 */
export function calculateNewsImpact(
    currentPrice: number,
    news: NewsEvent,
    stockSymbol: string,
    stockSector: string
): number {
    // Company-specific news
    if (news.type === 'COMPANY' && news.symbol === stockSymbol) {
        return currentPrice * (1 + news.impact);
    }

    // Sector news
    if (news.type === 'SECTOR' && news.sector === stockSector) {
        return currentPrice * (1 + news.impact);
    }

    // Market-wide news
    if (news.type === 'MARKET' || news.type === 'ECONOMIC') {
        return currentPrice * (1 + news.impact * 0.5); // 50% impact for market news
    }

    return currentPrice; // No impact
}

/**
 * Get news urgency level (for UI priority)
 */
export function getNewsUrgency(news: NewsEvent): 'critical' | 'high' | 'medium' | 'low' {
    const absImpact = Math.abs(news.impact);

    if (news.severity === 'HIGH' && absImpact > 0.10) return 'critical';
    if (news.severity === 'HIGH' || absImpact > 0.08) return 'high';
    if (news.severity === 'MEDIUM' || absImpact > 0.05) return 'medium';
    return 'low';
}

/**
 * Generate news chain ID for tracking
 */
export function generateChainId(baseNewsId: string): string {
    return `${baseNewsId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
