import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgSectionTitleComponent } from '../../../atoms/section-title/section-title.component';
import {
  type CasinoProviderCarouselItem,
  ZgCasinoProviderCarouselComponent,
} from './casino-provider-carousel.component';

const baseProviders: readonly CasinoProviderCarouselItem[] = [
  { id: 'wazdan', name: 'Wazdan', logoUrl: 'https://placehold.co/120x40?text=Wazdan' },
  { id: 'kagaming', name: 'KAGaming', logoUrl: 'https://placehold.co/120x40?text=KAGaming' },
  { id: 'evoplay', name: 'Evoplay', logoUrl: 'https://placehold.co/120x40?text=Evoplay' },
  {
    id: 'ct-interactive',
    name: 'CT Interactive',
    logoUrl: 'https://placehold.co/120x40?text=CT+Interactive',
  },
  { id: 'betsoft', name: 'Betsoft', logoUrl: 'https://placehold.co/120x40?text=Betsoft' },
  { id: 'habanero', name: 'Habanero', logoUrl: 'https://placehold.co/120x40?text=Habanero' },
];

/**
 * Casino provider carousel molecule with infinite visual autoplay.
 *
 * ## Usage Guide
 * **When to use:**
 * - Displaying provider logos and names in a continuously moving horizontal rail.
 * - Casino lobby screens that need compact provider discovery.
 * - Cases where containers react to selected providers through `providerSelected`.
 *
 * **When NOT to use:**
 * - Layouts requiring full pagination mechanics and explicit navigation controls.
 * - Non-casino domain sections with different interaction or card semantics.
 *
 * ## Accessibility
 * - Providers are rendered as native `button` elements.
 * - Animation pauses on hover and focus to improve readability and keyboard usage.
 * - Exposes `ariaLabel` for the carousel region.
 */
const meta: Meta<ZgCasinoProviderCarouselComponent> = {
  title: 'Molecules/Casino/Provider Carousel',
  component: ZgCasinoProviderCarouselComponent,
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
      imports: [ZgSectionTitleComponent],
    }),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Provider items rendered in the autoplay rail',
      table: { defaultValue: { summary: '[]' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the carousel region',
      table: { defaultValue: { summary: 'Casino providers carousel' } },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when the list is empty',
      table: { defaultValue: { summary: 'No providers available' } },
    },
    animationDuration: {
      control: 'text',
      description: 'Duration used by autoplay loop animation',
      table: { defaultValue: { summary: '24s' } },
    },
    providerSelected: {
      action: 'providerSelected',
      description: 'Emitted when a provider is clicked',
      table: { category: 'Events' },
    },
  },
  args: {
    items: baseProviders,
    ariaLabel: 'Casino providers carousel',
    emptyMessage: 'No providers available',
    animationDuration: '24s',
  },
};

export default meta;
type Story = StoryObj<ZgCasinoProviderCarouselComponent>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      compactProviders: baseProviders.slice(0, 4),
      fullProviders: baseProviders,
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-4);">
        <zg-casino-provider-carousel
          [items]="compactProviders"
          ariaLabel="Compact providers"
          animationDuration="18s"
        ></zg-casino-provider-carousel>

        <zg-casino-provider-carousel
          [items]="fullProviders"
          ariaLabel="Extended providers"
          animationDuration="28s"
        ></zg-casino-provider-carousel>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      providersWithDisabled: [
        ...baseProviders.slice(0, 2),
        {
          id: 'disabled-one',
          name: 'Disabled Provider',
          logoUrl: 'https://placehold.co/120x40?text=Disabled',
          disabled: true,
        },
      ],
    },
    template: `
      <zg-casino-provider-carousel
        [items]="providersWithDisabled"
        ariaLabel="Provider states"
        data-testid="states-carousel"
      ></zg-casino-provider-carousel>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByTestId('states-carousel');
    const buttons = carousel.querySelectorAll('button.zg-casino-provider-carousel__item-button');

    await expect(buttons[0]).not.toBeDisabled();
    await expect(buttons[2]).toBeDisabled();
  },
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      compositionProviders: baseProviders,
    },
    template: `
      <section
        style="
          display:grid;
          gap:var(--zg-spacing-3);
          padding:var(--zg-spacing-4);
          border-radius:var(--zg-radius-lg);
          border:1px solid var(--zg-color-border);
          background:var(--zg-color-surface);
          overflow:hidden;
        "
      >
        <zg-section-title label="Providers" tone="primary" [showAccent]="true"></zg-section-title>
        <zg-casino-provider-carousel [items]="compositionProviders"></zg-casino-provider-carousel>
      </section>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      selectedProvider: 'None',
      providers: baseProviders,
      onProviderSelected: function (provider: CasinoProviderCarouselItem) {
        this['selectedProvider'] = provider.name;
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <div
          style="
            color:var(--zg-color-text-primary);
            font-size:var(--zg-font-size-sm);
            font-weight:var(--zg-font-weight-medium);
          "
        >
          Selected provider: {{ selectedProvider }}
        </div>

        <zg-casino-provider-carousel
          [items]="providers"
          (providerSelected)="onProviderSelected($event)"
          data-testid="interactive-carousel"
        ></zg-casino-provider-carousel>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByTestId('interactive-carousel');
    const firstButton = carousel.querySelector('button.zg-casino-provider-carousel__item-button');

    await userEvent.click(firstButton as Element);
    await expect(canvas.getByText(/selected provider:/i).textContent).toContain('Wazdan');
  },
};

export const EmptyAndEdgeCases: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-4);">
        <zg-casino-provider-carousel [items]="[]" emptyMessage="No providers loaded yet"></zg-casino-provider-carousel>
        <zg-casino-provider-carousel
          [items]="[{ id: 'solo', name: 'Only One', logoUrl: 'https://placehold.co/120x40?text=Only+One' }]"
          ariaLabel="Single provider rail"
        ></zg-casino-provider-carousel>
      </div>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      a11yProviders: baseProviders.slice(0, 3),
    },
    template: `
      <zg-casino-provider-carousel
        [items]="a11yProviders"
        ariaLabel="Casino providers autoplay rail"
      ></zg-casino-provider-carousel>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByLabelText(/casino providers autoplay rail/i);
    const button = canvas.getByRole('button', { name: /wazdan/i });

    await expect(region).toBeTruthy();
    await expect(button).toHaveAttribute('type', 'button');
  },
};
