import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CasinoGameCardAspectRatio = 'portrait' | 'square';
export type GameCardAspectRatio = CasinoGameCardAspectRatio;

@Component({
  selector: 'zg-casino-game-card, zg-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './casino-game-card.component.html',
  styleUrl: './casino-game-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-game-card"',
    '[attr.data-disabled]': 'disabled() ? true : null',
    '[attr.data-favorite]': 'favorite() ? true : null',
    '[attr.data-aspect-ratio]': 'aspectRatio()',
  },
})
export class ZgCasinoGameCardComponent {
  title = input<string>('');
  provider = input<string>('');
  imageUrl = input<string>('');
  imageAlt = input<string>('');
  ctaLabel = input<string>('Play now');
  disabled = input<boolean>(false);
  favorite = input<boolean>(false);
  showFavorite = input<boolean>(true);
  aspectRatio = input<CasinoGameCardAspectRatio>('portrait');

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

// Backward-compatible alias
export { ZgCasinoGameCardComponent as ZgGameCardComponent };
