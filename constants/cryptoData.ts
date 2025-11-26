import { Crypto } from '../types';

// Cryptocurrency Catalog
export const CRYPTO_CATALOG: Crypto[] = [
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        basePrice: 35000,
        price: 35000,
        history: [{ timestamp: Date.now(), value: 35000 }],
        volatility: 0.04,
        logo: require('../assets/crypto/btc.png'),
        description: 'The original cryptocurrency. Digital gold.',
        educational: 'Bitcoin is the first decentralized digital currency, allowing peer-to-peer transactions without intermediaries.'
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        basePrice: 2000,
        price: 2000,
        history: [{ timestamp: Date.now(), value: 2000 }],
        volatility: 0.05,
        logo: require('../assets/crypto/eth.png'),
        description: 'The leading smart contract platform.',
        educational: 'Ethereum introduced smart contracts, enabling decentralized applications (dApps) and DeFi.'
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        basePrice: 60,
        price: 60,
        history: [{ timestamp: Date.now(), value: 60 }],
        volatility: 0.08,
        logo: require('../assets/crypto/sol.png'),
        description: 'High-performance blockchain for mass adoption.',
        educational: 'Solana is known for its incredible speed and low transaction costs, making it popular for NFTs and gaming.'
    },
    {
        symbol: 'ADA',
        name: 'Cardano',
        basePrice: 0.40,
        price: 0.40,
        history: [{ timestamp: Date.now(), value: 0.40 }],
        volatility: 0.06,
        logo: require('../assets/crypto/ada.png'),
        description: 'Proof-of-stake blockchain platform.',
        educational: 'Cardano is built on peer-reviewed research and aims to provide a more secure and sustainable blockchain.'
    },
    {
        symbol: 'DOGE',
        name: 'Dogecoin',
        basePrice: 0.08,
        price: 0.08,
        history: [{ timestamp: Date.now(), value: 0.08 }],
        volatility: 0.10,
        logo: require('../assets/crypto/doge.png'),
        description: 'The original meme coin.',
        educational: 'Started as a joke, Dogecoin has become a popular cryptocurrency for tipping and community fundraising.'
    },
    {
        symbol: 'MATIC',
        name: 'Polygon',
        basePrice: 0.75,
        price: 0.75,
        history: [{ timestamp: Date.now(), value: 0.75 }],
        volatility: 0.07,
        logo: require('../assets/crypto/matic.png'),
        description: 'Ethereum scaling solution for faster, cheaper transactions.',
        educational: 'Polygon is a Layer 2 scaling solution that helps Ethereum handle more transactions at lower cost.'
    },
    {
        symbol: 'AVAX',
        name: 'Avalanche',
        basePrice: 25,
        price: 25,
        history: [{ timestamp: Date.now(), value: 25 }],
        volatility: 0.08,
        logo: require('../assets/crypto/avax.png'),
        description: 'Fast smart contract platform with sub-second finality.',
        educational: 'Avalanche uses a unique consensus protocol that achieves transaction finality in under 1 second.'
    },
    {
        symbol: 'DOT',
        name: 'Polkadot',
        basePrice: 5.5,
        price: 5.5,
        history: [{ timestamp: Date.now(), value: 5.5 }],
        volatility: 0.06,
        logo: require('../assets/crypto/dot.png'),
        description: 'Multi-chain protocol enabling blockchain interoperability.',
        educational: 'Polkadot connects different blockchains together, allowing them to share information and features.'
    },
    {
        symbol: 'LINK',
        name: 'Chainlink',
        basePrice: 12,
        price: 12,
        history: [{ timestamp: Date.now(), value: 12 }],
        volatility: 0.05,
        logo: require('../assets/crypto/link.png'),
        description: 'Decentralized oracle network bringing real-world data to blockchains.',
        educational: 'Chainlink oracles allow smart contracts to access external data like stock prices, weather, and more.'
    },
    {
        symbol: 'UNI',
        name: 'Uniswap',
        basePrice: 6,
        price: 6,
        history: [{ timestamp: Date.now(), value: 6 }],
        volatility: 0.06,
        logo: require('../assets/crypto/uni.png'),
        description: 'Leading decentralized exchange protocol.',
        educational: 'Uniswap pioneered automated market makers (AMMs), allowing anyone to trade tokens without a centralized exchange.'
    },
];

export function initializeCryptos(): Crypto[] {
    return CRYPTO_CATALOG.map(crypto => ({
        ...crypto,
        price: crypto.basePrice,
        history: [{ timestamp: Date.now(), value: crypto.basePrice }]
    }));
}
