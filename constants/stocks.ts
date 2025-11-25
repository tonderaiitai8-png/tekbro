export interface StockData {
    symbol: string;
    name: string;
    sector: 'Tech' | 'Finance' | 'Healthcare' | 'Consumer' | 'Energy' | 'Real Estate';
    basePrice: number;
    volatility: number; // Daily volatility (0.02 = 2%)
    description: string;
    icon: string;
}

export const STOCK_DATABASE: StockData[] = [
    // ==================== TECH SECTOR (30 stocks) ====================
    // FAANG
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Tech', basePrice: 185.50, volatility: 0.018, description: 'Consumer electronics and software', icon: '🍎' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Tech', basePrice: 140.25, volatility: 0.020, description: 'Search engine and cloud services', icon: '🔍' },
    { symbol: 'META', name: 'Meta Platforms', sector: 'Tech', basePrice: 350.80, volatility: 0.025, description: 'Social media and metaverse', icon: '👥' },
    { symbol: 'AMZN', name: 'Amazon.com', sector: 'Tech', basePrice: 145.60, volatility: 0.022, description: 'E-commerce and cloud computing', icon: '📦' },
    { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Tech', basePrice: 450.30, volatility: 0.028, description: 'Streaming entertainment', icon: '🎬' },

    // Semiconductors
    { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Tech', basePrice: 495.20, volatility: 0.030, description: 'Graphics processing units and AI chips', icon: '🎮' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Tech', basePrice: 125.40, volatility: 0.028, description: 'Semiconductor manufacturer', icon: '💻' },
    { symbol: 'INTC', name: 'Intel Corp.', sector: 'Tech', basePrice: 42.80, volatility: 0.020, description: 'Microprocessor manufacturer', icon: '🔧' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor', sector: 'Tech', basePrice: 98.50, volatility: 0.022, description: 'Chip foundry services', icon: '⚡' },
    { symbol: 'QCOM', name: 'Qualcomm Inc.', sector: 'Tech', basePrice: 145.30, volatility: 0.024, description: 'Mobile chip technology', icon: '📱' },

    // Software
    { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Tech', basePrice: 375.80, volatility: 0.016, description: 'Software and cloud services', icon: '💻' },
    { symbol: 'ORCL', name: 'Oracle Corp.', sector: 'Tech', basePrice: 108.60, volatility: 0.018, description: 'Database software', icon: '🗄️' },
    { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Tech', basePrice: 220.40, volatility: 0.022, description: 'CRM software platform', icon: '☁️' },
    { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Tech', basePrice: 560.90, volatility: 0.020, description: 'Creative software suite', icon: '🎨' },
    { symbol: 'NOW', name: 'ServiceNow Inc.', sector: 'Tech', basePrice: 680.50, volatility: 0.024, description: 'Enterprise workflow software', icon: '⚙️' },

    // Cloud & Data
    { symbol: 'SNOW', name: 'Snowflake Inc.', sector: 'Tech', basePrice: 175.30, volatility: 0.032, description: 'Cloud data platform', icon: '❄️' },
    { symbol: 'DDOG', name: 'Datadog Inc.', sector: 'Tech', basePrice: 110.80, volatility: 0.028, description: 'Cloud monitoring', icon: '🐕' },
    { symbol: 'NET', name: 'Cloudflare Inc.', sector: 'Tech', basePrice: 78.40, volatility: 0.030, description: 'Web infrastructure', icon: '☁️' },
    { symbol: 'MDB', name: 'MongoDB Inc.', sector: 'Tech', basePrice: 385.60, volatility: 0.026, description: 'NoSQL database', icon: '🍃' },
    { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Tech', basePrice: 18.90, volatility: 0.035, description: 'Big data analytics', icon: '🛡️' },

    // Cybersecurity
    { symbol: 'CRWD', name: 'CrowdStrike Holdings', sector: 'Tech', basePrice: 240.70, volatility: 0.026, description: 'Endpoint security', icon: '🔒' },
    { symbol: 'ZS', name: 'Zscaler Inc.', sector: 'Tech', basePrice: 190.50, volatility: 0.028, description: 'Cloud security', icon: '🛡️' },
    { symbol: 'PANW', name: 'Palo Alto Networks', sector: 'Tech', basePrice: 280.30, volatility: 0.024, description: 'Network security', icon: '🔐' },
    { symbol: 'FTNT', name: 'Fortinet Inc.', sector: 'Tech', basePrice: 58.90, volatility: 0.022, description: 'Firewall solutions', icon: '🧱' },

    // Gaming & Entertainment
    { symbol: 'RBLX', name: 'Roblox Corp.', sector: 'Tech', basePrice: 42.60, volatility: 0.032, description: 'Gaming platform', icon: '🎮' },
    { symbol: 'EA', name: 'Electronic Arts', sector: 'Tech', basePrice: 135.80, volatility: 0.020, description: 'Video game publisher', icon: '🎮' },
    { symbol: 'TTWO', name: 'Take-Two Interactive', sector: 'Tech', basePrice: 155.40, volatility: 0.022, description: 'Game developer', icon: '🎯' },

    // E-commerce
    { symbol: 'SHOP', name: 'Shopify Inc.', sector: 'Tech', basePrice: 75.30, volatility: 0.028, description: 'E-commerce platform', icon: '🛍️' },
    { symbol: 'ETSY', name: 'Etsy Inc.', sector: 'Tech', basePrice: 72.50, volatility: 0.026, description: 'Handmade marketplace', icon: '🎨' },
    { symbol: 'EBAY', name: 'eBay Inc.', sector: 'Tech', basePrice: 45.80, volatility: 0.020, description: 'Online marketplace', icon: '🏪' },

    // ==================== FINANCE SECTOR (20 stocks) ====================
    // Major Banks
    { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', basePrice: 155.40, volatility: 0.018, description: 'Investment banking', icon: '🏦' },
    { symbol: 'BAC', name: 'Bank of America', sector: 'Finance', basePrice: 32.80, volatility: 0.020, description: 'Consumer banking', icon: '🏦' },
    { symbol: 'WFC', name: 'Wells Fargo', sector: 'Finance', basePrice: 48.60, volatility: 0.022, description: 'Banking services', icon: '🏦' },
    { symbol: 'C', name: 'Citigroup Inc.', sector: 'Finance', basePrice: 52.30, volatility: 0.024, description: 'Global banking', icon: '🏦' },
    { symbol: 'GS', name: 'Goldman Sachs', sector: 'Finance', basePrice: 380.50, volatility: 0.022, description: 'Investment banking', icon: '💼' },
    { symbol: 'MS', name: 'Morgan Stanley', sector: 'Finance', basePrice: 92.70, volatility: 0.020, description: 'Financial services', icon: '💼' },

    // Fintech
    { symbol: 'SQ', name: 'Block Inc.', sector: 'Finance', basePrice: 68.40, volatility: 0.030, description: 'Digital payments', icon: '💳' },
    { symbol: 'PYPL', name: 'PayPal Holdings', sector: 'Finance', basePrice: 62.90, volatility: 0.026, description: 'Online payments', icon: '💰' },
    { symbol: 'COIN', name: 'Coinbase Global', sector: 'Finance', basePrice: 125.80, volatility: 0.040, description: 'Crypto exchange', icon: '🪙' },
    { symbol: 'HOOD', name: 'Robinhood Markets', sector: 'Finance', basePrice: 12.50, volatility: 0.035, description: 'Trading platform', icon: '🎯' },
    { symbol: 'AFRM', name: 'Affirm Holdings', sector: 'Finance', basePrice: 35.60, volatility: 0.032, description: 'Buy now pay later', icon: '💳' },
    { symbol: 'SOFI', name: 'SoFi Technologies', sector: 'Finance', basePrice: 8.90, volatility: 0.030, description: 'Digital banking', icon: '🏦' },

    // Insurance
    { symbol: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finance', basePrice: 360.40, volatility: 0.012, description: 'Diversified holdings', icon: '📊' },
    { symbol: 'PGR', name: 'Progressive Corp.', sector: 'Finance', basePrice: 155.80, volatility: 0.016, description: 'Auto insurance', icon: '🚗' },
    { symbol: 'ALL', name: 'Allstate Corp.', sector: 'Finance', basePrice: 135.20, volatility: 0.018, description: 'Insurance services', icon: '🛡️' },
    { symbol: 'TRV', name: 'Travelers Companies', sector: 'Finance', basePrice: 195.60, volatility: 0.016, description: 'Property insurance', icon: '🏠' },

    // Credit Cards
    { symbol: 'V', name: 'Visa Inc.', sector: 'Finance', basePrice: 255.30, volatility: 0.016, description: 'Payment network', icon: '💳' },
    { symbol: 'MA', name: 'Mastercard Inc.', sector: 'Finance', basePrice: 410.80, volatility: 0.016, description: 'Payment processing', icon: '💳' },
    { symbol: 'AXP', name: 'American Express', sector: 'Finance', basePrice: 185.40, volatility: 0.020, description: 'Credit card services', icon: '💳' },
    { symbol: 'DFS', name: 'Discover Financial', sector: 'Finance', basePrice: 118.60, volatility: 0.022, description: 'Credit cards', icon: '💳' },

    // ==================== HEALTHCARE SECTOR (15 stocks) ====================
    // Pharma
    { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', basePrice: 28.90, volatility: 0.020, description: 'Pharmaceutical company', icon: '💊' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', basePrice: 158.40, volatility: 0.014, description: 'Healthcare products', icon: '🏥' },
    { symbol: 'MRK', name: 'Merck & Co.', sector: 'Healthcare', basePrice: 108.70, volatility: 0.016, description: 'Pharmaceutical research', icon: '💊' },
    { symbol: 'LLY', name: 'Eli Lilly', sector: 'Healthcare', basePrice: 580.30, volatility: 0.018, description: 'Diabetes treatments', icon: '💉' },
    { symbol: 'ABBV', name: 'AbbVie Inc.', sector: 'Healthcare', basePrice: 158.90, volatility: 0.016, description: 'Biopharmaceuticals', icon: '💊' },

    // Biotech
    { symbol: 'MRNA', name: 'Moderna Inc.', sector: 'Healthcare', basePrice: 95.60, volatility: 0.035, description: 'mRNA therapeutics', icon: '🧬' },
    { symbol: 'BNTX', name: 'BioNTech SE', sector: 'Healthcare', basePrice: 105.80, volatility: 0.032, description: 'Immunotherapy', icon: '🧬' },
    { symbol: 'REGN', name: 'Regeneron Pharma', sector: 'Healthcare', basePrice: 880.40, volatility: 0.022, description: 'Antibody treatments', icon: '🔬' },
    { symbol: 'VRTX', name: 'Vertex Pharma', sector: 'Healthcare', basePrice: 420.50, volatility: 0.020, description: 'Genetic diseases', icon: '🧬' },
    { symbol: 'GILD', name: 'Gilead Sciences', sector: 'Healthcare', basePrice: 78.30, volatility: 0.018, description: 'Antiviral drugs', icon: '💊' },

    // Medical Devices
    { symbol: 'MDT', name: 'Medtronic PLC', sector: 'Healthcare', basePrice: 85.60, volatility: 0.016, description: 'Medical devices', icon: '🏥' },
    { symbol: 'ABT', name: 'Abbott Labs', sector: 'Healthcare', basePrice: 108.90, volatility: 0.014, description: 'Diagnostics', icon: '🔬' },
    { symbol: 'TMO', name: 'Thermo Fisher', sector: 'Healthcare', basePrice: 540.70, volatility: 0.016, description: 'Lab equipment', icon: '🔬' },
    { symbol: 'DHR', name: 'Danaher Corp.', sector: 'Healthcare', basePrice: 245.80, volatility: 0.018, description: 'Life sciences', icon: '🧪' },
    { symbol: 'ISRG', name: 'Intuitive Surgical', sector: 'Healthcare', basePrice: 385.40, volatility: 0.020, description: 'Robotic surgery', icon: '🤖' },

    // ==================== CONSUMER SECTOR (15 stocks) ====================
    // Retail
    { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer', basePrice: 165.30, volatility: 0.014, description: 'Retail chain', icon: '🛒' },
    { symbol: 'TGT', name: 'Target Corp.', sector: 'Consumer', basePrice: 145.80, volatility: 0.018, description: 'Department stores', icon: '🎯' },
    { symbol: 'COST', name: 'Costco Wholesale', sector: 'Consumer', basePrice: 680.50, volatility: 0.016, description: 'Warehouse club', icon: '🏪' },
    { symbol: 'HD', name: 'Home Depot', sector: 'Consumer', basePrice: 355.40, volatility: 0.016, description: 'Home improvement', icon: '🔨' },
    { symbol: 'LOW', name: 'Lowe\'s Companies', sector: 'Consumer', basePrice: 230.60, volatility: 0.018, description: 'Home improvement', icon: '🔧' },

    // Food & Beverage
    { symbol: 'KO', name: 'Coca-Cola Co.', sector: 'Consumer', basePrice: 60.80, volatility: 0.012, description: 'Beverages', icon: '🥤' },
    { symbol: 'PEP', name: 'PepsiCo Inc.', sector: 'Consumer', basePrice: 175.40, volatility: 0.012, description: 'Food and beverages', icon: '🥤' },
    { symbol: 'MCD', name: 'McDonald\'s Corp.', sector: 'Consumer', basePrice: 295.70, volatility: 0.014, description: 'Fast food chain', icon: '🍔' },
    { symbol: 'SBUX', name: 'Starbucks Corp.', sector: 'Consumer', basePrice: 98.50, volatility: 0.018, description: 'Coffee chain', icon: '☕' },
    { symbol: 'CMG', name: 'Chipotle Mexican', sector: 'Consumer', basePrice: 2150.80, volatility: 0.020, description: 'Fast casual dining', icon: '🌯' },

    // Apparel
    { symbol: 'NKE', name: 'Nike Inc.', sector: 'Consumer', basePrice: 108.90, volatility: 0.020, description: 'Athletic footwear', icon: '👟' },
    { symbol: 'LULU', name: 'Lululemon Athletica', sector: 'Consumer', basePrice: 485.60, volatility: 0.024, description: 'Athletic apparel', icon: '🧘' },

    // Automotive
    { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer', basePrice: 245.80, volatility: 0.035, description: 'Electric vehicles', icon: '🚗' },
    { symbol: 'F', name: 'Ford Motor', sector: 'Consumer', basePrice: 12.40, volatility: 0.024, description: 'Automotive manufacturer', icon: '🚙' },
    { symbol: 'GM', name: 'General Motors', sector: 'Consumer', basePrice: 38.60, volatility: 0.022, description: 'Automotive manufacturer', icon: '🚗' },

    // ==================== ENERGY SECTOR (10 stocks) ====================
    // Oil & Gas
    { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energy', basePrice: 108.50, volatility: 0.022, description: 'Oil and gas', icon: '⛽' },
    { symbol: 'CVX', name: 'Chevron Corp.', sector: 'Energy', basePrice: 155.80, volatility: 0.020, description: 'Energy corporation', icon: '⛽' },
    { symbol: 'COP', name: 'ConocoPhillips', sector: 'Energy', basePrice: 118.40, volatility: 0.024, description: 'Oil exploration', icon: '🛢️' },
    { symbol: 'SLB', name: 'Schlumberger', sector: 'Energy', basePrice: 52.30, volatility: 0.026, description: 'Oilfield services', icon: '🔧' },
    { symbol: 'HAL', name: 'Halliburton', sector: 'Energy', basePrice: 36.80, volatility: 0.028, description: 'Energy services', icon: '⚙️' },

    // Renewables
    { symbol: 'ENPH', name: 'Enphase Energy', sector: 'Energy', basePrice: 125.60, volatility: 0.032, description: 'Solar technology', icon: '☀️' },
    { symbol: 'NEE', name: 'NextEra Energy', sector: 'Energy', basePrice: 62.40, volatility: 0.016, description: 'Renewable energy', icon: '⚡' },
    { symbol: 'DUK', name: 'Duke Energy', sector: 'Energy', basePrice: 98.70, volatility: 0.014, description: 'Electric utilities', icon: '⚡' },
    { symbol: 'SO', name: 'Southern Company', sector: 'Energy', basePrice: 78.50, volatility: 0.014, description: 'Electric utilities', icon: '⚡' },
    { symbol: 'AEP', name: 'American Electric', sector: 'Energy', basePrice: 88.30, volatility: 0.014, description: 'Power generation', icon: '⚡' },

    // ==================== REAL ESTATE SECTOR (5 stocks) ====================
    { symbol: 'AMT', name: 'American Tower', sector: 'Real Estate', basePrice: 215.80, volatility: 0.018, description: 'Cell tower REIT', icon: '📡' },
    { symbol: 'PLD', name: 'Prologis Inc.', sector: 'Real Estate', basePrice: 128.40, volatility: 0.016, description: 'Logistics REIT', icon: '🏭' },
    { symbol: 'EQIX', name: 'Equinix Inc.', sector: 'Real Estate', basePrice: 820.50, volatility: 0.018, description: 'Data center REIT', icon: '💾' },
    { symbol: 'PSA', name: 'Public Storage', sector: 'Real Estate', basePrice: 295.60, volatility: 0.016, description: 'Storage REIT', icon: '🏢' },
    { symbol: 'O', name: 'Realty Income', sector: 'Real Estate', basePrice: 58.90, volatility: 0.014, description: 'Retail REIT', icon: '🏪' },
];

// Total: 105 stocks across 6 sectors
