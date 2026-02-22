import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgSectionTitleComponent } from '../../../atoms/section-title/section-title.component';
import { ZgSectionActionsComponent } from './section-actions.component';

/**
 * Section actions molecule for layout-only action slots.
 *
 * ## Usage Guide
 * **When to use:**
 * - Grouping an "all" action plus previous/next actions in one header row.
 * - Compositions that should keep button API ownership in each projected button.
 * - Molecules that must avoid prop drilling from wrapper to inner atoms.
 *
 * **When NOT to use:**
 * - If you need this molecule to own business behavior.
 * - If there is no all/prev/next action structure in the UI.
 *
 * ## Accessibility
 * - Uses `role="group"` with configurable `aria-label`.
 * - Keyboard and button semantics are owned by projected `zg-button` elements.
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
      imports: [ZgButtonComponent, ZgSectionTitleComponent, NgIconComponent],
      providers: [provideIcons({ lucideArrowRight, lucideChevronLeft, lucideChevronRight })],
    }),
  ],
  argTypes: {
    groupAriaLabel: {
      control: 'text',
      description: 'ARIA label used by the action group wrapper',
      table: { defaultValue: { summary: 'Section actions' } },
    },
  },
  args: {
    groupAriaLabel: 'Section actions',
  },
};

export default meta;
type Story = StoryObj<ZgSectionActionsComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <zg-section-actions [groupAriaLabel]="groupAriaLabel">
        <zg-button
          zg-section-actions-all
          variant="primary"
          shape="pill"
          size="md"
          fontFamily="base"
          aria-label="View all games"
        >
          All
        </zg-button>
        <zg-button
          zg-section-actions-prev
          variant="secondary"
          shape="square"
          size="md"
          fontFamily="base"
          aria-label="Previous games"
        >
          ‹
        </zg-button>
        <zg-button
          zg-section-actions-next
          variant="secondary"
          shape="square"
          size="md"
          fontFamily="base"
          aria-label="Next games"
        >
          ›
        </zg-button>
      </zg-section-actions>
    `,
  }),
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: grid; gap: var(--zg-spacing-4);">
        <zg-section-actions>
          <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square">›</zg-button>
        </zg-section-actions>

        <zg-section-actions>
          <zg-button zg-section-actions-all variant="accent" shape="pill">Explore</zg-button>
          <zg-button zg-section-actions-prev variant="ghost" shape="square">‹</zg-button>
          <zg-button zg-section-actions-next variant="ghost" shape="square">›</zg-button>
        </zg-section-actions>
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
        <zg-section-actions>
          <zg-button zg-section-actions-all variant="primary" shape="pill" size="sm">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" size="sm">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" size="sm">›</zg-button>
        </zg-section-actions>

        <zg-section-actions>
          <zg-button zg-section-actions-all variant="primary" shape="pill" size="md">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" size="md">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" size="md">›</zg-button>
        </zg-section-actions>

        <zg-section-actions>
          <zg-button zg-section-actions-all variant="primary" shape="pill" size="lg">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" size="lg">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" size="lg">›</zg-button>
        </zg-section-actions>
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
        <zg-section-actions data-testid="all-enabled">
          <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square">›</zg-button>
        </zg-section-actions>

        <zg-section-actions data-testid="nav-disabled">
          <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" [disabled]="true">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" [disabled]="true">›</zg-button>
        </zg-section-actions>
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
  render: () => ({
    template: `
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

        <zg-section-actions>
          <zg-button
            zg-section-actions-all
            variant="primary"
            shape="pill"
            aria-label="View all games"
            style="display: inline-flex; align-items: center; gap: var(--zg-spacing-2);"
          >
            All games
            <ng-icon name="lucideArrowRight" size="1rem" aria-hidden="true"></ng-icon>
          </zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" aria-label="Previous games">
            <ng-icon name="lucideChevronLeft" size="1rem" aria-hidden="true"></ng-icon>
          </zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" aria-label="Next games">
            <ng-icon name="lucideChevronRight" size="1rem" aria-hidden="true"></ng-icon>
          </zg-button>
        </zg-section-actions>
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

        <zg-section-actions data-testid="interactive-actions">
          <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" [disabled]="navDisabled">‹</zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" [disabled]="navDisabled">›</zg-button>
        </zg-section-actions>
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
      <zg-section-actions groupAriaLabel="Top games actions">
        <zg-button zg-section-actions-all variant="primary" shape="pill" aria-label="View all top games">
          View all top games
        </zg-button>
        <zg-button zg-section-actions-prev variant="secondary" shape="square" aria-label="Go to previous games">
          Previous games
        </zg-button>
        <zg-button zg-section-actions-next variant="secondary" shape="square" aria-label="Go to next games">
          Next games
        </zg-button>
      </zg-section-actions>
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
