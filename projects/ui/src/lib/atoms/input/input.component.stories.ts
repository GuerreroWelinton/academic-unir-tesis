import type { Meta, StoryObj } from '@storybook/angular';
import { ZgInputComponent } from './input.component';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

/**
 * Input component for user text entry.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Text, email, password, search, number, etc.
 * - Search bars, forms, filters
 *
 * **When NOT to use:**
 * - Multi-line input (use textarea)
 * - Selection (use select, radio, checkbox)
 *
 * ## Accessibility
 * - ✅ Label is always associated with input
 * - ✅ Keyboard navigation
 * - ✅ Error and helper text with aria-describedby
 * - ✅ Disabled and readonly states
 * - 💡 Use aria-label for icon-only or hidden label
 */
const meta: Meta<ZgInputComponent> = {
  title: 'Atoms/Input',
  component: ZgInputComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      // description: {
      //   component:
      //     'Accessible input field with support for icons, error, helper text, and full design token theming. Use ng-content for icon projection.',
      // },
    },
  },
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
      description: 'Label for accessibility',
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
      description: 'Full width',
      table: { defaultValue: { summary: 'false' } },
    },
    autocomplete: {
      control: 'text',
      description: 'Autocomplete attribute',
    },
    maxlength: {
      control: 'number',
      description: 'Max length',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    changed: {
      action: 'changed',
      description: 'Emitted when value changes',
      table: { category: 'Events' },
    },
    focused: {
      action: 'focused',
      description: 'Emitted on focus',
      table: { category: 'Events' },
    },
    blurred: {
      action: 'blurred',
      description: 'Emitted on blur',
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

export const WithLeftIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar juegos',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <zg-input
        [label]="label"
        [placeholder]="placeholder"
        [value]="value"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [error]="error"
        [fullWidth]="fullWidth"
        [autocomplete]="autocomplete"
        [maxlength]="maxlength"
        [helperText]="helperText"
        (changed)="changed($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)"
        (cleared)="cleared()"
      >
        <svg icon-left width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </zg-input>
    `,
  }),
};

export const WithRightIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar juegos',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <zg-input
        [label]="label"
        [placeholder]="placeholder"
        [value]="value"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [error]="error"
        [fullWidth]="fullWidth"
        [autocomplete]="autocomplete"
        [maxlength]="maxlength"
        [helperText]="helperText"
        (changed)="changed($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)"
        (cleared)="cleared()"
      >
        <svg icon-right width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </zg-input>
    `,
  }),
};

export const WithClearButton: Story = {
  args: {
    label: 'Clearable',
    placeholder: 'Type to show clear',
    value: 'Clear me',
  },
  render: (args) => ({
    props: args,
    template: `
      <zg-input
        [label]="label"
        [placeholder]="placeholder"
        [value]="value"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [error]="error"
        [fullWidth]="fullWidth"
        [autocomplete]="autocomplete"
        [maxlength]="maxlength"
        [helperText]="helperText"
        (changed)="changed($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)"
        (cleared)="cleared()"
      >
        <svg clear-icon width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </zg-input>
    `,
  }),
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
    value: '',
  },
};

export const ErrorWithHelper: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
    helperText: 'Must be a valid email',
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'not-an-email');
    const errorMsg = canvas.getByText('Invalid email address');
    await expect(errorMsg).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot type here',
    disabled: true,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await expect(input).toBeDisabled();
  },
};

export const Readonly: Story = {
  args: {
    label: 'Readonly',
    placeholder: 'Cannot edit',
    readonly: true,
    value: 'Read only value',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('readonly');
    await userEvent.type(input, '123');
    await expect(input).toHaveValue('Read only value');
  },
};

export const MaxLength: Story = {
  args: {
    label: 'Max Length',
    placeholder: 'Max 10 chars',
    maxlength: 10,
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, '123456789012345');
    await expect(input).toHaveValue('1234567890');
  },
};

export const Autocomplete: Story = {
  args: {
    label: 'Autocomplete',
    placeholder: 'Type for suggestions',
    autocomplete: 'username',
    value: '',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width',
    placeholder: 'Stretches to parent',
    fullWidth: true,
    value: '',
  },
};

export const MultipleIcons: Story = {
  render: (args) => ({
    props: {
      ...args,
      value: '',
    },
    template: `
      <zg-input
        [label]="label"
        [placeholder]="placeholder"
        [value]="value"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [fullWidth]="fullWidth"
        [autocomplete]="autocomplete"
        [maxlength]="maxlength"
        [helperText]="helperText"
        (changed)="changed($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)"
        (cleared)="cleared()"
      >
        <svg icon-left width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <svg icon-right width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </zg-input>
    `,
  }),
};

export const AllEvents: Story = {
  args: {
    label: 'Events Demo',
    placeholder: 'Try focus, blur, clear',
    value: '',
  },
  render: (args) => ({
    props: {
      ...args,
      changed: (val: string) => {
        console.log('changed', val);
      },
      focused: (ev: FocusEvent) => {
        console.log('focused', ev);
      },
      blurred: (ev: FocusEvent) => {
        console.log('blurred', ev);
      },
      cleared: () => {
        console.log('cleared');
      },
    },
    template: `
      <zg-input
        [label]="label"
        [placeholder]="placeholder"
        [value]="value"
        [type]="type"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [error]="error"
        [fullWidth]="fullWidth"
        [autocomplete]="autocomplete"
        [maxlength]="maxlength"
        [helperText]="helperText"
        (changed)="changed($event)"
        (focused)="focused($event)"
        (blurred)="blurred($event)"
        (cleared)="cleared()"
      >
      </zg-input>
    `,
  }),
};
