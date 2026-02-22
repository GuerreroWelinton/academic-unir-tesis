import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideDice5 } from '@ng-icons/lucide';
import { ZgLuckyPickerComponent } from './lucky-picker.component';

/**
 * Lucky picker molecule for casino-oriented "help me choose" call-to-action sections.
 *
 * ## Usage Guide
 * **When to use:**
 * - A compact CTA block that invites users to get a random game recommendation.
 * - Casino pages where this specific title/description/action pattern repeats.
 * - Cases where UI containers own business behavior and this molecule only emits UI intent.
 *
 * **When NOT to use:**
 * - Generic banners without a single CTA intent.
 * - Data orchestration or recommendation logic ownership inside the component.
 *
 * ## Accessibility
 * - Uses a native button through `zg-button`.
 * - Exposes `ariaLabel` for the section and `actionAriaLabel` for the CTA button.
 * - Supports disabled states via native `disabled` behavior.
 */
const meta: Meta<ZgLuckyPickerComponent> = {
  title: 'Molecules/Casino/Lucky Picker',
  component: ZgLuckyPickerComponent,
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
      providers: [provideIcons({ lucideDice5 })],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Headline text of the lucky picker block',
      table: { defaultValue: { summary: 'Not sure what to play?' } },
    },
    description: {
      control: 'text',
      description: 'Supporting description below the headline',
      table: { defaultValue: { summary: 'Let luck pick your next game.' } },
    },
    actionLabel: {
      control: 'text',
      description: 'Primary CTA button label',
      table: { defaultValue: { summary: 'Pick for me' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the CTA button and applies disabled visual state',
      table: { defaultValue: { summary: 'false' } },
    },
    tone: {
      control: 'select',
      options: ['default', 'highlight'],
      description: 'Visual tone of the block',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size scale for CTA button and spacing',
      table: { defaultValue: { summary: 'md' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the section container',
      table: { defaultValue: { summary: 'Lucky picker' } },
    },
    actionAriaLabel: {
      control: 'text',
      description: 'Accessible label for the action button',
      table: { defaultValue: { summary: 'Pick a random game' } },
    },
    actionClicked: {
      action: 'actionClicked',
      description: 'Emitted when users click the main CTA button',
      table: { category: 'Events' },
    },
  },
  args: {
    title: 'Not sure what to play?',
    description: 'Let luck pick your next game.',
    actionLabel: 'Pick for me',
    disabled: false,
    tone: 'default',
    size: 'md',
    ariaLabel: 'Lucky picker',
    actionAriaLabel: 'Pick a random game',
  },
};

export default meta;
type Story = StoryObj<ZgLuckyPickerComponent>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-4);max-width:42rem;">
        <zg-lucky-picker
          title="Need a quick pick?"
          description="Try a random casino game from the current lobby."
          actionLabel="Try luck"
          tone="default"
        ></zg-lucky-picker>

        <zg-lucky-picker
          title="Feeling lucky today?"
          description="One tap and we choose a game for your next round."
          actionLabel="Surprise me"
          tone="highlight"
        ></zg-lucky-picker>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-4);max-width:42rem;">
        <zg-lucky-picker title="Small" description="Compact variant." actionLabel="Pick" size="sm"></zg-lucky-picker>
        <zg-lucky-picker title="Medium" description="Default variant." actionLabel="Pick" size="md"></zg-lucky-picker>
        <zg-lucky-picker title="Large" description="Comfortable spacing variant." actionLabel="Pick" size="lg"></zg-lucky-picker>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-4);max-width:42rem;">
        <zg-lucky-picker data-testid="enabled-picker"></zg-lucky-picker>
        <zg-lucky-picker data-testid="disabled-picker" [disabled]="true"></zg-lucky-picker>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enabled = canvas.getByTestId('enabled-picker').querySelector('button');
    const disabled = canvas.getByTestId('disabled-picker').querySelector('button');

    await expect(enabled).not.toBeDisabled();
    await expect(disabled).toBeDisabled();
  },
};

export const Composition: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="max-width:42rem;">
        <zg-lucky-picker
          title="Not sure what to play?"
          description="Tap the button and let luck decide."
          actionLabel="Let's go"
          tone="highlight"
        >
          <ng-icon icon-left name="lucideDice5" size="1rem" aria-hidden="true"></ng-icon>
        </zg-lucky-picker>
      </div>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      disabled: false,
      toggleDisabled: function () {
        this['disabled'] = !this['disabled'];
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);max-width:42rem;">
        <button
          type="button"
          (click)="toggleDisabled()"
          style="
            width: fit-content;
            padding: var(--zg-spacing-2) var(--zg-spacing-3);
            border: 1px solid var(--zg-color-border);
            border-radius: var(--zg-radius-sm);
            background: var(--zg-color-surface);
            color: var(--zg-color-text-primary);
          "
        >
          Toggle disabled
        </button>

        <zg-lucky-picker data-testid="interactive-picker" [disabled]="disabled"></zg-lucky-picker>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle disabled/i });
    const actionButton = canvas.getByTestId('interactive-picker').querySelector('button');

    await expect(actionButton).not.toBeDisabled();
    await userEvent.click(toggle);
    await expect(actionButton).toBeDisabled();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <zg-lucky-picker
        title="Need a recommendation?"
        description="Get a random game suggestion."
        actionLabel="Pick a recommended game"
        ariaLabel="Game recommendation picker"
        actionAriaLabel="Pick a recommended game"
      ></zg-lucky-picker>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvas.getByLabelText(/game recommendation picker/i);
    const button = canvas.getByRole('button', { name: /pick a recommended game/i });

    await expect(section).toBeTruthy();
    await expect(button).toHaveAttribute('type', 'button');
  },
};
