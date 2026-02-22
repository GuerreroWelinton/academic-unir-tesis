import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ZgButtonComponent } from '../../../atoms/button/button.component';

export type LuckyPickerTone = 'default' | 'highlight';
export type LuckyPickerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'zg-lucky-picker',
  standalone: true,
  imports: [ZgButtonComponent],
  templateUrl: './lucky-picker.component.html',
  styleUrl: './lucky-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-lucky-picker"',
    '[attr.data-tone]': 'tone()',
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': 'disabled() ? true : null',
  },
})
export class ZgLuckyPickerComponent {
  title = input<string>('Not sure what to play?');
  description = input<string>('Let luck pick your next game.');
  actionLabel = input<string>('Pick for me');
  disabled = input<boolean>(false);
  tone = input<LuckyPickerTone>('default');
  size = input<LuckyPickerSize>('md');

  ariaLabel = input<string>('Lucky picker');
  actionAriaLabel = input<string>('Pick a random game');

  actionClicked = output<void>();

  protected buttonVariant = computed(() => {
    return this.tone() === 'highlight' ? 'accent' : 'primary';
  });

  protected onActionClick(): void {
    if (this.disabled()) {
      return;
    }
    this.actionClicked.emit();
  }
}
