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
import { ZgCasinoHomeTemplateComponent } from './casino-home-template.component';

const categories = [
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live dealer' },
  { id: 'table', label: 'Table games' },
];

const portraitGames = [
  {
    id: 'blackjack-8',
    title: 'Blackjack 8',
    provider: 'Lucky Streak',
    imageUrl: 'https://placehold.co/260x360?text=Blackjack+8',
  },
  {
    id: '5-lions',
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
    id: 'coin-strike-2',
    title: 'Coin Strike 2',
    provider: 'Playson',
    imageUrl: 'https://placehold.co/260x360?text=Coin+Strike+2',
  },
  {
    id: 'thunder-coins',
    title: 'Thunder Coins XXL',
    provider: 'Playson',
    imageUrl: 'https://placehold.co/260x360?text=Thunder+Coins+XXL',
  },
  {
    id: 'aviator',
    title: 'Aviator',
    provider: 'Spribe',
    imageUrl: 'https://placehold.co/260x360?text=Aviator',
  },
];

const squareGames = [
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
    id: 'dragon-tiger',
    title: 'Dragon Tiger',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger',
  },
  {
    id: 'pok-deng',
    title: 'Pok Deng',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Pok+Deng',
  },
  {
    id: 'speed-baccarat',
    title: 'Speed Baccarat',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Speed+Baccarat',
  },
  {
    id: 'sic-bo',
    title: 'Sic Bo',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Sic+Bo',
  },
  {
    id: 'andar-bahar',
    title: 'Andar Bahar',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Andar+Bahar',
  },
  {
    id: 'teen-patti',
    title: 'Teen Patti',
    provider: 'OneTouch',
    imageUrl: 'https://placehold.co/320x320?text=Teen+Patti',
  },
  {
    id: 'roulette-m',
    title: 'Roulette M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Roulette+M',
  },
  {
    id: 'dragon-tiger-m',
    title: 'Dragon Tiger M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Dragon+Tiger+M',
  },
  {
    id: 'baccarat-d06',
    title: 'Baccarat D06',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Baccarat+D06',
  },
  {
    id: 'blackjack-m',
    title: 'Blackjack M',
    provider: 'SA Gaming',
    imageUrl: 'https://placehold.co/320x320?text=Blackjack+M',
  },
];

const allGamesTwoRowItems = [
  ...squareGames,
  ...squareGames.map((item, index) => ({
    ...item,
    id: `${item.id}-dup-${index}`,
  })),
];

const providerItems = [
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
    id: 'playson',
    name: 'PLAYSON',
    logoUrl: 'https://placehold.co/260x80?text=PLAYSON',
  },
  {
    id: 'pragmatic-play',
    name: 'PRAGMATIC PLAY',
    logoUrl: 'https://placehold.co/260x80?text=PRAGMATIC+PLAY',
  },
  {
    id: 'habanero',
    name: 'HABANERO',
    logoUrl: 'https://placehold.co/260x80?text=HABANERO',
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
    id: 'onetouch',
    name: 'ONETOUCH',
    logoUrl: 'https://placehold.co/260x80?text=ONETOUCH',
  },
  {
    id: 'betsoft',
    name: 'BETSOFT',
    logoUrl: 'https://placehold.co/260x80?text=BETSOFT',
  },
  {
    id: 'booming-games',
    name: 'BOOMING GAMES',
    logoUrl: 'https://placehold.co/260x80?text=BOOMING+GAMES',
  },
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
    props: { ...args, categories, portraitGames, squareGames, providerItems, allGamesTwoRowItems },
    template: `
      <zg-casino-home-template>

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
    props: { ...args, categories, portraitGames, squareGames, providerItems, allGamesTwoRowItems },
    template: `
      <zg-casino-home-template>
        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
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
    props: { ...args, categories, portraitGames, squareGames, providerItems, allGamesTwoRowItems },
    template: `
      <zg-casino-home-template>
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
          selectedId="table"
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
    props: { ...args, categories, portraitGames },
    template: `
      <zg-casino-home-template>
        <zg-casino-home-hero zg-casino-home-template-hero></zg-casino-home-hero>
        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
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
    props: { ...args, categories, portraitGames, squareGames, allGamesTwoRowItems },
    template: `
      <zg-casino-home-template>
        <zg-casino-home-hero zg-casino-home-template-hero></zg-casino-home-hero>
        <zg-casino-search-bar zg-casino-home-template-search></zg-casino-search-bar>
        <zg-category-filter-tabs
          zg-casino-home-template-categories
          [items]="categories"
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
