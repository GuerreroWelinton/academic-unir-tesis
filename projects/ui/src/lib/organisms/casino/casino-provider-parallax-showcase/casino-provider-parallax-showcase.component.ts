import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ZgButtonComponent } from '../../../atoms/button/button.component';
import {
  type CasinoTwoRowGamesCarouselSectionItem,
  ZgCasinoTwoRowGamesCarouselSectionComponent,
} from '../casino-two-row-games-carousel-section/casino-two-row-games-carousel-section.component';

@Component({
  selector: 'zg-casino-provider-parallax-showcase',
  standalone: true,
  imports: [NgStyle, ZgButtonComponent, ZgCasinoTwoRowGamesCarouselSectionComponent],
  templateUrl: './casino-provider-parallax-showcase.component.html',
  styleUrl: './casino-provider-parallax-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-provider-parallax-showcase"',
  },
})
export class ZgCasinoProviderParallaxShowcaseComponent {
  providerName = input<string>('Videoslots');
  backgroundImageUrl = input<string>('https://placehold.co/1200x600?text=Provider+Showcase');
  sectionAriaLabel = input<string>('Provider parallax showcase');
  ctaAriaLabel = input<string>('Open provider games');

  items = input<readonly CasinoTwoRowGamesCarouselSectionItem[]>([]);
  cardWidth = input<number>(160);
  scrollStep = input<number>(520);

  ctaClicked = output<void>();
  playRequested = output<CasinoTwoRowGamesCarouselSectionItem>();
  favoriteRequested = output<CasinoTwoRowGamesCarouselSectionItem>();

  protected onCtaClick(): void {
    this.ctaClicked.emit();
  }

  protected onPlayRequested(item: CasinoTwoRowGamesCarouselSectionItem): void {
    this.playRequested.emit(item);
  }

  protected onFavoriteRequested(item: CasinoTwoRowGamesCarouselSectionItem): void {
    this.favoriteRequested.emit(item);
  }
}
