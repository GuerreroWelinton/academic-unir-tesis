import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type InputSize = 'sm' | 'md' | 'lg';
let nextInputId = 0;

@Component({
  selector: 'zg-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': 'disabled() ? true : null',
    '[attr.data-error]': 'error() ? true : null',
    '[attr.data-full-width]': 'fullWidth() ? true : null',
  },
})
export class ZgInputComponent {
  /** Unique id for input/label association */
  public readonly id = `zg-input-${nextInputId++}`;
  public readonly inputId = `${this.id}-field`;
  public readonly errorId = `${this.id}-error`;
  public readonly helperId = `${this.id}-helper`;

  /** Input type */
  type = input<string>('text');

  /** Input value */
  value = input<string>('');

  /** Placeholder text */
  placeholder = input<string>('');

  /** Label for accessibility */
  label = input<string>('');

  /** Disabled state */
  disabled = input<boolean>(false);

  /** Readonly state */
  readonly = input<boolean>(false);

  /** Error message */
  error = input<string | undefined>(undefined);

  /** Size */
  size = input<InputSize>('md');

  /** Full width */
  fullWidth = input<boolean>(false);

  /** Autocomplete */
  autocomplete = input<string>('');

  /** Maxlength */
  maxlength = input<number | undefined>(undefined);

  /** Helper text */
  helperText = input<string>('');

  /** Output: value changed */
  changed = output<string>();

  /** Output: focused */
  focused = output<FocusEvent>();

  /** Output: blurred */
  blurred = output<FocusEvent>();

  /** Output: cleared (if clear button is used) */
  cleared = output<void>();

  /** Internal: is focused */
  protected isFocused = signal(false);

  /** Host classes */
  protected hostClasses = computed(() => {
    const classes = ['zg-input'];
    if (this.fullWidth()) classes.push('zg-input--full-width');
    if (this.error()) classes.push('zg-input--error');
    if (this.disabled()) classes.push('zg-input--disabled');
    if (this.isFocused()) classes.push('zg-input--focused');
    return classes.join(' ');
  });

  protected describedBy = computed(() => {
    if (this.error()) {
      return this.errorId;
    }
    if (this.helperText()) {
      return this.helperId;
    }
    return null;
  });

  /** Handle input event */
  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.changed.emit(target.value);
  }

  /** Handle focus event */
  protected onFocus(event: FocusEvent) {
    this.isFocused.set(true);
    this.focused.emit(event);
  }

  /** Handle blur event */
  protected onBlur(event: FocusEvent) {
    this.isFocused.set(false);
    this.blurred.emit(event);
  }

  /** Handle clear button click */
  protected onClear() {
    this.cleared.emit();
    this.changed.emit('');
  }
}
