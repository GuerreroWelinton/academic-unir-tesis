import { type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { ZgSiteHeaderComponent } from './site-header.component';

/**
 * Global site header for top-level navigation and auth actions.
 *
 * ## Usage Guide
 * **When to use:**
 * - Page-level shells that need brand + primary nav + auth CTAs.
 * - Casino home/catalog templates through projection slots.
 * - Consistent top navigation contract across verticals.
 *
 * **When NOT to use:**
 * - Section-level headers inside cards or content blocks.
 * - Complex mega-menu behaviors that require domain orchestration.
 *
 * ## Accessibility
 * - Uses semantic `<header>` and `<nav>` landmarks.
 * - Exposes `aria-current="page"` for active nav item.
 * - Keeps controls keyboard-accessible through native anchors/buttons.
 */
const meta: Meta<ZgSiteHeaderComponent> = {
  title: 'Organisms/Shared/Site Header',
  component: ZgSiteHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    brandLabel: { control: 'text', table: { defaultValue: { summary: 'Brand' } } },
    brandHref: { control: 'text', table: { defaultValue: { summary: 'null' } } },
    logoUrl: { control: 'text', table: { defaultValue: { summary: 'null' } } },
    logoAlt: { control: 'text', table: { defaultValue: { summary: 'Brand logo' } } },
    logoWidth: {
      control: { type: 'number', min: 40, step: 10 },
      table: { defaultValue: { summary: '140' } },
    },
    logoHeight: {
      control: { type: 'number', min: 20, step: 4 },
      table: { defaultValue: { summary: '40' } },
    },
    ariaLabel: { control: 'text', table: { defaultValue: { summary: 'Site header' } } },
    navAriaLabel: { control: 'text', table: { defaultValue: { summary: 'Primary navigation' } } },
    navItems: { control: 'object' },
    showAuthActions: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    loginLabel: { control: 'text', table: { defaultValue: { summary: 'Log in' } } },
    registerLabel: { control: 'text', table: { defaultValue: { summary: 'Sign up' } } },
    brandClicked: { action: 'brandClicked', table: { category: 'Events' } },
    navItemClicked: { action: 'navItemClicked', table: { category: 'Events' } },
    loginClicked: { action: 'loginClicked', table: { category: 'Events' } },
    registerClicked: { action: 'registerClicked', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<ZgSiteHeaderComponent>;

const defaultNavItems = [
  { id: 'sports', label: 'SPORTS', href: '#sports' },
  { id: 'casino', label: 'CASINO', href: '#casino', active: true },
  { id: 'live-casino', label: 'LIVE CASINO', href: '#live-casino' },
  { id: 'virtuals', label: 'VIRTUALS', href: '#virtuals' },
  { id: 'promotions', label: 'PROMOTIONS', href: '#promotions' },
];

export const Default: Story = {
  args: {
    brandLabel: 'Brand',
    logoUrl: 'https://placehold.co/280x80?text=Logo',
    logoAlt: 'Brand logo',
    logoWidth: 140,
    logoHeight: 40,
    navItems: defaultNavItems,
  },
};

export const WithoutAuthActions: Story = {
  args: {
    brandLabel: 'Brand',
    navItems: defaultNavItems,
    showAuthActions: false,
  },
};

export const LongNavigation: Story = {
  args: {
    brandLabel: 'Brand',
    navItems: [
      ...defaultNavItems,
      { id: 'lottery', label: 'LOTTERY', href: '#lottery' },
      { id: 'bingo', label: 'BINGO', href: '#bingo' },
      { id: 'poker', label: 'POKER', href: '#poker' },
      { id: 'esports', label: 'ESPORTS', href: '#esports' },
    ],
  },
};

export const Minimal: Story = {
  args: {
    brandLabel: 'Brand',
    navItems: [{ id: 'casino', label: 'CASINO', href: '#casino', active: true }],
  },
};

export const WithDisabledItem: Story = {
  args: {
    brandLabel: 'Brand',
    navItems: [
      { id: 'sports', label: 'SPORTS', href: '#sports' },
      { id: 'casino', label: 'CASINO', href: '#casino', active: true },
      { id: 'virtuals', label: 'VIRTUALS', disabled: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledItem = canvas.getByRole('button', { name: 'VIRTUALS' });
    await userEvent.click(disabledItem);
    await expect((disabledItem as HTMLButtonElement).disabled).toBe(true);
  },
};

export const AccessibilityDemo: Story = {
  args: {
    brandLabel: 'Brand',
    logoUrl: 'https://placehold.co/280x80?text=Logo',
    logoAlt: 'Brand logo',
    ariaLabel: 'Main site header',
    navAriaLabel: 'Main site sections',
    navItems: defaultNavItems,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Main site sections' });
    const current = canvas.getByRole('link', { name: 'CASINO' });
    const login = canvas.getByRole('button', { name: 'Log in' });
    const signUp = canvas.getByRole('button', { name: 'Sign up' });

    await expect(nav).toBeTruthy();
    await expect(current.getAttribute('aria-current')).toBe('page');
    await expect(login).toBeTruthy();
    await expect(signUp).toBeTruthy();
  },
};
