import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgSectionTitleComponent } from './section-title.component';

/**
 * Section title atom for content headers and repeated section blocks.
 *
 * ## Usage Guide
 * **When to use:**
 * - Section headings in carousels, grids, and content blocks.
 * - iGaming lobby headers with optional accent line.
 * - Typography variants controlled by tone/size/fontFamily.
 *
 * **When NOT to use:**
 * - Clickable actions (use button/link components).
 * - Complex heading + controls layouts (use a molecule header wrapper).
 *
 * ## Accessibility
 * - Uses `role="heading"` with configurable `ariaLevel`.
 * - Keeps semantic text visible even when accent is enabled.
 */
const meta: Meta<ZgSectionTitleComponent> = {
  title: 'Atoms/Section Title',
  component: ZgSectionTitleComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Title text',
      table: { defaultValue: { summary: '' } },
    },
    tone: {
      control: 'select',
      options: ['default', 'primary', 'success'],
      description: 'Text tone',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'SectionTitleTone' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Title size',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'SectionTitleSize' },
      },
    },
    showAccent: {
      control: 'boolean',
      description: 'Shows accent bars under the title',
      table: { defaultValue: { summary: 'false' } },
    },
    fontFamily: {
      control: 'select',
      options: ['base', 'secondary'],
      description: 'Font family variant (base, secondary)',
      table: {
        defaultValue: { summary: 'secondary' },
        type: { summary: 'SectionTitleFontFamily' },
      },
    },
    ariaLevel: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'ARIA heading level',
      table: { defaultValue: { summary: '2' } },
    },
  },
};

export default meta;
type Story = StoryObj<ZgSectionTitleComponent>;

export const Default: Story = {
  args: {
    label: 'Most Bet Games',
    tone: 'primary',
    size: 'md',
    showAccent: false,
    fontFamily: 'secondary',
    ariaLevel: 2,
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--zg-spacing-6); align-items: end; flex-wrap: wrap;">
        <zg-section-title label="Default tone" tone="default"></zg-section-title>
        <zg-section-title label="Primary tone" tone="primary"></zg-section-title>
        <zg-section-title label="Success tone" tone="success"></zg-section-title>
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
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <zg-section-title label="Small heading" size="sm"></zg-section-title>
        <zg-section-title label="Medium heading" size="md"></zg-section-title>
        <zg-section-title label="Large heading" size="lg"></zg-section-title>
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
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <div data-testid="without-accent">
          <zg-section-title label="Without accent" [showAccent]="false"></zg-section-title>
        </div>
        <div data-testid="with-accent">
          <zg-section-title label="With accent" [showAccent]="true"></zg-section-title>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const withoutAccent = canvas.getByTestId('without-accent');
    const withAccent = canvas.getByTestId('with-accent');

    await expect(withoutAccent.querySelector('.zg-section-title__accent')).toBeNull();
    await expect(withAccent.querySelector('.zg-section-title__accent')).toBeTruthy();
  },
};

export const FontFamilies: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <zg-section-title label="Base family" fontFamily="base"></zg-section-title>
        <zg-section-title label="Secondary family" fontFamily="secondary"></zg-section-title>
      </div>
    `,
  }),
};

export const EmptyAndEdgeCases: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4); max-width: 24rem;">
        <zg-section-title label=""></zg-section-title>
        <zg-section-title
          label="This is an extremely long section title to validate wrapping and readability behavior"
          [showAccent]="true"
        ></zg-section-title>
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
      showAccent: false,
      toggleAccent: function () {
        this['showAccent'] = !this['showAccent'];
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3);">
        <button
          type="button"
          (click)="toggleAccent()"
          style="
            width: fit-content;
            padding: var(--zg-spacing-2) var(--zg-spacing-3);
            border: 1px solid var(--zg-color-border);
            border-radius: var(--zg-radius-sm);
            background: var(--zg-color-surface);
            color: var(--zg-color-text-primary);
          "
        >
          Toggle accent
        </button>

        <zg-section-title
          data-testid="interactive-title"
          label="Interactive title"
          tone="primary"
          [showAccent]="showAccent"
          fontFamily="secondary"
        ></zg-section-title>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle accent/i });
    const titleHost = canvas.getByTestId('interactive-title');

    await expect(titleHost.querySelector('.zg-section-title__accent')).toBeNull();
    await userEvent.click(toggle);
    await expect(titleHost.querySelector('.zg-section-title__accent')).toBeTruthy();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <zg-section-title
        data-testid="section-title-a11y"
        label="Top 10 casino"
        [ariaLevel]="3"
        [showAccent]="true"
      ></zg-section-title>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { name: /top 10 casino/i });

    await expect(heading).toHaveAttribute('aria-level', '3');
  },
};
