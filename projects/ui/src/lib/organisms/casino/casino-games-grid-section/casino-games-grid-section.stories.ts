import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgCasinoGameCardComponent } from '../../../molecules/casino/casino-game-card/casino-game-card.component';
import { ZgCasinoGamesGridSectionComponent } from './casino-games-grid-section.component';

const sampleItems = [
  {
    id: 'carnival-treasure',
    title: 'Carnival Treasure',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/260x360?text=Carnival+Treasure',
  },
  {
    id: 'baccarat-c07',
    title: 'Baccarat C07',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/260x360?text=Baccarat+C07',
  },
  {
    id: 'thai-hi-lo-d',
    title: 'Thai Hi Lo D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/260x360?text=Thai+Hi+Lo+D',
  },
  {
    id: 'dragon-tiger-d',
    title: 'Dragon Tiger D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/260x360?text=Dragon+Tiger+D',
  },
];

/**
 * Grid section for casino catalogs that composes catalog header and projected game cards.
 *
 * ## Usage Guide
 * **When to use:**
 * - Catalog pages that need header + projected card grid structure.
 * - Views where the container controls card rendering and data orchestration.
 * - Most-bet and most-played sections with shared layout contract.
 *
 * **When NOT to use:**
 * - Horizontal slider sections; use carousel organisms.
 * - Cases where card rendering must be fully internal to the section.
 *
 * ## Accessibility
 * - Uses semantic section labels for container and grid.
 * - Exposes heading semantics through `zg-casino-catalog-header`.
 * - Supports projected action controls in header actions slot.
 */
const meta: Meta<ZgCasinoGamesGridSectionComponent> = {
  title: 'Organisms/Casino/Games Grid Section',
  component: ZgCasinoGamesGridSectionComponent,
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
      imports: [ZgButtonComponent, ZgCasinoGameCardComponent],
    }),
  ],
  argTypes: {
    breadcrumbs: { control: 'object' },
    breadcrumbAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Catalog breadcrumb' } },
    },
    title: { control: 'text', table: { defaultValue: { summary: 'All games' } } },
    gamesCount: { control: { type: 'number', min: 0, step: 1 } },
    gamesCountSuffix: { control: 'text', table: { defaultValue: { summary: 'games' } } },
    headerAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Casino catalog header' } },
    },
    sectionAriaLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'Casino games grid section' } },
    },
    gridAriaLabel: { control: 'text', table: { defaultValue: { summary: 'Games grid' } } },
    emptyStateLabel: {
      control: 'text',
      table: { defaultValue: { summary: 'No games available' } },
    },
    showEmptyState: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    cardMinWidth: {
      control: { type: 'number', min: 120, step: 10 },
      table: { defaultValue: { summary: 'null (uses token)' } },
    },
    breadcrumbItemClicked: { action: 'breadcrumbItemClicked', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<ZgCasinoGamesGridSectionComponent>;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, items: sampleItems },
    template: `
      <zg-casino-games-grid-section
        [breadcrumbs]="breadcrumbs"
        [title]="title"
        [gamesCount]="gamesCount"
        [gamesCountSuffix]="gamesCountSuffix"
        [headerAriaLabel]="headerAriaLabel"
      >
        @for (item of items; track item.id) {
          <zg-casino-game-card
            [title]="item.title"
            [provider]="item.provider"
            [imageUrl]="item.imageUrl"
            aspectRatio="square"
          ></zg-casino-game-card>
        }
      </zg-casino-games-grid-section>
    `,
  }),
  args: {
    breadcrumbs: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'casino', label: 'Casino', href: '#casino' },
      { id: 'most-bet', label: 'Most bet' },
    ],
    title: 'All games',
    gamesCount: 3005,
    gamesCountSuffix: 'games',
    headerAriaLabel: 'Casino catalog header',
  },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-games-grid-section
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'all-games', label: 'All games' }
          ]"
          title="All games"
          [gamesCount]="12500"
        >
          @for (item of items; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>

        <zg-casino-games-grid-section
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-played', label: 'Most played games' }
          ]"
          title="Most played games"
          [gamesCount]="4200"
          gamesCountSuffix="titles"
        >
          @for (item of items; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
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
        { ...sampleItems[2], disabled: true },
      ],
    },
    template: `
      <zg-casino-games-grid-section title="States demo" [gamesCount]="3">
        @for (item of items; track item.id) {
          <zg-casino-game-card
            [title]="item.title"
            [provider]="item.provider"
            [imageUrl]="item.imageUrl"
            [favorite]="item.favorite ?? false"
            [disabled]="item.disabled ?? false"
            aspectRatio="square"
          ></zg-casino-game-card>
        }
      </zg-casino-games-grid-section>
    `,
  }),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-games-grid-section title="Compact cards" [gamesCount]="4" [cardMinWidth]="140">
          @for (item of items; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>

        <zg-casino-games-grid-section title="Regular cards" [gamesCount]="4" [cardMinWidth]="180">
          @for (item of items; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </div>
    `,
  }),
};

export const EmptyAndEdgeCases: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-casino-games-grid-section
        title="No available games"
        [showEmptyState]="true"
        emptyStateLabel="No games found with current filters"
      ></zg-casino-games-grid-section>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <zg-casino-games-grid-section title="All games" [gamesCount]="4">
        <div zg-games-grid-section-actions style="display:flex;gap:var(--zg-spacing-2);">
          <zg-button variant="secondary" size="sm">Providers</zg-button>
          <zg-button variant="secondary" size="sm">Sort</zg-button>
        </div>

        @for (item of items; track item.id) {
          <zg-casino-game-card
            [title]="item.title"
            [provider]="item.provider"
            [imageUrl]="item.imageUrl"
            aspectRatio="square"
          ></zg-casino-game-card>
        }
      </zg-casino-games-grid-section>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
      playClicks: 0,
      onPlayClicked: function () {
        this['playClicks'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-casino-games-grid-section
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'interactive', label: 'Interactive preview' }
          ]"
          title="Interactive preview"
          [gamesCount]="4"
        >
          @for (item of items; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
              (playClicked)="onPlayClicked()"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
        <div style="font-size:var(--zg-font-size-sm);color:var(--zg-color-text-secondary);">
          Play clicks: {{ playClicks }}
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole('button', { name: /play game/i })[0]);
    await expect(canvas.getByText(/play clicks: 1/i)).toBeTruthy();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  render: (args) => ({
    props: { ...args, items: sampleItems },
    template: `
      <zg-casino-games-grid-section
        [breadcrumbs]="breadcrumbs"
        [title]="title"
        [gamesCount]="gamesCount"
        [sectionAriaLabel]="sectionAriaLabel"
        [gridAriaLabel]="gridAriaLabel"
      >
        @for (item of items; track item.id) {
          <zg-casino-game-card
            [title]="item.title"
            [provider]="item.provider"
            [imageUrl]="item.imageUrl"
            aspectRatio="square"
          ></zg-casino-game-card>
        }
      </zg-casino-games-grid-section>
    `,
  }),
  args: {
    breadcrumbs: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'casino', label: 'Casino', href: '#casino' },
      { id: 'most-played', label: 'Most played games' },
    ],
    title: 'Most played games',
    gamesCount: 3200,
    sectionAriaLabel: 'Most played games section',
    gridAriaLabel: 'Most played games grid',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByLabelText(/most played games section/i);
    const heading = canvas.getByRole('heading', { name: /most played games/i });
    const grid = canvas.getByLabelText(/most played games grid/i);

    await expect(region).toBeTruthy();
    await expect(heading).toBeTruthy();
    await expect(grid).toBeTruthy();
  },
};
