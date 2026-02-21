import type { Meta, StoryObj } from '@storybook/angular';
import { ZgGameCardComponent } from './game-card.component';

const meta: Meta<ZgGameCardComponent> = {
  title: 'Molecules/Game Card',
  component: ZgGameCardComponent,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      ...story(),
      template: `<div style="max-width: 220px;">${story().template}</div>`,
    }),
  ],
  argTypes: {
    playClicked: { action: 'playClicked' },
    favoriteToggled: { action: 'favoriteToggled' },
    aspectRatio: {
      control: 'select',
      options: ['portrait', 'square'],
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
    ctaLabel: 'Jugar ahora',
    disabled: false,
    favorite: false,
    showFavorite: true,
    aspectRatio: 'portrait',
  },
};

export const Favorite: Story = {
  args: {
    ...Default.args,
    favorite: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const SquareRatio: Story = {
  args: {
    ...Default.args,
    imageUrl: 'https://api-casino.zgames.tech/images/aleaplay/square/carnival_treasure.webp',
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
        <span badge style="padding: 2px 8px; border-radius: 9999px; background: #111; color: #fff; font-size: 12px;">Top 10</span>
        <span favorite-icon aria-hidden="true">★</span>
        <span play-icon aria-hidden="true">▶</span>
      </zg-game-card>
    `,
  }),
  args: {
    ...Default.args,
  },
};
