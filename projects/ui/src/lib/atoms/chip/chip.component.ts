import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Chip size variants
 */
export type ChipSize = 'sm' | 'md' | 'lg';

/**
 * Chip visual variants
 */
export type ChipVariant = 'filled' | 'outlined' | 'ghost';

/**
 * ZgChip - Interactive chip component
 *
 * Flexible and accessible chip component for filters, tags, and selections.
 * Unlike Badge (passive), Chip is interactive and clickable.
 * This component is purely presentational and should not contain business logic.
 *
 * @example
 * ```html
 * <!-- Basic chip with text property -->
 * <zg-chip variant="filled" text="Slots"></zg-chip>
 *
 * <!-- Chip with ng-content -->
 * <zg-chip variant="outlined">Trending</zg-chip>
 *
 * <!-- Selected chip -->
 * <zg-chip [selected]="true" text="Active Filter"></zg-chip>
 *
 * <!-- Chip with left icon -->
 * <zg-chip variant="filled">
 *   <svg icon-left width="16" height="16">...</svg>
 *   Sports
 * </zg-chip>
 *
 * <!-- Removable chip with right icon -->
 * <zg-chip variant="outlined" (clicked)="onRemove()">
 *   Category
 *   <svg icon-right width="16" height="16">X</svg>
 * </zg-chip>
 *
 * <!-- Disabled chip -->
 * <zg-chip [disabled]="true" text="Disabled"></zg-chip>
 *
 * <!-- Two-way binding -->
 * <zg-chip [(selected)]="isActive" text="Toggle"></zg-chip>
 * ```
 *
 * ## Usage Guide
 * **When to use:**
 * - Filtering content (category filters, game type filters)
 * - Displaying selected options in multi-select scenarios
 * - Representing tags that can be added/removed
 * - Navigation pills/tabs for content sections
 *
 * **When NOT to use:**
 * - For static labels or status indicators (use Badge instead)
 * - For primary actions (use Button instead)
 * - For complex multi-step forms (consider other input types)
 *
 * ## Accessibility
 * - Uses native `<button>` element for full keyboard support
 * - `aria-pressed` indicates selected state
 * - `type="button"` prevents form submission
 * - Fully navigable with keyboard (Enter/Space)
 * - Visible focus state
 * - Disabled state prevents all interaction
 *
 * ## ng-content Slots
 * - **Default**: Main text/content
 * - **[icon-left]**: Optional icon at the start
 * - **[icon-right]**: Optional icon at the end (e.g., X for remove, checkmark when selected)
 */
@Component({
  selector: 'zg-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-selected]': 'selected()',
    '[attr.data-disabled]': 'disabled()',
  },
})
export class ZgChipComponent {
  /**
   * Chip visual variant
   * @default 'filled'
   */
  variant = input<ChipVariant>('filled');

  /**
   * Chip size
   * @default 'md'
   */
  size = input<ChipSize>('md');

  /**
   * Whether the chip is in a selected state
   * Supports two-way binding with [(selected)]
   * @default false
   */
  selected = input<boolean>(false);

  /**
   * Whether the chip is disabled
   * Disabled chips cannot be clicked and show reduced opacity
   * @default false
   */
  disabled = input<boolean>(false);

  /**
   * Chip text content (alternative to using ng-content)
   * @default undefined
   */
  text = input<string | undefined>(undefined);

  /**
   * Emitted when the chip is clicked
   * Not emitted when disabled
   */
  clicked = output<void>();

  /**
   * Emitted when the selected state changes
   * Enables two-way binding: [(selected)]="myValue"
   */
  selectedChange = output<boolean>();

  /**
   * Computed CSS classes for host element
   * @internal
   */
  protected hostClasses = computed(() => {
    return 'zg-chip';
  });

  /**
   * Handles click events on the chip
   * Toggles selected state and emits events
   * @internal
   */
  protected handleClick(): void {
    if (this.disabled()) {
      return;
    }

    const newSelectedState = !this.selected();
    this.selectedChange.emit(newSelectedState);
    this.clicked.emit();
  }

  /**
   * Handles keyboard events (Enter/Space)
   * @internal
   */
  protected handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    // Allow Enter and Space to trigger click
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  }
}
