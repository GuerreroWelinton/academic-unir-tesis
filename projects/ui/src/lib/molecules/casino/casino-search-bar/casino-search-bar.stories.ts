import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgCasinoSearchBarComponent } from './casino-search-bar.component';

/**
 * Casino search bar molecule for game filtering entry points.
 *
 * ## Usage Guide
 * **When to use:**
 * - Search entry for casino pages where users need to quickly find games by name.
 * - Controlled UIs where the container handles query state and filtering logic.
 * - Composition scenarios that reuse `zg-input` behavior with a casino-specific shell.
 *
 * **When NOT to use:**
 * - Generic non-casino forms that need multiple fields and validation flows.
 * - Business logic ownership (API calls, filtering strategy) inside the UI component.
 *
 * ## Accessibility
 * - Uses a semantic `form` with `role="search"`.
 * - Relies on `zg-input` accessible behavior (placeholder/label and clear control).
 * - Supports disabled state and keyboard submit with Enter.
 */
const meta: Meta<ZgCasinoSearchBarComponent> = {
  title: 'Molecules/Casino/Casino Search Bar',
  component: ZgCasinoSearchBarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    query: {
      control: 'text',
      description: 'Controlled query value',
      table: { defaultValue: { summary: "''" } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when query is empty',
      table: { defaultValue: { summary: 'Search games' } },
    },
    providersLabel: {
      control: 'text',
      description: 'Label for the providers action button',
      table: { defaultValue: { summary: 'PROVIDERS' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the search input and submit behavior',
      table: { defaultValue: { summary: 'false' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the search region',
      table: { defaultValue: { summary: 'Casino game search' } },
    },
    providersAriaLabel: {
      control: 'text',
      description: 'Accessible label for the providers action',
      table: { defaultValue: { summary: 'Open providers filter' } },
    },
    queryChange: {
      action: 'queryChange',
      description: 'Emitted when query value changes',
      table: { category: 'Events' },
    },
    changed: {
      action: 'changed',
      description: 'Emitted on each query change',
      table: { category: 'Events' },
    },
    searched: {
      action: 'searched',
      description: 'Emitted when the search form is submitted',
      table: { category: 'Events' },
    },
    cleared: {
      action: 'cleared',
      description: 'Emitted when clear control is triggered',
      table: { category: 'Events' },
    },
    providersClicked: {
      action: 'providersClicked',
      description: 'Emitted when users click the providers action button',
      table: { category: 'Events' },
    },
  },
  args: {
    query: '',
    placeholder: 'Search games',
    providersLabel: 'PROVIDERS',
    disabled: false,
    ariaLabel: 'Casino game search',
    providersAriaLabel: 'Open providers filter',
  },
};

export default meta;
type Story = StoryObj<ZgCasinoSearchBarComponent>;

export const Default: Story = {};

export const Placeholders: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);max-width:36rem;">
        <zg-casino-search-bar placeholder="Search games"></zg-casino-search-bar>
        <zg-casino-search-bar placeholder="Search by provider or game"></zg-casino-search-bar>
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
      <div style="display:grid;gap:var(--zg-spacing-3);max-width:36rem;">
        <zg-casino-search-bar data-testid="enabled-search"></zg-casino-search-bar>
        <zg-casino-search-bar data-testid="disabled-search" [disabled]="true"></zg-casino-search-bar>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enabledInput = canvas.getByTestId('enabled-search').querySelector('input');
    const disabledInput = canvas.getByTestId('disabled-search').querySelector('input');
    const enabledButton = canvas.getByTestId('enabled-search').querySelector('button');
    const disabledButton = canvas.getByTestId('disabled-search').querySelector('button');

    await expect(enabledInput).not.toBeDisabled();
    await expect(disabledInput).toBeDisabled();
    await expect(enabledButton).not.toBeDisabled();
    await expect(disabledButton).toBeDisabled();
  },
};

export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      query: 'Aviator',
    },
    template: `
      <div style="max-width:36rem;">
        <zg-casino-search-bar [query]="query"></zg-casino-search-bar>
      </div>
    `,
  }),
};

export const EmptyAndEdgeCases: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);max-width:36rem;">
        <zg-casino-search-bar placeholder=""></zg-casino-search-bar>
        <zg-casino-search-bar [query]="'   '"></zg-casino-search-bar>
      </div>
    `,
  }),
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="max-width:36rem;">
        <zg-casino-search-bar
          ariaLabel="Game search region"
          placeholder="Search games"
        ></zg-casino-search-bar>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchRegion = canvas.getByRole('search', { name: /game search region/i });
    const input = canvas.getByRole('searchbox');

    await expect(searchRegion).toBeTruthy();
    await expect(input).toHaveAttribute('placeholder', 'Search games');
  },
};

export const SubmitInteraction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="max-width:36rem;">
        <zg-casino-search-bar placeholder="Type and press Enter"></zg-casino-search-bar>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');

    await userEvent.type(input, 'roulette{enter}');
    await expect(input).toHaveValue('roulette');
  },
};

export const ProvidersAction: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="max-width:64rem;">
        <zg-casino-search-bar providersLabel="PROVIDERS"></zg-casino-search-bar>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /providers/i });
    await expect(button).toBeTruthy();
  },
};
