import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucidePlay, lucideTag } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import {
  type CategoryFilterTabItem,
  ZgCategoryFilterTabsComponent,
} from './category-filter-tabs.component';

const sampleItems: CategoryFilterTabItem[] = [
  { id: 'all', label: 'All games' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live casino' },
  { id: 'crash', label: 'Crash' },
];

const meta: Meta<ZgCategoryFilterTabsComponent> = {
  title: 'Molecules/Shared/Category Filter Tabs',
  component: ZgCategoryFilterTabsComponent,
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
      providers: [provideIcons({ lucideTag, lucidePlay, lucideHeart })],
    }),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Filter categories to render',
    },
    selectedId: {
      control: 'text',
      description: 'Selected category id',
    },
    chipVariant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual variant forwarded to chip',
      table: { defaultValue: { summary: 'ghost' } },
    },
    chipSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size forwarded to chip',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all tabs',
      table: { defaultValue: { summary: 'false' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for tab group',
      table: { defaultValue: { summary: 'Category filters' } },
    },
    selectedIdChange: {
      action: 'selectedIdChange',
      description: 'Emitted when selected category changes',
      table: { category: 'Events' },
    },
    changed: {
      action: 'changed',
      description:
        'Emitted when a category tab is clicked, including clicks on the already-selected item',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<ZgCategoryFilterTabsComponent>;

export const Default: Story = {
  args: {
    items: sampleItems,
    selectedId: 'all',
    chipVariant: 'ghost',
    chipSize: 'md',
    disabled: false,
    ariaLabel: 'Casino categories',
  },
};

export const VariantStyles: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3);">
        <zg-category-filter-tabs
          [items]="items"
          selectedId="all"
          chipVariant="ghost"
          ariaLabel="Ghost categories"
        ></zg-category-filter-tabs>
        <zg-category-filter-tabs
          [items]="items"
          selectedId="all"
          chipVariant="outlined"
          ariaLabel="Outlined categories"
        ></zg-category-filter-tabs>
      </div>
    `,
    props: {
      items: sampleItems,
    },
  }),
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: 'all', label: 'All games' },
      { id: 'slots', label: 'Slots' },
      { id: 'live', label: 'Live casino', disabled: true },
      { id: 'crash', label: 'Crash', disabled: true },
    ],
    selectedId: 'slots',
    chipVariant: 'ghost',
    chipSize: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await expect(buttons[2]).toBeDisabled();
    await expect(buttons[3]).toBeDisabled();
  },
};

export const WithIconTemplates: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <ng-template #allIcon>
        <ng-icon name="lucideTag" size="1rem" aria-hidden="true"></ng-icon>
      </ng-template>
      <ng-template #slotsIcon>
        <ng-icon name="lucidePlay" size="1rem" aria-hidden="true"></ng-icon>
      </ng-template>
      <ng-template #liveIcon>
        <ng-icon name="lucideHeart" size="1rem" aria-hidden="true"></ng-icon>
      </ng-template>

      <zg-category-filter-tabs
        [items]="[
          { id: 'all', label: 'All games', iconTemplate: allIcon },
          { id: 'slots', label: 'Slots', iconTemplate: slotsIcon },
          { id: 'live', label: 'Live casino', iconTemplate: liveIcon }
        ]"
        selectedId="slots"
        ariaLabel="Category filters with icon templates"
      ></zg-category-filter-tabs>
    `,
  }),
};

export const InteractiveSelection: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      selectedId: 'all',
      items: sampleItems,
      onSelectedIdChange: function (id: string) {
        this['selectedId'] = id;
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-2);">
        <zg-category-filter-tabs
          [items]="items"
          [selectedId]="selectedId"
          (selectedIdChange)="onSelectedIdChange($event)"
        ></zg-category-filter-tabs>
        <div style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-secondary);">
          Selected: {{ selectedId }}
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slotsButton = canvas.getByRole('button', { name: /slots/i });
    await userEvent.click(slotsButton);
    await expect(canvas.getByText(/selected: slots/i)).toBeTruthy();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3);">
        <zg-category-filter-tabs
          [items]="items"
          selectedId="all"
          ariaLabel="Casino category filters"
          data-testid="category-tabs-a11y"
        ></zg-category-filter-tabs>
      </div>
    `,
    props: {
      items: sampleItems,
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByLabelText(/casino category filters/i);
    const allButton = canvas.getByRole('button', { name: /all games/i });
    const slotsButton = canvas.getByRole('button', { name: /slots/i });

    await expect(nav.tagName.toLowerCase()).toBe('nav');
    await expect(allButton).toHaveAttribute('aria-pressed', 'true');
    await expect(slotsButton).toHaveAttribute('aria-pressed', 'false');
  },
};
