import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge size variants
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge visual variants
 */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/**
 * Badge shape variants
 */
export type BadgeShape = 'default' | 'pill' | 'square';

/**
 * ZgBadge - Presentational badge component
 *
 * Flexible and accessible badge component for labels, status indicators, and notifications.
 * This component is purely presentational and should not contain business logic.
 *
 * @example
 * ```html
 * <!-- Basic badge with text property -->
 * <zg-badge variant="primary" text="New"></zg-badge>
 *
 * <!-- Badge with ng-content -->
 * <zg-badge variant="success">Active</zg-badge>
 *
 * <!-- Removable badge -->
 * <zg-badge variant="info" text="Category" [removable]="true" (removed)="onRemove()"></zg-badge>
 *
 * <!-- Dot notification -->
 * <zg-badge variant="error" [dot]="true"></zg-badge>
 *
 * <!-- Numeric badge with max -->
 * <zg-badge variant="error" text="150" [max]="99"></zg-badge>
 * ```
 */
@Component({
  selector: 'zg-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
    '[attr.role]': '"status"',
  },
})
export class ZgBadgeComponent {
  /**
   * Badge visual variant
   * @default 'primary'
   */
  variant = input<BadgeVariant>('primary');

  /**
   * Badge size
   * @default 'md'
   */
  size = input<BadgeSize>('md');

  /**
   * Badge shape (border radius)
   * @default 'default'
   */
  shape = input<BadgeShape>('default');

  /**
   * Badge text content (alternative to using ng-content)
   * @default undefined
   */
  text = input<string | undefined>(undefined);

  /**
   * Whether the badge shows a close/remove button
   * @default false
   */
  removable = input<boolean>(false);

  /**
   * Whether the badge is shown as a dot (notification mode)
   * When true, no text is displayed
   * @default false
   */
  dot = input<boolean>(false);

  /**
   * Maximum number to display before showing "+"
   * Useful for notification counts (e.g., "99+")
   * @default undefined
   */
  max = input<number | undefined>(undefined);

  /**
   * Emitted when the close/remove button is clicked
   */
  removed = output<void>();

  /**
   * Computed display text with max logic
   */
  protected displayText = computed(() => {
    const text = this.text();
    const max = this.max();

    // If dot mode, no text
    if (this.dot()) {
      return '';
    }

    // If no text, return empty
    if (!text) {
      return '';
    }

    // If max is defined and text is a number
    if (max !== undefined) {
      const numValue = parseInt(text, 10);
      if (!isNaN(numValue) && numValue > max) {
        return `${max}+`;
      }
    }

    return text;
  });

  /**
   * Computed host classes
   */
  protected hostClasses = computed(() => {
    const classes = ['zg-badge'];

    if (this.dot()) {
      classes.push('zg-badge--dot');
    }

    if (this.removable()) {
      classes.push('zg-badge--removable');
    }

    return classes.join(' ');
  });

  /**
   * Handle remove button click
   */
  protected handleRemove(event: Event): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
