import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    label: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: false,
    label: 'Ghost Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    label: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    label: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    label: 'Disabled Button',
  },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: var(--zg-spacing-8); flex-wrap: wrap;">
        <zg-button variant="primary" size="md" [disabled]="false" label="Primary"></zg-button>
        <zg-button variant="secondary" size="md" [disabled]="false" label="Secondary"></zg-button>
        <zg-button variant="ghost" size="md" [disabled]="false" label="Ghost"></zg-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: var(--zg-spacing-8); align-items: center; flex-wrap: wrap;">
        <zg-button variant="primary" size="sm" [disabled]="false" label="Small"></zg-button>
        <zg-button variant="primary" size="md" [disabled]="false" label="Medium"></zg-button>
        <zg-button variant="primary" size="lg" [disabled]="false" label="Large"></zg-button>
      </div>
    `,
  }),
};
