import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgSectionTitleComponent } from '../../../atoms/section-title/section-title.component';
import { ZgSectionActionsComponent } from '../section-actions/section-actions.component';
import { ZgContentSectionHeaderComponent } from './content-section-header.component';

/**
 * Content section header molecule for layout-only composition.
 *
 * ## Usage Guide
 * **When to use:**
 * - A reusable row layout for section title + section actions.
 * - Cases where title and actions APIs must stay owned by their original components.
 * - Compositions that should avoid prop drilling between molecules.
 *
 * **When NOT to use:**
 * - If you need the molecule to own domain behavior or business logic.
 * - If there is no section-header semantics in the screen.
 *
 * ## Accessibility
 * - This component is layout-only and delegates semantics to projected components.
 * - Heading semantics come from `zg-section-title`.
 * - Group/button semantics come from `zg-section-actions`.
 */
const meta: Meta<ZgContentSectionHeaderComponent> = {
  title: 'Molecules/Shared/Content Section Header',
  component: ZgContentSectionHeaderComponent,
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
      imports: [
        NgIconComponent,
        ZgButtonComponent,
        ZgSectionTitleComponent,
        ZgSectionActionsComponent,
      ],
      providers: [provideIcons({ lucideArrowRight, lucideChevronLeft, lucideChevronRight })],
    }),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<ZgContentSectionHeaderComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <zg-content-section-header>
        <zg-section-title
          zg-content-section-header-title
          label="Most Bet Games"
          tone="primary"
          [showAccent]="true"
        ></zg-section-title>
        <zg-section-actions zg-content-section-header-actions>
          <zg-button zg-section-actions-all variant="primary" shape="pill" aria-label="View all games">
            All
          </zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" aria-label="Previous games">
            ‹
          </zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" aria-label="Next games">
            ›
          </zg-button>
        </zg-section-actions>
      </zg-content-section-header>
    `,
  }),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-content-section-header>
          <zg-section-title zg-content-section-header-title label="Most Bet Games" tone="primary" [showAccent]="true"></zg-section-title>
          <zg-section-actions zg-content-section-header-actions>
            <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
            <zg-button zg-section-actions-prev variant="secondary" shape="square">‹</zg-button>
            <zg-button zg-section-actions-next variant="secondary" shape="square">›</zg-button>
          </zg-section-actions>
        </zg-content-section-header>

        <zg-content-section-header>
          <zg-section-title zg-content-section-header-title label="Featured Providers" tone="default"></zg-section-title>
          <zg-section-actions zg-content-section-header-actions>
            <zg-button zg-section-actions-all variant="accent" shape="pill">Explore</zg-button>
            <zg-button zg-section-actions-prev variant="ghost" shape="square">‹</zg-button>
            <zg-button zg-section-actions-next variant="ghost" shape="square">›</zg-button>
          </zg-section-actions>
        </zg-content-section-header>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-content-section-header>
          <zg-section-title zg-content-section-header-title label="Small" size="sm"></zg-section-title>
          <zg-section-actions zg-content-section-header-actions>
            <zg-button zg-section-actions-all variant="primary" shape="pill" size="sm">All</zg-button>
            <zg-button zg-section-actions-prev variant="secondary" shape="square" size="sm">‹</zg-button>
            <zg-button zg-section-actions-next variant="secondary" shape="square" size="sm">›</zg-button>
          </zg-section-actions>
        </zg-content-section-header>
        <zg-content-section-header>
          <zg-section-title zg-content-section-header-title label="Medium" size="md"></zg-section-title>
          <zg-section-actions zg-content-section-header-actions>
            <zg-button zg-section-actions-all variant="primary" shape="pill" size="md">All</zg-button>
            <zg-button zg-section-actions-prev variant="secondary" shape="square" size="md">‹</zg-button>
            <zg-button zg-section-actions-next variant="secondary" shape="square" size="md">›</zg-button>
          </zg-section-actions>
        </zg-content-section-header>
        <zg-content-section-header>
          <zg-section-title zg-content-section-header-title label="Large" size="lg"></zg-section-title>
          <zg-section-actions zg-content-section-header-actions>
            <zg-button zg-section-actions-all variant="primary" shape="pill" size="lg">All</zg-button>
            <zg-button zg-section-actions-prev variant="secondary" shape="square" size="lg">‹</zg-button>
            <zg-button zg-section-actions-next variant="secondary" shape="square" size="lg">›</zg-button>
          </zg-section-actions>
        </zg-content-section-header>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:grid;gap:var(--zg-spacing-5);">
        <zg-content-section-header data-testid="with-actions">
          <zg-section-title zg-content-section-header-title label="With actions"></zg-section-title>
          <zg-section-actions zg-content-section-header-actions>
            <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
            <zg-button zg-section-actions-prev variant="secondary" shape="square">‹</zg-button>
            <zg-button zg-section-actions-next variant="secondary" shape="square">›</zg-button>
          </zg-section-actions>
        </zg-content-section-header>

        <zg-content-section-header data-testid="without-actions">
          <zg-section-title zg-content-section-header-title label="Title only"></zg-section-title>
        </zg-content-section-header>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const withActions = canvas.getByTestId('with-actions');
    const withoutActions = canvas.getByTestId('without-actions');

    await expect(withActions.querySelector('zg-section-actions')).toBeTruthy();
    await expect(withoutActions.querySelector('zg-section-actions')).toBeNull();
  },
};

export const Composition: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-content-section-header>
        <zg-section-title
          zg-content-section-header-title
          label="Most Bet Games"
          [showAccent]="true"
        ></zg-section-title>
        <zg-section-actions zg-content-section-header-actions>
          <zg-button
            zg-section-actions-all
            variant="primary"
            shape="pill"
            aria-label="View all games"
            style="display:inline-flex;align-items:center;gap:var(--zg-spacing-2);"
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
      </zg-content-section-header>
    `,
  }),
};

export const InteractivePreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      showActions: true,
      toggleActions: function () {
        this['showActions'] = !this['showActions'];
      },
    },
    template: `
      <div style="display:grid;gap:var(--zg-spacing-3);">
        <button
          type="button"
          (click)="toggleActions()"
          style="
            width: fit-content;
            padding: var(--zg-spacing-2) var(--zg-spacing-3);
            border: 1px solid var(--zg-color-border);
            border-radius: var(--zg-radius-sm);
            background: var(--zg-color-surface);
            color: var(--zg-color-text-primary);
          "
        >
          Toggle actions
        </button>

        <zg-content-section-header data-testid="interactive-header">
          <zg-section-title zg-content-section-header-title label="Interactive header"></zg-section-title>
          @if (showActions) {
            <zg-section-actions zg-content-section-header-actions>
              <zg-button zg-section-actions-all variant="primary" shape="pill">All</zg-button>
              <zg-button zg-section-actions-prev variant="secondary" shape="square">‹</zg-button>
              <zg-button zg-section-actions-next variant="secondary" shape="square">›</zg-button>
            </zg-section-actions>
          }
        </zg-content-section-header>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: /toggle actions/i });
    const header = canvas.getByTestId('interactive-header');

    await expect(header.querySelector('zg-section-actions')).toBeTruthy();
    await userEvent.click(toggle);
    await expect(header.querySelector('zg-section-actions')).toBeNull();
  },
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <zg-content-section-header>
        <zg-section-title
          zg-content-section-header-title
          label="Top 10 casino"
          [ariaLevel]="3"
          [showAccent]="true"
        ></zg-section-title>
        <zg-section-actions zg-content-section-header-actions groupAriaLabel="Top games actions">
          <zg-button zg-section-actions-all variant="primary" shape="pill" aria-label="View all top games">
            View all top games
          </zg-button>
          <zg-button zg-section-actions-prev variant="secondary" shape="square" aria-label="Previous games">
            Previous games
          </zg-button>
          <zg-button zg-section-actions-next variant="secondary" shape="square" aria-label="Next games">
            Next games
          </zg-button>
        </zg-section-actions>
      </zg-content-section-header>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { name: /top 10 casino/i });
    const group = canvas.getByRole('group', { name: /top games actions/i });

    await expect(heading).toHaveAttribute('aria-level', '3');
    await expect(group).toBeTruthy();
  },
};
