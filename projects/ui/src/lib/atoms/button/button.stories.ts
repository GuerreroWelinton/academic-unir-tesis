import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideDownload, lucidePlus, lucideSave } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ZgButtonComponent } from './button.component';

/**
 * Button component for user interactions and actions.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Primary actions (submit forms, confirm dialogs)
 * - Navigation triggers
 * - Start processes or workflows
 *
 * **When NOT to use:**
 * - Navigation between pages (use links instead)
 * - Toggling settings (use toggle/switch)
 * - Displaying status (use badge/tag)
 *
 * ## Accessibility
 * - Keyboard navigation (Enter/Space)
 * - Focus visible states
 * - Disabled state prevents interaction
 * - Loading state with spinner
 * - Use descriptive text (avoid "Click here")
 * - Keep icon labels clear when combining icon + text
 */
const meta: Meta<ZgButtonComponent> = {
  title: 'Atoms/Button',
  component: ZgButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgIconComponent],
      providers: [provideIcons({ lucidePlus, lucideSave, lucideDownload, lucideArrowRight })],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'danger', 'ghost', 'gradient'],
      description: 'Visual variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'ButtonVariant' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'ButtonSize' },
      },
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Shape variant (border radius)',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonShape' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native button type',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    fontFamily: {
      control: 'select',
      options: ['base', 'secondary'],
      description: 'Font family variant (base, secondary)',
      table: {
        defaultValue: { summary: 'base' },
        type: { summary: 'ButtonFontFamily' },
      },
    },
    text: {
      control: 'text',
      description: 'Button text content (simple alternative to ng-content)',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    clicked: {
      action: 'clicked',
      description: 'Emitted when the button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZgButtonComponent>;

/**
 * Default button with primary variant
 */
export const Default: Story = {
  args: {
    text: 'Click me',
    variant: 'primary',
    size: 'md',
    shape: 'default',
    disabled: false,
    loading: false,
    fullWidth: false,
    fontFamily: 'base',
  },
};

/**
 * All button variants side by side
 */
export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-button variant="primary">Primary</zg-button>
        <zg-button variant="secondary">Secondary</zg-button>
        <zg-button variant="accent">Accent</zg-button>
        <zg-button variant="danger">Danger</zg-button>
        <zg-button variant="ghost">Ghost</zg-button>
        <zg-button variant="gradient">Gradient</zg-button>
      </div>
    `,
  }),
};

/**
 * Different button sizes
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); align-items: center; flex-wrap: wrap; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-button size="sm">Small</zg-button>
        <zg-button size="md">Medium</zg-button>
        <zg-button size="lg">Large</zg-button>
      </div>
    `,
  }),
};

/**
 * Different button shapes (border radius)
 */
export const Shapes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); align-items: center; flex-wrap: wrap; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-button shape="default">Default</zg-button>
        <zg-button shape="pill">Pill</zg-button>
        <zg-button shape="square">Square</zg-button>
      </div>
    `,
  }),
};

/**
 * Font family variants (base, secondary)
 */
export const FontFamilies: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--zg-spacing-4); align-items: flex-start; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">Base font</h4>
          <zg-button fontFamily="base">Action</zg-button>
        </div>
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">Secondary font</h4>
          <zg-button fontFamily="secondary" size="lg">Action</zg-button>
        </div>
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">Comparison</h4>
          <div style="display: flex; gap: var(--zg-spacing-3); align-items: center; flex-wrap: wrap;">
            <zg-button variant="primary" fontFamily="base">Base</zg-button>
            <zg-button variant="primary" fontFamily="secondary">Secondary</zg-button>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Stateful behavior: disabled, loading, and full width
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4); max-width: 26rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap;">
          <zg-button variant="primary" data-testid="enabled-button">Enabled</zg-button>
          <zg-button variant="primary" [disabled]="true" data-testid="disabled-button">Disabled</zg-button>
          <zg-button variant="accent" [loading]="true" data-testid="loading-button">Loading</zg-button>
        </div>
        <div>
          <div style="margin-bottom: var(--zg-spacing-2); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">Full width</div>
          <zg-button variant="secondary" [fullWidth]="true">Continue</zg-button>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledHost = canvas.getByTestId('disabled-button');
    const loadingHost = canvas.getByTestId('loading-button');
    const disabledNativeButton = disabledHost.querySelector('button');
    const loadingSpinner = loadingHost.querySelector('.zg-button__spinner');

    await expect(disabledNativeButton).toBeTruthy();
    await expect(disabledNativeButton).toBeDisabled();
    await expect(loadingSpinner).toBeTruthy();
  },
};

/**
 * Composition with projected icons
 */
export const Composition: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-button variant="primary">
          <ng-icon icon-left name="lucidePlus" size="1rem" aria-hidden="true"></ng-icon>
          Add item
        </zg-button>
        <zg-button variant="accent">
          Save
          <ng-icon icon-right name="lucideSave" size="1rem" aria-hidden="true"></ng-icon>
        </zg-button>
        <zg-button variant="secondary">
          <ng-icon icon-left name="lucideDownload" size="1rem" aria-hidden="true"></ng-icon>
          Download
          <ng-icon icon-right name="lucideArrowRight" size="1rem" aria-hidden="true"></ng-icon>
        </zg-button>
      </div>
    `,
  }),
};

/**
 * Accessibility checks (keyboard focus and disabled behavior)
 */
export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--zg-spacing-4); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
            Keyboard navigation
          </h4>
          <div style="display: flex; gap: var(--zg-spacing-2); flex-wrap: wrap;">
            <zg-button variant="primary" data-testid="a11y-btn-1">First action</zg-button>
            <zg-button variant="secondary" data-testid="a11y-btn-2">Second action</zg-button>
          </div>
        </div>
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
            Disabled behavior
          </h4>
          <zg-button variant="danger" [disabled]="true" data-testid="a11y-disabled-btn">
            Disabled action
          </zg-button>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstHost = canvas.getByTestId('a11y-btn-1');
    const secondHost = canvas.getByTestId('a11y-btn-2');
    const disabledHost = canvas.getByTestId('a11y-disabled-btn');
    const firstNativeButton = firstHost.querySelector('button');
    const secondNativeButton = secondHost.querySelector('button');
    const disabledNativeButton = disabledHost.querySelector('button');

    await expect(firstNativeButton).toBeTruthy();
    await expect(secondNativeButton).toBeTruthy();
    await expect(disabledNativeButton).toBeTruthy();

    await expect(firstNativeButton).not.toBeDisabled();
    await expect(firstNativeButton).toHaveAttribute('type', 'button');
    await expect(secondNativeButton).not.toBeDisabled();
    await expect(secondNativeButton).toHaveAttribute('type', 'button');
    await expect(disabledNativeButton).toBeDisabled();
  },
};
