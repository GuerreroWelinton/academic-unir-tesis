import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgCasinoCatalogHeaderComponent } from './casino-catalog-header.component';

/**
 * Casino catalog header molecule that combines breadcrumb, heading, and optional games count.
 *
 * ## Usage Guide
 * **When to use:**
 * - Top section of casino catalog pages (e.g. Most bet, All games).
 * - Screens that need location context and item count in a single reusable header.
 * - Layouts that may project extra action controls on the header.
 *
 * **When NOT to use:**
 * - Generic content pages without catalog context.
 * - Cases where only a breadcrumb is needed.
 *
 * ## Accessibility
 * - Uses semantic heading (`h1`) for page title.
 * - Breadcrumb keeps `aria-current="page"` on the current node.
 * - Configurable region labels via `ariaLabel` and `breadcrumbAriaLabel`.
 */
const meta: Meta<ZgCasinoCatalogHeaderComponent> = {
  title: 'Molecules/Casino/Casino Catalog Header',
  component: ZgCasinoCatalogHeaderComponent,
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
      imports: [ZgButtonComponent],
    }),
  ],
  argTypes: {
    breadcrumbs: { control: 'object' },
    breadcrumbAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Catalog breadcrumb' } },
    },
    title: {
      control: 'text',
      table: { defaultValue: { summary: 'Most bet games' } },
    },
    gamesCount: {
      control: { type: 'number', min: 0, step: 1 },
      table: { defaultValue: { summary: 'null' } },
    },
    gamesCountSuffix: {
      control: 'text',
      table: { defaultValue: { summary: 'games' } },
    },
    ariaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Casino catalog header' } },
    },
    breadcrumbItemClicked: {
      action: 'breadcrumbItemClicked',
      table: { category: 'Events' },
    },
  },
  args: {
    breadcrumbs: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'casino', label: 'Casino', href: '#casino' },
      { id: 'most-bet', label: 'Most bet' },
    ],
    breadcrumbAriaLabel: 'Catalog breadcrumb',
    title: 'Most bet games',
    gamesCount: 3005,
    gamesCountSuffix: 'games',
    ariaLabel: 'Casino catalog header',
  },
};

export default meta;
type Story = StoryObj<ZgCasinoCatalogHeaderComponent>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-casino-catalog-header
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
          title="Most bet games"
          [gamesCount]="3005"
        ></zg-casino-catalog-header>

        <zg-casino-catalog-header
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'all-games', label: 'All games' }
          ]"
          title="All games"
          [gamesCount]="15240"
        ></zg-casino-catalog-header>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-casino-catalog-header
          title="Most bet games"
          [gamesCount]="null"
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
        ></zg-casino-catalog-header>

        <zg-casino-catalog-header
          title="Most bet games"
          [gamesCount]="0"
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
        ></zg-casino-catalog-header>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-casino-catalog-header
        [breadcrumbs]="[
          { id: 'home', label: 'Home', href: '#home' },
          { id: 'casino', label: 'Casino', href: '#casino' },
          { id: 'most-bet', label: 'Most bet' }
        ]"
        title="Most bet games"
        [gamesCount]="3005"
      >
        <div zg-casino-catalog-header-actions style="display:flex;gap:var(--zg-spacing-2);">
          <zg-button size="sm" variant="secondary">Filter</zg-button>
          <zg-button size="sm" variant="primary">Sort</zg-button>
        </div>
      </zg-casino-catalog-header>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  args: {
    ariaLabel: 'Most bet catalog header',
    breadcrumbAriaLabel: 'Most bet breadcrumb',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByLabelText(/most bet catalog header/i);
    const heading = canvas.getByRole('heading', { level: 1, name: /most bet games/i });

    await expect(host).toBeTruthy();
    await expect(heading).toBeTruthy();
  },
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      clicks: 0,
      onBreadcrumbClick: function () {
        this['clicks'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-2);">
        <zg-casino-catalog-header
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
          title="Most bet games"
          [gamesCount]="3005"
          (breadcrumbItemClicked)="onBreadcrumbClick()"
        ></zg-casino-catalog-header>

        <div>Breadcrumb clicks: {{ clicks }}</div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeLink = canvas.getByRole('link', { name: /home/i });

    await userEvent.click(homeLink);
    await expect(canvas.getByText(/breadcrumb clicks: 1/i)).toBeTruthy();
  },
};
