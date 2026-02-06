/**
 * Storybook Theme Decorator
 * Allows theme switching in Storybook controls
 */

import type { Decorator } from '@storybook/angular';
import { applyClientTheme, type ClientId } from '../src/themes/client-themes';

/**
 * Global theme decorator for Storybook
 * Add this to .storybook/preview.ts
 */
export const withTheme: Decorator = (story, context) => {
  const clientId = (context.globals['client'] as ClientId) || 'cliente1';
  const variant = (context.globals['theme'] as string) || 'light';

  // Apply theme (handles reset + createTheme internally)
  applyClientTheme(clientId, variant);

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
    defaultValue: 'cliente1',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'cliente1', title: 'Cliente 1 (Green)' },
        { value: 'cliente2', title: 'Cliente 2 (Purple)' },
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
