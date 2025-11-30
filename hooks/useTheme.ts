import { useStore } from '../store/useStore';
import {
    MIDNIGHT_THEME, OCEAN_THEME, SUNSET_THEME, FOREST_THEME,
    NEON_THEME, ROYAL_THEME, CYBERPUNK_THEME, MINIMAL_THEME,
    RETRO_THEME, COFFEE_THEME, DRACULA_THEME, NORD_THEME,
    MONOKAI_THEME, MATRIX_THEME, SYNTHWAVE_THEME, LUXURY_THEME,
    BOTANICAL_THEME, CRIMSON_THEME, SLATE_THEME, LAVENDER_THEME,
    ThemeType
} from '../constants/theme';

export const useTheme = () => {
    const currentTheme = useStore((state) => state.currentTheme);
    const setTheme = useStore((state) => state.setTheme);

    const getTheme = () => {
        switch (currentTheme) {
            case 'ocean': return OCEAN_THEME;
            case 'sunset': return SUNSET_THEME;
            case 'forest': return FOREST_THEME;
            case 'neon': return NEON_THEME;
            case 'royal': return ROYAL_THEME;
            case 'cyberpunk': return CYBERPUNK_THEME;
            case 'minimal': return MINIMAL_THEME;
            case 'retro': return RETRO_THEME;
            case 'coffee': return COFFEE_THEME;
            case 'dracula': return DRACULA_THEME;
            case 'nord': return NORD_THEME;
            case 'monokai': return MONOKAI_THEME;
            case 'matrix': return MATRIX_THEME;
            case 'synthwave': return SYNTHWAVE_THEME;
            case 'luxury': return LUXURY_THEME;
            case 'botanical': return BOTANICAL_THEME;
            case 'crimson': return CRIMSON_THEME;
            case 'slate': return SLATE_THEME;
            case 'lavender': return LAVENDER_THEME;
            case 'midnight':
            default:
                return MIDNIGHT_THEME;
        }
    };

    const theme = getTheme();
    const isDark = theme.id !== 'minimal';

    return {
        theme,
        currentTheme,
        setTheme,
        isDark
    };
};
