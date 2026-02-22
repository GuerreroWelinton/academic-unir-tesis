import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideTag, lucideX } from '@ng-icons/lucide';
import { ZgChipComponent } from './chip.component';

/**
 * Chip component for interactive filters, tags, and selections.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Filtering content (category filters, game type filters)
 * - Displaying selected options in multi-select scenarios
 * - Representing tags that can be added/removed
 * - Navigation pills/tabs for content sections
 *
 * **When NOT to use:**
 * - For static labels or status indicators (use Badge)
 * - For primary actions (use Button)
 * - For complex multi-step forms
 *
 * ## Accessibility
 * - Uses native `<button>` for keyboard support
 * - `aria-pressed` indicates selected state
 * - `type="button"` avoids form submission
 * - Disabled state prevents all interaction
 */
const meta: Meta<ZgChipComponent> = {
  title: 'Atoms/Chip',
  component: ZgChipComponent,
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
      providers: [provideIcons({ lucideTag, lucideX, lucideCheck })],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual variant of the chip',
      table: {
        defaultValue: { summary: 'filled' },
        type: { summary: 'ChipVariant' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chip',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'ChipSize' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    text: {
      control: 'text',
      description: 'Chip text content (alternative to ng-content)',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    clicked: {
      action: 'clicked',
      description: 'Emitted when the chip is clicked',
      table: {
        category: 'Events',
      },
    },
    selectedChange: {
      action: 'selectedChange',
      description: 'Emitted when selected state changes',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZgChipComponent>;

/**
 * Default chip with controls enabled
 */
export const Default: Story = {
  args: {
    text: 'Sports',
    variant: 'filled',
    size: 'md',
    selected: false,
    disabled: false,
  },
};

/**
 * Visual variants
 */
export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-chip variant="filled">Filled</zg-chip>
        <zg-chip variant="outlined">Outlined</zg-chip>
        <zg-chip variant="ghost">Ghost</zg-chip>
      </div>
    `,
  }),
};

/**
 * Size variants
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-chip size="sm">Small</zg-chip>
        <zg-chip size="md">Medium</zg-chip>
        <zg-chip size="lg">Large</zg-chip>
      </div>
    `,
  }),
};

/**
 * Core states
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-chip data-testid="chip-normal">Normal</zg-chip>
        <zg-chip data-testid="chip-selected" [selected]="true">Selected</zg-chip>
        <zg-chip data-testid="chip-disabled" [disabled]="true">Disabled</zg-chip>
        <zg-chip [selected]="true" [disabled]="true">Selected + Disabled</zg-chip>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectedButton = canvas.getByTestId('chip-selected').querySelector('button');
    const disabledButton = canvas.getByTestId('chip-disabled').querySelector('button');

    await expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
    await expect(disabledButton).toBeDisabled();
  },
};

/**
 * Selected state by variant
 */
export const SelectedVariants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--zg-spacing-3); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center;">
          <span style="min-width: 4.5rem;">Filled</span>
          <zg-chip variant="filled">Default</zg-chip>
          <zg-chip variant="filled" [selected]="true">Selected</zg-chip>
        </div>
        <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center;">
          <span style="min-width: 4.5rem;">Outlined</span>
          <zg-chip variant="outlined">Default</zg-chip>
          <zg-chip variant="outlined" [selected]="true">Selected</zg-chip>
        </div>
        <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center;">
          <span style="min-width: 4.5rem;">Ghost</span>
          <zg-chip variant="ghost">Default</zg-chip>
          <zg-chip variant="ghost" [selected]="true">Selected</zg-chip>
        </div>
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
      <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap; align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <zg-chip variant="filled">
          <ng-icon icon-left name="lucideTag" size="1rem" aria-hidden="true"></ng-icon>
          Sports
        </zg-chip>
        <zg-chip variant="outlined">
          Category
          <ng-icon icon-right name="lucideX" size="1rem" aria-hidden="true"></ng-icon>
        </zg-chip>
        <zg-chip variant="ghost" [selected]="true">
          Trending
          <ng-icon icon-right name="lucideCheck" size="1rem" aria-hidden="true"></ng-icon>
        </zg-chip>
      </div>
    `,
  }),
};

/**
 * Interactive toggle behavior
 */
export const InteractiveToggle: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      selected1: false,
      onSelectedChange1: function (value: boolean) {
        this['selected1'] = value;
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div>Click chip to toggle selected state</div>
        <div>
          <zg-chip data-testid="chip-toggle" [selected]="selected1" (selectedChange)="onSelectedChange1($event)">
            Sports
          </zg-chip>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId('chip-toggle').querySelector('button');

    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip as Element);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(chip as Element);
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
  },
};

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      kbSelected: false,
      onKbSelectedChange: function (value: boolean) {
        this['kbSelected'] = value;
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
            Keyboard support
          </h4>
          <zg-chip data-testid="chip-kb" [selected]="kbSelected" (selectedChange)="onKbSelectedChange($event)">
            Keyboard chip
          </zg-chip>
        </div>
        <div>
          <h4 style="margin: 0 0 var(--zg-spacing-2) 0; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
            Disabled behavior
          </h4>
          <zg-chip data-testid="chip-disabled-a11y" [disabled]="true">Disabled chip</zg-chip>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const keyboardChip = canvas.getByTestId('chip-kb').querySelector('button');
    const disabledChip = canvas.getByTestId('chip-disabled-a11y').querySelector('button');

    await expect(keyboardChip).toHaveAttribute('type', 'button');
    await expect(keyboardChip).not.toBeDisabled();
    await expect(keyboardChip).toHaveAttribute('aria-pressed', 'false');

    await expect(disabledChip).toBeDisabled();
    await expect(disabledChip).toHaveAttribute('aria-disabled', 'true');
  },
};
