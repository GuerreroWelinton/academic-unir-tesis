import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import {
  type CasinoRankedGamesCarouselItem,
  ZgCasinoRankedGamesCarouselSectionComponent,
} from './casino-ranked-games-carousel-section.component';

const sampleItems: CasinoRankedGamesCarouselItem[] = [
  {
    id: 'jacks-or-better',
    title: 'Jacks or Better',
    provider: 'Genii',
    imageUrl: 'https://placehold.co/260x360?text=Jacks+or+Better',
    rank: 1,
  },
  {
    id: 'bonus-poker',
    title: 'Bonus Poker',
    provider: 'Genii',
    imageUrl: 'https://placehold.co/260x360?text=Bonus+Poker',
    rank: 2,
  },
  {
    id: 'aces-faces',
    title: 'Aces and Faces',
    provider: 'Genii',
    imageUrl: 'https://placehold.co/260x360?text=Aces+and+Faces',
    rank: 3,
  },
  {
    id: 'four-pots',
    title: '4 Pots Riches',
    provider: 'Hold and Win',
    imageUrl: 'https://placehold.co/260x360?text=4+Pots+Riches',
    rank: 4,
  },
  {
    id: 'coin-strike-2',
    title: 'Coin Strike 2',
    provider: 'Hold and Win',
    imageUrl: 'https://placehold.co/260x360?text=Coin+Strike+2',
    rank: 5,
  },
  {
    id: 'thunder-coins',
    title: 'Thunder Coins XXL',
    provider: 'Hold and Win',
    imageUrl: 'https://placehold.co/260x360?text=Thunder+Coins+XXL',
    rank: 6,
  },
];

/**
 * Ranked games carousel section for top-N casino blocks.
 *
 * ## Usage Guide
 * **When to use:**
 * - Building "Top 10" strips with horizontal ranking progression.
 * - Showing ranked game cards with prev/next actions and optional "all" action.
 * - Keeping ranking visuals and game-card behavior in one reusable casino organism.
 *
 * **When NOT to use:**
 * - For unranked game lists; use the regular games carousel section.
 * - For multi-row grid catalogs.
 *
 * ## Accessibility
 * - Uses semantic heading via `zg-section-title`.
 * - Actions are grouped with `zg-section-actions`.
 * - Horizontal list has explicit configurable aria label.
 */
const meta: Meta<ZgCasinoRankedGamesCarouselSectionComponent> = {
  title: 'Organisms/Casino/Ranked Games Carousel Section',
  component: ZgCasinoRankedGamesCarouselSectionComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    title: { control: 'text', table: { defaultValue: { summary: 'Top 10 casino' } } },
    titleTone: { control: 'select', options: ['default', 'primary', 'success'] },
    titleSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    actionsSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'null (uses titleSize)' } },
    },
    showTitleAccent: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    items: { control: 'object' },
    listAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Ranked games carousel' } },
    },
    sectionAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Ranked games section' } },
    },
    actionsGroupAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Ranked games actions' } },
    },
    allActionLabel: { control: 'text', table: { defaultValue: { summary: 'All' } } },
    showAllAction: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    scrollStep: { control: { type: 'number', min: 80, step: 20 } },
    cardWidth: { control: { type: 'number', min: 140, step: 10 } },
    viewAllClicked: { action: 'viewAllClicked', table: { category: 'Events' } },
    previousClicked: { action: 'previousClicked', table: { category: 'Events' } },
    nextClicked: { action: 'nextClicked', table: { category: 'Events' } },
    playRequested: { action: 'playRequested', table: { category: 'Events' } },
    favoriteRequested: { action: 'favoriteRequested', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<ZgCasinoRankedGamesCarouselSectionComponent>;

export const Default: Story = {
  args: {
    title: 'Top 10 casino',
    items: sampleItems,
  },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-ranked-games-carousel-section
          title="Top 10 casino"
          titleTone="primary"
          [items]="items"
        ></zg-casino-ranked-games-carousel-section>
        <zg-casino-ranked-games-carousel-section
          title="Top live games"
          titleTone="default"
          [items]="items"
        ></zg-casino-ranked-games-carousel-section>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: [
        sampleItems[0],
        { ...sampleItems[1], favorite: true },
        { ...sampleItems[2], disabled: true, showFavorite: false },
      ],
    },
    template: `
      <zg-casino-ranked-games-carousel-section
        title="Ranked states"
        [items]="items"
      ></zg-casino-ranked-games-carousel-section>
    `,
  }),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-ranked-games-carousel-section
          title="Compact"
          [items]="items"
          [cardWidth]="160"
        ></zg-casino-ranked-games-carousel-section>
        <zg-casino-ranked-games-carousel-section
          title="Regular"
          [items]="items"
          [cardWidth]="200"
        ></zg-casino-ranked-games-carousel-section>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <zg-casino-ranked-games-carousel-section
        title="Top 10 casino"
        [items]="items"
        [showAllAction]="true"
        allActionLabel="Todos"
      ></zg-casino-ranked-games-carousel-section>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
      allCount: 0,
      playCount: 0,
      onAllClick: function () {
        this['allCount'] += 1;
      },
      onPlayClick: function () {
        this['playCount'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-casino-ranked-games-carousel-section
          title="Interactive ranked strip"
          [items]="items"
          [showAllAction]="true"
          (viewAllClicked)="onAllClick()"
          (playRequested)="onPlayClick()"
        ></zg-casino-ranked-games-carousel-section>
        <div style="font-size:var(--zg-font-size-sm);color:var(--zg-color-text-secondary);">
          All clicks: {{ allCount }} | Play clicks: {{ playCount }}
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /all/i }));
    const playButtons = canvas.getAllByRole('button', { name: /play game/i });
    await userEvent.click(playButtons[0]);
    await expect(canvas.getByText(/all clicks: 1 \| play clicks: 1/i)).toBeTruthy();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: { controls: { disable: true } },
  args: {
    title: 'Top 10 casino',
    items: sampleItems,
    sectionAriaLabel: 'Top ranked games section',
    actionsGroupAriaLabel: 'Top ranked games actions',
    listAriaLabel: 'Top ranked games horizontal list',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { name: /top 10 casino/i });
    const group = canvas.getByRole('group', { name: /top ranked games actions/i });
    const nav = canvas.getByLabelText(/top ranked games horizontal list/i);

    await expect(heading).toBeTruthy();
    await expect(group).toBeTruthy();
    await expect(nav.tagName.toLowerCase()).toBe('nav');
  },
};
