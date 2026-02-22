import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { ZgCasinoHomeHeroComponent } from './casino-home-hero.component';

/**
 * Casino home hero for the casino landing page with layered background and animated character art.
 *
 * ## Usage Guide
 * **When to use:**
 * - Top hero block for the casino home page.
 * - Campaign moments where title + promotional message + character visual are needed.
 * - Pages that need a visual focus before search/categories sections.
 *
 * **When NOT to use:**
 * - Generic catalog pages without campaign storytelling.
 * - Lightweight sections where a simple banner is enough.
 *
 * ## Accessibility
 * - Uses configurable `ariaLabel` for the hero region.
 * - Keeps both background and character images with configurable `alt` text.
 * - Supports motion reduction by disabling zoom through `zoomEnabled`.
 */
const meta: Meta<ZgCasinoHomeHeroComponent> = {
  title: 'Organisms/Casino/Casino Home Hero',
  component: ZgCasinoHomeHeroComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    backgroundImageUrl: {
      control: 'text',
      table: {
        defaultValue: { summary: 'https://placehold.co/1400x700?text=Casino+Hero+Background' },
      },
    },
    backgroundImageAlt: {
      control: 'text',
      table: { defaultValue: { summary: 'Casino hero background' } },
    },
    characterImageUrl: {
      control: 'text',
      table: {
        defaultValue: { summary: 'https://placehold.co/620x720?text=Casino+Hero+Character' },
      },
    },
    characterImageAlt: {
      control: 'text',
      table: { defaultValue: { summary: 'Casino hero character' } },
    },
    title: { control: 'text', table: { defaultValue: { summary: 'CASINO' } } },
    description: {
      control: 'text',
      table: { defaultValue: { summary: 'Diversion, luck and big prizes await.' } },
    },
    highlightText: {
      control: 'text',
      table: { defaultValue: { summary: 'Start playing and win big!' } },
    },
    caption: { control: 'text', table: { defaultValue: { summary: 'Luck follows you' } } },
    minHeight: { control: 'text', table: { defaultValue: { summary: '32rem' } } },
    overlayOpacity: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      table: { defaultValue: { summary: '0.55' } },
    },
    zoomEnabled: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    zoomDurationMs: {
      control: { type: 'number', min: 1000, step: 500 },
      table: { defaultValue: { summary: '8000' } },
    },
    zoomScaleMin: {
      control: { type: 'number', min: 0.8, max: 1.1, step: 0.01 },
      table: { defaultValue: { summary: '1' } },
    },
    zoomScaleMax: {
      control: { type: 'number', min: 0.9, max: 1.2, step: 0.01 },
      table: { defaultValue: { summary: '1.06' } },
    },
    ariaLabel: { control: 'text', table: { defaultValue: { summary: 'Casino home hero' } } },
  },
  args: {
    backgroundImageUrl: 'https://placehold.co/1400x700?text=Casino+Background',
    backgroundImageAlt: 'Green casino hall background',
    characterImageUrl: 'https://placehold.co/620x720?text=Casino+Character+Pack',
    characterImageAlt: 'Main casino campaign characters',
    title: 'CASINO',
    description: 'Diversion, luck and big prizes await.',
    highlightText: 'Start playing and win big!',
    caption: 'Luck follows you',
    minHeight: '32rem',
    overlayOpacity: 0.55,
    zoomEnabled: true,
    zoomDurationMs: 8000,
    zoomScaleMin: 1,
    zoomScaleMax: 1.06,
    ariaLabel: 'Casino home hero',
  },
};

export default meta;
type Story = StoryObj<ZgCasinoHomeHeroComponent>;

export const Default: Story = {};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-casino-home-hero
          title="CASINO"
          description="Diversion, luck and big prizes await."
          highlightText="Start playing and win big!"
          caption="Luck follows you"
          backgroundImageUrl="https://placehold.co/1400x700?text=Main+Campaign"
          characterImageUrl="https://placehold.co/620x720?text=Characters+A"
        ></zg-casino-home-hero>
        <zg-casino-home-hero
          title="LIVE CASINO"
          description="Real tables and fast rounds."
          highlightText="Join live action now!"
          caption="Always open"
          backgroundImageUrl="https://placehold.co/1400x700?text=Live+Campaign"
          characterImageUrl="https://placehold.co/620x720?text=Characters+B"
        ></zg-casino-home-hero>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-casino-home-hero
          title="CASINO"
          description="Calmer hero with reduced motion."
          highlightText="Static campaign visual."
          caption="Motion reduced"
          [zoomEnabled]="false"
        ></zg-casino-home-hero>
        <zg-casino-home-hero
          title="CASINO"
          description="High-contrast overlay for readability."
          highlightText="Text focused variant."
          caption="High contrast"
          [overlayOpacity]="0.72"
        ></zg-casino-home-hero>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heroes = canvas.getAllByLabelText(/casino home hero/i);
    const characterImages = canvas.getAllByAltText(/casino hero character/i);

    await expect(heroes.length).toBe(2);
    await expect(
      characterImages[0].classList.contains('zg-casino-home-hero__character--zoom'),
    ).toBe(false);
  },
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-casino-home-hero minHeight="24rem"></zg-casino-home-hero>
        <zg-casino-home-hero minHeight="36rem"></zg-casino-home-hero>
      </div>
    `,
  }),
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <zg-casino-home-hero
          title="CASINO"
          description="Diversion, luck and big prizes await."
          highlightText="Start playing and win big!"
          caption="Luck follows you"
        ></zg-casino-home-hero>
        <div style="padding:var(--zg-spacing-2);background:var(--zg-color-surface);border-radius:var(--zg-radius-md);">
          Hero sits above search and category sections in page composition.
        </div>
      </div>
    `,
  }),
};

export const EmptyAndEdgeCases: Story = {
  parameters: { controls: { disable: true } },
  args: {
    title: '',
    description: '',
    highlightText: '',
    caption: '',
    backgroundImageUrl: 'https://placehold.co/1400x700?text=Fallback+Background',
    characterImageUrl: 'https://placehold.co/620x720?text=Fallback+Character',
  },
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      zoomEnabled: true,
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <button style="width:max-content;" (click)="zoomEnabled = !zoomEnabled">
          Toggle zoom
        </button>
        <zg-casino-home-hero [zoomEnabled]="zoomEnabled"></zg-casino-home-hero>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle zoom/i });
    const character = canvas.getByAltText(/casino hero character/i);

    await expect(character.classList.contains('zg-casino-home-hero__character--zoom')).toBe(true);
    await userEvent.click(toggle);
    await waitFor(() => {
      expect(character.classList.contains('zg-casino-home-hero__character--zoom')).toBe(false);
    });
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  args: {
    ariaLabel: 'Casino campaign hero',
    title: 'CASINO',
    description: 'Diversion, luck and big prizes await.',
    highlightText: 'Start playing and win big!',
    caption: 'Luck follows you',
    backgroundImageAlt: 'Casino hall lights in green tone',
    characterImageAlt: 'Featured casino campaign characters',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hero = canvas.getByLabelText(/casino campaign hero/i);
    const heading = canvas.getByRole('heading', { level: 1, name: /casino/i });
    const character = canvas.getByAltText(/featured casino campaign characters/i);

    await expect(hero).toBeTruthy();
    await expect(heading).toBeTruthy();
    await expect(character).toBeTruthy();
  },
};
