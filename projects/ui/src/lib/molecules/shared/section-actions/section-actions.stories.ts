import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { ZgSectionTitleComponent } from '../../../atoms/section-title/section-title.component';
import { ZgSectionActionsComponent } from './section-actions.component';

/**
 * Section actions molecule for repeated header action blocks.
 *
 * ## Usage Guide
 * **When to use:**
 * - Section controls with one primary action and previous/next navigation.
 * - Carousels or lists requiring a compact control cluster.
 * - Header action areas where container handles business logic.
 *
 * **When NOT to use:**
 * - Page-level navigation with routing concerns.
 * - Domain-specific action bars with business logic embedded.
 *
 * ## Accessibility
 * - Wraps controls in a semantic `role="group"` with configurable label.
 * - Uses native button behavior through `zg-button`.
 * - Supports independent aria labels for each action.
 */
const meta: Meta<ZgSectionActionsComponent> = {
  title: 'Molecules/Shared/Section Actions',
  component: ZgSectionActionsComponent,
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
      providers: [provideIcons({ lucideArrowRight, lucideChevronLeft, lucideChevronRight })],
    }),
  ],
  argTypes: {
    allLabel: {
      control: 'text',
      description: 'Main action label',
      table: { defaultValue: { summary: 'All' } },
    },
    prevLabel: {
      control: 'text',
      description: 'Previous button label',
      table: { defaultValue: { summary: '‹' } },
    },
    nextLabel: {
      control: 'text',
      description: 'Next button label',
      table: { defaultValue: { summary: '›' } },
    },
    allContentTemplate: {
      control: false,
      description: 'Optional TemplateRef for the main action content',
      table: { type: { summary: 'TemplateRef<unknown> | null' } },
    },
    prevContentTemplate: {
      control: false,
      description: 'Optional TemplateRef for the previous action content',
      table: { type: { summary: 'TemplateRef<unknown> | null' } },
    },
    nextContentTemplate: {
      control: false,
      description: 'Optional TemplateRef for the next action content',
      table: { type: { summary: 'TemplateRef<unknown> | null' } },
    },
    allAriaLabel: {
      control: 'text',
      description: 'ARIA label for main action',
      table: { defaultValue: { summary: 'View all' } },
    },
    prevAriaLabel: {
      control: 'text',
      description: 'ARIA label for previous action',
      table: { defaultValue: { summary: 'Previous' } },
    },
    nextAriaLabel: {
      control: 'text',
      description: 'ARIA label for next action',
      table: { defaultValue: { summary: 'Next' } },
    },
    groupAriaLabel: {
      control: 'text',
      description: 'ARIA label for action group',
      table: { defaultValue: { summary: 'Section actions' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Shared size for all internal buttons',
      table: { defaultValue: { summary: 'md' } },
    },
    fontFamily: {
      control: 'select',
      options: ['base', 'secondary'],
      description: 'Shared font family variant',
      table: { defaultValue: { summary: 'base' } },
    },
    allVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'danger', 'ghost', 'gradient'],
      description: 'Variant for main action button',
      table: { defaultValue: { summary: 'primary' } },
    },
    navVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'danger', 'ghost', 'gradient'],
      description: 'Variant for navigation buttons',
      table: { defaultValue: { summary: 'secondary' } },
    },
    allShape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Shape for main action button',
      table: { defaultValue: { summary: 'pill' } },
    },
    navShape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Shape for navigation buttons',
      table: { defaultValue: { summary: 'square' } },
    },
    disableAll: {
      control: 'boolean',
      description: 'Disables main action button',
      table: { defaultValue: { summary: 'false' } },
    },
    disablePrev: {
      control: 'boolean',
      description: 'Disables previous navigation button',
      table: { defaultValue: { summary: 'false' } },
    },
    disableNext: {
      control: 'boolean',
      description: 'Disables next navigation button',
      table: { defaultValue: { summary: 'false' } },
    },
    allClicked: {
      action: 'allClicked',
      description: 'Emitted when main action is clicked',
      table: { category: 'Events' },
    },
    prevClicked: {
      action: 'prevClicked',
      description: 'Emitted when previous action is clicked',
      table: { category: 'Events' },
    },
    nextClicked: {
      action: 'nextClicked',
      description: 'Emitted when next action is clicked',
      table: { category: 'Events' },
    },
  },
};

export default meta;
type Story = StoryObj<ZgSectionActionsComponent>;

export const Default: Story = {
  args: {
    allLabel: 'All',
    prevLabel: '‹',
    nextLabel: '›',
    allAriaLabel: 'View all',
    prevAriaLabel: 'Previous',
    nextAriaLabel: 'Next',
    groupAriaLabel: 'Section actions',
    size: 'md',
    fontFamily: 'base',
    allVariant: 'primary',
    navVariant: 'secondary',
    allShape: 'pill',
    navShape: 'square',
    disableAll: false,
    disablePrev: false,
    disableNext: false,
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <zg-section-actions allLabel="All" allVariant="primary" navVariant="secondary"></zg-section-actions>
        <zg-section-actions allLabel="Explore" allVariant="accent" navVariant="ghost"></zg-section-actions>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <zg-section-actions size="sm"></zg-section-actions>
        <zg-section-actions size="md"></zg-section-actions>
        <zg-section-actions size="lg"></zg-section-actions>
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
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <zg-section-actions data-testid="all-enabled"></zg-section-actions>
        <zg-section-actions data-testid="nav-disabled" [disablePrev]="true" [disableNext]="true"></zg-section-actions>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole('group');
    const enabledButtons = groups[0].querySelectorAll('button');
    const disabledButtons = groups[1].querySelectorAll('button');

    await expect(enabledButtons[0]).not.toBeDisabled();
    await expect(disabledButtons[1]).toBeDisabled();
    await expect(disabledButtons[2]).toBeDisabled();
  },
};

export const Composition: Story = {
  parameters: {
    controls: { disable: true },
  },
  decorators: [
    moduleMetadata({
      imports: [ZgSectionTitleComponent, NgIconComponent],
      providers: [provideIcons({ lucideArrowRight, lucideChevronLeft, lucideChevronRight })],
    }),
  ],
  render: () => ({
    template: `
      <ng-template #allTpl>
        <span style="display: inline-flex; align-items: center; gap: var(--zg-spacing-2);">
          All games
          <ng-icon name="lucideArrowRight" size="1rem" aria-hidden="true"></ng-icon>
        </span>
      </ng-template>
      <ng-template #prevTpl>
        <ng-icon name="lucideChevronLeft" size="1rem" aria-hidden="true"></ng-icon>
      </ng-template>
      <ng-template #nextTpl>
        <ng-icon name="lucideChevronRight" size="1rem" aria-hidden="true"></ng-icon>
      </ng-template>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--zg-spacing-4);
          width: min(100%, 36rem);
        "
      >
        <zg-section-title label="Most Bet Games" [showAccent]="true"></zg-section-title>
        <zg-section-actions
          [allContentTemplate]="allTpl"
          [prevContentTemplate]="prevTpl"
          [nextContentTemplate]="nextTpl"
          allAriaLabel="View all games"
          prevAriaLabel="Previous games"
          nextAriaLabel="Next games"
        ></zg-section-actions>
      </div>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    props: {
      navDisabled: false,
      toggleNavDisabled: function () {
        this['navDisabled'] = !this['navDisabled'];
      },
    },
    template: `
      <div style="display: grid; gap: var(--zg-spacing-3);">
        <button
          type="button"
          (click)="toggleNavDisabled()"
          style="
            width: fit-content;
            padding: var(--zg-spacing-2) var(--zg-spacing-3);
            border: 1px solid var(--zg-color-border);
            border-radius: var(--zg-radius-sm);
            background: var(--zg-color-surface);
            color: var(--zg-color-text-primary);
          "
        >
          Toggle nav disabled
        </button>

        <zg-section-actions
          data-testid="interactive-actions"
          [disablePrev]="navDisabled"
          [disableNext]="navDisabled"
        ></zg-section-actions>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle nav disabled/i });
    const actionsHost = canvas.getByTestId('interactive-actions');
    const getNavButtons = () => actionsHost.querySelectorAll('button');

    await expect(getNavButtons()[1]).not.toBeDisabled();
    await expect(getNavButtons()[2]).not.toBeDisabled();

    await userEvent.click(toggle);
    await expect(getNavButtons()[1]).toBeDisabled();
    await expect(getNavButtons()[2]).toBeDisabled();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <zg-section-actions
        allLabel="View all top games"
        prevLabel="Previous games"
        nextLabel="Next games"
        groupAriaLabel="Top games actions"
        allAriaLabel="View all top games"
        prevAriaLabel="Go to previous games"
        nextAriaLabel="Go to next games"
      ></zg-section-actions>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group', { name: /top games actions/i });
    const allButton = canvas.getByRole('button', { name: /view all top games/i });
    const prevButton = canvas.getByRole('button', { name: /previous games/i });
    const nextButton = canvas.getByRole('button', { name: /next games/i });

    await expect(group).toBeTruthy();
    await expect(allButton).toHaveAttribute('type', 'button');
    await expect(prevButton).toHaveAttribute('type', 'button');
    await expect(nextButton).toHaveAttribute('type', 'button');
  },
};
