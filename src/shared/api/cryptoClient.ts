const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    image: string;
}

export const fetchCryptoMarketData = async (currency = 'usd'): Promise<CryptoData[]> => {
    try {
        const response = await fetch(
            `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch crypto data');
        }

        return await response.json();
    } catch (error) {
        console.error('Crypto API Error:', error);
        return [];
    }
};
