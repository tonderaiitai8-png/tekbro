export interface EncyclopediaItem {
    id: string;
    title: string;
    content: string;
    type: 'TERM' | 'FAQ';
    category: 'BASICS' | 'ADVANCED' | 'STRATEGY' | 'TECHNICAL' | 'SLANG';
}

export const MARKET_CONTENT: EncyclopediaItem[] = [
    // --- TERMS (30) ---
    {
        id: 'm_term_1',
        title: 'Bull Market',
        content: 'A financial market of a group of securities in which prices are rising or are expected to rise. The term "bull market" is most often used to refer to the stock market but can be applied to anything that is traded, such as bonds, real estate, currencies, and commodities.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_2',
        title: 'Bear Market',
        content: 'A market condition in which the prices of securities are falling, and widespread pessimism causes the stock market\'s downward spiral to be self-sustaining. Investors anticipate losses as pessimism and selling increases.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_3',
        title: 'IPO (Initial Public Offering)',
        content: 'The process of offering shares of a private corporation to the public in a new stock issuance. Public share issuance allows a company to raise capital from public investors.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_4',
        title: 'Dividend',
        content: 'The distribution of some of a company\'s earnings to a class of its shareholders, as determined by the company\'s board of directors. Common shareholders of dividend-paying companies are typically eligible as long as they own the stock before the ex-dividend date.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_5',
        title: 'Market Cap',
        content: 'Market capitalization refers to the total dollar market value of a company\'s outstanding shares of stock. Commonly referred to as "market cap," it is calculated by multiplying the total number of a company\'s outstanding shares by the current market price of one share.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_6',
        title: 'P/E Ratio',
        content: 'The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures its current share price relative to its per-share earnings (EPS).',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'm_term_7',
        title: 'ETF (Exchange Traded Fund)',
        content: 'An exchange-traded fund (ETF) is a type of pooled investment security that operates much like a mutual fund. Typically, ETFs will track a particular index, sector, commodity, or other asset.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_8',
        title: 'Volatility',
        content: 'Volatility is a statistical measure of the dispersion of returns for a given security or market index. In most cases, the higher the volatility, the riskier the security.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'm_term_9',
        title: 'Short Selling',
        content: 'Short selling is an investment or trading strategy that speculates on the decline in a stock or other security\'s price. It is an advanced strategy that should only be undertaken by experienced traders and investors.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'm_term_10',
        title: 'Blue Chip',
        content: 'A blue-chip stock is a huge company with an excellent reputation. These are typically large, well-established, and financially sound companies that have operated for many years.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_11',
        title: 'Day Trading',
        content: 'Day trading is defined as the buying and selling of a security within a single trading day. This can occur in any marketplace but is most common in the foreign exchange (forex) and stock markets.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'm_term_12',
        title: 'Margin',
        content: 'Margin is the money borrowed from a brokerage firm to purchase an investment. It is the difference between the total value of securities held in an investor\'s account and the loan amount from the broker.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'm_term_13',
        title: 'Portfolio',
        content: 'A portfolio is a collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents, including closed-end funds and exchange traded funds (ETFs).',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_14',
        title: 'Asset Allocation',
        content: 'Asset allocation is an investment strategy that aims to balance risk and reward by apportioning a portfolio\'s assets according to an individual\'s goals, risk tolerance, and investment horizon.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'm_term_15',
        title: 'Capital Gain',
        content: 'Capital gain is an increase in a capital asset\'s value. It is considered to be realized when you sell the asset. A capital gain may be short-term (one year or less) or long-term (more than one year).',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_16',
        title: 'Liquidity',
        content: 'Liquidity refers to the efficiency or ease with which an asset or security can be converted into ready cash without affecting its market price. The most liquid asset of all is cash itself.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'm_term_17',
        title: 'Recession',
        content: 'A recession is a macroeconomic term that refers to a significant decline in general economic activity in a designated region. It had been typically recognized as two consecutive quarters of economic decline.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_18',
        title: 'Inflation',
        content: 'Inflation is a quantitative measure of the rate at which the average price level of a basket of selected goods and services in an economy increases over some period of time.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_19',
        title: 'Correction',
        content: 'A correction is a decline of 10% or more in the price of a security, asset, or a financial market. Corrections can last anywhere from days to months, or even longer.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'm_term_20',
        title: 'Diversification',
        content: 'Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio. The rationale behind this technique is that a portfolio constructed of different kinds of assets will, on average, yield higher long-term returns and lower the risk of any individual holding or security.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'm_term_21',
        title: 'Index Fund',
        content: 'An index fund is a type of mutual fund or exchange-traded fund (ETF) with a portfolio constructed to match or track the components of a financial market index, such as the Standard & Poor\'s 500 Index (S&P 500).',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'm_term_22',
        title: 'Hedge Fund',
        content: 'A hedge fund is a pooled investment structure setup by a money manager or registered investment advisor and designed to generate large returns. This pooled structure is often organized as either a limited partnership or a limited liability company.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'm_term_23',
        title: 'Option',
        content: 'An option is a financial derivative that represents a contract sold by one party (the option writer) to another party (the option holder). The contract offers the buyer the right, but not the obligation, to buy (call) or sell (put) a security or other financial asset at an agreed-upon price (the strike price) during a certain period of time or on a specific date (exercise date).',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'm_term_24',
        title: 'Futures',
        content: 'Futures are financial contracts obligating the buyer to purchase an asset or the seller to sell an asset at a predetermined future date and price.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'm_term_25',
        title: 'Yield',
        content: 'Yield refers to the earnings generated and realized on an investment over a particular period of time. It\'s expressed as a percentage based on the invested amount, current market value, or face value of the security.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'm_term_26',
        title: 'Moving Average',
        content: 'A moving average (MA) is a stock indicator that is commonly used in technical analysis. The reason for calculating the moving average of a stock is to help smooth out the price data by creating a constantly updated average price.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'm_term_27',
        title: 'RSI (Relative Strength Index)',
        content: 'The relative strength index (RSI) is a momentum indicator used in technical analysis that measures the magnitude of recent price changes to evaluate overbought or oversold conditions in the price of a stock or other asset.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'm_term_28',
        title: 'Stop-Loss Order',
        content: 'A stop-loss order is an order placed with a broker to buy or sell a specific stock once the stock reaches a certain price. A stop-loss is designed to limit an investor\'s loss on a security position.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'm_term_29',
        title: 'Limit Order',
        content: 'A limit order is a type of order to purchase or sell a security at a specified price or better. For buy limit orders, the order will be executed only at the limit price or a lower one. For sell limit orders, the order will be executed only at the limit price or a higher one.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'm_term_30',
        title: 'Volume',
        content: 'Volume is the number of shares or contracts traded in a security or an entire market during a given period of time. For every buyer, there is a seller, and each transaction contributes to the count of total volume.',
        type: 'TERM',
        category: 'TECHNICAL'
    },

    // --- FAQs (20) ---
    {
        id: 'm_faq_1',
        title: 'How do I start investing?',
        content: 'To start investing, you typically need to open a brokerage account. Determine your financial goals and risk tolerance, then research stocks, ETFs, or mutual funds that align with your strategy. Start small and diversify.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_2',
        title: 'What is the difference between a stock and a bond?',
        content: 'Stocks give you partial ownership in a corporation, while bonds are a loan from you to a company or government. Stocks generally offer higher potential returns but come with higher risk, whereas bonds are generally safer but offer lower returns.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_3',
        title: 'How much money do I need to start?',
        content: 'You can start with very little money. Many brokerages now offer fractional shares, allowing you to invest as little as $1 or $5 in expensive stocks.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_4',
        title: 'What causes stock prices to change?',
        content: 'Stock prices change due to supply and demand. If more people want to buy a stock (demand) than sell it (supply), the price moves up. Conversely, if more people want to sell a stock than buy it, there would be greater supply than demand, and the price would fall.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_5',
        title: 'Is investing in stocks gambling?',
        content: 'No, investing is not gambling. Investing involves buying assets with the expectation of a positive return over time based on fundamental analysis. Gambling is a zero-sum game based on chance.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_6',
        title: 'What is a "good" return on investment?',
        content: 'Historically, the stock market (S&P 500) has returned about 10% annually on average before inflation. However, returns vary significantly from year to year.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_7',
        title: 'When should I sell a stock?',
        content: 'Consider selling if your original thesis for buying is no longer valid, the stock has reached your price target, you need to rebalance your portfolio, or you need the cash for a specific goal.',
        type: 'FAQ',
        category: 'STRATEGY'
    },
    {
        id: 'm_faq_8',
        title: 'What are taxes on stocks?',
        content: 'You typically pay capital gains tax when you sell a stock for a profit. Short-term capital gains (held less than a year) are taxed as ordinary income, while long-term capital gains (held more than a year) are taxed at a lower rate.',
        type: 'FAQ',
        category: 'ADVANCED'
    },
    {
        id: 'm_faq_9',
        title: 'Can I lose more than I invest?',
        content: 'If you buy stocks with cash (long position), you can only lose what you invested (if the stock goes to zero). However, if you trade on margin or short sell, you can lose more than your initial investment.',
        type: 'FAQ',
        category: 'ADVANCED'
    },
    {
        id: 'm_faq_10',
        title: 'What is dollar-cost averaging?',
        content: 'Dollar-cost averaging is the practice of investing a fixed dollar amount on a regular basis, regardless of the share price. This helps reduce the impact of volatility and removes the need to time the market.',
        type: 'FAQ',
        category: 'STRATEGY'
    },
    {
        id: 'm_faq_11',
        title: 'What happens if a company goes bankrupt?',
        content: 'If a company goes bankrupt, common shareholders are last in line to be repaid. Often, the stock becomes worthless, and investors lose their entire investment in that company.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_12',
        title: 'What is insider trading?',
        content: 'Insider trading is the trading of a public company\'s stock or other securities based on material, nonpublic information about the company. It is illegal and punishable by law.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_13',
        title: 'How does the economy affect the stock market?',
        content: 'A strong economy typically boosts corporate earnings and consumer confidence, leading to higher stock prices. Conversely, a weak economy or recession can lead to lower earnings and lower stock prices.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_14',
        title: 'What is a stock split?',
        content: 'A stock split is a decision by a company\'s board of directors to increase the number of shares that are outstanding by issuing more shares to current shareholders. It lowers the individual share price but does not change the company\'s total market value.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_15',
        title: 'Why do companies pay dividends?',
        content: 'Companies pay dividends to share profits with investors, attract new investors, and signal financial strength. It provides a steady stream of income for shareholders.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_16',
        title: 'What is the S&P 500?',
        content: 'The S&P 500 is a stock market index that tracks the stocks of 500 large-cap U.S. companies. It is widely regarded as the best single gauge of large-cap U.S. equities.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_17',
        title: 'What is a ticker symbol?',
        content: 'A ticker symbol is an arrangement of characters (usually letters) representing a particular security listed on an exchange or otherwise traded publicly (e.g., AAPL for Apple).',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_18',
        title: 'What is a brokerage account?',
        content: 'A brokerage account is an investment account that allows you to buy and sell a variety of investments, such as stocks, bonds, mutual funds, and ETFs.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'm_faq_19',
        title: 'What is fundamental analysis?',
        content: 'Fundamental analysis is a method of evaluating a security in an attempt to measure its intrinsic value, by examining related economic, financial, and other qualitative and quantitative factors.',
        type: 'FAQ',
        category: 'STRATEGY'
    },
    {
        id: 'm_faq_20',
        title: 'What is technical analysis?',
        content: 'Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume.',
        type: 'FAQ',
        category: 'STRATEGY'
    }
];

export const CRYPTO_CONTENT: EncyclopediaItem[] = [
    // --- TERMS (30) ---
    {
        id: 'c_term_1',
        title: 'Blockchain',
        content: 'A distributed database that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format. Blockchains are best known for their crucial role in cryptocurrency systems for maintaining a secure and decentralized record of transactions.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_2',
        title: 'Bitcoin (BTC)',
        content: 'A decentralized digital currency created in 2009 by an unknown person or group of people using the name Satoshi Nakamoto. It allows for peer-to-peer transactions without the need for intermediaries.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_3',
        title: 'Altcoin',
        content: 'Any cryptocurrency other than Bitcoin. The term is short for "alternative coin". Examples include Ethereum, Litecoin, and Ripple.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_4',
        title: 'DeFi (Decentralized Finance)',
        content: 'An umbrella term for a variety of financial applications in cryptocurrency or blockchain geared toward disrupting financial intermediaries.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'c_term_5',
        title: 'HODL',
        content: 'A slang term in the crypto community for holding the cryptocurrency rather than selling it. It originated from a typo of "hold" in a Bitcoin forum post.',
        type: 'TERM',
        category: 'SLANG'
    },
    {
        id: 'c_term_6',
        title: 'FOMO',
        content: 'Fear Of Missing Out. The feeling of apprehension that one is either not in the know or missing out on information, events, experiences, or life decisions that could make one\'s life better. In crypto, it leads to panic buying.',
        type: 'TERM',
        category: 'SLANG'
    },
    {
        id: 'c_term_7',
        title: 'FUD',
        content: 'Fear, Uncertainty, and Doubt. A disinformation strategy used to influence perception by disseminating negative and dubious or false information about a business or a product.',
        type: 'TERM',
        category: 'SLANG'
    },
    {
        id: 'c_term_8',
        title: 'Wallet',
        content: 'A device, physical medium, program or a service which stores the public and/or private keys for cryptocurrency transactions.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_9',
        title: 'Private Key',
        content: 'A sophisticated form of cryptography that allows a user to access their cryptocurrency. A private key is an integral aspect of bitcoin and altcoins, and its security helps to protect a user from theft and unauthorized access to funds.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'c_term_10',
        title: 'Mining',
        content: 'The process by which new coins are entered into circulation. It is also the way that the network confirms new transactions and is a critical component of the blockchain ledger\'s maintenance and development.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'c_term_11',
        title: 'Gas Fees',
        content: 'Payments made by users to compensate for the computing energy required to process and validate transactions on the Ethereum blockchain.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'c_term_12',
        title: 'NFT (Non-Fungible Token)',
        content: 'A unique digital identifier that cannot be copied, substituted, or subdivided, that is recorded in a blockchain, and that is used to certify authenticity and ownership.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_13',
        title: 'Smart Contract',
        content: 'A self-executing contract with the terms of the agreement between buyer and seller being directly written into lines of code. The code and the agreements contained therein exist across a distributed, decentralized blockchain network.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'c_term_14',
        title: 'Stablecoin',
        content: 'A new class of cryptocurrencies that attempts to offer price stability and are backed by a reserve asset. Stablecoins have gained traction as they attempt to offer the best of both worlds—the instant processing and security or privacy of payments of cryptocurrencies, and the volatility-free stable valuations of fiat currencies.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_15',
        title: 'Whale',
        content: 'A term used to refer to individuals or entities that hold large amounts of cryptocurrency. Whales have enough cryptocurrency that they have the potential to manipulate the currency valuation.',
        type: 'TERM',
        category: 'SLANG'
    },
    {
        id: 'c_term_16',
        title: 'Bearish',
        content: 'An investor who believes that a particular security or the market is headed downward is considered bearish. Bearish investors attempt to profit from a decline in stock prices.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_17',
        title: 'Bullish',
        content: 'An investor who believes that a particular security or the market is headed upward is considered bullish. Bullish investors attempt to profit from a rise in stock prices.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_18',
        title: 'ATH (All-Time High)',
        content: 'The highest price that a cryptocurrency has ever reached in its history.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_19',
        title: 'Market Cap',
        content: 'The total value of all the coins that have been mined. It is calculated by multiplying the number of coins in circulation by the current market price of a single coin.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_20',
        title: 'Exchange',
        content: 'A marketplace where you can buy and sell cryptocurrencies. There are centralized exchanges (CEX) like Coinbase and Binance, and decentralized exchanges (DEX) like Uniswap.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_21',
        title: 'Cold Storage',
        content: 'An offline wallet used for storing cryptocurrencies. With cold storage, the digital wallet is stored on a platform that is not connected to the internet, thereby protecting the wallet from unauthorized access, cyber hacks, and other vulnerabilities.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'c_term_22',
        title: 'Hot Wallet',
        content: 'A digital wallet that is connected to the internet. Hot wallets are easier to set up, access, and accept more tokens, but they are also more susceptible to hackers.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_23',
        title: 'Seed Phrase',
        content: 'A series of words generated by your cryptocurrency wallet that give you access to the crypto associated with that wallet. If you lose your seed phrase, you lose access to your crypto.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'c_term_24',
        title: 'Tokenomics',
        content: 'The topic of understanding the supply and demand characteristics of cryptocurrency. It involves the mechanics of how a token works, including its issuance, utility, and burning mechanisms.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'c_term_25',
        title: 'Yield Farming',
        content: 'A practice in decentralized finance (DeFi) where users provide liquidity to a protocol in exchange for rewards, typically in the form of additional cryptocurrency tokens.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'c_term_26',
        title: 'Staking',
        content: 'The process of locking up cryptocurrency tokens for a set period of time to contribute to the performance and safety of the blockchain network. In exchange, stakers earn interest rewards.',
        type: 'TERM',
        category: 'STRATEGY'
    },
    {
        id: 'c_term_27',
        title: 'DAO (Decentralized Autonomous Organization)',
        content: 'An organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government.',
        type: 'TERM',
        category: 'ADVANCED'
    },
    {
        id: 'c_term_28',
        title: 'DApp (Decentralized Application)',
        content: 'A digital application or program that exists and runs on a blockchain or peer-to-peer (P2P) network of computers instead of a single computer.',
        type: 'TERM',
        category: 'BASICS'
    },
    {
        id: 'c_term_29',
        title: 'Fork',
        content: 'A fork happens whenever a community makes a change to the blockchain\'s protocol, or basic set of rules. When this happens, the chain splits, producing a second blockchain that shares all of its history with the original, but is headed off in a new direction.',
        type: 'TERM',
        category: 'TECHNICAL'
    },
    {
        id: 'c_term_30',
        title: 'Halving',
        content: 'An event where the reward for mining new blocks is halved, meaning miners receive 50% fewer bitcoins for verifying transactions. Bitcoin halvings occur once every 210,000 blocks, or roughly every four years.',
        type: 'TERM',
        category: 'TECHNICAL'
    },

    // --- FAQs (20) ---
    {
        id: 'c_faq_1',
        title: 'Is cryptocurrency legal?',
        content: 'The legality of cryptocurrency varies by country. In many developed countries like the US, UK, and Canada, it is legal to buy, sell, and hold cryptocurrency, though it is often taxed as property.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_2',
        title: 'How do I buy cryptocurrency?',
        content: 'You can buy cryptocurrency using a cryptocurrency exchange. You\'ll need to create an account, verify your identity, and link a payment method like a bank account or debit card.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_3',
        title: 'Is crypto safe?',
        content: 'Crypto transactions are secure due to blockchain technology, but investing in crypto is risky due to high volatility. Also, if you lose your private keys or send funds to the wrong address, they cannot be recovered.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_4',
        title: 'What determines the price of a cryptocurrency?',
        content: 'Like stocks, the price is primarily determined by supply and demand. Other factors include media coverage, regulatory news, and technological developments.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_5',
        title: 'Can I lose all my money in crypto?',
        content: 'Yes. Cryptocurrencies are highly volatile and speculative. Prices can drop significantly, and projects can fail. Never invest more than you can afford to lose.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_6',
        title: 'What is the difference between Bitcoin and Ethereum?',
        content: 'Bitcoin is primarily a store of value and medium of exchange (digital gold). Ethereum is a platform that enables developers to build decentralized applications and smart contracts.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_7',
        title: 'Do I have to buy a whole Bitcoin?',
        content: 'No. You can buy fractions of a Bitcoin. For example, you can buy $10 worth of Bitcoin.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_8',
        title: 'How do I pay taxes on crypto?',
        content: 'In many jurisdictions, selling crypto for a profit is a taxable event (capital gains). You should keep track of your transactions and consult a tax professional.',
        type: 'FAQ',
        category: 'ADVANCED'
    },
    {
        id: 'c_faq_9',
        title: 'What happens if I send crypto to the wrong address?',
        content: 'Transactions on the blockchain are irreversible. If you send funds to the wrong address, they are likely lost forever unless the owner of that address decides to send them back.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_10',
        title: 'Why is crypto so volatile?',
        content: 'The crypto market is relatively small compared to traditional markets, so trades can have a bigger impact on price. It is also a new technology with regulatory uncertainty and speculative trading.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_11',
        title: 'What is a "rug pull"?',
        content: 'A rug pull is a scam where developers abandon a project and take their investors\' money. This is common in the DeFi space.',
        type: 'FAQ',
        category: 'SLANG'
    },
    {
        id: 'c_faq_12',
        title: 'Can crypto be hacked?',
        content: 'Blockchains themselves are very difficult to hack, but exchanges and individual wallets can be hacked. Using a hardware wallet (cold storage) is the safest way to store crypto.',
        type: 'FAQ',
        category: 'TECHNICAL'
    },
    {
        id: 'c_faq_13',
        title: 'What is "To the Moon"?',
        content: 'A phrase used when the price of a cryptocurrency is rising off the charts or is expected to rise significantly.',
        type: 'FAQ',
        category: 'SLANG'
    },
    {
        id: 'c_faq_14',
        title: 'What is a "Diamond Hands"?',
        content: 'Someone who holds onto their investment despite high volatility and risks. They are not easily shaken out of their position.',
        type: 'FAQ',
        category: 'SLANG'
    },
    {
        id: 'c_faq_15',
        title: 'What is a "Paper Hands"?',
        content: 'Someone who sells their investment at the first sign of trouble or a price drop. The opposite of Diamond Hands.',
        type: 'FAQ',
        category: 'SLANG'
    },
    {
        id: 'c_faq_16',
        title: 'How long does a crypto transaction take?',
        content: 'It depends on the network. Bitcoin can take 10 minutes to an hour. Ethereum is faster but can be congested. Solana and others are near-instant.',
        type: 'FAQ',
        category: 'TECHNICAL'
    },
    {
        id: 'c_faq_17',
        title: 'Who controls Bitcoin?',
        content: 'No one controls Bitcoin. It is decentralized, meaning it is run by a network of computers (nodes) around the world.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_18',
        title: 'What is a "Memecoin"?',
        content: 'A cryptocurrency that originated from an internet meme or has some other humorous characteristic. Dogecoin and Shiba Inu are famous examples.',
        type: 'FAQ',
        category: 'SLANG'
    },
    {
        id: 'c_faq_19',
        title: 'Can I use crypto to buy things?',
        content: 'Yes, an increasing number of merchants accept crypto. You can also use crypto debit cards to spend your crypto anywhere that accepts Visa or Mastercard.',
        type: 'FAQ',
        category: 'BASICS'
    },
    {
        id: 'c_faq_20',
        title: 'What is the future of cryptocurrency?',
        content: 'Opinions vary. Some see it as the future of money and finance, while others are skeptical. It is a rapidly evolving technology with significant potential and risk.',
        type: 'FAQ',
        category: 'BASICS'
    }
];
