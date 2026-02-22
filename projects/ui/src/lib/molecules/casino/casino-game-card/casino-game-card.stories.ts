import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucidePlay } from '@ng-icons/lucide';
import { ZgCasinoGameCardComponent } from './casino-game-card.component';

/**
 * Casino game card for lobby/catalog scenarios.
 *
 * ## Usage Guide
 * **When to use:**
 * - Showing game thumbnails in catalog/grid sections.
 * - Exposing primary action (`playClicked`) and optional favorite toggle.
 * - Composing badges/icons through projected slots.
 *
 * **When NOT to use:**
 * - For non-game cards or generic product cards without casino semantics.
 * - For business-rule orchestration (auth, limits, segmentation). Keep that in containers.
 *
 * ## Accessibility
 * - Uses native `button` elements for actions.
 * - Exposes `playAriaLabel` and `favoriteAriaLabel`.
 * - Supports `aria-pressed` for favorite toggle state.
 */
const meta: Meta<ZgCasinoGameCardComponent> = {
  title: 'Molecules/Casino/Game Card',
  component: ZgCasinoGameCardComponent,
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
      imports: [NgIconComponent],
      providers: [provideIcons({ lucideHeart, lucidePlay })],
    }),
    (story) => {
      const storyObj = story();
      return {
        ...storyObj,
        template: `<div style="max-width: 200px;">${storyObj.template}</div>`,
      };
    },
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Game title',
      table: { defaultValue: { summary: '' } },
    },
    provider: {
      control: 'text',
      description: 'Game provider name',
      table: { defaultValue: { summary: '' } },
    },
    imageUrl: {
      control: 'text',
      description: 'Game cover image URL',
      table: { defaultValue: { summary: '' } },
    },
    imageAlt: {
      control: 'text',
      description: 'Alternative text for image',
      table: { defaultValue: { summary: '' } },
    },
    ctaLabel: {
      control: 'text',
      description: 'Play button label',
      table: { defaultValue: { summary: 'Play now' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    favorite: {
      control: 'boolean',
      description: 'Favorite state',
      table: { defaultValue: { summary: 'false' } },
    },
    showFavorite: {
      control: 'boolean',
      description: 'Show or hide favorite button',
      table: { defaultValue: { summary: 'true' } },
    },
    aspectRatio: {
      control: 'select',
      options: ['portrait', 'square'],
      description: 'Media aspect ratio',
      table: { defaultValue: { summary: 'portrait' } },
    },
    playAriaLabel: {
      control: 'text',
      description: 'Accessible label for play action',
      table: { defaultValue: { summary: 'Play game' } },
    },
    favoriteAriaLabel: {
      control: 'text',
      description: 'Accessible label for favorite action',
      table: { defaultValue: { summary: 'Toggle favorite' } },
    },
    playClicked: {
      action: 'playClicked',
      description: 'Emitted when play button is clicked',
      table: { category: 'Events' },
    },
    favoriteClicked: {
      action: 'favoriteClicked',
      description: 'Emitted when favorite button is clicked',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<ZgCasinoGameCardComponent>;

export const Default: Story = {
  args: {
    title: 'Aviator',
    provider: 'Spribe',
    imageUrl: 'https://placehold.co/300x400?text=Aviator',
    ctaLabel: 'Play now',
    disabled: false,
    favorite: false,
    showFavorite: true,
    aspectRatio: 'portrait',
    imageAlt: '',
    playAriaLabel: 'Play game',
    favoriteAriaLabel: 'Toggle favorite',
  },
};

export const Variants: Story = {
  name: 'Variants (Aspect Ratios)',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary); font-weight: var(--zg-font-weight-medium);">
        <div>
          <div style="margin-bottom: var(--zg-spacing-2);">Portrait ratio</div>
          <zg-casino-game-card
            title="Aviator"
            provider="Spribe"
            imageUrl="https://placehold.co/300x400?text=Aviator"
            aspectRatio="portrait"
          ></zg-casino-game-card>
        </div>
        <div>
          <div style="margin-bottom: var(--zg-spacing-2);">Square ratio</div>
          <zg-casino-game-card
            title="Aviator"
            provider="Spribe"
            imageUrl="https://placehold.co/320x320?text=Aviator"
            aspectRatio="square"
          ></zg-casino-game-card>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4); max-width: 200px;">
        <zg-casino-game-card
          title="Aviator"
          provider="Spribe"
          imageUrl="https://placehold.co/300x400?text=Aviator"
          [favorite]="false"
          favoriteAriaLabel="Toggle favorite"
        ></zg-casino-game-card>
        <zg-casino-game-card
          title="Aviator"
          provider="Spribe"
          imageUrl="https://placehold.co/300x400?text=Aviator"
          [favorite]="true"
          favoriteAriaLabel="Toggle favorite"
        ></zg-casino-game-card>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const favoriteButtons = canvas.getAllByRole('button', { name: /toggle favorite/i });
    await expect(favoriteButtons[0]).toHaveAttribute('aria-pressed', 'false');
    await expect(favoriteButtons[1]).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  parameters: {
    controls: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /play game/i })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /toggle favorite/i })).toBeDisabled();
  },
};

export const Composition: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: (args) => ({
    props: args,
    template: `
      <zg-casino-game-card
        [title]="title"
        [provider]="provider"
        [imageUrl]="imageUrl"
        [favorite]="favorite"
        [aspectRatio]="aspectRatio"
      >
        <span
          badge
          style="
            padding: var(--zg-spacing-1) var(--zg-spacing-2);
            border-radius: var(--zg-radius-full);
            background: var(--zg-color-bg-dark);
            color: var(--zg-color-text-inverse);
            font-size: var(--zg-font-size-sm);
            font-weight: var(--zg-font-weight-medium);
          "
        >
          Top 10
        </span>
        <ng-icon favorite-icon name="lucideHeart" size="1rem" aria-hidden="true"></ng-icon>
        <ng-icon play-icon name="lucidePlay" size="1rem" aria-hidden="true"></ng-icon>
      </zg-casino-game-card>
    `,
  }),
  args: {
    ...Default.args,
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <zg-casino-game-card
        title="Aviator"
        provider="Spribe"
        imageUrl="https://placehold.co/300x400?text=Aviator"
        playAriaLabel="Play Aviator game"
        favoriteAriaLabel="Mark Aviator as favorite"
        data-testid="a11y-card"
      ></zg-casino-game-card>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const playButton = canvas.getByRole('button', { name: /play aviator game/i });
    const favoriteButton = canvas.getByRole('button', { name: /mark aviator as favorite/i });

    await expect(playButton).toHaveAttribute('type', 'button');
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'false');
  },
};
