import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import { ZgInputComponent } from '../../../atoms/input/input.component';

@Component({
  selector: 'zg-casino-search-bar',
  standalone: true,
  imports: [ZgInputComponent, ZgButtonComponent],
  templateUrl: './casino-search-bar.component.html',
  styleUrl: './casino-search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-search-bar"',
    '[attr.data-disabled]': 'disabled() ? true : null',
  },
})
export class ZgCasinoSearchBarComponent {
  query = input<string>('');
  placeholder = input<string>('Search games');
  providersLabel = input<string>('PROVIDERS');
  disabled = input<boolean>(false);
  ariaLabel = input<string>('Casino game search');
  providersAriaLabel = input<string>('Open providers filter');

  queryChange = output<string>();
  changed = output<string>();
  searched = output<string>();
  cleared = output<void>();
  providersClicked = output<void>();

  protected internalQuery = signal('');

  constructor() {
    effect(() => {
      this.internalQuery.set(this.query());
    });
  }

  protected onQueryChanged(value: string): void {
    this.internalQuery.set(value);
    this.queryChange.emit(value);
    this.changed.emit(value);
  }

  protected onCleared(): void {
    this.internalQuery.set('');
    this.queryChange.emit('');
    this.cleared.emit();
  }

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    if (this.disabled()) {
      return;
    }
    this.searched.emit(this.internalQuery().trim());
  }

  protected onProvidersClick(): void {
    if (this.disabled()) {
      return;
    }
    this.providersClicked.emit();
  }
}
