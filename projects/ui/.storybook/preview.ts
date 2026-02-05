import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { withTheme, globalTypes } from '../../../.storybook/theme-decorator';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Add theme decorator globally
  decorators: [withTheme],
  // Add client/theme toolbar controls
  globalTypes: globalTypes as any,
};

export default preview;
