# 📈 PaperTrader: The Ultimate Mobile Trading Simulation

> **Version**: 1.0.0
> **Status**: Production Ready
> **License**: MIT

**PaperTrader** is a high-fidelity, mobile-first financial simulation application designed to bridge the gap between educational trading and premium user experiences. Built with **React Native** and **Expo**, it leverages a sophisticated tech stack to deliver real-time market simulation, advanced portfolio management, and deep gamification layers, all wrapped in a stunning "Glassmorphism" design system.

This is not just a demo app; it is a fully architected, scalable, and performant mobile application that demonstrates the pinnacle of modern React Native development.

---

## 📚 Table of Contents

1.  [Mission & Vision](#-mission--vision)
2.  [Core Features Deep Dive](#-core-features-deep-dive)
    *   [Market Engine](#market-engine)
    *   [Trading System](#trading-system)
    *   [Crypto & Leverage](#crypto--leverage)
    *   [Gamification & Progression](#gamification--progression)
3.  [Architecture & Tech Stack](#-architecture--tech-stack)
    *   [Frontend Framework](#frontend-framework)
    *   [State Management](#state-management)
    *   [Performance Optimizations](#performance-optimizations)
    *   [Persistence Layer](#persistence-layer)
4.  [Design System (UI/UX)](#-design-system-uiux)
    *   [Theming Engine](#theming-engine)
    *   [Glassmorphism Implementation](#glassmorphism-implementation)
5.  [Project Structure](#-project-structure)
6.  [Installation & Setup](#-installation--setup)
7.  [Deployment Pipeline](#-deployment-pipeline)
8.  [Troubleshooting](#-troubleshooting)
9.  [Future Roadmap](#-future-roadmap)

---

## 🎯 Mission & Vision

The goal of PaperTrader is to provide a **risk-free sandbox** for aspiring traders to master the financial markets. Unlike generic paper trading apps that feel like spreadsheets, PaperTrader treats trading as an engaging, high-stakes game. By combining realistic market data simulation with "sticky" gamification mechanics (XP, Levels, Streaks), we create an environment where learning to trade is as addictive as a mobile game.

---

## 💎 Core Features Deep Dive

### Market Engine
The heart of PaperTrader is its simulation engine.
- **Dynamic Price Action**: Stock and Crypto prices are not static. They update in real-time during the session, simulating market volatility.
- **Market Phases**: The crypto market engine simulates 5 distinct phases: `ACCUMULATION`, `BULL_RUN`, `EUPHORIA`, `CORRECTION`, and `BEAR_WINTER`.
- **News Sentiment**: A built-in news feed generates market-moving events (e.g., "Tech Sector Boom", "Regulatory Crackdown") that directly impact asset prices.

### Trading System
A professional-grade order management system.
- **Instant Execution**: Market orders are filled immediately with zero latency.
- **Position Management**: View average cost basis, total return, and daily PnL for every holding.
- **Short Selling**: (Coming Soon) The architecture supports short positions for advanced strategies.
- **Transaction History**: Every trade is logged with a timestamp, price, and quantity for auditability.

### Crypto & Leverage
For thrill-seekers, the Crypto module offers advanced features:
- **Leverage Trading**: Trade with up to **100x leverage** (simulated).
- **Liquidation Logic**: The system automatically monitors margin. If your position value falls below the maintenance margin, it is **liquidated** instantly, and you lose the collateral.
- **24/7 Market**: Unlike stocks, the crypto market never closes, with `change24h` metrics calculated dynamically.

### Gamification & Progression
We gamify financial literacy to maximize retention.
- **XP System**: Earn XP for every action:
    - **Trade**: +10 XP
    - **Profit**: Scaled based on ROI
    - **Daily Streak**: +10 XP * Streak Days
- **Leveling**: Progress from "Level 1: Novice" to "Level 50: Market Maker".
- **Achievements**: Over **50 unique achievements** across 6 categories:
    - **Wealth**: "Billionaire" (Reach £1B Net Worth)
    - **Profit**: "Moonshot" (>50% gain on a trade)
    - **Risk**: "YOLO" (<£100 cash remaining)
    - **Mastery**: "God Mode" (50 win streak)
    - **Culture**: "Diamond Hands" (No sells for 30 days)
    - **Secret**: Hidden achievements for explorers.
- **Daily Challenges**: 3 random tasks generated every 24 hours (e.g., "Trade 5 Tech Stocks", "Make £1k Profit").
- **Leaderboard**: A global ranking system comparing your Net Worth against AI-generated competitors.

---

## 🏗️ Architecture & Tech Stack

PaperTrader is built on a **monorepo-style** architecture using the latest React Native ecosystem tools.

### Frontend Framework
- **React Native 0.76**: The latest stable release with the New Architecture enabled.
- **Expo SDK 52**: Managed workflow for seamless builds and OTA updates.
- **Expo Router v4**: File-system based routing (similar to Next.js) for intuitive navigation structure.
- **TypeScript**: 100% strict type safety across the entire codebase.

### State Management
We use **Zustand** for global state management. Why Zustand?
- **Performance**: Minimal re-renders compared to Context API.
- **Simplicity**: No boilerplate (reducers, actions, dispatchers) like Redux.
- **Persistence**: Built-in `persist` middleware handles saving state to disk automatically.

**Stores:**
1.  `useStore.ts`: Manages User Profile, Stocks, Portfolio, XP, and Settings.
2.  `useCryptoStore.ts`: Manages Crypto Wallet, Holdings, Leverage, and Market Phases.

### Performance Optimizations
- **FlashList**: Replaced `FlatList` with Shopify's `@shopify/flash-list` for 5x faster list rendering (crucial for long stock lists).
- **Memoization**: Heavy components like `StockChart` and `AssetRow` are wrapped in `React.memo` to prevent unnecessary re-renders.
- **Reanimated Worklets**: Animations run on the UI thread, ensuring 60fps even during heavy JS calculation loads.

### Persistence Layer
- **AsyncStorage**: Used for persisting user state (Net Worth, Holdings, Theme).
- **Note**: We migrated *away* from `react-native-mmkv` to ensure full compatibility with **Expo Go**, as MMKV requires a custom development client.

---

## 🎨 Design System (UI/UX)

The app follows a **"Dark Premium"** aesthetic inspired by top fintech apps (Robinhood, Coinbase, Linear).

### Theming Engine
Defined in `constants/theme.ts`, the app supports 4 dynamic themes:
1.  **Midnight** (Default): `#000000` bg, `#06B6D4` accent (Cyan).
2.  **Ocean**: `#020617` bg, `#38BDF8` accent (Sky Blue).
3.  **Sunset**: `#180818` bg, `#F472B6` accent (Pink).
4.  **Forest**: `#020A05` bg, `#10B981` accent (Emerald).

The `useTheme` hook allows any component to subscribe to theme changes instantly.

### Glassmorphism Implementation
We utilize `expo-blur` to create real-time background blurring.
- **GlassCard Component**: A reusable wrapper that applies `BlurView` with a semi-transparent white/black overlay and a subtle border.
- **Gradients**: `expo-linear-gradient` provides depth to buttons and headers.

---

## 📂 Project Structure

```bash
PaperTrader/
├── .github/workflows/   # CI/CD Pipelines
├── app/                 # Expo Router Pages
│   ├── (tabs)/          # Bottom Tab Navigator
│   │   ├── index.tsx    # Home Dashboard
│   │   ├── portfolio.tsx# Holdings & Stats
│   │   ├── crypto.tsx   # Crypto Market
│   │   ├── leaderboard.tsx # Global Rankings
│   │   └── settings.tsx # App Configuration
│   ├── stock/[id].tsx   # Dynamic Stock Detail Page
│   ├── crypto/[id].tsx  # Dynamic Crypto Detail Page
│   ├── onboarding.tsx   # Intro Flow
│   └── _layout.tsx      # Root Layout & Providers
├── components/          # UI Components
│   ├── common/          # Buttons, Inputs, Cards
│   ├── modals/          # Trade, Search, LevelUp Modals
│   └── charts/          # GiftedCharts Wrappers
├── constants/           # Static Data
│   ├── stocks.ts        # Stock Database
│   ├── achievements.ts  # Achievement Catalog
│   └── theme.ts         # Design Tokens
├── hooks/               # Custom Hooks
│   ├── useTheme.ts      # Theme Context
│   └── useHaptics.ts    # Feedback Logic
├── store/               # Zustand Stores
│   ├── useStore.ts      # Main Store
│   └── useCryptoStore.ts# Crypto Store
└── utils/               # Helpers
    ├── analytics.ts     # Mock Analytics
    ├── formatting.ts    # Currency Formatters
    └── storage.ts       # Storage Adapter
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or newer)
- **npm** or **yarn**
- **Expo Go** app installed on your physical device.

### Step-by-Step Guide

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/tondevai/papertrader.git
    cd papertrader
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the Development Server**
    ```bash
    npx expo start -c
    # -c flag clears the cache to prevent stale bundler issues
    ```

4.  **Run on Device**
    - **iOS**: Open Camera app, scan QR code -> Opens in Expo Go.
    - **Android**: Open Expo Go app, scan QR code.
    - **Simulator**: Press `i` for iOS Simulator or `a` for Android Emulator.

---

## 🚢 Deployment Pipeline

We use **GitHub Actions** for Continuous Integration and **EAS (Expo Application Services)** for builds.

### CI Workflow (`.github/workflows/build-ios.yml`)
Every push to `main` triggers:
1.  **Lint Check**: Ensures code quality.
2.  **Type Check**: Runs `tsc` to catch TypeScript errors.
3.  **EAS Build**: Creates a preview build for internal testing.

### Manual Build
To build a standalone binary (IPA/APK) locally:
```bash
npm install -g eas-cli
eas login
eas build --platform ios --profile preview --local
```

---

## 🔧 Troubleshooting

### Common Issues

**1. "Property 'dark' does not exist on type 'Theme'"**
- **Cause**: The theme object structure was updated but TypeScript definitions lagged.
- **Fix**: Use `tint="dark"` directly in `BlurView` props as all themes are dark-mode based.

**2. Reanimated Crash on Android**
- **Cause**: Mismatch between `react-native-reanimated` version and Expo SDK.
- **Fix**: Run `npx expo install react-native-reanimated` to ensure the correct compatible version is installed.

**3. Storage Not Persisting**
- **Cause**: Using `react-native-mmkv` in Expo Go.
- **Fix**: The app automatically falls back to `AsyncStorage` in `utils/storage.ts` when running in Expo Go.

---

## 🗺️ Future Roadmap

- [ ] **Options Trading**: Call and Put options simulation.
- [ ] **Social Features**: Friend lists and private leaderboards.
- [ ] **Backend Integration**: Move from local-only state to Supabase/Firebase for cross-device sync.
- [ ] **AI Advisor**: An LLM-powered trading assistant to explain market moves.

---

*© 2025 PaperTrader Inc. All Rights Reserved.*
