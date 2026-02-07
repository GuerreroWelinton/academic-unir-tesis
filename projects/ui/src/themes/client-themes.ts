/**
 * Client Theme Configurations
 * Each client can have multiple theme variants with flexible naming
 */

import { createTheme, resetTheme, type Theme } from '@zg/design-tokens';

/**
 * Client theme configuration
 * Flexible record allowing any theme variant names (light, dark, christmas, promo-gold, etc.)
 */
export type ClientThemeConfig = Record<string, Theme>;

/**
 * Available clients
 */
export type ClientId = 'client1' | 'client2';

/**
 * Client themes registry
 * Define all client themes here
 */
export const CLIENT_THEMES: Record<ClientId, ClientThemeConfig> = {
  // Client 1 (ZGames) - Default brand
  client1: {
    light: {
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#00c42e',
        neutral200: '#fafafa',
        neutral300: '#f5f5f5',
        neutral900: '#0a2c18',
      },
    },
    dark: {
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#5cd662',
        neutral200: '#0e0e11',
        neutral300: '#18181b',
        neutral400: '#27272a',
        neutral900: '#d4fd2b',
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
      color: {
        primary: '#dc3545',
        primaryHover: '#198754',
        secondary: '#dc3545',
        accent: '#ffc107',
        error: '#bb2d3b',
      },
    },
  },

  // Client 2 - Purple/Yellow theme
  client2: {
    light: {
      primitives: {
        green800: '#6a1b9a',
        green500: '#8e24aa',
        green400: '#9c27b0',
        orange500: '#ffd028',
        yellow500: '#ffeb3b',
        neutral200: '#f3e5f5',
        neutral300: '#e1bee7',
        neutral900: '#4a148c',
      },
    },
    dark: {
      primitives: {
        green800: '#7b1fa2',
        green500: '#9c27b0',
        green400: '#ab47bc',
        orange500: '#ffd028',
        neutral200: '#1a0033',
        neutral300: '#2d0052',
        neutral400: '#4a148c',
        neutral900: '#e1bee7',
      },
    },
    christmas: {
      primitives: {
        red500: '#c62828',
        red600: '#b71c1c',
        green800: '#165b33',
        green500: '#2e7d32',
        green400: '#4caf50',
        orange500: '#ffd700',
        yellow500: '#ffcc00',
        neutral200: '#fff8e1',
        neutral900: '#1b5e20',
      },
      color: {
        primary: '#c62828',
        primaryHover: '#b71c1c',
        secondary: '#2e7d32',
        accent: '#ffd700',
        highlight: '#ffcc00',
        bgPrimary: '#fff8e1',
        textPrimary: '#1b5e20',
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
export function getClientTheme(clientId: ClientId, variant = 'light'): Theme {
  const clientThemes = CLIENT_THEMES[clientId];
  return clientThemes[variant] || CLIENT_THEMES['client1']['light'];
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
export function applyClientTheme(clientId: ClientId, variant = 'light'): void {
  const theme = getClientTheme(clientId, variant);

  // Reset previous theme to avoid conflicts
  resetTheme();

  // Apply new theme
  createTheme(theme);
}
