import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';
import docJson from '../documentation.json';
import customTheme from './custom-theme';
import { globalTypes, withTheme } from './theme-decorator';

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
      disable: true,
    },
    a11y: {
      options: {
        runOnly: { type: 'tag', values: ['wcag2aa', 'wcag21aa'] },
      },
    },
  },
  // Add theme decorator globally
  decorators: [withTheme],
  // Add client/theme toolbar controls
  globalTypes: globalTypes,
};

export default preview;
