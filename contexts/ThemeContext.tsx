import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DARK_THEME, LIGHT_THEME } from '../constants/theme';

type Theme = typeof DARK_THEME;
type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

    useEffect(() => {
        // Load saved theme preference
        AsyncStorage.getItem('theme').then((saved) => {
            if (saved === 'light' || saved === 'dark') {
                setThemeMode(saved);
            }
        });
    }, []);

    const toggleTheme = () => {
        const newMode = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newMode);
        AsyncStorage.setItem('theme', newMode);
    };

    const theme = themeMode === 'dark' ? DARK_THEME : LIGHT_THEME;

    return (
        <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
