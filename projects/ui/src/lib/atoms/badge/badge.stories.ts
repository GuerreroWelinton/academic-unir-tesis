import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
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
 * - ✅ role="status" for screen readers
 * - ✅ Close button with aria-label
 * - ✅ Keyboard navigation for removable badges
 * - ✅ Focus visible states on close button
 * - ✅ Sufficient color contrast (WCAG AA)
 * - 💡 Use descriptive text (avoid single letters)
 * - 💡 Provide context for screen readers when needed
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
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
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
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <zg-badge size="sm" variant="primary" text="Small"></zg-badge>
        <zg-badge size="md" variant="primary" text="Medium"></zg-badge>
        <zg-badge size="lg" variant="primary" text="Large"></zg-badge>
      </div>
    `,
  }),
};

/**
 * All shape variants (default, pill, square)
 */
export const Shapes: Story = {
  name: 'Shapes',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <zg-badge shape="default" variant="info" text="Default"></zg-badge>
        <zg-badge shape="pill" variant="info" text="Pill"></zg-badge>
        <zg-badge shape="square" variant="info" text="Square"></zg-badge>
      </div>
    `,
  }),
};

/**
 * Removable badges with close button
 */
export const Removable: Story = {
  name: 'Removable',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
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

    // Wait a moment
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Click first close button
    await userEvent.click(closeButtons[0]);
  },
};

/**
 * Dot mode for notification indicators
 */
export const DotMode: Story = {
  name: 'Dot Mode',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
        <div style="position: relative; display: inline-block;">
          <span style="font-size: 24px;">🔔</span>
          <zg-badge variant="error" [dot]="true" style="position: absolute; top: 0; right: -8px;" data-testid="dot-badge-1"></zg-badge>
        </div>

        <div style="position: relative; display: inline-block; padding: 8px 16px; background: #f0f0f0; border-radius: 8px;">
          <span>Messages</span>
          <zg-badge variant="primary" [dot]="true" style="position: absolute; top: 4px; right: 4px;" data-testid="dot-badge-2"></zg-badge>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-weight: 500;">Dot sizes:</span>
          <zg-badge variant="success" size="sm" [dot]="true"></zg-badge>
          <zg-badge variant="success" size="md" [dot]="true"></zg-badge>
          <zg-badge variant="success" size="lg" [dot]="true"></zg-badge>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-weight: 500;">All variants:</span>
          <zg-badge variant="primary" [dot]="true"></zg-badge>
          <zg-badge variant="success" [dot]="true"></zg-badge>
          <zg-badge variant="warning" [dot]="true"></zg-badge>
          <zg-badge variant="error" [dot]="true"></zg-badge>
          <zg-badge variant="info" [dot]="true"></zg-badge>
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
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <span style="font-weight: 500; min-width: 120px;">Below max:</span>
          <zg-badge variant="error" text="5" [max]="99" data-testid="badge-5"></zg-badge>
          <zg-badge variant="error" text="42" [max]="99"></zg-badge>
          <zg-badge variant="error" text="99" [max]="99" data-testid="badge-99"></zg-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <span style="font-weight: 500; min-width: 120px;">Above max (99+):</span>
          <zg-badge variant="error" text="100" [max]="99" data-testid="badge-100"></zg-badge>
          <zg-badge variant="error" text="250" [max]="99" data-testid="badge-250"></zg-badge>
          <zg-badge variant="error" text="1000" [max]="99"></zg-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <span style="font-weight: 500; min-width: 120px;">Different max (9+):</span>
          <zg-badge variant="primary" text="8" [max]="9"></zg-badge>
          <zg-badge variant="primary" text="9" [max]="9"></zg-badge>
          <zg-badge variant="primary" text="10" [max]="9" data-testid="badge-10-max9"></zg-badge>
          <zg-badge variant="primary" text="50" [max]="9"></zg-badge>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
          <span style="font-weight: 500; min-width: 120px;">No max limit:</span>
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
 * Status indicators for common use cases
 */
export const StatusIndicators: Story = {
  name: 'Status Indicators',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 100px;">New content:</span>
          <zg-badge variant="primary" text="New" size="sm"></zg-badge>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 100px;">Active status:</span>
          <zg-badge variant="success" text="Active" size="sm"></zg-badge>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 100px;">Pending:</span>
          <zg-badge variant="warning" text="Pending" size="sm"></zg-badge>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 100px;">Error state:</span>
          <zg-badge variant="error" text="Error" size="sm"></zg-badge>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 100px;">Info:</span>
          <zg-badge variant="info" text="Beta" size="sm"></zg-badge>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="min-width: 100px;">Neutral:</span>
          <zg-badge variant="neutral" text="Draft" size="sm"></zg-badge>
        </div>
      </div>
    `,
  }),
};

/**
 * Badge composition with ng-content
 */
export const WithContent: Story = {
  name: 'With ng-content',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <zg-badge variant="primary">Custom Content</zg-badge>
        <zg-badge variant="success">✓ Verified</zg-badge>
        <zg-badge variant="error">⚠ Alert</zg-badge>
        <zg-badge variant="info">ℹ Info</zg-badge>
      </div>
    `,
  }),
};

/**
 * Accessibility demonstration
 */
export const AccessibilityDemo: Story = {
  name: 'Accessibility Demo',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">
            Keyboard Navigation (Tab through removable badges)
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <zg-badge variant="primary" text="Tag 1" [removable]="true"></zg-badge>
            <zg-badge variant="success" text="Tag 2" [removable]="true"></zg-badge>
            <zg-badge variant="info" text="Tag 3" [removable]="true"></zg-badge>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">
            Color Contrast (WCAG AA Compliant)
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <zg-badge variant="primary" text="4.5:1"></zg-badge>
            <zg-badge variant="success" text="4.5:1"></zg-badge>
            <zg-badge variant="error" text="4.5:1"></zg-badge>
            <zg-badge variant="warning" text="4.5:1"></zg-badge>
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">
            Screen Reader Support (role="status")
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <zg-badge variant="success" text="Payment Successful"></zg-badge>
            <zg-badge variant="error" text="Action Required"></zg-badge>
            <zg-badge variant="info" text="New Message"></zg-badge>
          </div>
        </div>
      </div>
    `,
  }),
};
