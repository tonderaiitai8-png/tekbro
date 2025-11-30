// Using Finnhub as an example (requires API key) or a mock for now
// Ideally, we'd use an environment variable for the API key

const BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = 'YOUR_API_KEY_HERE'; // TODO: Replace with env variable or user input

export interface StockData {
    symbol: string;
    price: number;
    change: number;
    percentChange: number;
}

export const fetchStockQuote = async (symbol: string): Promise<StockData | null> => {
    try {
        // Mocking response for now if no key is present to avoid errors
        if (API_KEY === 'YOUR_API_KEY_HERE') {
            console.warn('Stock API Key missing. Returning mock data.');
            return {
                symbol: symbol.toUpperCase(),
                price: 150.0 + Math.random() * 10,
                change: Math.random() * 5 - 2.5,
                percentChange: Math.random() * 2 - 1
            };
        }

        const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);

        if (!response.ok) {
            throw new Error('Failed to fetch stock data');
        }

        const data = await response.json();
        return {
            symbol,
            price: data.c,
            change: data.d,
            percentChange: data.dp
        };
    } catch (error) {
        console.error('Stock API Error:', error);
        return null;
    }
};

export const fetchTopStocks = async (): Promise<StockData[]> => {
    // Mock list for initial development
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'];
    const promises = symbols.map(s => fetchStockQuote(s));
    const results = await Promise.all(promises);
    return results.filter((s): s is StockData => s !== null);
};
