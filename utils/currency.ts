export const INITIAL_CASH = 10000;
export const CURRENCY_SYMBOL = '£';
export const CURRENCY_CODE = 'GBP';

// Format currency with British pounds
export function formatCurrency(amount: number): string {
    return `£${amount.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Format currency without decimals
export function formatCurrencyWhole(amount: number): string {
    if (amount >= 1000000) {
        return `£${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
        return `£${(amount / 1000).toFixed(1)}K`;
    }
    return `£${Math.round(amount).toLocaleString('en-GB')}`;
}

// Format percentage
export function formatPercent(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
}
