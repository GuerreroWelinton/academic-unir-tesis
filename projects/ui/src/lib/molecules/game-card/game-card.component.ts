import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GameCardAspectRatio = 'portrait' | 'square';

@Component({
  selector: 'zg-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-game-card"',
    '[attr.data-disabled]': 'disabled() ? true : null',
    '[attr.data-favorite]': 'favorite() ? true : null',
    '[attr.data-aspect-ratio]': 'aspectRatio()',
  },
})
export class ZgGameCardComponent {
  title = input<string>('');
  provider = input<string>('');
  imageUrl = input<string>('');
  imageAlt = input<string>('');
  ctaLabel = input<string>('Play now');
  disabled = input<boolean>(false);
  favorite = input<boolean>(false);
  showFavorite = input<boolean>(true);
  aspectRatio = input<GameCardAspectRatio>('portrait');

  playAriaLabel = input<string>('Play game');
  favoriteAriaLabel = input<string>('Toggle favorite');

  playClicked = output<void>();
  favoriteClicked = output<void>();

  protected effectiveImageAlt = computed(() => this.imageAlt() || this.title() || 'Game cover');

  protected onPlayClick(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.playClicked.emit();
  }

  protected onFavoriteClick(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) {
      return;
    }
    this.favoriteClicked.emit();
  }
}
