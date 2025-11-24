export interface MarketEvent {
    id: string;
    type: 'sector_boom' | 'sector_crash' | 'market_crash' | 'market_rally';
    title: string;
    description: string;
    sector?: 'Tech' | 'Finance' | 'Healthcare' | 'Consumer' | 'Energy' | 'Crypto' | 'Entertainment';
    priceImpact: number; // Percentage change
    duration: number; // milliseconds
    icon: string;
}

const MARKET_EVENTS: Omit<MarketEvent, 'id' | 'duration'>[] = [
    {
        type: 'sector_boom',
        title: 'Tech Boom!',
        description: 'Tech sector surging on AI breakthroughs',
        sector: 'Tech',
        priceImpact: 0.08,
        icon: '🚀'
    },
    {
        type: 'sector_boom',
        title: 'Crypto Surge!',
        description: 'Cryptocurrency stocks skyrocketing',
        sector: 'Crypto',
        priceImpact: 0.15,
        icon: '₿'
    },
    {
        type: 'sector_boom',
        title: 'Healthcare Rally',
        description: 'FDA approvals boost healthcare stocks',
        sector: 'Healthcare',
        priceImpact: 0.10,
        icon: '💊'
    },
    {
        type: 'sector_boom',
        title: 'Energy Crisis',
        description: 'Oil prices spike, energy stocks soar',
        sector: 'Energy',
        priceImpact: 0.12,
        icon: '⚡'
    },
    {
        type: 'sector_crash',
        title: 'Tech Selloff',
        description: 'Regulation concerns hit tech stocks',
        sector: 'Tech',
        priceImpact: -0.06,
        icon: '📉'
    },
    {
        type: 'sector_crash',
        title: 'Crypto Winter',
        description: 'Crypto market plummets on regulations',
        sector: 'Crypto',
        priceImpact: -0.12,
        icon: '❄️'
    },
    {
        type: 'market_crash',
        title: 'Market Crash!',
        description: 'Global sell-off hits all sectors',
        priceImpact: -0.08,
        icon: '💥'
    },
    {
        type: 'market_rally',
        title: 'Bull Market!',
        description: 'Positive economic data lifts all stocks',
        priceImpact: 0.05,
        icon: '📈'
    },
    {
        type: 'sector_boom',
        title: 'Consumer Spending Surge',
        description: 'Record retail sales boost consumer stocks',
        sector: 'Consumer',
        priceImpact: 0.07,
        icon: '🛍️'
    },
    {
        type: 'sector_boom',
        title: 'Finance Boom',
        description: 'Interest rate changes benefit banks',
        sector: 'Finance',
        priceImpact: 0.06,
        icon: '🏦'
    }
];

export function generateRandomEvent(): MarketEvent {
    const template = MARKET_EVENTS[Math.floor(Math.random() * MARKET_EVENTS.length)];

    return {
        id: `event_${Date.now()}`,
        ...template,
        duration: 30000 // Event lasts 30 seconds
    };
}

export function shouldTriggerEvent(lastEventTime: number): boolean {
    const now = Date.now();
    const timeSinceLastEvent = now - lastEventTime;

    // 5% chance every 2 minutes (120000ms)
    if (timeSinceLastEvent < 120000) return false;

    return Math.random() < 0.05;
}

export function applyEventToStock(
    currentPrice: number,
    stockSector: string,
    event: MarketEvent
): number {
    let impact = 0;

    if (event.type === 'market_crash' || event.type === 'market_rally') {
        // Affects all stocks
        impact = event.priceImpact;
    } else if (event.sector === stockSector) {
        // Affects specific sector
        impact = event.priceImpact;
    }

    return currentPrice * (1 + impact);
}
