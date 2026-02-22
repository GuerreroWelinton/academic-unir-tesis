import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideBell, lucideCheck, lucideInfo } from '@ng-icons/lucide';
import { ZgBadgeComponent } from './badge.component';

/**
 * Badge component for labels, status indicators, and notifications.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Display status or category labels
 * - Show notification counts
 * - Indicate new/updated content
 * - Tag items with metadata
 * - Show removable filter tags
 *
 * **When NOT to use:**
 * - As a clickable action (use button instead)
 * - For long descriptive text (use label or text)
 * - As form validation (use input error state)
 *
 * ## Accessibility
 * - role="status" for screen readers
 * - Close button with aria-label
 * - Keyboard navigation for removable badges
 * - Focus visible states on close button
 * - Sufficient color contrast (WCAG AA)
 * - Use descriptive text (avoid single letters)
 * - Provide context for screen readers when needed
 */
const meta: Meta<ZgBadgeComponent> = {
  title: 'Atoms/Badge',
  component: ZgBadgeComponent,
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
      providers: [provideIcons({ lucideBell, lucideCheck, lucideAlertCircle, lucideInfo })],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
      description: 'Visual variant of the badge',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'BadgeVariant' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'BadgeSize' },
      },
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Shape variant (border radius)',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'BadgeShape' },
      },
    },
    text: {
      control: 'text',
      description: 'Text content of the badge (alternative to ng-content)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    removable: {
      control: 'boolean',
      description: 'Whether the badge shows a close/remove button',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Whether the badge is shown as a dot (notification mode)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum number to display before showing "+" (e.g., 99+)',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    removed: {
      action: 'removed',
      description: 'Emitted when the close/remove button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZgBadgeComponent>;

/**
 * Default badge with interactive controls
 */
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    text: 'Badge',
    removable: false,
    dot: false,
    max: undefined,
  },
};

/**
 * All badge variants showing different semantic colors
 */
export const Variants: Story = {
  name: 'Variants',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">
        <zg-badge variant="primary" text="Primary"></zg-badge>
        <zg-badge variant="secondary" text="Secondary"></zg-badge>
        <zg-badge variant="success" text="Success"></zg-badge>
        <zg-badge variant="warning" text="Warning"></zg-badge>
        <zg-badge variant="error" text="Error"></zg-badge>
        <zg-badge variant="info" text="Info"></zg-badge>
        <zg-badge variant="neutral" text="Neutral"></zg-badge>
      </div>
    `,
  }),
};

/**
 * All size variants (small, medium, large)
 */
export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">
        <zg-badge size="sm" variant="primary" text="Small"></zg-badge>
        <zg-badge size="md" variant="primary" text="Medium"></zg-badge>
        <zg-badge size="lg" variant="primary" text="Large"></zg-badge>
      </div>
    `,
  }),
};

/**
 * Removable badges with close button
 */
export const Removable: Story = {
  name: 'Removable',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">
        <zg-badge variant="primary" text="Tag 1" [removable]="true" data-testid="badge-1"></zg-badge>
        <zg-badge variant="success" text="Category" [removable]="true" data-testid="badge-2"></zg-badge>
        <zg-badge variant="info" text="Filter" [removable]="true" data-testid="badge-3"></zg-badge>
        <zg-badge variant="warning" text="Label" [removable]="true" data-testid="badge-4"></zg-badge>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the first badge
    const firstBadge = canvas.getByTestId('badge-1');
    await expect(firstBadge).toBeInTheDocument();
    await expect(firstBadge).toHaveAttribute('role', 'status');

    // Find and click the close button
    const closeButtons = canvas.getAllByRole('button', { name: /remove badge/i });
    await expect(closeButtons).toHaveLength(4);

    // Click first close button
    await userEvent.click(closeButtons[0]);
  },
};

/**
 * Dot mode for notification indicators
 */
export const DotMode: Story = {
  name: 'Dot Mode',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div
        style="display: grid; gap: var(--zg-spacing-4); max-width: 44rem; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);"
      >
        <div style="display: flex; gap: var(--zg-spacing-3); flex-wrap: wrap;">
          <div
            style="position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 6rem; height: 2.25rem; padding: 0 var(--zg-spacing-3); border-radius: var(--zg-radius-md); background: var(--zg-color-surface-alt); border: 1px solid var(--zg-color-border);"
          >
            Alerts
            <zg-badge
              variant="error"
              [dot]="true"
              style="position: absolute; top: -0.25rem; right: -0.25rem;"
              data-testid="dot-badge-1"
            ></zg-badge>
          </div>

          <div
            style="position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 6rem; height: 2.25rem; padding: 0 var(--zg-spacing-3); border-radius: var(--zg-radius-md); background: var(--zg-color-surface-alt); border: 1px solid var(--zg-color-border);"
          >
            Messages
            <zg-badge
              variant="success"
              [dot]="true"
              style="position: absolute; top: -0.25rem; right: -0.25rem;"
              data-testid="dot-badge-2"
            ></zg-badge>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: var(--zg-spacing-3); flex-wrap: wrap;">
          <span style="font-weight: var(--zg-font-weight-medium); min-width: 5.5rem;">Dot sizes</span>
          <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-2); padding: var(--zg-spacing-2) var(--zg-spacing-3); border-radius: var(--zg-radius-md); background: var(--zg-color-bg-secondary);">
            <zg-badge variant="success" size="sm" [dot]="true"></zg-badge>
            <zg-badge variant="success" size="md" [dot]="true"></zg-badge>
            <zg-badge variant="success" size="lg" [dot]="true"></zg-badge>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: var(--zg-spacing-3); flex-wrap: wrap;">
          <span style="font-weight: var(--zg-font-weight-medium); min-width: 5.5rem;">Variants</span>
          <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-3); padding: var(--zg-spacing-2) var(--zg-spacing-3); border-radius: var(--zg-radius-md); background: var(--zg-color-bg-secondary);">
            <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
              <zg-badge variant="primary" [dot]="true"></zg-badge>
              <span style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">Primary</span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
              <zg-badge variant="success" [dot]="true"></zg-badge>
              <span style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">Success</span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
              <zg-badge variant="warning" [dot]="true"></zg-badge>
              <span style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">Warning</span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
              <zg-badge variant="error" [dot]="true"></zg-badge>
              <span style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">Error</span>
            </div>
            <div style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
              <zg-badge variant="info" [dot]="true"></zg-badge>
              <span style="font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">Info</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify dot badges exist
    const dotBadge1 = canvas.getByTestId('dot-badge-1');
    await expect(dotBadge1).toBeInTheDocument();
    await expect(dotBadge1).toHaveAttribute('role', 'status');
    await expect(dotBadge1).toHaveClass('zg-badge--dot');

    // Verify dot element has aria-label
    const dotElement = canvasElement.querySelector('.zg-badge__dot');
    await expect(dotElement).toHaveAttribute('aria-label', 'notification indicator');
  },
};

/**
 * Numeric badges with max limit (e.g., "99+")
 */
export const NumericWithMax: Story = {
  name: 'Numeric with Max',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--zg-spacing-6); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">
        <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center;">
          <span style="font-weight: var(--zg-font-weight-medium); min-width: 7.5rem;">Below max:</span>
          <zg-badge variant="error" text="5" [max]="99" data-testid="badge-5"></zg-badge>
          <zg-badge variant="error" text="42" [max]="99"></zg-badge>
          <zg-badge variant="error" text="99" [max]="99" data-testid="badge-99"></zg-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center;">
          <span style="font-weight: var(--zg-font-weight-medium); min-width: 7.5rem;">Above max (99+):</span>
          <zg-badge variant="error" text="100" [max]="99" data-testid="badge-100"></zg-badge>
          <zg-badge variant="error" text="250" [max]="99" data-testid="badge-250"></zg-badge>
          <zg-badge variant="error" text="1000" [max]="99"></zg-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center;">
          <span style="font-weight: var(--zg-font-weight-medium); min-width: 7.5rem;">Different max (9+):</span>
          <zg-badge variant="primary" text="8" [max]="9"></zg-badge>
          <zg-badge variant="primary" text="9" [max]="9"></zg-badge>
          <zg-badge variant="primary" text="10" [max]="9" data-testid="badge-10-max9"></zg-badge>
          <zg-badge variant="primary" text="50" [max]="9"></zg-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center;">
          <span style="font-weight: var(--zg-font-weight-medium); min-width: 7.5rem;">No max limit:</span>
          <zg-badge variant="success" text="150"></zg-badge>
          <zg-badge variant="success" text="999"></zg-badge>
          <zg-badge variant="success" text="10000"></zg-badge>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify badge below max shows actual number
    const badge5 = canvas.getByTestId('badge-5');
    await expect(badge5).toHaveTextContent('5');

    // Verify badge at max shows exact number
    const badge99 = canvas.getByTestId('badge-99');
    await expect(badge99).toHaveTextContent('99');

    // Verify badges above max show "99+"
    const badge100 = canvas.getByTestId('badge-100');
    await expect(badge100).toHaveTextContent('99+');

    const badge250 = canvas.getByTestId('badge-250');
    await expect(badge250).toHaveTextContent('99+');

    // Verify different max (9+)
    const badge10Max9 = canvas.getByTestId('badge-10-max9');
    await expect(badge10Max9).toHaveTextContent('9+');
  },
};

/**
 * Badge composition with ng-content
 */
export const Composition: Story = {
  name: 'Composition',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-3); align-items: center; font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">
        <zg-badge variant="primary">
          <span style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
            <ng-icon name="lucideBell" size="0.875rem" aria-hidden="true"></ng-icon>
            Updates
          </span>
        </zg-badge>
        <zg-badge variant="success">
          <span style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
            <ng-icon name="lucideCheck" size="0.875rem" aria-hidden="true"></ng-icon>
            Verified
          </span>
        </zg-badge>
        <zg-badge variant="error">
          <span style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
            <ng-icon name="lucideAlertCircle" size="0.875rem" aria-hidden="true"></ng-icon>
            Alert
          </span>
        </zg-badge>
        <zg-badge variant="info">
          <span style="display: inline-flex; align-items: center; gap: var(--zg-spacing-1);">
            <ng-icon name="lucideInfo" size="0.875rem" aria-hidden="true"></ng-icon>
            Info
          </span>
        </zg-badge>
        <zg-badge variant="warning" text="Closable" [removable]="true">
          <ng-icon
            remove-icon
            name="lucideAlertCircle"
            size="0.75rem"
            aria-hidden="true"
          ></ng-icon>
        </zg-badge>
      </div>
    `,
  }),
};

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--zg-spacing-6); font-size: var(--zg-font-size-sm); color: var(--zg-color-text-primary);">
        <div>
          <h3 style="margin: 0 0 var(--zg-spacing-3) 0; font-size: var(--zg-font-size-sm); font-weight: var(--zg-font-weight-medium); color: var(--zg-color-text-primary);">
            Keyboard Navigation (Tab through removable badges)
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-2);">
            <zg-badge variant="primary" text="Tag 1" [removable]="true"></zg-badge>
            <zg-badge variant="success" text="Tag 2" [removable]="true"></zg-badge>
            <zg-badge variant="info" text="Tag 3" [removable]="true"></zg-badge>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 var(--zg-spacing-3) 0; font-size: var(--zg-font-size-sm); font-weight: var(--zg-font-weight-medium); color: var(--zg-color-text-primary);">
            Color Contrast (WCAG AA Compliant)
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-2);">
            <zg-badge variant="primary" text="4.5:1"></zg-badge>
            <zg-badge variant="success" text="4.5:1"></zg-badge>
            <zg-badge variant="error" text="4.5:1"></zg-badge>
            <zg-badge variant="warning" text="4.5:1"></zg-badge>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 var(--zg-spacing-3) 0; font-size: var(--zg-font-size-sm); font-weight: var(--zg-font-weight-medium); color: var(--zg-color-text-primary);">
            Screen Reader Support (role="status")
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: var(--zg-spacing-2);">
            <zg-badge variant="success" text="Payment Successful"></zg-badge>
            <zg-badge variant="error" text="Action Required"></zg-badge>
            <zg-badge variant="info" text="New Message"></zg-badge>
          </div>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButtons = canvas.getAllByRole('button', { name: /remove badge/i });

    await userEvent.tab();
    await expect(closeButtons[0]).toHaveFocus();
  },
};
