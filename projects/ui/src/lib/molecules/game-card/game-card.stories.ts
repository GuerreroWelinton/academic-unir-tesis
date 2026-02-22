import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';
import { ZgGameCardComponent } from './game-card.component';

/**
 * Game card molecule for catalog and lobby scenarios.
 *
 * ## Purpose
 * - Display game image, title, provider, and primary call to action.
 * - Support favorite toggle and projected slots for badge/icons.
 *
 * ## Usage Guide
 * - Use `playClicked` and `favoriteClicked` outputs in a container.
 * - Keep business rules (auth, feature flags, limits) outside this component.
 *
 * ## Accessibility
 * - Uses native `button` elements for actions.
 * - Exposes `playAriaLabel` and `favoriteAriaLabel`.
 * - Supports `aria-pressed` for favorite toggle state.
 */
const meta: Meta<ZgGameCardComponent> = {
  title: 'Molecules/Game Card',
  component: ZgGameCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="max-width: 220px;">${story().template}</div>`,
    }),
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
      description: 'Alternative text for the image',
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
      description: 'Shows or hides the favorite button',
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
type Story = StoryObj<ZgGameCardComponent>;

export const Default: Story = {
  args: {
    title: 'Aviator',
    provider: 'Spribe',
    imageUrl: 'https://api-casino.zgames.tech/images/aleaplay/vertical/aviator.webp',
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

export const Favorite: Story = {
  args: {
    ...Default.args,
    favorite: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const favoriteButton = canvas.getByRole('button', { name: /toggle favorite/i });
    await expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /play game/i })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: /toggle favorite/i })).toBeDisabled();
  },
};

export const SquareRatio: Story = {
  args: {
    ...Default.args,
    imageUrl: 'https://api-casino.zgames.tech/images/aleaplay/square/aviator.webp',
    title: 'Carnival Treasure',
    provider: 'SA Gaming',
    aspectRatio: 'square',
  },
};

export const WithSlots: Story = {
  render: (args) => ({
    props: args,
    template: `
      <zg-game-card
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
            font-size: var(--zg-font-size-xs);
          "
        >
          Top 10
        </span>
        <span favorite-icon aria-hidden="true">★</span>
        <span play-icon aria-hidden="true">▶</span>
      </zg-game-card>
    `,
  }),
  args: {
    ...Default.args,
  },
};

export const WithoutFavorite: Story = {
  args: {
    ...Default.args,
    showFavorite: false,
  },
};
