// MODERN 2024/2025 DESIGN SYSTEM
// Inspired by: Linear, Stripe, Arc, Vercel

export type ThemeType = 'midnight' | 'ocean' | 'sunset' | 'forest' | 'neon' | 'royal' | 'cyberpunk' | 'minimal' | 'retro' | 'coffee' | 'dracula' | 'nord' | 'monokai' | 'matrix' | 'synthwave' | 'luxury' | 'botanical' | 'crimson' | 'slate' | 'lavender';

export const SPACING = {
    xs: 4,
    s: 8,
    sm: 8, // Alias
    m: 16,
    md: 16, // Alias
    l: 24,
    lg: 24, // Alias
    xl: 32,
    xxl: 48,
};

export const RADIUS = {
    s: 4,
    sm: 4, // Alias
    m: 8,
    md: 8, // Alias
    l: 12,
    lg: 12, // Alias
    xl: 16,
    round: 9999,
    full: 9999, // Alias
};

export const FONTS = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    heavy: 'System',
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
        xxl: 32,
    }
};

export const MIDNIGHT_THEME = {
    id: 'midnight',
    label: 'Midnight',
    // Backgrounds - Pure, deep blacks
    bg: '#000000',
    bgElevated: '#0A0A0A',
    bgSubtle: '#141414',
    card: '#111111',
    cardHighlight: '#1A1A1A',

    // Borders
    border: '#1F1F1F',
    borderHover: '#2A2A2A',
    borderLight: '#1F1F1F',

    // Text
    text: '#FFFFFF',
    textSub: '#8F8F8F',
    textMuted: '#555555',
    textSecondary: '#A1A1AA',
    textTertiary: '#52525B',
    background: '#000000',

    // Accent - Cyan
    accent: '#06B6D4',
    accentHover: '#0891B2',
    accentSubtle: '#06B6D410',
    primary: '#06B6D4',

    // Semantic
    positive: '#10B981',
    positiveSubtle: '#10B98110',
    success: '#10B981',
    successDim: '#10B98110',
    negative: '#EF4444',
    negativeSubtle: '#EF444410',
    error: '#EF4444',
    warning: '#F59E0B',
    warningSubtle: '#F59E0B10',
    warningDim: '#F59E0B10',
    danger: '#EF4444',
    chartUp: '#10B981',
    chartDown: '#EF4444',
    white: '#FFFFFF',
    cardGradient: ['#0f172a', '#1e1b4b', '#312e81'] as const,
};

export const OCEAN_THEME = {
    id: 'ocean',
    label: 'Ocean',
    bg: '#020617', // Slate 950
    bgElevated: '#0F172A', // Slate 900
    bgSubtle: '#1E293B', // Slate 800
    card: '#0F172A',
    cardHighlight: '#1E293B',

    border: '#1E293B',
    borderHover: '#334155',
    borderLight: '#1E293B',

    text: '#F8FAFC', // Slate 50
    textSub: '#94A3B8', // Slate 400
    textMuted: '#64748B', // Slate 500
    textSecondary: '#CBD5E1', // Slate 300
    textTertiary: '#475569', // Slate 600
    background: '#020617',

    accent: '#38BDF8', // Sky 400
    accentHover: '#0EA5E9', // Sky 500
    accentSubtle: '#38BDF810',
    primary: '#38BDF8',

    positive: '#2DD4BF', // Teal 400
    positiveSubtle: '#2DD4BF10',
    success: '#2DD4BF',
    successDim: '#2DD4BF10',
    negative: '#F87171', // Red 400
    negativeSubtle: '#F8717110',
    error: '#F87171',
    warning: '#FBBF24', // Amber 400
    warningSubtle: '#FBBF2410',
    warningDim: '#FBBF2410',
    danger: '#F87171',
    chartUp: '#2DD4BF',
    chartDown: '#F87171',
    white: '#FFFFFF',
    cardGradient: ['#0c4a6e', '#075985', '#0369a1'] as const,
};

export const SUNSET_THEME = {
    id: 'sunset',
    label: 'Sunset',
    bg: '#180818', // Deep Purple/Black
    bgElevated: '#240A24',
    bgSubtle: '#301030',
    card: '#240A24',
    cardHighlight: '#301030',

    border: '#301030',
    borderHover: '#4A1A4A',
    borderLight: '#301030',

    text: '#FDF4FF', // Fuchsia 50
    textSub: '#E879F9', // Fuchsia 400
    textMuted: '#A21CAF', // Fuchsia 700
    textSecondary: '#F5D0FE', // Fuchsia 200
    textTertiary: '#C026D3', // Fuchsia 600
    background: '#180818',

    accent: '#F472B6', // Pink 400
    accentHover: '#EC4899', // Pink 500
    accentSubtle: '#F472B610',
    primary: '#F472B6',

    positive: '#34D399', // Emerald 400
    positiveSubtle: '#34D39910',
    success: '#34D399',
    successDim: '#34D39910',
    negative: '#FB7185', // Rose 400
    negativeSubtle: '#FB718510',
    error: '#FB7185',
    warning: '#FBBF24',
    warningSubtle: '#FBBF2410',
    warningDim: '#FBBF2410',
    danger: '#FB7185',
    chartUp: '#34D399',
    chartDown: '#FB7185',
    white: '#FFFFFF',
    cardGradient: ['#4a044e', '#701a75', '#86198f'] as const,
};

export const FOREST_THEME = {
    id: 'forest',
    label: 'Forest',
    bg: '#022C22', // Teal 950
    bgElevated: '#064E3B', // Emerald 900
    bgSubtle: '#065F46', // Emerald 800
    card: '#064E3B',
    cardHighlight: '#065F46',

    border: '#065F46',
    borderHover: '#047857',
    borderLight: '#065F46',

    text: '#ECFDF5', // Emerald 50
    textSub: '#6EE7B7', // Emerald 300
    textMuted: '#34D399', // Emerald 400
    textSecondary: '#A7F3D0', // Emerald 200
    textTertiary: '#10B981', // Emerald 500
    background: '#022C22',

    accent: '#34D399', // Emerald 400
    accentHover: '#10B981', // Emerald 500
    accentSubtle: '#34D39910',
    primary: '#34D399',

    positive: '#4ADE80', // Green 400
    positiveSubtle: '#4ADE8010',
    success: '#4ADE80',
    successDim: '#4ADE8010',
    negative: '#F87171',
    negativeSubtle: '#F8717110',
    error: '#F87171',
    warning: '#FBBF24',
    warningSubtle: '#FBBF2410',
    warningDim: '#FBBF2410',
    danger: '#F87171',
    chartUp: '#4ADE80',
    chartDown: '#F87171',
    white: '#FFFFFF',
    cardGradient: ['#064e3b', '#065f46', '#047857'] as const,
};

export const NEON_THEME = {
    id: 'neon',
    label: 'Neon',
    bg: '#09090B', // Zinc 950
    bgElevated: '#18181B', // Zinc 900
    bgSubtle: '#27272A', // Zinc 800
    card: '#18181B',
    cardHighlight: '#27272A',

    border: '#27272A',
    borderHover: '#3F3F46',
    borderLight: '#27272A',

    text: '#FAFAFA', // Zinc 50
    textSub: '#A1A1AA', // Zinc 400
    textMuted: '#71717A', // Zinc 500
    textSecondary: '#D4D4D8', // Zinc 300
    textTertiary: '#52525B', // Zinc 600
    background: '#09090B',

    accent: '#D946EF', // Fuchsia 500
    accentHover: '#C026D3', // Fuchsia 600
    accentSubtle: '#D946EF10',
    primary: '#D946EF',

    positive: '#22C55E', // Green 500
    positiveSubtle: '#22C55E10',
    success: '#22C55E',
    successDim: '#22C55E10',
    negative: '#EF4444', // Red 500
    negativeSubtle: '#EF444410',
    error: '#EF4444',
    warning: '#EAB308', // Yellow 500
    warningSubtle: '#EAB30810',
    warningDim: '#EAB30810',
    danger: '#EF4444',
    chartUp: '#22C55E',
    chartDown: '#EF4444',
    white: '#FFFFFF',
    cardGradient: ['#27272a', '#3f3f46', '#52525b'] as const,
};

export const ROYAL_THEME = {
    id: 'royal',
    label: 'Royal',
    bg: '#17101F', // Deep Purple
    bgElevated: '#2D1B4E',
    bgSubtle: '#432C7A',
    card: '#2D1B4E',
    cardHighlight: '#432C7A',

    border: '#432C7A',
    borderHover: '#5B3EA8',
    borderLight: '#432C7A',

    text: '#F3E8FF', // Purple 50
    textSub: '#D8B4FE', // Purple 300
    textMuted: '#A855F7', // Purple 500
    textSecondary: '#E9D5FF', // Purple 200
    textTertiary: '#9333EA', // Purple 600
    background: '#17101F',

    accent: '#F59E0B', // Amber 500 (Gold)
    accentHover: '#D97706', // Amber 600
    accentSubtle: '#F59E0B10',
    primary: '#F59E0B',

    positive: '#10B981',
    positiveSubtle: '#10B98110',
    success: '#10B981',
    successDim: '#10B98110',
    negative: '#EF4444',
    negativeSubtle: '#EF444410',
    error: '#EF4444',
    warning: '#F59E0B',
    warningSubtle: '#F59E0B10',
    warningDim: '#F59E0B10',
    danger: '#EF4444',
    chartUp: '#10B981',
    chartDown: '#EF4444',
    white: '#FFFFFF',
    cardGradient: ['#2e1065', '#4c1d95', '#5b21b6'] as const,
};

export const CYBERPUNK_THEME = {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    bg: '#050505',
    bgElevated: '#121212',
    bgSubtle: '#1F1F1F',
    card: '#121212',
    cardHighlight: '#1F1F1F',

    border: '#333333',
    borderHover: '#FCEE0A', // Yellow
    borderLight: '#333333',

    text: '#FFFFFF',
    textSub: '#00F0FF', // Cyan
    textMuted: '#FF003C', // Red
    textSecondary: '#FCEE0A', // Yellow
    textTertiary: '#888888',
    background: '#050505',

    accent: '#FCEE0A', // Yellow
    accentHover: '#E6D600',
    accentSubtle: '#FCEE0A10',
    primary: '#FCEE0A',

    positive: '#00F0FF', // Cyan
    positiveSubtle: '#00F0FF10',
    success: '#00F0FF',
    successDim: '#00F0FF10',
    negative: '#FF003C', // Red
    negativeSubtle: '#FF003C10',
    error: '#FF003C',
    warning: '#FCEE0A',
    warningSubtle: '#FCEE0A10',
    warningDim: '#FCEE0A10',
    danger: '#FF003C',
    chartUp: '#00F0FF',
    chartDown: '#FF003C',
    white: '#FFFFFF',
    cardGradient: ['#1a1a1a', '#262626', '#333333'] as const,
};

export const MINIMAL_THEME = {
    id: 'minimal',
    label: 'Minimal',
    bg: '#FFFFFF',
    bgElevated: '#F4F4F5', // Zinc 100
    bgSubtle: '#E4E4E7', // Zinc 200
    card: '#F4F4F5',
    cardHighlight: '#E4E4E7',

    border: '#E4E4E7',
    borderHover: '#D4D4D8',
    borderLight: '#E4E4E7',

    text: '#18181B', // Zinc 900
    textSub: '#52525B', // Zinc 600
    textMuted: '#71717A', // Zinc 500
    textSecondary: '#3F3F46', // Zinc 700
    textTertiary: '#A1A1AA', // Zinc 400
    background: '#FFFFFF',

    accent: '#18181B', // Black
    accentHover: '#27272A',
    accentSubtle: '#18181B10',
    primary: '#18181B',

    positive: '#16A34A', // Green 600
    positiveSubtle: '#16A34A10',
    success: '#16A34A',
    successDim: '#16A34A10',
    negative: '#DC2626', // Red 600
    negativeSubtle: '#DC262610',
    error: '#DC2626',
    warning: '#CA8A04', // Yellow 600
    warningSubtle: '#CA8A0410',
    warningDim: '#CA8A0410',
    danger: '#DC2626',
    chartUp: '#16A34A',
    chartDown: '#DC2626',
    white: '#FFFFFF',
    cardGradient: ['#f4f4f5', '#e4e4e7', '#d4d4d8'] as const,
};

export const RETRO_THEME = {
    id: 'retro',
    label: 'Retro',
    bg: '#2B211E', // Dark Brown
    bgElevated: '#42332E',
    bgSubtle: '#5A463F',
    card: '#42332E',
    cardHighlight: '#5A463F',

    border: '#5A463F',
    borderHover: '#735B51',
    borderLight: '#5A463F',

    text: '#F5E6D3', // Cream
    textSub: '#D4B483', // Gold
    textMuted: '#A68A64',
    textSecondary: '#E6D2B5',
    textTertiary: '#8C7355',
    background: '#2B211E',

    accent: '#E07A5F', // Terracotta
    accentHover: '#D0694E',
    accentSubtle: '#E07A5F10',
    primary: '#E07A5F',

    positive: '#81B29A', // Sage Green
    positiveSubtle: '#81B29A10',
    success: '#81B29A',
    successDim: '#81B29A10',
    negative: '#E07A5F', // Terracotta
    negativeSubtle: '#E07A5F10',
    error: '#E07A5F',
    warning: '#F2CC8F', // Sand
    warningSubtle: '#F2CC8F10',
    warningDim: '#F2CC8F10',
    danger: '#E07A5F',
    chartUp: '#81B29A',
    chartDown: '#E07A5F',
    white: '#FFFFFF',
    cardGradient: ['#42332e', '#5a463f', '#735b51'] as const,
};

export const COFFEE_THEME = {
    id: 'coffee',
    label: 'Coffee',
    bg: '#1C1917', // Stone 950
    bgElevated: '#292524', // Stone 900
    bgSubtle: '#44403C', // Stone 700
    card: '#292524',
    cardHighlight: '#44403C',

    border: '#44403C',
    borderHover: '#57534E',
    borderLight: '#44403C',

    text: '#E7E5E4', // Stone 200
    textSub: '#A8A29E', // Stone 400
    textMuted: '#78716C', // Stone 500
    textSecondary: '#D6D3D1', // Stone 300
    textTertiary: '#57534E', // Stone 600
    background: '#1C1917',

    accent: '#D97706', // Amber 600
    accentHover: '#B45309', // Amber 700
    accentSubtle: '#D9770610',
    primary: '#D97706',

    positive: '#84CC16', // Lime 500
    positiveSubtle: '#84CC1610',
    success: '#84CC16',
    successDim: '#84CC1610',
    negative: '#EF4444',
    negativeSubtle: '#EF444410',
    error: '#EF4444',
    warning: '#F59E0B',
    warningSubtle: '#F59E0B10',
    warningDim: '#F59E0B10',
    danger: '#EF4444',
    chartUp: '#84CC16',
    chartDown: '#EF4444',
    white: '#FFFFFF',
    cardGradient: ['#292524', '#44403c', '#57534e'] as const,
};

// --- NEW THEMES ---

export const DRACULA_THEME = {
    id: 'dracula',
    label: 'Dracula',
    bg: '#282a36',
    bgElevated: '#44475a',
    bgSubtle: '#6272a4',
    card: '#44475a',
    cardHighlight: '#6272a4',
    border: '#6272a4',
    borderHover: '#bd93f9',
    borderLight: '#6272a4',
    text: '#f8f8f2',
    textSub: '#6272a4',
    textMuted: '#6272a4',
    textSecondary: '#f8f8f2',
    textTertiary: '#44475a',
    background: '#282a36',
    accent: '#bd93f9', // Purple
    accentHover: '#ff79c6', // Pink
    accentSubtle: '#bd93f910',
    primary: '#bd93f9',
    positive: '#50fa7b',
    positiveSubtle: '#50fa7b10',
    success: '#50fa7b',
    successDim: '#50fa7b10',
    negative: '#ff5555',
    negativeSubtle: '#ff555510',
    error: '#ff5555',
    warning: '#f1fa8c',
    warningSubtle: '#f1fa8c10',
    warningDim: '#f1fa8c10',
    danger: '#ff5555',
    chartUp: '#50fa7b',
    chartDown: '#ff5555',
    white: '#FFFFFF',
    cardGradient: ['#44475a', '#6272a4', '#44475a'] as const,
};

export const NORD_THEME = {
    id: 'nord',
    label: 'Nord',
    bg: '#2e3440',
    bgElevated: '#3b4252',
    bgSubtle: '#434c5e',
    card: '#3b4252',
    cardHighlight: '#434c5e',
    border: '#4c566a',
    borderHover: '#88c0d0',
    borderLight: '#4c566a',
    text: '#eceff4',
    textSub: '#d8dee9',
    textMuted: '#4c566a',
    textSecondary: '#e5e9f0',
    textTertiary: '#434c5e',
    background: '#2e3440',
    accent: '#88c0d0', // Frost Blue
    accentHover: '#81a1c1',
    accentSubtle: '#88c0d010',
    primary: '#88c0d0',
    positive: '#a3be8c',
    positiveSubtle: '#a3be8c10',
    success: '#a3be8c',
    successDim: '#a3be8c10',
    negative: '#bf616a',
    negativeSubtle: '#bf616a10',
    error: '#bf616a',
    warning: '#ebcb8b',
    warningSubtle: '#ebcb8b10',
    warningDim: '#ebcb8b10',
    danger: '#bf616a',
    chartUp: '#a3be8c',
    chartDown: '#bf616a',
    white: '#FFFFFF',
    cardGradient: ['#3b4252', '#434c5e', '#4c566a'] as const,
};

export const MONOKAI_THEME = {
    id: 'monokai',
    label: 'Monokai',
    bg: '#272822',
    bgElevated: '#3e3d32',
    bgSubtle: '#49483e',
    card: '#3e3d32',
    cardHighlight: '#49483e',
    border: '#75715e',
    borderHover: '#a6e22e',
    borderLight: '#75715e',
    text: '#f8f8f2',
    textSub: '#75715e',
    textMuted: '#75715e',
    textSecondary: '#f8f8f2',
    textTertiary: '#49483e',
    background: '#272822',
    accent: '#a6e22e', // Green
    accentHover: '#f92672', // Pink
    accentSubtle: '#a6e22e10',
    primary: '#a6e22e',
    positive: '#a6e22e',
    positiveSubtle: '#a6e22e10',
    success: '#a6e22e',
    successDim: '#a6e22e10',
    negative: '#f92672',
    negativeSubtle: '#f9267210',
    error: '#f92672',
    warning: '#e6db74',
    warningSubtle: '#e6db7410',
    warningDim: '#e6db7410',
    danger: '#f92672',
    chartUp: '#a6e22e',
    chartDown: '#f92672',
    white: '#FFFFFF',
    cardGradient: ['#3e3d32', '#49483e', '#75715e'] as const,
};

export const MATRIX_THEME = {
    id: 'matrix',
    label: 'Matrix',
    bg: '#000000',
    bgElevated: '#0d0d0d',
    bgSubtle: '#1a1a1a',
    card: '#0d0d0d',
    cardHighlight: '#1a1a1a',
    border: '#003b00',
    borderHover: '#008f11',
    borderLight: '#003b00',
    text: '#00ff41',
    textSub: '#008f11',
    textMuted: '#003b00',
    textSecondary: '#00ff41',
    textTertiary: '#003b00',
    background: '#000000',
    accent: '#00ff41',
    accentHover: '#008f11',
    accentSubtle: '#00ff4110',
    primary: '#00ff41',
    positive: '#00ff41',
    positiveSubtle: '#00ff4110',
    success: '#00ff41',
    successDim: '#00ff4110',
    negative: '#ff0000', // Red for errors still needed
    negativeSubtle: '#ff000010',
    error: '#ff0000',
    warning: '#ffff00',
    warningSubtle: '#ffff0010',
    warningDim: '#ffff0010',
    danger: '#ff0000',
    chartUp: '#00ff41',
    chartDown: '#ff0000',
    white: '#FFFFFF',
    cardGradient: ['#0d0d0d', '#1a1a1a', '#003b00'] as const,
};

export const SYNTHWAVE_THEME = {
    id: 'synthwave',
    label: 'Synthwave',
    bg: '#2b213a',
    bgElevated: '#241b2f',
    bgSubtle: '#3a2e4d',
    card: '#241b2f',
    cardHighlight: '#3a2e4d',
    border: '#ff0090',
    borderHover: '#00f2ff',
    borderLight: '#ff0090',
    text: '#fffb96',
    textSub: '#00f2ff',
    textMuted: '#ff0090',
    textSecondary: '#fffb96',
    textTertiary: '#241b2f',
    background: '#2b213a',
    accent: '#ff0090', // Magenta
    accentHover: '#00f2ff', // Cyan
    accentSubtle: '#ff009010',
    primary: '#ff0090',
    positive: '#05ffa1',
    positiveSubtle: '#05ffa110',
    success: '#05ffa1',
    successDim: '#05ffa110',
    negative: '#ff2a6d',
    negativeSubtle: '#ff2a6d10',
    error: '#ff2a6d',
    warning: '#f5d300',
    warningSubtle: '#f5d30010',
    warningDim: '#f5d30010',
    danger: '#ff2a6d',
    chartUp: '#05ffa1',
    chartDown: '#ff2a6d',
    white: '#FFFFFF',
    cardGradient: ['#241b2f', '#3a2e4d', '#2b213a'] as const,
};

export const LUXURY_THEME = {
    id: 'luxury',
    label: 'Luxury',
    bg: '#101010',
    bgElevated: '#1a1a1a',
    bgSubtle: '#262626',
    card: '#1a1a1a',
    cardHighlight: '#262626',
    border: '#d4af37', // Gold
    borderHover: '#f1c40f',
    borderLight: '#d4af37',
    text: '#f1c40f',
    textSub: '#d4af37',
    textMuted: '#8a6d3b',
    textSecondary: '#ffffff',
    textTertiary: '#262626',
    background: '#101010',
    accent: '#d4af37',
    accentHover: '#f1c40f',
    accentSubtle: '#d4af3710',
    primary: '#d4af37',
    positive: '#2ecc71',
    positiveSubtle: '#2ecc7110',
    success: '#2ecc71',
    successDim: '#2ecc7110',
    negative: '#e74c3c',
    negativeSubtle: '#e74c3c10',
    error: '#e74c3c',
    warning: '#f39c12',
    warningSubtle: '#f39c1210',
    warningDim: '#f39c1210',
    danger: '#e74c3c',
    chartUp: '#d4af37', // Gold charts
    chartDown: '#e74c3c',
    white: '#FFFFFF',
    cardGradient: ['#1a1a1a', '#262626', '#1a1a1a'] as const,
};

export const BOTANICAL_THEME = {
    id: 'botanical',
    label: 'Botanical',
    bg: '#2f3e46',
    bgElevated: '#354f52',
    bgSubtle: '#52796f',
    card: '#354f52',
    cardHighlight: '#52796f',
    border: '#84a98c',
    borderHover: '#cad2c5',
    borderLight: '#84a98c',
    text: '#cad2c5',
    textSub: '#84a98c',
    textMuted: '#52796f',
    textSecondary: '#cad2c5',
    textTertiary: '#354f52',
    background: '#2f3e46',
    accent: '#84a98c',
    accentHover: '#52796f',
    accentSubtle: '#84a98c10',
    primary: '#84a98c',
    positive: '#a3b18a',
    positiveSubtle: '#a3b18a10',
    success: '#a3b18a',
    successDim: '#a3b18a10',
    negative: '#e07a5f', // Earthy red
    negativeSubtle: '#e07a5f10',
    error: '#e07a5f',
    warning: '#e9c46a',
    warningSubtle: '#e9c46a10',
    warningDim: '#e9c46a10',
    danger: '#e07a5f',
    chartUp: '#a3b18a',
    chartDown: '#e07a5f',
    white: '#FFFFFF',
    cardGradient: ['#354f52', '#52796f', '#354f52'] as const,
};

export const CRIMSON_THEME = {
    id: 'crimson',
    label: 'Crimson',
    bg: '#1a0505',
    bgElevated: '#2b0a0a',
    bgSubtle: '#3d0f0f',
    card: '#2b0a0a',
    cardHighlight: '#3d0f0f',
    border: '#800000',
    borderHover: '#ff0000',
    borderLight: '#800000',
    text: '#ffcccc',
    textSub: '#ff6666',
    textMuted: '#800000',
    textSecondary: '#ffcccc',
    textTertiary: '#2b0a0a',
    background: '#1a0505',
    accent: '#ff0000',
    accentHover: '#cc0000',
    accentSubtle: '#ff000010',
    primary: '#ff0000',
    positive: '#00ff00', // High contrast green
    positiveSubtle: '#00ff0010',
    success: '#00ff00',
    successDim: '#00ff0010',
    negative: '#ff0000',
    negativeSubtle: '#ff000010',
    error: '#ff0000',
    warning: '#ffcc00',
    warningSubtle: '#ffcc0010',
    warningDim: '#ffcc0010',
    danger: '#ff0000',
    chartUp: '#00ff00',
    chartDown: '#ff0000',
    white: '#FFFFFF',
    cardGradient: ['#2b0a0a', '#3d0f0f', '#2b0a0a'] as const,
};

export const SLATE_THEME = {
    id: 'slate',
    label: 'Slate',
    bg: '#1e293b',
    bgElevated: '#334155',
    bgSubtle: '#475569',
    card: '#334155',
    cardHighlight: '#475569',
    border: '#64748b',
    borderHover: '#94a3b8',
    borderLight: '#64748b',
    text: '#f1f5f9',
    textSub: '#cbd5e1',
    textMuted: '#64748b',
    textSecondary: '#f1f5f9',
    textTertiary: '#334155',
    background: '#1e293b',
    accent: '#38bdf8', // Sky blue
    accentHover: '#0ea5e9',
    accentSubtle: '#38bdf810',
    primary: '#38bdf8',
    positive: '#4ade80',
    positiveSubtle: '#4ade8010',
    success: '#4ade80',
    successDim: '#4ade8010',
    negative: '#f87171',
    negativeSubtle: '#f8717110',
    error: '#f87171',
    warning: '#fbbf24',
    warningSubtle: '#fbbf2410',
    warningDim: '#fbbf2410',
    danger: '#f87171',
    chartUp: '#4ade80',
    chartDown: '#f87171',
    white: '#FFFFFF',
    cardGradient: ['#334155', '#475569', '#334155'] as const,
};

export const LAVENDER_THEME = {
    id: 'lavender',
    label: 'Lavender',
    bg: '#e6e6fa',
    bgElevated: '#f3f3ff',
    bgSubtle: '#dcdcdc',
    card: '#f3f3ff',
    cardHighlight: '#dcdcdc',
    border: '#b0c4de',
    borderHover: '#9370db',
    borderLight: '#b0c4de',
    text: '#483d8b',
    textSub: '#6a5acd',
    textMuted: '#7b68ee',
    textSecondary: '#483d8b',
    textTertiary: '#f3f3ff',
    background: '#e6e6fa',
    accent: '#9370db', // Medium Purple
    accentHover: '#8a2be2',
    accentSubtle: '#9370db10',
    primary: '#9370db',
    positive: '#32cd32',
    positiveSubtle: '#32cd3210',
    success: '#32cd32',
    successDim: '#32cd3210',
    negative: '#ff6347',
    negativeSubtle: '#ff634710',
    error: '#ff6347',
    warning: '#ffa500',
    warningSubtle: '#ffa50010',
    warningDim: '#ffa50010',
    danger: '#ff6347',
    chartUp: '#32cd32',
    chartDown: '#ff6347',
    white: '#FFFFFF',
    cardGradient: ['#f3f3ff', '#e6e6fa', '#f3f3ff'] as const,
};

export const THEMES = {
    midnight: MIDNIGHT_THEME,
    ocean: OCEAN_THEME,
    sunset: SUNSET_THEME,
    forest: FOREST_THEME,
    neon: NEON_THEME,
    royal: ROYAL_THEME,
    cyberpunk: CYBERPUNK_THEME,
    minimal: MINIMAL_THEME,
    retro: RETRO_THEME,
    coffee: COFFEE_THEME,
    dracula: DRACULA_THEME,
    nord: NORD_THEME,
    monokai: MONOKAI_THEME,
    matrix: MATRIX_THEME,
    synthwave: SYNTHWAVE_THEME,
    luxury: LUXURY_THEME,
    botanical: BOTANICAL_THEME,
    crimson: CRIMSON_THEME,
    slate: SLATE_THEME,
    lavender: LAVENDER_THEME,
};

// BACKWARD COMPATIBILITY
// BACKWARD COMPATIBILITY & UTILS
export const COLORS = MIDNIGHT_THEME;
export const DARK_THEME = MIDNIGHT_THEME;
export const LIGHT_THEME = LAVENDER_THEME; // Closest to light theme

export const AVAILABLE_THEMES = [
    MIDNIGHT_THEME,
    OCEAN_THEME,
    SUNSET_THEME,
    FOREST_THEME,
    NEON_THEME,
    ROYAL_THEME,
    CYBERPUNK_THEME,
    MINIMAL_THEME,
    RETRO_THEME,
    COFFEE_THEME,
    DRACULA_THEME,
    NORD_THEME,
    MONOKAI_THEME,
    MATRIX_THEME,
    SYNTHWAVE_THEME,
    LUXURY_THEME,
    BOTANICAL_THEME,
    CRIMSON_THEME,
    SLATE_THEME,
    LAVENDER_THEME,
];


