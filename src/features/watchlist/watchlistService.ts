import { getDb } from '../../shared/db/client';

export interface WatchlistItem {
    id: number;
    symbol: string;
    type: 'STOCK' | 'CRYPTO';
    created_at: string;
}

export const WatchlistService = {
    async addToWatchlist(symbol: string, type: 'STOCK' | 'CRYPTO'): Promise<void> {
        const db = await getDb();
        await db.runAsync(
            'INSERT INTO watchlists (symbol, type) VALUES (?, ?)',
            symbol, type
        );
    },

    async removeFromWatchlist(symbol: string): Promise<void> {
        const db = await getDb();
        await db.runAsync(
            'DELETE FROM watchlists WHERE symbol = ?',
            symbol
        );
    },

    async getWatchlist(): Promise<WatchlistItem[]> {
        const db = await getDb();
        const result = await db.getAllAsync<WatchlistItem>(
            'SELECT * FROM watchlists ORDER BY created_at DESC'
        );
        return result;
    },

    async isWatched(symbol: string): Promise<boolean> {
        const db = await getDb();
        const result = await db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM watchlists WHERE symbol = ?',
            symbol
        );
        return (result?.count ?? 0) > 0;
    }
};
