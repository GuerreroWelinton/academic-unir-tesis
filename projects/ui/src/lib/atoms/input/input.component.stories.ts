import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMail, lucideSearch, lucideX } from '@ng-icons/lucide';
import { ZgInputComponent } from './input.component';

/**
 * Input component for user text entry.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Text, email, password, search, and number input
 * - Form fields, filters, and search bars
 *
 * **When NOT to use:**
 * - Multi-line text (use textarea)
 * - Selection controls (use select, radio, checkbox)
 *
 * ## Accessibility
 * - Label is associated with the input field
 * - Error/helper content is linked via `aria-describedby`
 * - Supports disabled and readonly states
 * - Clear button has an accessible label
 */
const meta: Meta<ZgInputComponent> = {
  title: 'Atoms/Input',
  component: ZgInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: { type: 'dynamic' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NgIconComponent],
      providers: [provideIcons({ lucideSearch, lucideMail, lucideX })],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
      description: 'Input type',
      table: { defaultValue: { summary: 'text' } },
    },
    value: {
      control: 'text',
      description: 'Input value',
      table: { defaultValue: { summary: '' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: { defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width behavior',
      table: { defaultValue: { summary: 'false' } },
    },
    autocomplete: {
      control: 'text',
      description: 'Autocomplete attribute',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum character length',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    changed: {
      action: 'changed',
      description: 'Emitted when the value changes',
      table: { category: 'Events' },
    },
    focused: {
      action: 'focused',
      description: 'Emitted when input receives focus',
      table: { category: 'Events' },
    },
    blurred: {
      action: 'blurred',
      description: 'Emitted when input loses focus',
      table: { category: 'Events' },
    },
    cleared: {
      action: 'cleared',
      description: 'Emitted when clear button is clicked',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<ZgInputComponent>;

/**
 * Default input with controls
 */
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    value: '',
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    error: '',
    fullWidth: false,
    autocomplete: '',
    maxlength: undefined,
    helperText: '',
  },
};

/**
 * Input type variants
 */
export const Types: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-input label="Text" type="text" placeholder="Text field"></zg-input>
        <zg-input label="Email" type="email" placeholder="you@example.com"></zg-input>
        <zg-input label="Password" type="password" placeholder="Password"></zg-input>
      </div>
    `,
  }),
};

/**
 * Input sizes
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-input label="Small" size="sm" placeholder="Small input"></zg-input>
        <zg-input label="Medium" size="md" placeholder="Medium input"></zg-input>
        <zg-input label="Large" size="lg" placeholder="Large input"></zg-input>
      </div>
    `,
  }),
};

/**
 * State examples
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-input label="Enabled" placeholder="Editable" data-testid="input-enabled"></zg-input>
        <zg-input label="Disabled" placeholder="Disabled" [disabled]="true" data-testid="input-disabled"></zg-input>
        <zg-input label="Readonly" value="Readonly value" [readonly]="true" data-testid="input-readonly"></zg-input>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledInput = canvas.getByTestId('input-disabled').querySelector('input');
    const readonlyInput = canvas.getByTestId('input-readonly').querySelector('input');

    await expect(disabledInput).toBeDisabled();
    await expect(readonlyInput).toHaveAttribute('readonly');
  },
};

/**
 * Helper and error messages
 */
export const HelperAndError: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-input
          label="Email"
          placeholder="you@example.com"
          helperText="Use your account email"
          data-testid="input-helper"
        ></zg-input>
        <zg-input
          label="Email"
          value="invalid-email"
          error="Invalid email format"
          data-testid="input-error"
        ></zg-input>
      </div>
    `,
  }),
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
      <div style="display: grid; gap: var(--zg-spacing-3); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-input label="Search" placeholder="Search games">
          <ng-icon icon-left name="lucideSearch" size="1rem" aria-hidden="true"></ng-icon>
        </zg-input>
        <zg-input label="Email" placeholder="you@example.com">
          <ng-icon icon-left name="lucideMail" size="1rem" aria-hidden="true"></ng-icon>
        </zg-input>
      </div>
    `,
  }),
};

/**
 * Clear button behavior
 */
export const InteractiveClear: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      currentValue: 'Clear me',
      onChanged: function (value: string) {
        this['currentValue'] = value;
      },
      onCleared: function () {
        this['currentValue'] = '';
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-2); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div>Type and clear value</div>
        <zg-input
          data-testid="input-clearable"
          label="Clearable"
          [value]="currentValue"
          placeholder="Type value"
          (changed)="onChanged($event)"
          (cleared)="onCleared()"
        >
          <ng-icon clear-icon name="lucideX" size="0.875rem" aria-hidden="true"></ng-icon>
        </zg-input>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearableHost = canvas.getByTestId('input-clearable');
    const clearButton = clearableHost.querySelector('.zg-input__clear');
    const input = clearableHost.querySelector('input');

    await expect(input).toHaveValue('Clear me');
    await expect(clearButton).toBeTruthy();
    await userEvent.click(clearButton as Element);
    await expect(input).toHaveValue('');
  },
};

/**
 * Accessibility checks
 */
export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4); max-width: 24rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-input
          label="Email"
          placeholder="you@example.com"
          helperText="Use your account email"
          data-testid="input-a11y-helper"
        ></zg-input>
        <zg-input
          label="Email"
          value="invalid"
          error="Invalid email format"
          data-testid="input-a11y-error"
        ></zg-input>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperHost = canvas.getByTestId('input-a11y-helper');
    const errorHost = canvas.getByTestId('input-a11y-error');
    const helperInput = helperHost.querySelector('input');
    const helperText = helperHost.querySelector('.zg-input__helper');
    const errorInput = errorHost.querySelector('input');
    const errorText = errorHost.querySelector('.zg-input__error');
    const helperLabel = helperHost.querySelector('label');

    await expect(helperLabel).toBeTruthy();
    await expect(helperInput).toHaveAttribute('id');
    await expect(helperLabel).toHaveAttribute('for', helperInput?.getAttribute('id') || '');
    await expect(helperInput).toHaveAttribute(
      'aria-describedby',
      helperText?.getAttribute('id') || '',
    );
    await expect(errorInput).toHaveAttribute('aria-invalid', 'true');
    await expect(errorInput).toHaveAttribute(
      'aria-describedby',
      errorText?.getAttribute('id') || '',
    );
  },
};
