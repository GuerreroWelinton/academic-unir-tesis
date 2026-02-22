import type { Decorator, Preview } from '@storybook/angular';
import { resetTheme } from '@zg/design-tokens';
import { applyClientTheme, type ClientId } from '../src/themes/client-themes';

/**
 * Global theme decorator for Storybook
 */
export const withTheme: Decorator = (story, context) => {
  const clientId = (context.globals['client'] as ClientId) || 'client1';
  const variant = (context.globals['theme'] as string) || 'light';

  if (context.viewMode === 'story') {
    applyClientTheme(clientId, variant);
  } else {
    resetTheme();
  }

  return story();
};

/**
 * Global types for Storybook toolbar
 */
export const globalTypes: NonNullable<Preview['globalTypes']> = {
  client: {
    name: 'Client',
    description: 'Select client brand',
    defaultValue: 'client1',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'client1', title: 'Client 1' },
        { value: 'client2', title: 'Client 2' },
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
};
