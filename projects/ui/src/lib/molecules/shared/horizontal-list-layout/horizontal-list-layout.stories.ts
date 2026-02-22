import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideTag } from '@ng-icons/lucide';
import { ZgBadgeComponent } from '../../../atoms/badge/badge.component';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgChipComponent } from '../../../atoms/chip/chip.component';
import { ZgCasinoGameCardComponent } from '../../casino/casino-game-card/casino-game-card.component';
import { ZgHorizontalListLayoutComponent } from './horizontal-list-layout.component';

interface DemoChipItem {
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const sampleItems: DemoChipItem[] = [
  { id: 'all', label: 'All games', selected: true },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live casino' },
  { id: 'crash', label: 'Crash' },
];

/**
 * Horizontal List Layout for projecting any horizontal list content rendered by the consumer.
 *
 * ## Usage Guide
 * **When to use:**
 * - You need a reusable wrapper for horizontal item lists while keeping rendering logic in the consumer.
 * - You need layout consistency without coupling this molecule to a specific atom.
 * - You want full control over projected item content and behavior.
 *
 * **When NOT to use:**
 * - If you want built-in selection logic and controlled state events; use `zg-category-filter-tabs`.
 * - If there is no list/group semantics required for projected controls.
 *
 * ## Accessibility
 * - Renders a semantic `nav` with configurable `aria-label`.
 * - Consumer owns projected item semantics and interaction behavior.
 */
const meta: Meta<ZgHorizontalListLayoutComponent> = {
  title: 'Molecules/Shared/Horizontal List Layout',
  component: ZgHorizontalListLayoutComponent,
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
      imports: [
        ZgBadgeComponent,
        ZgButtonComponent,
        ZgChipComponent,
        ZgCasinoGameCardComponent,
        NgIconComponent,
      ],
      providers: [provideIcons({ lucideTag })],
    }),
  ],
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible label used by the wrapping nav element',
      table: { defaultValue: { summary: 'Horizontal list' } },
    },
    layoutMode: {
      control: 'select',
      options: ['scroll', 'wrap'],
      description: 'Layout behavior: single-row scroll or multi-row wrap',
      table: { defaultValue: { summary: 'scroll' } },
    },
    scrollStep: {
      control: { type: 'number', min: 80, step: 20 },
      description: 'Horizontal pixels scrolled by public next/prev methods',
      table: { defaultValue: { summary: '320' } },
    },
    scrollBehavior: {
      control: 'select',
      options: ['auto', 'smooth'],
      description: 'Scroll behavior used by public next/prev methods',
      table: { defaultValue: { summary: 'smooth' } },
    },
    scrollStateChange: {
      action: 'scrollStateChange',
      description: 'Emitted when horizontal scroll availability changes',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<ZgHorizontalListLayoutComponent>;

export const Default: Story = {
  args: {
    ariaLabel: 'Casino categories',
    layoutMode: 'scroll',
    scrollStep: 320,
    scrollBehavior: 'smooth',
  },
  render: (args) => ({
    props: {
      ...args,
      items: sampleItems,
    },
    template: `
      <zg-horizontal-list-layout
        [ariaLabel]="ariaLabel"
        [layoutMode]="layoutMode"
        [scrollStep]="scrollStep"
        [scrollBehavior]="scrollBehavior"
      >
        @for (item of items; track item.id) {
          <li zg-horizontal-list-layout-items>
            <zg-chip
              [selected]="item.selected === true"
              [disabled]="item.disabled === true"
              variant="ghost"
              size="md"
            >
              {{ item.label }}
            </zg-chip>
          </li>
        }
      </zg-horizontal-list-layout>
    `,
  }),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: [
        { id: 'all', label: 'All', selected: true, variant: 'ghost' },
        { id: 'slots', label: 'Slots', variant: 'outlined' },
        { id: 'live', label: 'Live', variant: 'filled' },
      ] as DemoChipItem[],
    },
    template: `
      <zg-horizontal-list-layout ariaLabel="Variant demo">
        @for (item of items; track item.id) {
          <li zg-horizontal-list-layout-items>
            <zg-chip [selected]="item.selected === true" [variant]="item.variant || 'ghost'">
              {{ item.label }}
            </zg-chip>
          </li>
        }
      </zg-horizontal-list-layout>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: [
        { id: 'all', label: 'All', selected: true },
        { id: 'slots', label: 'Slots' },
        { id: 'live', label: 'Live', disabled: true },
      ] as DemoChipItem[],
    },
    template: `
      <zg-horizontal-list-layout ariaLabel="State demo">
        @for (item of items; track item.id) {
          <li zg-horizontal-list-layout-items>
            <zg-chip [selected]="item.selected === true" [disabled]="item.disabled === true">
              {{ item.label }}
            </zg-chip>
          </li>
        }
      </zg-horizontal-list-layout>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const liveButton = canvas.getByRole('button', { name: /live/i });
    const allButton = canvas.getByRole('button', { name: /all/i });

    await expect(liveButton).toBeDisabled();
    await expect(allButton).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3);">
        <zg-horizontal-list-layout ariaLabel="Small chip row">
          <li zg-horizontal-list-layout-items><zg-chip size="sm">All</zg-chip></li>
          <li zg-horizontal-list-layout-items><zg-chip size="sm">Slots</zg-chip></li>
          <li zg-horizontal-list-layout-items><zg-chip size="sm">Live</zg-chip></li>
        </zg-horizontal-list-layout>

        <zg-horizontal-list-layout ariaLabel="Medium chip row">
          <li zg-horizontal-list-layout-items><zg-chip size="md">All</zg-chip></li>
          <li zg-horizontal-list-layout-items><zg-chip size="md">Slots</zg-chip></li>
          <li zg-horizontal-list-layout-items><zg-chip size="md">Live</zg-chip></li>
        </zg-horizontal-list-layout>

        <zg-horizontal-list-layout ariaLabel="Large chip row">
          <li zg-horizontal-list-layout-items><zg-chip size="lg">All</zg-chip></li>
          <li zg-horizontal-list-layout-items><zg-chip size="lg">Slots</zg-chip></li>
          <li zg-horizontal-list-layout-items><zg-chip size="lg">Live</zg-chip></li>
        </zg-horizontal-list-layout>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: [
        { id: 'tagged-all', label: 'All games' },
        { id: 'tagged-slots', label: 'Slots' },
      ] as DemoChipItem[],
    },
    template: `
      <zg-horizontal-list-layout ariaLabel="Chip composition with icon">
        @for (item of items; track item.id) {
          <li zg-horizontal-list-layout-items>
            <zg-chip>
              <ng-container icon-left>
                <ng-icon name="lucideTag" size="1rem" aria-hidden="true"></ng-icon>
              </ng-container>
              {{ item.label }}
            </zg-chip>
          </li>
        }
      </zg-horizontal-list-layout>
    `,
  }),
};

export const OtherAtoms: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-horizontal-list-layout ariaLabel="Quick actions">
          <li zg-horizontal-list-layout-items><zg-button variant="secondary" size="sm">Deposit</zg-button></li>
          <li zg-horizontal-list-layout-items><zg-button variant="accent" size="sm">Withdraw</zg-button></li>
          <li zg-horizontal-list-layout-items><zg-button variant="ghost" size="sm">History</zg-button></li>
        </zg-horizontal-list-layout>

        <zg-horizontal-list-layout ariaLabel="Status badges">
          <li zg-horizontal-list-layout-items><zg-badge variant="success">Live</zg-badge></li>
          <li zg-horizontal-list-layout-items><zg-badge variant="warning">Maintenance</zg-badge></li>
          <li zg-horizontal-list-layout-items><zg-badge variant="info">New</zg-badge></li>
        </zg-horizontal-list-layout>
      </div>
    `,
  }),
};

export const WithGameCards: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      cards: [
        {
          id: 'blackjack-8',
          title: 'Blackjack 8',
          provider: 'Lucky Streak',
          imageUrl: 'https://placehold.co/260x360?text=Blackjack+8',
        },
        {
          id: 'bonus-poker',
          title: 'Bonus Poker',
          provider: 'Genii',
          imageUrl: 'https://placehold.co/260x360?text=Bonus+Poker',
        },
        {
          id: 'aces-faces',
          title: 'Aces and Faces',
          provider: 'Genii',
          imageUrl: 'https://placehold.co/260x360?text=Aces+and+Faces',
        },
      ],
    },
    template: `
      <zg-horizontal-list-layout ariaLabel="Featured games" layoutMode="scroll">
        @for (card of cards; track card.id) {
          <li zg-horizontal-list-layout-items style="width: 180px;">
            <zg-casino-game-card
              [title]="card.title"
              [provider]="card.provider"
              [imageUrl]="card.imageUrl"
              ctaLabel="Play now"
            ></zg-casino-game-card>
          </li>
        }
      </zg-horizontal-list-layout>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      selectedId: 'all',
      items: sampleItems,
      onChipClick: function (id: string) {
        this['selectedId'] = id;
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-2);">
        <zg-horizontal-list-layout ariaLabel="Interactive categories">
          @for (item of items; track item.id) {
            <li zg-horizontal-list-layout-items>
              <zg-chip
                [selected]="selectedId === item.id"
                (clicked)="onChipClick(item.id)"
              >
                {{ item.label }}
              </zg-chip>
            </li>
          }
        </zg-horizontal-list-layout>
        <div style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-secondary);">
          Selected: {{ selectedId }}
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slotsButton = canvas.getByRole('button', { name: /slots/i });
    await userEvent.click(slotsButton);
    await expect(canvas.getByText(/selected: slots/i)).toBeTruthy();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-horizontal-list-layout ariaLabel="Casino category filters">
        <li zg-horizontal-list-layout-items><zg-chip [selected]="true">All games</zg-chip></li>
        <li zg-horizontal-list-layout-items><zg-chip>Slots</zg-chip></li>
        <li zg-horizontal-list-layout-items><zg-chip>Live casino</zg-chip></li>
      </zg-horizontal-list-layout>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByLabelText(/casino category filters/i);
    const allButton = canvas.getByRole('button', { name: /all games/i });

    await expect(nav.tagName.toLowerCase()).toBe('nav');
    await expect(allButton).toHaveAttribute('aria-pressed', 'true');
  },
};
