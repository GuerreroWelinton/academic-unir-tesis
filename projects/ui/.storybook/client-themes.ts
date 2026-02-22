import type { ThemeRegistry } from '@zgames/design-tokens';

export type StorybookClientId = 'client1' | 'client2';

export const STORYBOOK_CLIENT_THEMES: ThemeRegistry<StorybookClientId> = {
  client1: {
    light: {
      typography: {
        fontFamilyBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#00c42e',
        neutral200: '#fafafa',
        neutral300: '#f5f5f5',
        neutral900: '#0a2c18',
      },
      color: {
        bgPrimary: '#fafafa',
        bgSecondary: '#f5f5f5',
        surface: '#ffffff',
        textPrimary: '#0a2c18',
        textSecondary: '#186b3c',
        textInverse: '#ffffff',
      },
    },
    dark: {
      typography: {
        fontFamilyBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#5cd662',
        neutral200: '#0e0e11',
        neutral300: '#18181b',
        neutral400: '#27272a',
        neutral900: '#d4fd2b',
      },
      color: {
        bgPrimary: '#27272a',
        bgSecondary: '#18181b',
        surface: '#18181b',
        textPrimary: '#d4fd2b',
        textSecondary: '#a7d96a',
        textInverse: '#ffffff',
      },
    },
    christmas: {
      typography: {
        fontFamilyBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
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
        bgPrimary: '#f8f9fa',
        bgSecondary: '#ffffff',
        surface: '#ffffff',
        textPrimary: '#0a3622',
        textSecondary: '#146c43',
        textInverse: '#ffffff',
      },
    },
  },
  client2: {
    light: {
      typography: {
        fontFamilyBase: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
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
      color: {
        bgPrimary: '#f3e5f5',
        bgSecondary: '#e1bee7',
        surface: '#ffffff',
        textPrimary: '#4a148c',
        textSecondary: '#6a1b9a',
        textInverse: '#ffffff',
      },
    },
    dark: {
      typography: {
        fontFamilyBase: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
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
      color: {
        bgPrimary: '#1a0033',
        bgSecondary: '#2d0052',
        surface: '#2d0052',
        textPrimary: '#e1bee7',
        textSecondary: '#c792d8',
        textInverse: '#ffffff',
      },
    },
    christmas: {
      typography: {
        fontFamilyBase: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
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
        bgSecondary: '#fff3cd',
        surface: '#ffffff',
        textPrimary: '#1b5e20',
        textSecondary: '#2e7d32',
        textInverse: '#ffffff',
      },
    },
  },
};
