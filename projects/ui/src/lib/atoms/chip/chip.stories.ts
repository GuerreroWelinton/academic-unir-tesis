import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgChipComponent } from './chip.component';

/**
 * Chip component for interactive filters, tags, and selections.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Filtering content (category filters, game type filters)
 * - Displaying selected options in multi-select scenarios
 * - Representing tags that can be added/removed
 * - Navigation pills/tabs for content sections
 * - Interactive category chips in iGaming (Sports, Slots, Live Casino)
 *
 * **When NOT to use:**
 * - For static labels or status indicators (use Badge instead)
 * - For primary actions (use Button instead)
 * - For complex multi-step forms (consider other input types)
 * - Non-interactive tags (use Badge instead)
 *
 * ## Accessibility
 * - ✅ Uses native `<button>` element for full keyboard support
 * - ✅ `aria-pressed` indicates selected state
 * - ✅ `type="button"` prevents form submission
 * - ✅ Fully navigable with keyboard (Enter/Space)
 * - ✅ Visible focus state
 * - ✅ Disabled state prevents all interaction
 * - 💡 Use descriptive text (avoid single letters)
 * - 💡 Consider grouping chips with fieldset/legend for filters
 */
const meta: Meta<ZgChipComponent> = {
  title: 'Atoms/Chip',
  component: ZgChipComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual variant of the chip',
      table: {
        defaultValue: { summary: 'filled' },
        type: { summary: 'ChipVariant' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chip',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'ChipSize' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is in a selected state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    text: {
      control: 'text',
      description: 'Chip text content (alternative to ng-content)',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    clicked: {
      action: 'clicked',
      description: 'Emitted when the chip is clicked',
      table: {
        category: 'Events',
      },
    },
    selectedChange: {
      action: 'selectedChange',
      description: 'Emitted when the selected state changes (enables two-way binding)',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZgChipComponent>;

/**
 * Default chip with filled variant
 */
export const Default: Story = {
  args: {
    text: 'Sports',
    variant: 'filled',
    size: 'md',
    selected: false,
    disabled: false,
  },
};

/**
 * All chip variants side by side
 */
export const Variants: Story = {
  name: 'Variants',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <zg-chip variant="filled">Filled</zg-chip>
        <zg-chip variant="outlined">Outlined</zg-chip>
        <zg-chip variant="ghost">Ghost</zg-chip>
      </div>
    `,
  }),
};

/**
 * All chip sizes side by side
 */
export const Sizes: Story = {
  name: 'Sizes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <zg-chip size="sm">Small</zg-chip>
        <zg-chip size="md">Medium</zg-chip>
        <zg-chip size="lg">Large</zg-chip>
      </div>
    `,
  }),
};

/**
 * Chip states: normal, selected, disabled
 */
export const States: Story = {
  name: 'States',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <zg-chip>Normal</zg-chip>
        <zg-chip [selected]="true">Selected</zg-chip>
        <zg-chip [disabled]="true">Disabled</zg-chip>
        <zg-chip [selected]="true" [disabled]="true">Selected + Disabled</zg-chip>
      </div>
    `,
  }),
};

/**
 * Selected state variations across all variants
 */
export const SelectedVariants: Story = {
  name: 'Selected Variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <span style="width: 100%; font-weight: 600;">Filled:</span>
          <zg-chip variant="filled">Not Selected</zg-chip>
          <zg-chip variant="filled" [selected]="true">Selected</zg-chip>
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <span style="width: 100%; font-weight: 600;">Outlined:</span>
          <zg-chip variant="outlined">Not Selected</zg-chip>
          <zg-chip variant="outlined" [selected]="true">Selected</zg-chip>
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <span style="width: 100%; font-weight: 600;">Ghost:</span>
          <zg-chip variant="ghost">Not Selected</zg-chip>
          <zg-chip variant="ghost" [selected]="true">Selected</zg-chip>
        </div>
      </div>
    `,
  }),
};

/**
 * Chips with icons using ng-content slots
 */
export const WithIcons: Story = {
  name: 'With Icons',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Icon left -->
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Example: Category chips with icons</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <zg-chip variant="filled">
              <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="7" />
              </svg>
              Sports
            </zg-chip>
            <zg-chip variant="outlined">
              <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="2" />
              </svg>
              Slots
            </zg-chip>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Example: Active filters with remove icon</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <zg-chip variant="filled">
              Category
              <svg icon-right width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" />
              </svg>
            </zg-chip>
            <zg-chip variant="outlined">
              Tag
              <svg icon-right width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" />
              </svg>
            </zg-chip>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Example: Active filters with checkmark icon</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <zg-chip variant="filled" [selected]="true">
              Active Filter
              <svg icon-right width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 8L6 11L13 4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
            </zg-chip>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Example: Active filters with both icons</h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <zg-chip variant="filled" [selected]="true">
              <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="7" />
              </svg>
              Trending
              <svg icon-right width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 8L6 11L13 4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
            </zg-chip>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Real-world examples: iGaming filters and tags
 */
export const RealWorldExamples: Story = {
  name: 'Real-world Examples',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 800px;">
        <!-- Game category filters (horizontal) -->
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Game Category Filters:</h4>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <zg-chip variant="filled" [selected]="true">All Games</zg-chip>
            <zg-chip variant="outlined">Slots</zg-chip>
            <zg-chip variant="outlined">Live Casino</zg-chip>
            <zg-chip variant="outlined">Sports</zg-chip>
            <zg-chip variant="outlined">Table Games</zg-chip>
            <zg-chip variant="outlined">Roulette</zg-chip>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Active Filters (Removable):</h4>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
            <span style="color: #666; font-size: 14px;">Applied filters:</span>
            <zg-chip variant="filled" size="sm">
              Sports
              <svg icon-right width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" />
              </svg>
            </zg-chip>
            <zg-chip variant="filled" size="sm">
              Live
              <svg icon-right width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" />
              </svg>
            </zg-chip>
            <zg-chip variant="filled" size="sm">
              Popular
              <svg icon-right width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2" />
              </svg>
            </zg-chip>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Sports Markets:</h4>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <zg-chip variant="ghost">
              <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="7" />
              </svg>
              Football
            </zg-chip>
            <zg-chip variant="ghost" [selected]="true">
              <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="7" />
              </svg>
              Basketball
            </zg-chip>
            <zg-chip variant="ghost">
              <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="7" />
              </svg>
              Tennis
            </zg-chip>
          </div>
        </div>

        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Size Variations:</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span style="width: 100px; color: #666; font-size: 14px;">Small:</span>
              <zg-chip size="sm">New</zg-chip>
              <zg-chip size="sm">Trending</zg-chip>
              <zg-chip size="sm">Hot</zg-chip>
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: center;">
              <span style="width: 100px; color: #666; font-size: 14px;">Medium:</span>
              <zg-chip size="md">Featured</zg-chip>
              <zg-chip size="md">Popular</zg-chip>
              <zg-chip size="md">Live</zg-chip>
            </div>
            <div style="display: flex; gap: 1rem; align-items: center;">
              <span style="width: 100px; color: #666; font-size: 14px;">Large:</span>
              <zg-chip size="lg">Jackpot</zg-chip>
              <zg-chip size="lg">Exclusive</zg-chip>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Interactive example with click toggle (with play function)
 */
export const InteractiveToggle: Story = {
  name: 'Interactive Toggle',
  render: () => ({
    props: {
      selected1: false,
      selected2: false,
      selected3: false,
      onSelectedChange1: function (value: boolean) {
        this['selected1'] = value;
      },
      onSelectedChange2: function (value: boolean) {
        this['selected2'] = value;
      },
      onSelectedChange3: function (value: boolean) {
        this['selected3'] = value;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="margin: 0; color: #666;">Click on chips to toggle their selected state:</p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <zg-chip data-testid="chip-1" [selected]="selected1" (selectedChange)="onSelectedChange1($event)">Sports</zg-chip>
          <zg-chip data-testid="chip-2" [selected]="selected2" (selectedChange)="onSelectedChange2($event)">Slots</zg-chip>
          <zg-chip data-testid="chip-3" [selected]="selected3" (selectedChange)="onSelectedChange3($event)">Live Casino</zg-chip>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click first chip and verify it becomes selected
    const chip1 = canvas.getByTestId('chip-1').querySelector('button');
    if (chip1) {
      await userEvent.click(chip1);
      await expect(chip1).toHaveAttribute('aria-pressed', 'true');

      // Click again to deselect
      await userEvent.click(chip1);
      await expect(chip1).toHaveAttribute('aria-pressed', 'false');
    }
  },
};

/**
 * Keyboard navigation example (with play function)
 */
export const KeyboardNavigation: Story = {
  name: 'Keyboard Navigation',
  render: () => ({
    props: {
      kbSelected1: false,
      kbSelected2: false,
      kbSelected3: false,
      onKbSelectedChange1: function (value: boolean) {
        this['kbSelected1'] = value;
      },
      onKbSelectedChange2: function (value: boolean) {
        this['kbSelected2'] = value;
      },
      onKbSelectedChange3: function (value: boolean) {
        this['kbSelected3'] = value;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <p style="margin: 0; color: #666;">Use Tab to focus and Enter/Space to toggle:</p>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <zg-chip data-testid="kb-chip-1" [selected]="kbSelected1" (selectedChange)="onKbSelectedChange1($event)">First</zg-chip>
          <zg-chip data-testid="kb-chip-2" [selected]="kbSelected2" (selectedChange)="onKbSelectedChange2($event)">Second</zg-chip>
          <zg-chip data-testid="kb-chip-3" [selected]="kbSelected3" (selectedChange)="onKbSelectedChange3($event)">Third</zg-chip>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const chip = canvas.getByTestId('kb-chip-1').querySelector('button');
    if (chip) {
      // Focus the chip
      chip.focus();

      // Press Enter to toggle
      await userEvent.keyboard('{Enter}');
      await expect(chip).toHaveAttribute('aria-pressed', 'true');

      // Press Space to toggle back
      await userEvent.keyboard(' ');
      await expect(chip).toHaveAttribute('aria-pressed', 'false');
    }
  },
};

/**
 * Disabled chips do not respond to clicks (with play function)
 */
export const DisabledChip: Story = {
  name: 'Disabled State',
  render: () => ({
    props: {
      enabledSelected: false,
      disabledSelected: false,
      onEnabledSelectedChange: function (value: boolean) {
        this['enabledSelected'] = value;
      },
      onDisabledSelectedChange: function (value: boolean) {
        this['disabledSelected'] = value;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <zg-chip data-testid="enabled-chip" [selected]="enabledSelected" (selectedChange)="onEnabledSelectedChange($event)">Enabled</zg-chip>
          <zg-chip data-testid="disabled-chip" [disabled]="true" [selected]="disabledSelected" (selectedChange)="onDisabledSelectedChange($event)">Disabled</zg-chip>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Try to click disabled chip
    const disabledChip = canvas.getByTestId('disabled-chip').querySelector('button');
    if (disabledChip) {
      await userEvent.click(disabledChip);
      // Should remain unselected (aria-pressed should be false)
      await expect(disabledChip).toHaveAttribute('aria-pressed', 'false');
    }

    // Click enabled chip to verify it works
    const enabledChip = canvas.getByTestId('enabled-chip').querySelector('button');
    if (enabledChip) {
      await userEvent.click(enabledChip);
      await expect(enabledChip).toHaveAttribute('aria-pressed', 'true');
    }
  },
};
