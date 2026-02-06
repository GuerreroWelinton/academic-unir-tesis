import type { Meta, StoryObj } from '@storybook/angular';
import { ZgButtonComponent } from './button.component';

/**
 * Button component for user interactions and actions.
 *
 * ## Usage Guide
 *
 * **When to use:**
 * - Primary actions (submit forms, confirm dialogs)
 * - Navigation triggers
 * - Start processes or workflows
 *
 * **When NOT to use:**
 * - Navigation between pages (use links instead)
 * - Toggling settings (use toggle/switch)
 * - Displaying status (use badge/tag)
 *
 * ## Accessibility
 * - ✅ Keyboard navigation (Enter/Space)
 * - ✅ Focus visible states
 * - ✅ Disabled state prevents interaction
 * - ✅ Loading state with spinner
 * - 💡 Use descriptive text (avoid "Click here")
 * - 💡 Consider aria-label for icon-only buttons
 */
const meta: Meta<ZgButtonComponent> = {
  title: 'Atoms/Button',
  component: ZgButtonComponent,
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
      options: ['primary', 'secondary', 'accent', 'danger', 'ghost'],
      description: 'Visual variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'ButtonVariant' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'ButtonSize' },
      },
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
      description: 'Shape variant (border radius)',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'ButtonShape' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native button type',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    fontFamily: {
      control: 'select',
      options: ['base', 'secondary'],
      description: 'Font family variant (base: Inter, secondary: Teko for titles)',
      table: {
        defaultValue: { summary: 'base' },
        type: { summary: 'ButtonFontFamily' },
      },
    },
    text: {
      control: 'text',
      description: 'Button text content (simple alternative to ng-content)',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    clicked: {
      action: 'clicked',
      description: 'Emitted when the button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ZgButtonComponent>;

/**
 * Default button with primary variant
 */
export const Default: Story = {
  args: {
    text: 'Click me',
    variant: 'primary',
    size: 'md',
    shape: 'default',
    disabled: false,
    loading: false,
    fullWidth: false,
    fontFamily: 'base',
  },
};

/**
 * All button variants side by side
 */
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <zg-button variant="primary">Primary</zg-button>
        <zg-button variant="secondary">Secondary</zg-button>
        <zg-button variant="accent">Accent</zg-button>
        <zg-button variant="danger">Danger</zg-button>
        <zg-button variant="ghost">Ghost</zg-button>
      </div>
    `,
  }),
};

/**
 * Different button sizes
 */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <zg-button size="sm">Small</zg-button>
        <zg-button size="md">Medium</zg-button>
        <zg-button size="lg">Large</zg-button>
      </div>
    `,
  }),
};

/**
 * Different button shapes (border radius)
 */
export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <zg-button shape="default">Default (8px)</zg-button>
        <zg-button shape="pill">Pill (rounded)</zg-button>
        <zg-button shape="square">Square (2px)</zg-button>
      </div>
    `,
  }),
};

/**
 * Font family variants (base: Inter, secondary: Teko for titles/headings)
 */
export const FontFamilies: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Base (Inter) - Default</h4>
          <zg-button fontFamily="base">Button with Inter</zg-button>
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Secondary (Teko) - For titles/highlights</h4>
          <zg-button fontFamily="secondary" size="lg">BUTTON WITH TEKO</zg-button>
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #666;">Side by side comparison</h4>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <zg-button variant="primary" fontFamily="base">Inter (base)</zg-button>
            <zg-button variant="primary" fontFamily="secondary">TEKO (secondary)</zg-button>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Examples using ng-content with icon selectors and complex content
 */
export const WithIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <!-- Icon left -->
        <zg-button variant="primary">
          <svg icon-left width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add Item
        </zg-button>

        <!-- Icon right -->
        <zg-button variant="accent">
          Save File
          <svg icon-right width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
          </svg>
        </zg-button>

        <!-- Both icons -->
        <zg-button variant="secondary">
          <svg icon-left width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Download
          <svg icon-right width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
          </svg>
        </zg-button>

        <!-- Icon only -->
        <zg-button variant="ghost" shape="square" aria-label="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z"/>
          </svg>
        </zg-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the different ways to use ng-content with icon selectors:

**Available selectors:**
- \`[icon-left]\` - Place icons before text content
- \`[icon-right]\` - Place icons after text content
- Default slot - Main button content (text, HTML, etc.)

**Best practices:**
- Use \`aria-label\` for icon-only buttons
- Keep icon sizes consistent (16x16px recommended)
- Use \`currentColor\` for icon fill to inherit button text color
        `,
      },
    },
  },
};

/**
 * Button with icon on the left
 */
export const WithIconLeft: Story = {
  render: () => ({
    template: `
      <zg-button variant="primary">
        <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
          <path d="M10.5 6.5L7 10l-1.5-1.5"/>
        </svg>
        Save
      </zg-button>
    `,
  }),
};

/**
 * Button with icon on the right
 */
export const WithIconRight: Story = {
  render: () => ({
    template: `
      <zg-button variant="secondary" size="sm">
        All
        <span icon-right style="font-size: 1.2em;">›</span>
      </zg-button>
    `,
  }),
};

/**
 * Icon-only buttons (useful for navigation, actions)
 */
export const IconOnly: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <zg-button variant="ghost" shape="square" size="sm" aria-label="Previous">
          ‹
        </zg-button>
        <zg-button variant="ghost" shape="square" size="sm" aria-label="Next">
          ›
        </zg-button>
        <zg-button variant="accent" shape="square" size="sm" aria-label="Add">
          +
        </zg-button>
      </div>
    `,
  }),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <zg-button variant="primary" [disabled]="true">Primary Disabled</zg-button>
        <zg-button variant="secondary" [disabled]="true">Secondary Disabled</zg-button>
        <zg-button variant="accent" [disabled]="true">Accent Disabled</zg-button>
        <zg-button variant="danger" [disabled]="true">Danger Disabled</zg-button>
      </div>
    `,
  }),
};

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <zg-button variant="primary" [loading]="true">Loading...</zg-button>
        <zg-button variant="accent" size="lg" [loading]="true">Processing</zg-button>
        <zg-button variant="secondary" size="sm" [loading]="true">Wait</zg-button>
      </div>
    `,
  }),
};

/**
 * Full width button (useful in forms, mobile layouts)
 */
export const FullWidth: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <zg-button variant="primary" [fullWidth]="true">Full Width Button</zg-button>
      </div>
    `,
  }),
};

/**
 * Real-world examples based on provided references
 */
export const RealWorldExamples: Story = {
  name: 'Real-world Examples',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- CTA Button (Write to us) - With secondary font for highlight -->
        <div>
          <h4 style="margin-bottom: 0.5rem;">Main CTA (with Teko for highlight)</h4>
          <zg-button variant="accent" shape="pill" size="lg" fontFamily="secondary">
            WRITE TO US
          </zg-button>
        </div>

        <!-- Alternative CTA Button with base font -->
        <div>
          <h4 style="margin-bottom: 0.5rem;">Alternative CTA (with Inter)</h4>
          <zg-button variant="accent" shape="pill" size="lg">
            Write to us
          </zg-button>
        </div>

        <!-- Action Button (Save) -->
        <div>
          <h4 style="margin-bottom: 0.5rem;">Action with icon</h4>
          <zg-button variant="primary">
            <svg icon-left width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1 1 0 0 0-.98 1.17l.5 3.5A2 2 0 0 0 4.86 11H6v1a2 2 0 1 0 4 0v-1h1.14a2 2 0 0 0 1.98-1.67l.5-3.5a1 1 0 0 0-.98-1.17H11z"/>
            </svg>
            Save
          </zg-button>
        </div>

        <!-- Navigation Group -->
        <div>
          <h4 style="margin-bottom: 0.5rem;">Navigation</h4>
          <div style="display: flex; gap: 0.5rem;">
            <zg-button variant="primary" size="sm">
              All
              <span icon-right>›</span>
            </zg-button>
            <zg-button variant="ghost" shape="square" size="sm">‹</zg-button>
            <zg-button variant="ghost" shape="square" size="sm">›</zg-button>
            <zg-button variant="accent" shape="square" size="sm">+</zg-button>
          </div>
        </div>

        <!-- Danger action -->
        <div>
          <h4 style="margin-bottom: 0.5rem;">Destructive action</h4>
          <zg-button variant="danger">Delete bet</zg-button>
        </div>
      </div>
    `,
  }),
};
