import { Stock } from '../types';

// Complete stock catalog with 100 unique diverse stocks
export const STOCK_CATALOG: Omit<Stock, 'history'>[] = [
    // Tech Giants (1-10)
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, sector: 'Tech', marketCap: 2800000000000, volatility: 4, description: 'Consumer electronics and software giant' },
    { id: '2', symbol: 'MSFT', name: 'Microsoft Corporation', price: 374.20, sector: 'Tech', marketCap: 2700000000000, volatility: 3, description: 'Cloud computing and software leader' },
    { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, sector: 'Tech', marketCap: 1700000000000, volatility: 4, description: 'Search engine and digital advertising' },
    { id: '4', symbol: 'META', name: 'Meta Platforms Inc.', price: 484.03, sector: 'Tech', marketCap: 1200000000000, volatility: 6, description: 'Social media and virtual reality' },
    { id: '5', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, sector: 'Tech', marketCap: 1800000000000, volatility: 5, description: 'E-commerce and cloud services' },
    { id: '6', symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22, sector: 'Tech', marketCap: 1200000000000, volatility: 8, description: 'GPU and AI chip manufacturer' },
    { id: '7', symbol: 'TSLA', name: 'Tesla Inc.', price: 242.84, sector: 'Tech', marketCap: 750000000000, volatility: 9, description: 'Electric vehicles and energy storage' },
    { id: '8', symbol: 'NFLX', name: 'Netflix Inc.', price: 682.33, sector: 'Entertainment', marketCap: 295000000000, volatility: 6, description: 'Streaming entertainment service' },
    { id: '9', symbol: 'UBER', name: 'Uber Technologies', price: 78.00, sector: 'Tech', marketCap: 160000000000, volatility: 5, description: 'Ride-hailing and delivery' },
    { id: '10', symbol: 'ABNB', name: 'Airbnb Inc.', price: 165.00, sector: 'Consumer', marketCap: 105000000000, volatility: 5, description: 'Vacation rental marketplace' },

    // Finance (11-25)
    { id: '11', symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.73, sector: 'Finance', marketCap: 570000000000, volatility: 4, description: 'Global investment banking' },
    { id: '12', symbol: 'BAC', name: 'Bank of America Corp.', price: 42.15, sector: 'Finance', marketCap: 330000000000, volatility: 4, description: 'Consumer and commercial banking' },
    { id: '13', symbol: 'GS', name: 'Goldman Sachs Group', price: 425.50, sector: 'Finance', marketCap: 145000000000, volatility: 5, description: 'Investment banking and securities' },
    { id: '14', symbol: 'V', name: 'Visa Inc.', price: 275.00, sector: 'Finance', marketCap: 590000000000, volatility: 4, description: 'Global payments technology' },
    { id: '15', symbol: 'MA', name: 'Mastercard Inc.', price: 445.00, sector: 'Finance', marketCap: 425000000000, volatility: 4, description: 'Global payments technology' },
    { id: '16', symbol: 'PYPL', name: 'PayPal Holdings', price: 81.34, sector: 'Finance', marketCap: 87000000000, volatility: 6, description: 'Online payment solutions' },
    { id: '17', symbol: 'SQ', name: 'Block Inc.', price: 78.92, sector: 'Finance', marketCap: 48000000000, volatility: 7, description: 'Digital payments and Bitcoin' },
    { id: '18', symbol: 'C', name: 'Citigroup Inc.', price: 65.00, sector: 'Finance', marketCap: 115000000000, volatility: 5, description: 'Global banking services' },
    { id: '19', symbol: 'WFC', name: 'Wells Fargo', price: 58.00, sector: 'Finance', marketCap: 210000000000, volatility: 4, description: 'Consumer banking and lending' },
    { id: '20', symbol: 'MS', name: 'Morgan Stanley', price: 98.00, sector: 'Finance', marketCap: 165000000000, volatility: 5, description: 'Investment banking and wealth management' },
    { id: '21', symbol: 'AXP', name: 'American Express', price: 195.00, sector: 'Finance', marketCap: 142000000000, volatility: 4, description: 'Credit card and financial services' },
    { id: '22', symbol: 'SCHW', name: 'Charles Schwab', price: 75.00, sector: 'Finance', marketCap: 140000000000, volatility: 4, description: 'Brokerage and banking services' },
    { id: '23', symbol: 'BLK', name: 'BlackRock Inc.', price: 825.00, sector: 'Finance', marketCap: 125000000000, volatility: 4, description: 'Asset management giant' },
    { id: '24', symbol: 'USB', name: 'U.S. Bancorp', price: 48.00, sector: 'Finance', marketCap: 70000000000, volatility: 4, description: 'Regional banking services' },
    { id: '25', symbol: 'COF', name: 'Capital One Financial', price: 135.00, sector: 'Finance', marketCap: 52000000000, volatility: 6, description: 'Banking and credit card services' },

    // Healthcare (26-40)
    { id: '26', symbol: 'JNJ', name: 'Johnson & Johnson', price: 158.00, sector: 'Healthcare', marketCap: 380000000000, volatility: 3, description: 'Pharmaceuticals and medical devices' },
    { id: '27', symbol: 'UNH', name: 'UnitedHealth Group', price: 525.00, sector: 'Healthcare', marketCap: 490000000000, volatility: 3, description: 'Health insurance and care services' },
    { id: '28', symbol: 'PFE', name: 'Pfizer Inc.', price: 28.00, sector: 'Healthcare', marketCap: 160000000000, volatility: 5, description: 'Pharmaceutical and vaccine development' },
    { id: '29', symbol: 'ABBV', name: 'AbbVie Inc.', price: 175.00, sector: 'Healthcare', marketCap: 310000000000, volatility: 4, description: 'Biopharmaceutical company' },
    { id: '30', symbol: 'MRK', name: 'Merck & Co.', price: 108.00, sector: 'Healthcare', marketCap: 275000000000, volatility: 4, description: 'Pharmaceutical research and development' },
    { id: '31', symbol: 'LLY', name: 'Eli Lilly', price: 785.00, sector: 'Healthcare', marketCap: 740000000000, volatility: 5, description: 'Pharmaceuticals and biotechnology' },
    { id: '32', symbol: 'CVS', name: 'CVS Health', price: 78.00, sector: 'Healthcare', marketCap: 100000000000, volatility: 4, description: 'Pharmacy and healthcare services' },
    { id: '33', symbol: 'GILD', name: 'Gilead Sciences', price: 87.00, sector: 'Healthcare', marketCap: 110000000000, volatility: 5, description: 'Biopharmaceutical company' },
    { id: '34', symbol: 'BNTX', name: 'BioNTech SE', price: 95.00, sector: 'Healthcare', marketCap: 23000000000, volatility: 9, description: 'mRNA vaccine technology' },
    { id: '35', symbol: 'REGN', name: 'Regeneron Pharmaceuticals', price: 925.00, sector: 'Healthcare', marketCap: 102000000000, volatility: 6, description: 'Biopharmaceutical company' },
    { id: '36', symbol: 'VRTX', name: 'Vertex Pharmaceuticals', price: 435.00, sector: 'Healthcare', marketCap: 112000000000, volatility: 7, description: 'Specialty pharmaceuticals' },
    { id: '37', symbol: 'TMO', name: 'Thermo Fisher Scientific', price: 565.00, sector: 'Healthcare', marketCap: 220000000000, volatility: 4, description: 'Life sciences and lab equipment' },
    { id: '38', symbol: 'DHR', name: 'Danaher Corporation', price: 245.00, sector: 'Healthcare', marketCap: 180000000000, volatility: 4, description: 'Life sciences and diagnostics' },
    { id: '39', symbol: 'ABT', name: 'Abbott Laboratories', price: 112.00, sector: 'Healthcare', marketCap: 195000000000, volatility: 3, description: 'Medical devices and diagnostics' },
    { id: '40', symbol: 'AMGN', name: 'Amgen Inc.', price: 295.00, sector: 'Healthcare', marketCap: 155000000000, volatility: 4, description: 'Biotechnology and therapeutics' },

    // Consumer & Retail (41-55)
    { id: '41', symbol: 'WMT', name: 'Walmart Inc.', price: 168.00, sector: 'Consumer', marketCap: 455000000000, volatility: 3, description: 'Retail and e-commerce giant' },
    { id: '42', symbol: 'COST', name: 'Costco Wholesale', price: 785.00, sector: 'Consumer', marketCap: 350000000000, volatility: 3, description: 'Wholesale retail club' },
    { id: '43', symbol: 'TGT', name: 'Target Corporation', price: 155.00, sector: 'Consumer', marketCap: 72000000000, volatility: 4, description: 'Discount retail chain' },
    { id: '44', symbol: 'HD', name: 'Home Depot', price: 385.00, sector: 'Consumer', marketCap: 390000000000, volatility: 4, description: 'Home improvement retail' },
    { id: '45', symbol: 'LOW', name: 'Lowes Companies', price: 245.00, sector: 'Consumer', marketCap: 145000000000, volatility: 4, description: 'Home improvement retail' },
    { id: '46', symbol: 'NKE', name: 'Nike Inc.', price: 95.00, sector: 'Consumer', marketCap: 145000000000, volatility: 5, description: 'Athletic footwear and apparel' },
    { id: '47', symbol: 'SBUX', name: 'Starbucks Corporation', price: 96.84, sector: 'Consumer', marketCap: 110000000000, volatility: 4, description: 'Coffeehouse chain' },
    { id: '48', symbol: 'MCD', name: "McDonald's Corporation", price: 294.73, sector: 'Consumer', marketCap: 210000000000, volatility: 2, description: 'Fast food restaurant chain' },
    { id: '49', symbol: 'DIS', name: 'Walt Disney Company', price: 115.00, sector: 'Entertainment', marketCap: 210000000000, volatility: 6, description: 'Entertainment and media conglomerate' },
    { id: '50', symbol: 'PEP', name: 'Pepsico Inc.', price: 175.00, sector: 'Consumer', marketCap: 242000000000, volatility: 3, description: 'Food and beverage company' },
    { id: '51', symbol: 'KO', name: 'Coca-Cola Company', price: 62.00, sector: 'Consumer', marketCap: 270000000000, volatility: 2, description: 'Beverage company' },
    { id: '52', symbol: 'BKNG', name: 'Booking Holdings', price: 3850.00, sector: 'Consumer', marketCap: 135000000000, volatility: 5, description: 'Online travel and reservations' },
    { id: '53', symbol: 'LULU', name: 'Lululemon Athletica', price: 385.00, sector: 'Consumer', marketCap: 48000000000, volatility: 6, description: 'Athletic apparel and accessories' },
    { id: '54', symbol: 'PDD', name: 'PDD Holdings', price: 125.00, sector: 'Consumer', marketCap: 165000000000, volatility: 8, description: 'E-commerce platform (Pinduoduo/Temu)' },
    { id: '55', symbol: 'RACE', name: 'Ferrari N.V.', price: 410.00, sector: 'Consumer', marketCap: 75000000000, volatility: 3, description: 'Luxury sports car manufacturer' },

    // Tech Continued (56-75)
    { id: '56', symbol: 'AMD', name: 'Advanced Micro Devices', price: 175.00, sector: 'Tech', marketCap: 280000000000, volatility: 6, description: 'Semiconductor company' },
    { id: '57', symbol: 'INTC', name: 'Intel Corporation', price: 43.00, sector: 'Tech', marketCap: 180000000000, volatility: 5, description: 'Microprocessor and chip maker' },
    { id: '58', symbol: 'QCOM', name: 'Qualcomm Inc.', price: 165.00, sector: 'Tech', marketCap: 185000000000, volatility: 5, description: 'Wireless technology and semiconductors' },
    { id: '59', symbol: 'ORCL', name: 'Oracle Corporation', price: 118.00, sector: 'Tech', marketCap: 325000000000, volatility: 4, description: 'Enterprise software and cloud services' },
    { id: '60', symbol: 'CRM', name: 'Salesforce Inc.', price: 265.00, sector: 'Tech', marketCap: 260000000000, volatility: 5, description: 'Cloud-based software and CRM' },
    { id: '61', symbol: 'ADBE', name: 'Adobe Inc.', price: 565.00, sector: 'Tech', marketCap: 260000000000, volatility: 4, description: 'Creative software and digital marketing' },
    { id: '62', symbol: 'BABA', name: 'Alibaba Group', price: 78.00, sector: 'Tech', marketCap: 195000000000, volatility: 8, description: 'Chinese e-commerce and cloud' },
    { id: '63', symbol: 'BIDU', name: 'Baidu Inc.', price: 95.00, sector: 'Tech', marketCap: 33000000000, volatility: 7, description: 'Chinese search engine and AI' },
    { id: '64', symbol: 'PLTR', name: 'Palantir Technologies', price: 24.50, sector: 'Tech', marketCap: 54000000000, volatility: 7, description: 'Big data analytics' },
    { id: '65', symbol: 'SNOW', name: 'Snowflake Inc.', price: 175.00, sector: 'Tech', marketCap: 58000000000, volatility: 8, description: 'Cloud data platform' },
    { id: '66', symbol: 'DDOG', name: 'Datadog Inc.', price: 125.00, sector: 'Tech', marketCap: 42000000000, volatility: 7, description: 'Cloud monitoring and analytics' },
    { id: '67', symbol: 'CRWD', name: 'CrowdStrike Holdings', price: 285.00, sector: 'Tech', marketCap: 68000000000, volatility: 7, description: 'Cybersecurity and endpoint protection' },
    { id: '68', symbol: 'PANW', name: 'Palo Alto Networks', price: 325.00, sector: 'Tech', marketCap: 105000000000, volatility: 6, description: 'Cybersecurity and firewalls' },
    { id: '69', symbol: 'NET', name: 'Cloudflare Inc.', price: 95.00, sector: 'Tech', marketCap: 33000000000, volatility: 7, description: 'Web infrastructure and security' },
    { id: '70', symbol: 'ZM', name: 'Zoom Video Communications', price: 68.00, sector: 'Tech', marketCap: 21000000000, volatility: 8, description: 'Video conferencing platform' },
    { id: '71', symbol: 'DOCU', name: 'DocuSign Inc.', price: 58.00, sector: 'Tech', marketCap: 12000000000, volatility: 7, description: 'Electronic signature technology' },
    { id: '72', symbol: 'TWLO', name: 'Twilio Inc.', price: 68.00, sector: 'Tech', marketCap: 13000000000, volatility: 8, description: 'Cloud communications platform' },
    { id: '73', symbol: 'OKTA', name: 'Okta Inc.', price: 105.00, sector: 'Tech', marketCap: 17000000000, volatility: 7, description: 'Identity and access management' },
    { id: '74', symbol: 'SPOT', name: 'Spotify Technology', price: 195.00, sector: 'Tech', marketCap: 38000000000, volatility: 6, description: 'Music streaming platform' },
    { id: '75', symbol: 'SHOP', name: 'Shopify Inc.', price: 85.00, sector: 'Tech', marketCap: 110000000000, volatility: 7, description: 'E-commerce platform' },

    // Energy & Crypto (76-90)
    { id: '76', symbol: 'XOM', name: 'Exxon Mobil', price: 110.00, sector: 'Energy', marketCap: 450000000000, volatility: 5, description: 'Oil and gas production' },
    { id: '77', symbol: 'CVX', name: 'Chevron Corporation', price: 158.00, sector: 'Energy', marketCap: 290000000000, volatility: 6, description: 'Integrated energy company' },
    { id: '78', symbol: 'BP', name: 'BP plc', price: 35.00, sector: 'Energy', marketCap: 110000000000, volatility: 6, description: 'Oil and gas exploration' },
    { id: '79', symbol: 'EOG', name: 'EOG Resources', price: 120.00, sector: 'Energy', marketCap: 70000000000, volatility: 5, description: 'Oil and natural gas exploration' },
    { id: '80', symbol: 'SLB', name: 'Schlumberger', price: 55.00, sector: 'Energy', marketCap: 78000000000, volatility: 6, description: 'Oilfield services' },
    { id: '81', symbol: 'COIN', name: 'Coinbase Global', price: 285.45, sector: 'Crypto', marketCap: 68000000000, volatility: 10, description: 'Cryptocurrency exchange platform' },
    { id: '82', symbol: 'MARA', name: 'Marathon Digital', price: 18.00, sector: 'Crypto', marketCap: 5500000000, volatility: 10, description: 'Bitcoin mining operations' },
    { id: '83', symbol: 'RIOT', name: 'Riot Platforms', price: 11.00, sector: 'Crypto', marketCap: 3200000000, volatility: 10, description: 'Cryptocurrency mining' },
    { id: '84', symbol: 'MSTR', name: 'MicroStrategy Inc.', price: 425.00, sector: 'Crypto', marketCap: 85000000000, volatility: 9, description: 'Business intelligence and Bitcoin' },
    { id: '85', symbol: 'HUT', name: 'Hut 8 Mining', price: 22.00, sector: 'Crypto', marketCap: 2800000000, volatility: 10, description: 'Bitcoin mining and digital assets' },
    { id: '86', symbol: 'ETH', name: 'Ethereum', price: 3200.00, sector: 'Crypto', marketCap: 380000000000, volatility: 8, description: 'Smart contract blockchain' },
    { id: '87', symbol: 'SOL', name: 'Solana', price: 145.00, sector: 'Crypto', marketCap: 65000000000, volatility: 9, description: 'High-performance blockchain' },
    { id: '88', symbol: 'DOGE', name: 'Dogecoin', price: 0.12, sector: 'Crypto', marketCap: 17000000000, volatility: 10, description: "The people's crypto" },
    { id: '89', symbol: 'CIFR', name: 'Cipher Mining', price: 5.50, sector: 'Crypto', marketCap: 1500000000, volatility: 10, description: 'Bitcoin mining infrastructure' },
    { id: '90', symbol: 'RBLX', name: 'Roblox Corporation', price: 48.00, sector: 'Tech', marketCap: 30000000000, volatility: 8, description: 'Online gaming platform' },

    // Meme & Index (91-100)
    { id: '91', symbol: 'GME', name: 'GameStop Corp.', price: 14.50, sector: 'Consumer', marketCap: 4000000000, volatility: 9, description: 'Video game retailer & meme king' },
    { id: '92', symbol: 'AMC', name: 'AMC Entertainment', price: 4.20, sector: 'Entertainment', marketCap: 1000000000, volatility: 9, description: 'Theatrical exhibition company' },
    { id: '93', symbol: 'BB', name: 'BlackBerry Ltd.', price: 2.80, sector: 'Tech', marketCap: 1600000000, volatility: 7, description: 'Cybersecurity and IoT software' },
    { id: '94', symbol: 'RDDT', name: 'Reddit Inc.', price: 55.00, sector: 'Tech', marketCap: 9000000000, volatility: 8, description: 'Social news aggregation' },
    { id: '95', symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 508.00, sector: 'Index', marketCap: 500000000000, volatility: 2, description: 'S&P 500 Index Fund' },
    { id: '96', symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 438.00, sector: 'Index', marketCap: 200000000000, volatility: 3, description: 'Nasdaq-100 Index Fund' },
    { id: '97', symbol: 'NOW', name: 'ServiceNow Inc.', price: 725.00, sector: 'Tech', marketCap: 150000000000, volatility: 6, description: 'Cloud IT service management' },
    { id: '98', symbol: 'ZS', name: 'Zscaler Inc.', price: 210.00, sector: 'Tech', marketCap: 31000000000, volatility: 8, description: 'Cloud security platform' },
    { id: '99', symbol: 'LVMH', name: 'LVMH Moët Hennessy', price: 850.00, sector: 'Consumer', marketCap: 420000000000, volatility: 3, description: 'Luxury goods conglomerate' },
    { id: '100', symbol: 'IBM', name: 'IBM Corporation', price: 182.00, sector: 'Tech', marketCap: 168000000000, volatility: 4, description: 'Enterprise IT and cloud services' }
];

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
