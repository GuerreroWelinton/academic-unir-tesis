/**
 * Client Theme Configurations
 * Each client can have multiple theme variants with flexible naming
 */

import type { Theme } from '@zg/design-tokens';

/**
 * Client theme configuration
 * Flexible record allowing any theme variant names (light, dark, christmas, promo-gold, etc.)
 */
export type ClientThemeConfig = Record<string, Theme>;

/**
 * Available clients
 */
export type ClientId = 'casino1' | 'casino2';

/**
 * Client themes registry
 * Define all client themes here
 */
export const CLIENT_THEMES: Record<ClientId, ClientThemeConfig> = {
  // Casino 1 (ZGames) - Default brand
  casino1: {
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
    christmas: {
      primitives: {
        green800: '#0f5132',
        green500: '#198754',
        green400: '#00c42e',
        red500: '#dc3545',
        red600: '#bb2d3b',
        orange500: '#ffc107',
        neutral200: '#f8f9fa',
        neutral900: '#0a3622',
      },
    },
  },

  // Casino 2 - Purple/Yellow theme
  casino2: {
    light: {
      primitives: {
        green800: '#6a1b9a',
        green500: '#8e24aa',
        green400: '#9c27b0',
        orange500: '#ffd028',
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
    christmas: {
      primitives: {
        green800: '#165b33',
        green500: '#2e7d32',
        green400: '#4caf50',
        red500: '#c62828',
        red600: '#b71c1c',
        orange500: '#ffd700',
        neutral200: '#fff8e1',
        neutral900: '#1b5e20',
      },
    },
  },
};

/**
 * Get theme configuration for a specific client and variant
 * @param clientId - The client identifier
 * @param variant - Theme variant name (e.g., 'light', 'dark', 'christmas', 'promo-gold')
 * @returns Theme configuration
 */
export function getClientTheme(clientId: ClientId, variant: string = 'light'): Theme {
  const clientThemes = CLIENT_THEMES[clientId];
  return clientThemes[variant] || CLIENT_THEMES['casino1']['light'];
}

/**
 * Get available variants for a client
 * @param clientId - The client identifier
 * @returns Array of available theme variant names
 */
export function getAvailableVariants(clientId: ClientId): string[] {
  const clientThemes = CLIENT_THEMES[clientId];
  return Object.keys(clientThemes);
}

/**
 * Apply client theme to document
 * @param clientId - The client identifier
 * @param variant - Theme variant name
 */
export function applyClientTheme(clientId: ClientId, variant: string = 'light'): void {
  const theme = getClientTheme(clientId, variant);

  // Import dynamically to avoid circular dependency
  import('@zg/design-tokens').then(({ createTheme }) => {
    createTheme(theme);
  });
}
