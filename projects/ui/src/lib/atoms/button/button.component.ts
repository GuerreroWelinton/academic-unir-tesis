import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button size variants
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button visual variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'gradient';

/**
 * Button shape variants
 */
export type ButtonShape = 'default' | 'pill' | 'square';

/**
 * Button font family variants
 */
export type ButtonFontFamily = 'base' | 'secondary';

/**
 * Native button type attribute
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * ZgButton - Presentational button component
 *
 * Flexible and accessible button component following the container-presentational pattern.
 * This component is purely presentational and should not contain business logic.
 *
 * @example
 * ```html
 * <!-- Primary button with text property -->
 * <zg-button variant="primary" text="Click me"></zg-button>
 *
 * <!-- Primary button with ng-content -->
 * <zg-button variant="primary">Click me</zg-button>
 *
 * <!-- Button with icon -->
 * <zg-button variant="accent" shape="pill">
 *   <svg icon-left>...</svg>
 *   Save
 * </zg-button>
 *
 * <!-- Disabled button -->
 * <zg-button [disabled]="true" text="Disabled"></zg-button>
 * ```
 */
@Component({
  selector: 'zg-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-variant]': 'variant',
    '[attr.data-size]': 'size',
    '[attr.data-shape]': 'shape',
    '[attr.data-font-family]': 'fontFamily',
  },
})
export class ZgButtonComponent {
  /**
   * Button visual variant
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * Button size
   * @default 'md'
   */
  @Input() size: ButtonSize = 'md';

  /**
   * Button shape (border radius)
   * @default 'default'
   */
  @Input() shape: ButtonShape = 'default';

  /**
   * Whether the button is disabled
   * @default false
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the button is in loading state
   * @default false
   */
  @Input() loading: boolean = false;

  /**
   * Whether the button should take full width of its container
   * @default false
   */
  @Input() fullWidth: boolean = false;

  /**
   * Native button type (button, submit, reset)
   * @default 'button'
   */
  @Input() type: ButtonType = 'button';

  /**
   * Font family variant (base: Inter, secondary: Teko for titles)
   * @default 'base'
   */
  @Input() fontFamily: ButtonFontFamily = 'base';

  /**
   * Button text content (alternative to using ng-content)
   * @default undefined
   */
  @Input() text?: string;

  /**
   * Emitted when the button is clicked
   */
  @Output() clicked = new EventEmitter<MouseEvent>();

  /**
   * Internal loading state signal
   */
  protected isLoading = signal(false);

  /**
   * Computed host classes
   */
  protected hostClasses = computed(() => {
    const classes = ['zg-button'];

    if (this.fullWidth) {
      classes.push('zg-button--full-width');
    }

    if (this.loading || this.isLoading()) {
      classes.push('zg-button--loading');
    }

    return classes.join(' ');
  });

  /**
   * Handle button click
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading || this.isLoading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }

  /**
   * Programmatically set loading state
   * Useful for async operations
   */
  public setLoading(loading: boolean): void {
    this.isLoading.set(loading);
  }
}
