/**
 * Storybook Theme Decorator
 * Allows theme switching in Storybook controls
 */

import type { Decorator } from '@storybook/angular';
import { createTheme } from '@zg/design-tokens';
import { CLIENT_THEMES, type ClientId, type ThemeVariant } from '../src/themes/client-themes';

/**
 * Global theme decorator for Storybook
 * Add this to .storybook/preview.ts
 */
export const withTheme: Decorator = (story, context) => {
  const clientId = (context.globals['client'] as ClientId) || 'zgames';
  const variant = (context.globals['theme'] as ThemeVariant) || 'light';

  // Apply theme before rendering story
  const theme = CLIENT_THEMES[clientId]?.[variant] || CLIENT_THEMES.zgames.light;
  createTheme(theme);

  return story();
};

/**
 * Global types for Storybook toolbar
 * Add this to .storybook/preview.ts
 */
export const globalTypes = {
  client: {
    name: 'Client',
    description: 'Select client brand',
    defaultValue: 'zgames',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'zgames', title: 'ZGames (Default)' },
        { value: 'casino1', title: 'Casino 1 (Red/Gold)' },
        { value: 'casino2', title: 'Casino 2 (Blue/Teal)' },
        { value: 'casino3', title: 'Casino 3 (Purple/Yellow)' },
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Select theme variant',
    defaultValue: 'light',
    toolbar: {
      icon: 'contrast',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
        { value: 'custom', title: 'Custom' },
      ],
      dynamicTitle: true,
    },
  },
} as const;
