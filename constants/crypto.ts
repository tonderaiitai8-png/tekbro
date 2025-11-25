export interface CryptoData {
    symbol: string;
    name: string;
    basePrice: number;
    volatility: number; // Higher than stocks (0.05 = 5% daily)
    description: string;
    icon: string;
    marketCap: string; // For display
}

export const CRYPTO_DATABASE: CryptoData[] = [
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        basePrice: 42500.00,
        volatility: 0.045,
        description: 'Digital gold and store of value',
        icon: '₿',
        marketCap: '$830B'
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        basePrice: 2250.00,
        volatility: 0.050,
        description: 'Smart contract platform',
        icon: '⟠',
        marketCap: '$270B'
    },
    {
        symbol: 'BNB',
        name: 'Binance Coin',
        basePrice: 315.00,
        volatility: 0.055,
        description: 'Binance exchange token',
        icon: '🔶',
        marketCap: '$48B'
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        basePrice: 68.50,
        volatility: 0.065,
        description: 'High-speed blockchain',
        icon: '◎',
        marketCap: '$28B'
    },
    {
        symbol: 'ADA',
        name: 'Cardano',
        basePrice: 0.42,
        volatility: 0.060,
        description: 'Proof-of-stake blockchain',
        icon: '₳',
        marketCap: '$15B'
    },
    {
        symbol: 'MATIC',
        name: 'Polygon',
        basePrice: 0.85,
        volatility: 0.058,
        description: 'Ethereum scaling solution',
        icon: '⬡',
        marketCap: '$8B'
    },
    {
        symbol: 'DOT',
        name: 'Polkadot',
        basePrice: 6.80,
        volatility: 0.062,
        description: 'Multi-chain protocol',
        icon: '●',
        marketCap: '$9B'
    },
    {
        symbol: 'LINK',
        name: 'Chainlink',
        basePrice: 14.50,
        volatility: 0.056,
        description: 'Decentralized oracle network',
        icon: '🔗',
        marketCap: '$8B'
    },
    {
        symbol: 'UNI',
        name: 'Uniswap',
        basePrice: 6.20,
        volatility: 0.064,
        description: 'Decentralized exchange',
        icon: '🦄',
        marketCap: '$5B'
    },
    {
        symbol: 'AAVE',
        name: 'Aave',
        basePrice: 95.00,
        volatility: 0.068,
        description: 'DeFi lending protocol',
        icon: '👻',
        marketCap: '$1.4B'
    },
];

// Total: 10 major crypto assets
