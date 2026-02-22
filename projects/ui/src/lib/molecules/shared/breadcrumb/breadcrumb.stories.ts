import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ZgBreadcrumbComponent } from './breadcrumb.component';

/**
 * Breadcrumb molecule for hierarchical navigation context.
 *
 * ## Usage Guide
 * **When to use:**
 * - Displaying location hierarchy inside casino pages or catalog views.
 * - Quick back-navigation to parent routes.
 * - Reusable context trail in shared layouts.
 *
 * **When NOT to use:**
 * - Primary navigation menus.
 * - Long, deeply nested structures with many levels.
 *
 * ## Accessibility
 * - Uses semantic `nav` container with configurable `ariaLabel`.
 * - Marks current item with `aria-current="page"`.
 * - Keeps link semantics for clickable ancestors.
 */
const meta: Meta<ZgBreadcrumbComponent> = {
  title: 'Molecules/Shared/Breadcrumb',
  component: ZgBreadcrumbComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
    ariaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Breadcrumb' } },
    },
    separator: {
      control: 'text',
      table: { defaultValue: { summary: '>' } },
    },
    itemClicked: {
      action: 'itemClicked',
      table: { category: 'Events' },
    },
  },
  args: {
    ariaLabel: 'Breadcrumb',
    separator: '>',
    items: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'casino', label: 'Casino', href: '#casino' },
      { id: 'most-bet', label: 'Most bet' },
    ],
  },
};

export default meta;
type Story = StoryObj<ZgBreadcrumbComponent>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-breadcrumb
          ariaLabel="Casino breadcrumb"
          [items]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
        ></zg-breadcrumb>
        <zg-breadcrumb
          ariaLabel="Promotions breadcrumb"
          [items]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'promotions', label: 'Promotions', href: '#promotions' },
            { id: 'christmas', label: 'Christmas Campaign' }
          ]"
        ></zg-breadcrumb>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-breadcrumb
          [items]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino', disabled: true },
            { id: 'most-bet', label: 'Most bet' }
          ]"
        ></zg-breadcrumb>
        <zg-breadcrumb
          [items]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet', current: true }
          ]"
        ></zg-breadcrumb>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="padding:var(--zg-spacing-3);background:var(--zg-color-surface-alt);border-radius:var(--zg-radius-md);">
        <zg-breadcrumb
          ariaLabel="Catalog breadcrumb"
          [items]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'all-games', label: 'All games', href: '#all-games' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
        ></zg-breadcrumb>
      </div>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      clicks: 0,
      onItemClick: function () {
        this['clicks'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-2);">
        <zg-breadcrumb
          [items]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
          (itemClicked)="onItemClick()"
        ></zg-breadcrumb>
        <div>Item clicks: {{ clicks }}</div>
      </div>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  args: {
    ariaLabel: 'Page breadcrumb',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByLabelText(/page breadcrumb/i);
    const nav = host.querySelector('nav');
    const current = canvas.getByText(/most bet/i);

    await expect(nav).toBeTruthy();
    await expect(current).toHaveAttribute('aria-current', 'page');
  },
};
