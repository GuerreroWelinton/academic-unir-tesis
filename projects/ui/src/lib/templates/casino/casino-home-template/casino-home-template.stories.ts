import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ZgCasinoProviderCarouselComponent } from '../../../molecules/casino/casino-provider-carousel/casino-provider-carousel.component';
import { ZgCasinoSearchBarComponent } from '../../../molecules/casino/casino-search-bar/casino-search-bar.component';
import { ZgLuckyPickerComponent } from '../../../molecules/casino/lucky-picker/lucky-picker.component';
import { ZgCategoryFilterTabsComponent } from '../../../molecules/shared/category-filter-tabs/category-filter-tabs.component';
import { ZgCasinoGamesCarouselSectionComponent } from '../../../organisms/casino/casino-games-carousel-section/casino-games-carousel-section.component';
import { ZgCasinoHomeHeroComponent } from '../../../organisms/casino/casino-home-hero/casino-home-hero.component';
import { ZgCasinoProviderParallaxShowcaseComponent } from '../../../organisms/casino/casino-provider-parallax-showcase/casino-provider-parallax-showcase.component';
import { ZgCasinoRankedGamesCarouselSectionComponent } from '../../../organisms/casino/casino-ranked-games-carousel-section/casino-ranked-games-carousel-section.component';
import { ZgCasinoTwoRowGamesCarouselSectionComponent } from '../../../organisms/casino/casino-two-row-games-carousel-section/casino-two-row-games-carousel-section.component';
import { ZgSiteHeaderComponent } from '../../../organisms/shared/site-header/site-header.component';
import { ZgCasinoHomeTemplateComponent } from './casino-home-template.component';

const categories = [
  { id: 'slots', label: 'Slots' },
  { id: 'videoslots', label: 'Videoslots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'othergames', label: 'Othergames' },
  { id: 'instant-win', label: 'Instant win' },
  { id: 'table-cards', label: 'Table & cards' },
  { id: 'tablegames', label: 'Tablegames' },
  { id: 'videopoker', label: 'Videopoker' },
  { id: 'scratch-card', label: 'Scratch card' },
  { id: 'crash', label: 'Crash' },
  { id: 'virtual-sports', label: 'Virtual sports' },
  { id: 'video-bingo-keno', label: 'Video bingo & keno' },
  { id: 'bingo', label: 'Bingo' },
  { id: 'lottery', label: 'Lottery' },
  { id: 'poker', label: 'Poker' },
  { id: 'fish-shooting', label: 'Fish & shooting' },
];

const portraitGames = [
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
    id: '5-lions-gold',
    title: '5 Lions Gold',
    provider: 'Pragmatic Play',
    imageUrl: 'https://placehold.co/260x360?text=5+Lions+Gold',
  },
  {
    id: 'hot-to-burn',
    title: 'Hot to Burn',
    provider: 'Pragmatic Play',
    imageUrl: 'https://placehold.co/260x360?text=Hot+to+Burn',
  },
  {
    id: 'super-7s',
    title: 'Super 7s',
    provider: 'Pragmatic Play',
    imageUrl: 'https://placehold.co/260x360?text=Super+7s',
  },
  {
    id: 'chicken-road',
    title: 'Chicken Road',
    provider: 'InOut Games',
    imageUrl: 'https://placehold.co/260x360?text=Chicken+Road',
  },
  {
    id: 'bonus-poker',
    title: 'Bonus Poker',
    provider: 'Genii',
    imageUrl: 'https://placehold.co/260x360?text=Bonus+Poker',
  },
  {
    id: 'jacks-or-better',
    title: 'Jacks or Better',
    provider: 'Genii',
    imageUrl: 'https://placehold.co/260x360?text=Jacks+or+Better',
  },
  {
    id: 'aviator',
    title: 'Aviator',
    provider: 'Spribe',
    imageUrl: 'https://placehold.co/260x360?text=Aviator',
  },
  {
    id: 'sea-of-wealth-hunt-for-coins',
    title: 'Sea of Wealth: Hunt for Coins',
    provider: 'Evoplay',
    imageUrl: 'https://placehold.co/260x360?text=Sea+of+Wealth:+Hunt+for+Coins',
  },
];

const squareGames = [
  {
    id: 'sea-of-wealth-hunt-for-coins',
    title: 'Sea of Wealth: Hunt for Coins',
    provider: 'Evoplay',
    imageUrl: 'https://placehold.co/260x360?text=Sea+of+Wealth:+Hunt+for+Coins',
  },
  {
    id: 'carnival-treasure',
    title: 'Carnival Treasure',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Carnival+Treasure',
  },
  {
    id: 'fish-prawn-crab-m',
    title: 'Fish Prawn Crab M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Fish+Prawn+Crab+M',
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
    id: 'baccarat-d01',
    title: 'Baccarat D01',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D01',
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
    id: 'speed-baccarat-d08',
    title: 'Speed Baccarat D08',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Speed+Baccarat+D08',
  },
  {
    id: 'dragon-tiger-d',
    title: 'Dragon Tiger D',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger+D',
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
    id: 'pok-deng',
    title: 'Pok Deng',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Pok+Deng',
  },
  {
    id: 'andar-bahar-m',
    title: 'Andar Bahar M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Andar+Bahar+M',
  },
  {
    id: 'blackjack-m',
    title: 'Blackjack M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Blackjack+M',
  },
  {
    id: 'roulette-m',
    title: 'Roulette M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+M',
  },
  {
    id: 'dragon-tiger',
    title: 'Dragon Tiger',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger',
  },
];

const allGamesExtraItems = [
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
    id: 'european-roulette',
    title: 'European Roulette',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=European+Roulette',
  },
  {
    id: 'roulette',
    title: 'Roulette',
    provider: 'OneTouch',
    imageUrl: 'https://placehold.co/320x320?text=Roulette',
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
];

const allGamesTwoRowItems = [...squareGames, ...allGamesExtraItems];

const providerItems = [
  {
    id: 'wazdan',
    name: 'WAZDAN',
    logoUrl: 'https://placehold.co/260x80?text=WAZDAN',
  },
  {
    id: 'kagaming',
    name: 'KAGAMING',
    logoUrl: 'https://placehold.co/260x80?text=KAGAMING',
  },
  {
    id: 'evoplay',
    name: 'EVOPLAY',
    logoUrl: 'https://placehold.co/260x80?text=EVOPLAY',
  },
  {
    id: 'ct-interactive',
    name: 'CT INTERACTIVE',
    logoUrl: 'https://placehold.co/260x80?text=CT+INTERACTIVE',
  },
  {
    id: 'betsoft',
    name: 'BETSOFT',
    logoUrl: 'https://placehold.co/260x80?text=BETSOFT',
  },
  {
    id: 'onlyplay',
    name: 'ONLYPLAY',
    logoUrl: 'https://placehold.co/260x80?text=ONLYPLAY',
  },
  {
    id: 'habanero',
    name: 'HABANERO',
    logoUrl: 'https://placehold.co/260x80?text=HABANERO',
  },
  {
    id: 'pragmatic-play',
    name: 'PRAGMATIC PLAY',
    logoUrl: 'https://placehold.co/260x80?text=PRAGMATIC+PLAY',
  },
  {
    id: 'spribe',
    name: 'SPRIBE',
    logoUrl: 'https://placehold.co/260x80?text=SPRIBE',
  },
  {
    id: 'sa-gaming',
    name: 'SA GAMING',
    logoUrl: 'https://placehold.co/260x80?text=SA+GAMING',
  },
  {
    id: 'caleta',
    name: 'CALETA',
    logoUrl: 'https://placehold.co/260x80?text=CALETA',
  },
];

const siteHeaderNavItems = [
  { id: 'sports', label: 'SPORTS', href: '#sports' },
  { id: 'casino', label: 'CASINO', href: '#casino', active: true },
  { id: 'live-casino', label: 'LIVE CASINO', href: '#live-casino' },
  { id: 'virtuals', label: 'VIRTUALS', href: '#virtuals' },
  { id: 'promotions', label: 'PROMOTIONS', href: '#promotions' },
];

/**
 * Casino home layout wrapper focused on composition order through slot projection.
 *
 * ## Usage Guide
 * **When to use:**
 * - Build casino home pages by projecting existing organisms and molecules.
 * - Keep the container responsible for data and events, while this template handles spacing/order.
 * - Reorder sections without creating pass-through APIs.
 *
 * **When NOT to use:**
 * - Pages that need their own specific layout shell (catalog, profile, promo landing).
 * - Smart components that orchestrate state directly in the library.
 *
 * ## Accessibility
 * - This wrapper only structures content; accessibility semantics are provided by projected components.
 */
const meta: Meta<ZgCasinoHomeTemplateComponent> = {
  title: 'Templates/Casino/Casino Home Template',
  component: ZgCasinoHomeTemplateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ZgCasinoHomeHeroComponent,
        ZgCasinoSearchBarComponent,
        ZgCategoryFilterTabsComponent,
        ZgCasinoGamesCarouselSectionComponent,
        ZgCasinoRankedGamesCarouselSectionComponent,
        ZgCasinoTwoRowGamesCarouselSectionComponent,
        ZgCasinoProviderParallaxShowcaseComponent,
        ZgCasinoProviderCarouselComponent,
        ZgLuckyPickerComponent,
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
type Story = StoryObj<ZgCasinoHomeTemplateComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      categories,
      portraitGames,
      squareGames,
      providerItems,
      allGamesTwoRowItems,
      siteHeaderNavItems,
    },
    template: `
      <zg-casino-home-template>
        <zg-site-header
          zg-casino-home-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>

        <zg-casino-home-hero
          zg-casino-home-template-hero
          title="CASINO"
          description="Diversion, luck and big prizes await."
          highlightText="Start playing and win big!"
          caption="Luck follows you"
          backgroundImageUrl="https://placehold.co/1400x700?text=Casino+Home+Hero"
          characterImageUrl="https://placehold.co/620x720?text=Casino+Hero+Character"
        ></zg-casino-home-hero>


        <zg-casino-search-bar
          zg-casino-home-template-search
          placeholder="Search games"
          providersLabel="PROVIDERS"
        ></zg-casino-search-bar>

       <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          layoutMode="scroll"
          selectedId="slots"
       ></zg-category-filter-tabs>

      <zg-casino-games-carousel-section
        zg-casino-home-template-section
        title="Most bet"
        [items]="portraitGames"
        allActionLabel="Todos"
      ></zg-casino-games-carousel-section>

      <zg-casino-ranked-games-carousel-section
        zg-casino-home-template-section
        title="Top 10 casino"
        [items]="portraitGames"
      ></zg-casino-ranked-games-carousel-section>


      <zg-casino-games-carousel-section
        zg-casino-home-template-section
        title="Most played"
        [items]="portraitGames"
        allActionLabel="Todos"
      ></zg-casino-games-carousel-section>

      <zg-casino-provider-parallax-showcase
        zg-casino-home-template-section
        providerName="Videoslots"
        backgroundImageUrl="https://placehold.co/1200x600?text=Provider+Showcase"
        [items]="squareGames"
      ></zg-casino-provider-parallax-showcase>

      <zg-casino-provider-carousel
        zg-casino-home-template-section
        [items]="providerItems"
      ></zg-casino-provider-carousel>

     <zg-lucky-picker
        zg-casino-home-template-section
        title="Not sure what to play?"
        description="Let luck pick your next game."
        actionLabel="Pick for me"
      ></zg-lucky-picker>


      <zg-casino-two-row-games-carousel-section
        zg-casino-home-template-section
        title="All games"
        [items]="allGamesTwoRowItems"
        allActionLabel="Todos"
      ></zg-casino-two-row-games-carousel-section>

      </zg-casino-home-template>
    `,
  }),
};

export const HomeWithoutHero: Story = {
  render: (args) => ({
    props: {
      ...args,
      categories,
      portraitGames,
      squareGames,
      providerItems,
      allGamesTwoRowItems,
      siteHeaderNavItems,
    },
    template: `
      <zg-casino-home-template>
        <zg-site-header
          zg-casino-home-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>
        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="live"
        ></zg-category-filter-tabs>

        <zg-casino-games-carousel-section
          zg-casino-home-template-section
          title="Most played"
          [items]="portraitGames"
        ></zg-casino-games-carousel-section>

        <zg-casino-provider-carousel
          zg-casino-home-template-section
          [items]="providerItems"
        ></zg-casino-provider-carousel>

        <zg-casino-two-row-games-carousel-section
          zg-casino-home-template-section
          title="All games"
          [items]="allGamesTwoRowItems"
        ></zg-casino-two-row-games-carousel-section>
      </zg-casino-home-template>
    `,
  }),
};

export const ProviderFocusedStructure: Story = {
  render: (args) => ({
    props: {
      ...args,
      categories,
      portraitGames,
      squareGames,
      providerItems,
      allGamesTwoRowItems,
      siteHeaderNavItems,
    },
    template: `
      <zg-casino-home-template>
        <zg-site-header
          zg-casino-home-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>
        <zg-casino-home-hero
          zg-casino-home-template-hero
          title="CASINO"
          description="Provider campaign edition."
          highlightText="Discover featured studios."
          caption="Provider week"
        ></zg-casino-home-hero>

        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="table-cards"
        ></zg-category-filter-tabs>

        <zg-casino-provider-parallax-showcase
          zg-casino-home-template-section
          providerName="KAGaming"
          backgroundImageUrl="https://placehold.co/1200x600?text=KAGaming+Campaign"
          [items]="squareGames"
        ></zg-casino-provider-parallax-showcase>

        <zg-casino-provider-carousel
          zg-casino-home-template-section
          [items]="providerItems"
        ></zg-casino-provider-carousel>

        <zg-casino-games-carousel-section
          zg-casino-home-template-section
          title="Most bet"
          [items]="portraitGames"
        ></zg-casino-games-carousel-section>

        <zg-casino-two-row-games-carousel-section
          zg-casino-home-template-section
          title="All games"
          [items]="allGamesTwoRowItems"
        ></zg-casino-two-row-games-carousel-section>
      </zg-casino-home-template>
    `,
  }),
};

export const CarouselHeavyStructure: Story = {
  render: (args) => ({
    props: { ...args, categories, portraitGames, siteHeaderNavItems },
    template: `
      <zg-casino-home-template>
        <zg-site-header
          zg-casino-home-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>
        <zg-casino-home-hero zg-casino-home-template-hero></zg-casino-home-hero>
        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="slots"
        ></zg-category-filter-tabs>

        <zg-casino-games-carousel-section
          zg-casino-home-template-section
          title="Most bet"
          [items]="portraitGames"
        ></zg-casino-games-carousel-section>
        <zg-casino-games-carousel-section
          zg-casino-home-template-section
          title="Most played"
          [items]="portraitGames"
        ></zg-casino-games-carousel-section>
        <zg-casino-games-carousel-section
          zg-casino-home-template-section
          title="Recently added"
          [items]="portraitGames"
        ></zg-casino-games-carousel-section>
      </zg-casino-home-template>
    `,
  }),
};

export const MixedSectionOrder: Story = {
  render: (args) => ({
    props: {
      ...args,
      categories,
      portraitGames,
      squareGames,
      allGamesTwoRowItems,
      siteHeaderNavItems,
    },
    template: `
      <zg-casino-home-template>
        <zg-site-header
          zg-casino-home-template-header
          brandLabel="Brand"
          logoUrl="https://placehold.co/280x80?text=Logo"
          logoAlt="Brand logo"
          [logoWidth]="140"
          [logoHeight]="40"
          [navItems]="siteHeaderNavItems"
        ></zg-site-header>
        <zg-casino-home-hero zg-casino-home-template-hero></zg-casino-home-hero>
        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
          [chipVariant]="'filled'"
          selectedId="slots"
        ></zg-category-filter-tabs>

        <zg-lucky-picker
          zg-casino-home-template-section
          title="Try your luck first"
          actionLabel="Random game"
        ></zg-lucky-picker>

        <zg-casino-two-row-games-carousel-section
          zg-casino-home-template-section
          title="All games"
          [items]="allGamesTwoRowItems"
        ></zg-casino-two-row-games-carousel-section>

        <zg-casino-ranked-games-carousel-section
          zg-casino-home-template-section
          title="Top 10 casino"
          [items]="portraitGames"
        ></zg-casino-ranked-games-carousel-section>
      </zg-casino-home-template>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-casino-home-template>
        <div zg-casino-home-template-header style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Header slot
        </div>
        <div zg-casino-home-template-hero style="padding:var(--zg-spacing-6);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Hero slot
        </div>
        <div zg-casino-home-template-search style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Search slot
        </div>
        <div zg-casino-home-template-categories style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Categories slot
        </div>
        <div zg-casino-home-template-section style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Repeated section slot 1
        </div>
        <div zg-casino-home-template-section style="padding:var(--zg-spacing-4);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Repeated section slot 2
        </div>
      </zg-casino-home-template>
    `,
  }),
};
