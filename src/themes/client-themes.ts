/**
 * Client Theme Configurations
 * Each client can have multiple theme variants (light, dark, etc.)
 */

import type { Theme } from '@zg/design-tokens';

/**
 * Theme variant type
 */
export type ThemeVariant = 'light' | 'dark' | 'custom';

/**
 * Client theme configuration
 * Each client can have multiple variants
 */
export interface ClientThemeConfig {
  light: Theme;
  dark?: Theme;
  custom?: Theme;
}

/**
 * Available clients
 */
export type ClientId = 'zgames' | 'casino1' | 'casino2' | 'casino3';

/**
 * Client themes registry
 * Define all client themes here
 */
export const CLIENT_THEMES: Record<ClientId, ClientThemeConfig> = {
  // Default ZGames brand
  zgames: {
    light: {
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#00c42e',
        neutral200: '#fafafa',
        neutral300: '#f5f5f5',
      },
    },
    dark: {
      primitives: {
        green800: '#002d16',
        green500: '#42c148',
        neutral200: '#0e0e11',
        neutral300: '#18181b',
        neutral400: '#27272a',
        neutral900: '#ffffff',
      },
    },
  },

  // Casino 1 - Red/Gold theme
  casino1: {
    light: {
      primitives: {
        green800: '#d32f2f', // Use red as "primary"
        green500: '#c62828',
        green400: '#f44336',
        orange500: '#ffd700', // Gold accent
        neutral200: '#fafafa',
      },
    },
    dark: {
      primitives: {
        green800: '#8b0000',
        green500: '#d32f2f',
        neutral200: '#1a0000',
        neutral300: '#2d0000',
        neutral900: '#ffffff',
      },
    },
  },

  // Casino 2 - Blue/Teal theme
  casino2: {
    light: {
      primitives: {
        green800: '#00796b', // Teal as "primary"
        green500: '#004d40',
        green400: '#00897b',
        orange500: '#0cb7f2', // Blue accent
        neutral200: '#e0f7fa',
      },
    },
    dark: {
      primitives: {
        green800: '#004d40',
        green500: '#00796b',
        neutral200: '#001a1a',
        neutral300: '#002d2d',
        neutral900: '#ffffff',
      },
    },
  },

  // Casino 3 - Purple/Yellow theme
  casino3: {
    light: {
      primitives: {
        green800: '#6a1b9a', // Purple as "primary"
        green500: '#8e24aa',
        green400: '#9c27b0',
        orange500: '#ffd028', // Yellow accent
        yellow500: '#ffeb3b',
        neutral200: '#f3e5f5',
      },
    },
    dark: {
      primitives: {
        green800: '#4a148c',
        green500: '#6a1b9a',
        neutral200: '#1a0033',
        neutral300: '#2d0052',
        neutral900: '#ffffff',
      },
    },
    // Example custom variant
    custom: {
      primitives: {
        green800: '#9c27b0',
        green100: '#ffeb3b', // Bright yellow highlight
        neutral200: '#000000',
        neutral900: '#ffffff',
      },
    },
  },
};

/**
 * Get theme configuration for a specific client and variant
 * @param clientId - The client identifier
 * @param variant - Theme variant (light, dark, custom)
 * @returns Theme configuration
 */
export function getClientTheme(clientId: ClientId, variant: ThemeVariant = 'light'): Theme {
  const clientThemes = CLIENT_THEMES[clientId];
  return clientThemes[variant] || clientThemes.light;
}

/**
 * Get available variants for a client
 * @param clientId - The client identifier
 * @returns Array of available theme variants
 */
export function getAvailableVariants(clientId: ClientId): ThemeVariant[] {
  const clientThemes = CLIENT_THEMES[clientId];
  return Object.keys(clientThemes) as ThemeVariant[];
}

/**
 * Apply client theme to document
 * @param clientId - The client identifier
 * @param variant - Theme variant
 */
export function applyClientTheme(clientId: ClientId, variant: ThemeVariant = 'light'): void {
  const theme = getClientTheme(clientId, variant);

  // Import dynamically to avoid circular dependency
  import('@zg/design-tokens').then(({ createTheme }) => {
    createTheme(theme);
  });
}
