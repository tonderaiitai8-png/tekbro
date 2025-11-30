import { useStore } from '../store/useStore';

export const formatCurrency = (amount: number): string => {
    // We can't use hooks here directly if this is called outside a component,
    // but we can access the store state directly via getState()
    const currency = useStore.getState().currency || 'GBP';

    let symbol = '£';
    let rate = 1;

    switch (currency) {
        case 'USD':
            symbol = '$';
            rate = 1.27; // Approx rate
            break;
        case 'EUR':
            symbol = '€';
            rate = 1.17;
            break;
        case 'JPY':
            symbol = '¥';
            rate = 190.5;
            break;
        case 'BTC':
            symbol = '₿';
            rate = 0.000015; // Very approx
            break;
        case 'GBP':
        default:
            symbol = '£';
            rate = 1;
            break;
    }

    const value = amount * rate;

    if (currency === 'BTC') {
        return `${symbol}${value.toFixed(6)}`;
    }

    if (currency === 'JPY') {
        return `${symbol}${Math.round(value).toLocaleString()}`;
    }

    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
