import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgCasinoGameCardComponent } from '../../../molecules/casino/casino-game-card/casino-game-card.component';
import { ZgCasinoSearchBarComponent } from '../../../molecules/casino/casino-search-bar/casino-search-bar.component';
import { ZgCategoryFilterTabsComponent } from '../../../molecules/shared/category-filter-tabs/category-filter-tabs.component';
import { ZgCasinoGamesGridSectionComponent } from '../../../organisms/casino/casino-games-grid-section/casino-games-grid-section.component';
import { ZgSiteHeaderComponent } from '../../../organisms/shared/site-header/site-header.component';
import { ZgCasinoGamesGridTemplateComponent } from './casino-games-grid-template.component';

const categories = [
  { id: 'slots', label: 'Slots' },
  { id: 'videoslots', label: 'Videoslots' },
  { id: 'live-dealer', label: 'Live dealer' },
  { id: 'instant-win', label: 'Instant win' },
  { id: 'table-cards', label: 'Table & cards' },
  { id: 'videopoker', label: 'Videopoker' },
  { id: 'crash', label: 'Crash' },
  { id: 'bingo', label: 'Bingo' },
];

const siteHeaderNavItems = [
  { id: 'sports', label: 'SPORTS', href: '#sports' },
  { id: 'casino', label: 'CASINO', href: '#casino', active: true },
  { id: 'live-casino', label: 'LIVE CASINO', href: '#live-casino' },
  { id: 'virtuals', label: 'VIRTUALS', href: '#virtuals' },
  { id: 'promotions', label: 'PROMOTIONS', href: '#promotions' },
];

const baseGridGames = [
  {
    id: 'carnival-treasure',
    title: 'Carnival Treasure',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Carnival+Treasure',
  },
  {
    id: 'ultra-roulette',
    title: 'Ultra Roulette',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Ultra+Roulette',
  },
  {
    id: 'roulette-c',
    title: 'Roulette C',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+C',
  },
  {
    id: 'baccarat-c07',
    title: 'Baccarat C07',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+C07',
  },
  {
    id: 'dragon-tiger-d',
    title: 'Dragon Tiger D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger+D',
  },
  {
    id: 'pok-deng',
    title: 'Pok Deng',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Pok+Deng',
  },
  {
    id: 'mega-roulette',
    title: 'Mega Roulette',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Mega+Roulette',
  },
  {
    id: 'american-roulette',
    title: 'American Roulette',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=American+Roulette',
  },
  {
    id: 'french-roulette',
    title: 'French Roulette',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=French+Roulette',
  },
  {
    id: 'blackjack',
    title: 'Blackjack',
    provider: 'OneTouch',
    imageUrl: 'https://placehold.co/320x320?text=Blackjack',
  },
  {
    id: 'teen-patti',
    title: 'Teen Patti',
    provider: 'OneTouch',
    imageUrl: 'https://placehold.co/320x320?text=Teen+Patti',
  },
  {
    id: 'baccarat-triple-treat',
    title: 'Baccarat Triple Treat',
    provider: 'OneTouch',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+Triple+Treat',
  },
  {
    id: 'fish-prawn-crab-m',
    title: 'Fish Prawn Crab M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Fish+Prawn+Crab+M',
  },
  {
    id: 'roulette-d',
    title: 'Roulette D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+D',
  },
  {
    id: 'xoc-dia-d',
    title: 'Xoc Dia D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Xoc+Dia+D',
  },
  {
    id: 'thai-hilo-d',
    title: 'Thai HiLo D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Thai+HiLo+D',
  },
  {
    id: 'pok-deng-d',
    title: 'Pok Deng D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Pok+Deng+D',
  },
  {
    id: 'speed-baccarat-d08',
    title: 'Speed Baccarat D08',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Speed+Baccarat+D08',
  },
  {
    id: 'sic-bo-d',
    title: 'Sic Bo D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Sic+Bo+D',
  },
  {
    id: 'speed-baccarat-c08',
    title: 'Speed Baccarat C08',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Speed+Baccarat+C08',
  },
  {
    id: 'andar-bahar-m',
    title: 'Andar Bahar M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Andar+Bahar+M',
  },
  {
    id: 'baccarat-d06',
    title: 'Baccarat D06',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D06',
  },
  {
    id: 'dragon-tiger-m',
    title: 'Dragon Tiger M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger+M',
  },
  {
    id: 'teen-patti-2020-m',
    title: 'Teen Patti 20-20 M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Teen+Patti+20-20+M',
  },
  {
    id: 'dozen-roulette',
    title: 'Dozen Roulette',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Dozen+Roulette',
  },
  {
    id: 'dragon-gate-poker',
    title: 'Dragon Gate Poker',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Gate+Poker',
  },
  {
    id: 'hilo',
    title: 'HiLo',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=HiLo',
  },
  {
    id: 'european-roulette',
    title: 'European Roulette',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=European+Roulette',
  },
  {
    id: 'bonus-poker',
    title: 'Bonus Poker',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Bonus+Poker',
  },
];

const gridGames = Array.from({ length: 12 }, (_, batchIndex) =>
  baseGridGames.map((game) => {
    const variantLabel = batchIndex === 0 ? game.title : `${game.title} ${batchIndex + 1}`;
    return {
      ...game,
      id: `${game.id}-${batchIndex + 1}`,
      title: variantLabel,
      imageUrl: `https://placehold.co/320x320?text=${encodeURIComponent(variantLabel)}`,
    };
  }),
).flat();

const mostBetGames = gridGames.slice(0, 120);
const mostPlayedGames = gridGames.slice(60, 180);

/**
 * Catalog template for casino listing pages that share the same search + categories + grid structure.
 *
 * ## Usage Guide
 * **When to use:**
 * - Build `/casino/most-bet`, `/casino/most-played-games`, and `/casino/all-games` using one layout shell.
 * - Keep this template purely structural and project section organisms via slots.
 * - Reorder or replace page parts without creating wrapper pass-through APIs.
 *
 * **When NOT to use:**
 * - Home-like pages with hero, providers carousel, and campaign sections.
 * - Pages that require business orchestration inside the template.
 *
 * ## Accessibility
 * - Accessibility semantics belong to projected components (`search`, `tabs`, `grid section`).
 * - Template preserves clear document flow for keyboard and screen-reader navigation.
 */
const meta: Meta<ZgCasinoGamesGridTemplateComponent> = {
  title: 'Templates/Casino/Casino Games Grid Template',
  component: ZgCasinoGamesGridTemplateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ZgButtonComponent,
        ZgCasinoSearchBarComponent,
        ZgCategoryFilterTabsComponent,
        ZgCasinoGamesGridSectionComponent,
        ZgCasinoGameCardComponent,
        ZgSiteHeaderComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<ZgCasinoGamesGridTemplateComponent>;

export const Default: Story = {
  render: () => ({
    props: { categories, gridGames, allGamesCount: gridGames.length, siteHeaderNavItems },
    template: `
      <zg-casino-games-grid-template>
        <zg-site-header
          zg-casino-games-grid-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-search-bar
          zg-casino-games-grid-template-search
          placeholder="Search games"
          providersLabel="PROVIDERS"
        ></zg-casino-search-bar>

        <zg-category-filter-tabs
          zg-casino-games-grid-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="slots"
          layoutMode="scroll"
        ></zg-category-filter-tabs>

        <zg-casino-games-grid-section
          zg-casino-games-grid-template-main
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'all-games', label: 'All games' }
          ]"
          title="All games"
          [gamesCount]="allGamesCount"
        >
          @for (item of gridGames; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </zg-casino-games-grid-template>
    `,
  }),
};

export const MostBetPage: Story = {
  render: () => ({
    props: { categories, mostBetGames, mostBetCount: mostBetGames.length, siteHeaderNavItems },
    template: `
      <zg-casino-games-grid-template>
        <zg-site-header
          zg-casino-games-grid-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-search-bar
          zg-casino-games-grid-template-search
          placeholder="Search games"
        ></zg-casino-search-bar>

        <zg-category-filter-tabs
          zg-casino-games-grid-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="slots"
          layoutMode="scroll"
        ></zg-category-filter-tabs>

        <zg-casino-games-grid-section
          zg-casino-games-grid-template-main
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-bet', label: 'Most bet' }
          ]"
          title="Most bet"
          [gamesCount]="mostBetCount"
        >
          @for (item of mostBetGames; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </zg-casino-games-grid-template>
    `,
  }),
};

export const MostPlayedGamesPage: Story = {
  render: () => ({
    props: {
      categories,
      mostPlayedGames,
      mostPlayedCount: mostPlayedGames.length,
      siteHeaderNavItems,
    },
    template: `
      <zg-casino-games-grid-template>
        <zg-site-header
          zg-casino-games-grid-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-search-bar
          zg-casino-games-grid-template-search
          placeholder="Search games"
        ></zg-casino-search-bar>

        <zg-category-filter-tabs
          zg-casino-games-grid-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="videoslots"
          layoutMode="scroll"
        ></zg-category-filter-tabs>

        <zg-casino-games-grid-section
          zg-casino-games-grid-template-main
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-played-games', label: 'Most played games' }
          ]"
          title="Most played games"
          [gamesCount]="mostPlayedCount"
        >
          @for (item of mostPlayedGames; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </zg-casino-games-grid-template>
    `,
  }),
};

export const AllGamesPage: Story = {
  render: () => ({
    props: { categories, gridGames, allGamesCount: gridGames.length, siteHeaderNavItems },
    template: `
      <zg-casino-games-grid-template>
        <zg-site-header
          zg-casino-games-grid-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-search-bar
          zg-casino-games-grid-template-search
          placeholder="Search games"
        ></zg-casino-search-bar>

        <zg-category-filter-tabs
          zg-casino-games-grid-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="live-dealer"
          layoutMode="scroll"
        ></zg-category-filter-tabs>

        <zg-casino-games-grid-section
          zg-casino-games-grid-template-main
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'all-games', label: 'All games' }
          ]"
          title="All games"
          [gamesCount]="allGamesCount"
          [cardMinWidth]="164"
        >
          @for (item of gridGames; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </zg-casino-games-grid-template>
    `,
  }),
};

export const WithoutCategories: Story = {
  render: () => ({
    props: { gridGames, allGamesCount: gridGames.length, siteHeaderNavItems },
    template: `
      <zg-casino-games-grid-template>
        <zg-site-header
          zg-casino-games-grid-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-search-bar
          zg-casino-games-grid-template-search
          placeholder="Search games"
        ></zg-casino-search-bar>

        <zg-casino-games-grid-section
          zg-casino-games-grid-template-main
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'all-games', label: 'All games' }
          ]"
          title="All games"
          [gamesCount]="allGamesCount"
        >
          @for (item of gridGames; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </zg-casino-games-grid-template>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-casino-games-grid-template>
        <div zg-casino-games-grid-template-header style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Header slot
        </div>
        <div zg-casino-games-grid-template-search style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Search slot
        </div>
        <div zg-casino-games-grid-template-categories style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Categories slot
        </div>
        <div zg-casino-games-grid-template-main style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Main content slot (games grid section)
        </div>
      </zg-casino-games-grid-template>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  render: () => ({
    props: { categories, gridGames, allGamesCount: gridGames.length, siteHeaderNavItems },
    template: `
      <zg-casino-games-grid-template>
        <zg-site-header
          zg-casino-games-grid-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-search-bar
          zg-casino-games-grid-template-search
          placeholder="Search games"
        ></zg-casino-search-bar>

        <zg-category-filter-tabs
          zg-casino-games-grid-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="slots"
          layoutMode="scroll"
        ></zg-category-filter-tabs>

        <zg-casino-games-grid-section
          zg-casino-games-grid-template-main
          [breadcrumbs]="[
            { id: 'home', label: 'Home', href: '#home' },
            { id: 'casino', label: 'Casino', href: '#casino' },
            { id: 'most-played-games', label: 'Most played games' }
          ]"
          title="Most played games"
          [gamesCount]="allGamesCount"
          sectionAriaLabel="Most played games section"
          gridAriaLabel="Most played games grid"
        >
          @for (item of gridGames; track item.id) {
            <zg-casino-game-card
              [title]="item.title"
              [provider]="item.provider"
              [imageUrl]="item.imageUrl"
              aspectRatio="square"
            ></zg-casino-game-card>
          }
        </zg-casino-games-grid-section>
      </zg-casino-games-grid-template>
    `,
  }),
};
