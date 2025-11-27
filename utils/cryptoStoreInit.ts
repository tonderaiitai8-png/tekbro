// This file initializes the crypto store with connections to the main store
import { useStore } from '../store/useStore';
import { useCryptoStore, setMainStoreHelpers } from '../store/useCryptoStore';
import { initializeCryptos } from '../constants/cryptoData';

let initialized = false;

export const initializeCryptoStore = () => {
    if (initialized) return;

    // Connect crypto store to main store helpers
    setMainStoreHelpers(
        () => useStore.getState().cash,
        (amount: number) => useStore.setState({ cash: amount }),
        (amount: number) => useStore.getState().addXp(amount),
        (id: string) => useStore.getState().unlockAchievement(id),
        () => useStore.getState().checkAndUnlockAchievements(),
        (type: string, amount: number) => useStore.getState().updateChallengeProgress(type, amount)
    );

    // Initialize cryptos if not already done
    const cryptos = useCryptoStore.getState().cryptos;
    if (cryptos.length === 0) {
        useCryptoStore.getState().setCryptos(initializeCryptos());
    }

    initialized = true;
};

// Helper to get total net worth including crypto
export const getTotalNetWorth = () => {
    const mainStore = useStore.getState();
    const cryptoStore = useCryptoStore.getState();

    // Stock value
    const stockValue = Object.values(mainStore.holdings).reduce((total, item) => {
        const stock = mainStore.stocks.find((s) => s.symbol === item.symbol);
        if (!stock) return total;
        return total + (item.quantity * stock.price);
    }, 0);

    // Crypto value
    const cryptoValue = cryptoStore.getTotalCryptoValue();

    return mainStore.cash + stockValue + cryptoStore.cryptoWallet + cryptoValue;
};
