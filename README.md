# 📈 PaperTrader: Advanced Stock Market Simulator

> **A professional-grade, gamified trading platform built to demonstrate high-performance React Native development. Featuring a custom market engine, complex state management, and a premium glassmorphism UI.**

![PaperTrader Banner](https://via.placeholder.com/1200x600?text=PaperTrader+Showcase)

---

## 🚀 Project Overview

**PaperTrader** is not just a clone; it's a fully functional simulation engine designed to replicate the emotional and technical challenges of trading. Built with **React Native (Expo)** and **TypeScript**, it leverages modern mobile development practices to deliver a 60fps experience even with heavy data streaming.

### Key Objectives
- **Performance**: Rendering 100+ live-updating tickers without frame drops.
- **Complexity**: Managing interdependent state (Portfolio, Market, Gamification, Crypto) via **Zustand**.
- **UX/UI**: Implementing a "State of the Art" design system with **Glassmorphism**, **Reanimated** interactions, and **Haptic Feedback**.

---

## 🎨 Design Philosophy

The user interface was crafted with a "Mobile-First, Premium-First" mindset.

- **Glassmorphism**: We utilized `expo-blur` and semi-transparent layers to create depth and hierarchy, mimicking modern fintech aesthetics (e.g., Revolut, Robinhood).
- **Micro-Interactions**: Every tap provides feedback. Whether it's the **Haptic** tick when scrolling the picker or the **Reanimated** spring animation when opening a modal, the app feels "alive."
- **Data Visualization**: Complex data is simplified through color-coded indicators (Green/Red), sparklines, and intuitive progress bars for achievements.
- **Dark Mode Native**: Designed exclusively for dark mode to reduce eye strain and enhance the vibrancy of charts and indicators.

---

## 🛠️ Technical Architecture

### Core Stack
- **Framework**: React Native 0.81 (Expo SDK 54)
- **Language**: TypeScript (Strict Mode)
- **State Management**: Zustand (Global Store + Persistence)
- **Navigation**: Expo Router (File-based routing)
- **Performance**: Shopify FlashList, React Native Reanimated
- **Storage**: MMKV / AsyncStorage

### Complex Implementations

#### 1. The Market Engine (`useMarketEngine`)
Instead of relying on static data, I built a custom simulation engine using **Geometric Brownian Motion**.
- **Logic**: Calculates price movements based on volatility and drift.
- **Optimization**: Updates are throttled to run outside the JS thread where possible, or batched to prevent UI thread blocking.
- **Realism**: Includes "News Events" that inject shockwaves into the market, forcing the simulation to react dynamically.

#### 2. Gamification System (`useStore`)
A robust RPG-like layer sits on top of the trading mechanics.
- **XP Algorithm**: `XP = (ActionBase * Multipliers) + Bonuses`. Rewards consistency (Login Streaks) and skill (Profit %).
- **Achievement Engine**: A listener system that evaluates 100+ unique conditions (e.g., "Win Rate > 60%", "Hold for 30 days") in real-time without polling performance costs.

#### 3. High-Performance Lists
Rendering a list of 100 stocks with live-updating prices is expensive.
- **Solution**: Implemented `@shopify/flash-list` with `estimatedItemSize` and `React.memo` on individual list items.
- **Result**: Smooth scrolling at 60fps even during high-volatility market events.

---

## 📱 Screen Breakdown

### 1. Portfolio Dashboard (`(tabs)/index.tsx`)
The command center.
- **Net Worth Chart**: Visualizes equity over time.
- **Asset Allocation**: Breakdown of Stocks vs. Crypto vs. Cash.
- **Quick Stats**: Horizontal scrollable metrics (Win Rate, Best Performer).

### 2. Market Browser (`(tabs)/market.tsx`)
- **Live Tickers**: Color-coded lists of Top Gainers, Losers, and Active stocks.
- **Search**: Instant filtering by symbol or name.
- **Sector Filtering**: Filter stocks by Technology, Finance, Energy, etc.

### 3. Crypto Exchange (`(tabs)/crypto.tsx`)
- **Leverage Trading**: Unique logic allowing 5x-20x leverage.
- **Wallet Management**: Separate "Cold Wallet" simulation for crypto assets.
- **Fear & Greed Index**: Dynamic indicator affecting market volatility.

### 4. Leaderboard (`(tabs)/leaderboard.tsx`)
- **Global Ranking**: Compete against mock "Elite Traders".
- **Dynamic Sorting**: Ranks update in real-time based on Net Worth.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Expo CLI

### Installation
```bash
git clone https://github.com/dtonderaiita8-png/PaperTrader.git
cd PaperTrader
npm install
npx expo start
```

### Building for iOS
This project uses **GitHub Actions** for CI/CD.
- Commits to `main` trigger a build workflow.
- Generates an unsigned `.ipa` for sideloading via AltStore.
- See `README_GITHUB_ACTIONS.md` for the pipeline configuration.

---

## 🔮 Future Roadmap

- [ ] **WebSocket Integration**: Replace simulation with real-time AlphaVantage/Polygon.io API.
- [ ] **Social Trading**: Follow other users and copy-trade their portfolios.
- [ ] **Options Chain**: Implement Call/Put options for advanced hedging strategies.
- [ ] **Machine Learning**: AI-powered "Market Analyst" giving trade suggestions.

---

## 👨‍💻 Author

**Tonde**
*Full Stack Mobile Developer*

---

*This project is a showcase of advanced React Native capabilities, demonstrating that hybrid apps can achieve native-level performance and aesthetics.*
