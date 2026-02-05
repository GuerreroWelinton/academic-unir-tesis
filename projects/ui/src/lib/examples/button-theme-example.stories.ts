/**
 * Example: Button component story with theme support
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  // Optional: Override theme for this specific story
  parameters: {
    // You can force a specific client/theme for documentation
    // client: 'casino1',
    // theme: 'dark',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/**
 * Default button
 * Try changing the Client and Theme in the Storybook toolbar!
 */
export const Default: Story = {
  args: {
    label: 'Click me',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Primary button - works with all client themes
 */
export const Primary: Story = {
  args: {
    label: 'Primary Action',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Example: Force specific theme for this story
 */
export const Casino1Theme: Story = {
  args: {
    label: 'Casino 1 Branded Button',
    variant: 'primary',
  },
  parameters: {
    // This story always shows Casino 1 theme
    globals: {
      client: 'casino1',
      theme: 'light',
    },
  },
};

/**
 * Example: Show multiple variants side by side
 */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-direction: column;">
        <div style="display: flex; gap: 1rem;">
          <button style="
            background: var(--zg-color-primary);
            color: var(--zg-color-text-inverse);
            padding: var(--zg-spacing-3) var(--zg-spacing-6);
            border-radius: var(--zg-radius-base);
            border: none;
            cursor: pointer;
          ">Primary</button>

          <button style="
            background: var(--zg-color-secondary);
            color: var(--zg-color-text-inverse);
            padding: var(--zg-spacing-3) var(--zg-spacing-6);
            border-radius: var(--zg-radius-base);
            border: none;
            cursor: pointer;
          ">Secondary</button>

          <button style="
            background: var(--zg-color-error);
            color: var(--zg-color-text-inverse);
            padding: var(--zg-spacing-3) var(--zg-spacing-6);
            border-radius: var(--zg-radius-base);
            border: none;
            cursor: pointer;
          ">Error</button>
        </div>

        <p style="color: var(--zg-color-text-secondary); font-size: var(--zg-font-size-sm);">
          💡 Change Client and Theme in the toolbar to see different brands!
        </p>
      </div>
    `,
  }),
};
