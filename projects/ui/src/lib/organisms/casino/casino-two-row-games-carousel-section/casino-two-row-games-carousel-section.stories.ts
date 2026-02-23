import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import {
  type CasinoTwoRowGamesCarouselSectionItem,
  ZgCasinoTwoRowGamesCarouselSectionComponent,
} from './casino-two-row-games-carousel-section.component';

const sampleItems: CasinoTwoRowGamesCarouselSectionItem[] = [
  {
    id: 'g1',
    title: 'Carnival Treasure',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Carnival+Treasure',
  },
  {
    id: 'g2',
    title: 'Ultra Roulette',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Ultra+Roulette',
  },
  {
    id: 'g3',
    title: 'Baccarat C07',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+C07',
  },
  {
    id: 'g4',
    title: 'Roulette D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+D',
  },
  {
    id: 'g5',
    title: 'Thai Hi Lo D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Thai+Hi+Lo+D',
  },
  {
    id: 'g6',
    title: 'Speed Baccarat D08',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Speed+Baccarat+D08',
  },
  {
    id: 'g7',
    title: 'Dragon Tiger D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger+D',
  },
  {
    id: 'g8',
    title: 'Sic Bo D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Sic+Bo+D',
  },
  {
    id: 'g9',
    title: 'Pok Deng D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Pok+Deng+D',
  },
  {
    id: 'g10',
    title: 'Baccarat D01',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D01',
  },
  {
    id: 'g11',
    title: 'Xoc Dia D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Xoc+Dia+D',
  },
  {
    id: 'g12',
    title: 'Roulette C',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+C',
  },
  {
    id: 'g13',
    title: 'Baccarat D02',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D02',
  },
  {
    id: 'g14',
    title: 'Baccarat D03',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D03',
  },
  {
    id: 'g15',
    title: 'Baccarat D04',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D04',
  },
  {
    id: 'g16',
    title: 'Baccarat D05',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D05',
  },
  {
    id: 'g17',
    title: 'Baccarat D06',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D06',
  },
  {
    id: 'g18',
    title: 'Baccarat D07',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D07',
  },
  {
    id: 'g19',
    title: 'Blackjack D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Blackjack+D',
  },
  {
    id: 'g20',
    title: 'Roulette M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+M',
  },
];

/**
 * Two-row horizontally scrollable games carousel section.
 *
 * ## Usage Guide
 * **When to use:**
 * - You need dense casino listings in two visual rows while keeping horizontal scrolling.
 * - A section needs the standard title/actions header plus game card interactions.
 *
 * **When NOT to use:**
 * - Full catalog pages that require vertical pagination or infinite scroll.
 * - Single-row strips; use the regular games carousel organism instead.
 *
 * ## Accessibility
 * - Uses semantic heading via `zg-section-title`.
 * - Exposes configurable labels for section, actions group, and horizontal list.
 * - Keeps native button behavior for all actions.
 */
const meta: Meta<ZgCasinoTwoRowGamesCarouselSectionComponent> = {
  title: 'Organisms/Casino/Two Row Games Carousel Section',
  component: ZgCasinoTwoRowGamesCarouselSectionComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    title: { control: 'text', table: { defaultValue: { summary: 'All games' } } },
    showHeader: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    items: { control: 'object' },
    cardWidth: { control: { type: 'number', min: 140, step: 10 } },
    allActionLabel: { control: 'text', table: { defaultValue: { summary: 'All' } } },
    showAllAction: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    viewAllClicked: { action: 'viewAllClicked', table: { category: 'Events' } },
    previousClicked: { action: 'previousClicked', table: { category: 'Events' } },
    nextClicked: { action: 'nextClicked', table: { category: 'Events' } },
    playRequested: { action: 'playRequested', table: { category: 'Events' } },
    favoriteRequested: { action: 'favoriteRequested', table: { category: 'Events' } },
  },
  args: {
    allActionLabel: 'All',
  },
};

export default meta;
type Story = StoryObj<ZgCasinoTwoRowGamesCarouselSectionComponent>;

export const Default: Story = {
  args: {
    title: 'ALL GAMES',
    items: sampleItems,
  },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-two-row-games-carousel-section
          title="All games"
          [items]="items"
        ></zg-casino-two-row-games-carousel-section>
        <zg-casino-two-row-games-carousel-section
          title="Recommended games"
          titleTone="default"
          [items]="items"
        ></zg-casino-two-row-games-carousel-section>
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
        sampleItems[3],
      ],
    },
    template: `
      <zg-casino-two-row-games-carousel-section
        title="States demo"
        [items]="items"
      ></zg-casino-two-row-games-carousel-section>
    `,
  }),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-two-row-games-carousel-section
          title="Compact cards"
          [items]="items"
          [cardWidth]="140"
        ></zg-casino-two-row-games-carousel-section>
        <zg-casino-two-row-games-carousel-section
          title="Regular cards"
          [items]="items"
          [cardWidth]="180"
        ></zg-casino-two-row-games-carousel-section>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <zg-casino-two-row-games-carousel-section
        [showHeader]="false"
        [showAllAction]="false"
        [items]="items"
      ></zg-casino-two-row-games-carousel-section>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  args: {
    title: 'All games',
    items: sampleItems,
    sectionAriaLabel: 'All games section',
    actionsGroupAriaLabel: 'All games actions',
    listAriaLabel: 'All games two row carousel',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { name: /all games/i });
    const group = canvas.getByRole('group', { name: /all games actions/i });
    const nav = canvas.getByLabelText(/all games two row carousel/i);

    await expect(heading).toBeTruthy();
    await expect(group).toBeTruthy();
    await expect(nav.tagName.toLowerCase()).toBe('nav');
  },
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
      allCount: 0,
      onAll: function () {
        this['allCount'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-casino-two-row-games-carousel-section
          [items]="items"
          allActionLabel="All"
          (viewAllClicked)="onAll()"
        ></zg-casino-two-row-games-carousel-section>
        <div>All clicks: {{ allCount }}</div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /all/i }));
    await expect(canvas.getByText(/all clicks: 1/i)).toBeTruthy();
  },
};
