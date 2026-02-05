/**
 * Storybook Theme Decorator
 * Allows theme switching in Storybook controls
 */

import type { Decorator } from '@storybook/angular';
import { createTheme } from '@zg/design-tokens';
import { CLIENT_THEMES, type ClientId } from '../src/themes/client-themes';

/**
 * Global theme decorator for Storybook
 * Add this to .storybook/preview.ts
 */
export const withTheme: Decorator = (story, context) => {
  const clientId = (context.globals['client'] as ClientId) || 'casino1';
  const variant = (context.globals['theme'] as string) || 'light';

  // Apply theme before rendering story
  const theme = CLIENT_THEMES[clientId]?.[variant] || CLIENT_THEMES['casino1']['light'];
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
    defaultValue: 'casino1',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'casino1', title: 'Casino 1 (Green)' },
        { value: 'casino2', title: 'Casino 2 (Purple)' },
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
        { value: 'christmas', title: 'Christmas' },
      ],
      dynamicTitle: true,
    },
  },
} as const;
