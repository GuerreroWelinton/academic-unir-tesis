import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { withTheme, globalTypes } from './theme-decorator';
import customTheme from './custom-theme';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: customTheme,
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#E5E5E5' },
      ],
    },
  },
  // Add theme decorator globally
  decorators: [withTheme],
  // Add client/theme toolbar controls
  globalTypes: globalTypes as any,
};

export default preview;
