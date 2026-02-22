import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { type CasinoTwoRowGamesCarouselSectionItem } from '../casino-two-row-games-carousel-section/casino-two-row-games-carousel-section.component';
import { ZgCasinoProviderParallaxShowcaseComponent } from './casino-provider-parallax-showcase.component';

const sampleItems: CasinoTwoRowGamesCarouselSectionItem[] = [
  {
    id: 'p1',
    title: 'Lucky Money',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Lucky+Money',
  },
  {
    id: 'p2',
    title: 'Gold Koi',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Gold+Koi',
  },
  {
    id: 'p3',
    title: 'Lucky Animals',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Lucky+Animals',
  },
  {
    id: 'p4',
    title: 'Chocolate Factory',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Chocolate+Factory',
  },
  {
    id: 'p5',
    title: 'Victory Horse',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Victory+Horse',
  },
  {
    id: 'p6',
    title: 'Festa Brazil',
    provider: 'KAGaming',
    imageUrl: 'https://placehold.co/320x320?text=Festa+Brazil',
  },
  {
    id: 'p7',
    title: 'Lucky Ferret',
    provider: 'Onlyplay',
    imageUrl: 'https://placehold.co/320x320?text=Lucky+Ferret',
  },
  {
    id: 'p8',
    title: 'Valentines Coins',
    provider: 'Wazdan',
    imageUrl: 'https://placehold.co/320x320?text=Valentines+Coins',
  },
];

/**
 * Featured provider parallax showcase with left visual panel and right two-row scroller.
 *
 * ## Usage Guide
 * **When to use:**
 * - Highlighting one provider campaign while keeping game cards immediately visible.
 * - Landing areas where brand storytelling and quick game access must coexist.
 *
 * **When NOT to use:**
 * - Generic non-casino hero blocks without game interactions.
 * - Lightweight sections with no need for parallax treatment.
 *
 * ## Accessibility
 * - Exposes section and CTA aria labels.
 * - Uses native button for CTA and keeps game card accessible actions.
 */
const meta: Meta<ZgCasinoProviderParallaxShowcaseComponent> = {
  title: 'Organisms/Casino/Provider Parallax Showcase',
  component: ZgCasinoProviderParallaxShowcaseComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    providerName: { control: 'text', table: { defaultValue: { summary: 'Videoslots' } } },
    backgroundImageUrl: { control: 'text' },
    items: { control: 'object' },
    ctaClicked: { action: 'ctaClicked', table: { category: 'Events' } },
    playRequested: { action: 'playRequested', table: { category: 'Events' } },
    favoriteRequested: { action: 'favoriteRequested', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<ZgCasinoProviderParallaxShowcaseComponent>;

export const Default: Story = {
  args: {
    providerName: 'Videoslots',
    backgroundImageUrl: 'https://placehold.co/1200x600?text=Videoslots+Campaign',
    items: sampleItems,
  },
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-provider-parallax-showcase
          providerName="Videoslots"
          backgroundImageUrl="https://placehold.co/1200x600?text=Videoslots"
          [items]="items"
        ></zg-casino-provider-parallax-showcase>
        <zg-casino-provider-parallax-showcase
          providerName="Pragmatic Play"
          backgroundImageUrl="https://placehold.co/1200x600?text=Pragmatic+Play"
          [items]="items"
        ></zg-casino-provider-parallax-showcase>
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
      <zg-casino-provider-parallax-showcase
        providerName="KAGaming"
        backgroundImageUrl="https://placehold.co/1200x600?text=KAGaming"
        [items]="items"
      ></zg-casino-provider-parallax-showcase>
    `,
  }),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-6);">
        <zg-casino-provider-parallax-showcase
          providerName="Videoslots"
          backgroundImageUrl="https://placehold.co/1200x600?text=Compact+Cards"
          [items]="items"
          [cardWidth]="140"
        ></zg-casino-provider-parallax-showcase>
        <zg-casino-provider-parallax-showcase
          providerName="Videoslots"
          backgroundImageUrl="https://placehold.co/1200x600?text=Regular+Cards"
          [items]="items"
          [cardWidth]="180"
        ></zg-casino-provider-parallax-showcase>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items: sampleItems },
    template: `
      <zg-casino-provider-parallax-showcase
        providerName="Featured Provider"
        backgroundImageUrl="https://placehold.co/1200x600?text=Featured+Provider"
        [items]="items"
      ></zg-casino-provider-parallax-showcase>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  args: {
    providerName: 'Videoslots',
    backgroundImageUrl: 'https://placehold.co/1200x600?text=Videoslots+Campaign',
    sectionAriaLabel: 'Featured provider games section',
    ctaAriaLabel: 'Open videoslots games',
    items: sampleItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvas.getByLabelText(/featured provider games section/i);
    const cta = canvas.getByRole('button', { name: /open videoslots games/i });

    await expect(section).toBeTruthy();
    await expect(cta).toBeTruthy();
  },
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      items: sampleItems,
      ctaCount: 0,
      onCta: function () {
        this['ctaCount'] += 1;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-casino-provider-parallax-showcase
          providerName="Videoslots"
          backgroundImageUrl="https://placehold.co/1200x600?text=Videoslots+Campaign"
          [items]="items"
          (ctaClicked)="onCta()"
        ></zg-casino-provider-parallax-showcase>
        <div>CTA clicks: {{ ctaCount }}</div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cta = canvas.getByRole('button', { name: /open provider games/i });
    await userEvent.click(cta);
    await expect(canvas.getByText(/cta clicks: 1/i)).toBeTruthy();
  },
};
