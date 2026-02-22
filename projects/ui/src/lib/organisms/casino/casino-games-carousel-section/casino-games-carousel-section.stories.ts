import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import {
  type CasinoGamesCarouselSectionItem,
  ZgCasinoGamesCarouselSectionComponent,
} from './casino-games-carousel-section.component';

const sampleItems: CasinoGamesCarouselSectionItem[] = [
  {
    id: 'blackjack-8',
    title: 'Blackjack 8',
    provider: 'Lucky Streak',
    imageUrl: 'https://placehold.co/260x360?text=Blackjack+8',
  },
  {
    id: 'blackjack-16',
    title: 'Blackjack 16',
    provider: 'Lucky Streak',
    imageUrl: 'https://placehold.co/260x360?text=Blackjack+16',
  },
  {
    id: 'five-lions',
    title: '5 Lions Gold',
    provider: 'Pragmatic Play',
    imageUrl: 'https://placehold.co/260x360?text=5+Lions+Gold',
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
  {
    id: 'coin-strike',
    title: 'Coin Strike 2',
    provider: 'Hold and Win',
    imageUrl: 'https://placehold.co/260x360?text=Coin+Strike+2',
  },
  {
    id: 'chicken-road',
    title: 'Chicken Road',
    provider: 'InOut Games',
    imageUrl: 'https://placehold.co/260x360?text=Chicken+Road',
  },
  {
    id: 'hot-to-burn',
    title: 'Hot to Burn',
    provider: 'Pragmatic Play',
    imageUrl: 'https://placehold.co/260x360?text=Hot+to+Burn',
  },
];

/**
 * Casino games carousel section that composes title/actions header and horizontal game list.
 *
 * ## Usage Guide
 * **When to use:**
 * - A section needs title + actions + horizontally scrollable game cards in one reusable block.
 * - You want prev/next header actions connected to list scroll without custom wiring in every screen.
 * - You need output events for "view all", play, and favorite actions.
 *
 * **When NOT to use:**
 * - If you only need a generic list wrapper; use `zg-horizontal-list-layout`.
 * - If you need custom header structure that does not match section-title + section-actions.
 *
 * ## Accessibility
 * - Uses semantic heading through `zg-section-title`.
 * - Groups actions with `zg-section-actions` role="group".
 * - Forwards explicit aria labels for section, actions group, and horizontal list.
 */
const meta: Meta<ZgCasinoGamesCarouselSectionComponent> = {
  title: 'Organisms/Casino/Games Carousel Section',
  component: ZgCasinoGamesCarouselSectionComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    title: { control: 'text', table: { defaultValue: { summary: 'Most bet games' } } },
    titleTone: { control: 'select', options: ['default', 'primary', 'success'] },
    titleSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    actionsSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size for section actions. Falls back to titleSize when null.',
      table: { defaultValue: { summary: 'null (uses titleSize)' } },
    },
    showTitleAccent: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    items: { control: 'object' },
    listAriaLabel: { control: 'text', table: { defaultValue: { summary: 'Games carousel' } } },
    sectionAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Casino games section' } },
    },
    actionsGroupAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Carousel actions' } },
    },
    allActionLabel: { control: 'text', table: { defaultValue: { summary: 'All' } } },
    showAllAction: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
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
type Story = StoryObj<ZgCasinoGamesCarouselSectionComponent>;

export const Default: Story = {
  args: {
    title: 'Los mas apostados',
    items: sampleItems,
    showTitleAccent: true,
  },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-games-carousel-section
          title="Most bet games"
          titleTone="primary"
          [items]="items"
        ></zg-casino-games-carousel-section>
        <zg-casino-games-carousel-section
          title="Top live casino"
          titleTone="default"
          [items]="items"
        ></zg-casino-games-carousel-section>
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
        { ...sampleItems[1], disabled: true, showFavorite: false },
        { ...sampleItems[2], favorite: true },
      ],
    },
    template: `
      <zg-casino-games-carousel-section
        title="States demo"
        [items]="items"
      ></zg-casino-games-carousel-section>
    `,
  }),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-games-carousel-section
          title="Compact cards"
          [items]="items"
          [cardWidth]="160"
        ></zg-casino-games-carousel-section>
        <zg-casino-games-carousel-section
          title="Regular cards"
          [items]="items"
          [cardWidth]="200"
        ></zg-casino-games-carousel-section>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
    },
    template: `
      <zg-casino-games-carousel-section
        title="Section without all action"
        [items]="items"
        [showAllAction]="false"
      ></zg-casino-games-carousel-section>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
      viewAllCount: 0,
      playCount: 0,
      onViewAll: function () {
        this['viewAllCount'] += 1;
      },
      onPlay: function () {
        this['playCount'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-casino-games-carousel-section
          title="Interactive section"
          [items]="items"
          (viewAllClicked)="onViewAll()"
          (playRequested)="onPlay()"
        ></zg-casino-games-carousel-section>

        <div style="font-size:var(--zg-font-size-sm);color:var(--zg-color-text-secondary);">
          View all clicks: {{ viewAllCount }} | Play clicks: {{ playCount }}
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /all/i }));
    const playButtons = canvas.getAllByRole('button', { name: /play game/i });
    await userEvent.click(playButtons[0]);
    await expect(canvas.getByText(/view all clicks: 1 \| play clicks: 1/i)).toBeTruthy();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: { controls: { disable: true } },
  args: {
    title: 'Top 10 casino',
    items: sampleItems,
    sectionAriaLabel: 'Top games section',
    actionsGroupAriaLabel: 'Top games carousel actions',
    listAriaLabel: 'Top games horizontal list',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { name: /top 10 casino/i });
    const group = canvas.getByRole('group', { name: /top games carousel actions/i });
    const nav = canvas.getByLabelText(/top games horizontal list/i);

    await expect(heading).toBeTruthy();
    await expect(group).toBeTruthy();
    await expect(nav.tagName.toLowerCase()).toBe('nav');
  },
};
