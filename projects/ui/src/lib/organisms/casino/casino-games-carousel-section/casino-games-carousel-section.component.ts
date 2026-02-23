import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { type ButtonSize, ZgButtonComponent } from '../../../atoms/button/button.component';
import {
  type SectionTitleSize,
  type SectionTitleTone,
  ZgSectionTitleComponent,
} from '../../../atoms/section-title/section-title.component';
import {
  type GameCardAspectRatio,
  ZgCasinoGameCardComponent,
} from '../../../molecules/casino/casino-game-card/casino-game-card.component';
import {
  type HorizontalListScrollState,
  ZgHorizontalListLayoutComponent,
} from '../../../molecules/shared/horizontal-list-layout/horizontal-list-layout.component';
import { ZgContentSectionHeaderComponent } from '../../../molecules/shared/content-section-header/content-section-header.component';
import { ZgSectionActionsComponent } from '../../../molecules/shared/section-actions/section-actions.component';

export interface CasinoGamesCarouselSectionItem {
  id: string;
  title: string;
  provider?: string;
  imageUrl: string;
  imageAlt?: string;
  ctaLabel?: string;
  favorite?: boolean;
  disabled?: boolean;
  showFavorite?: boolean;
  aspectRatio?: GameCardAspectRatio;
}

@Component({
  selector: 'zg-casino-games-carousel-section',
  standalone: true,
  imports: [
    ZgButtonComponent,
    ZgSectionTitleComponent,
    ZgSectionActionsComponent,
    ZgContentSectionHeaderComponent,
    ZgHorizontalListLayoutComponent,
    ZgCasinoGameCardComponent,
  ],
  templateUrl: './casino-games-carousel-section.component.html',
  styleUrl: './casino-games-carousel-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-games-carousel-section"',
  },
})
export class ZgCasinoGamesCarouselSectionComponent {
  @ViewChild('listLayout') private listLayout?: ZgHorizontalListLayoutComponent;

  title = input<string>('Most bet games');
  titleTone = input<SectionTitleTone>('primary');
  titleSize = input<SectionTitleSize>('md');
  actionsSize = input<ButtonSize | null>(null);
  showTitleAccent = input<boolean>(true);

  items = input<readonly CasinoGamesCarouselSectionItem[]>([]);
  listAriaLabel = input<string>('Games carousel');
  sectionAriaLabel = input<string>('Casino games section');
  actionsGroupAriaLabel = input<string>('Carousel actions');

  allActionLabel = input<string>('All');
  showAllAction = input<boolean>(true);

  scrollStep = input<number>(360);
  cardWidth = input<number>(180);

  viewAllClicked = output<void>();
  previousClicked = output<void>();
  nextClicked = output<void>();
  playRequested = output<CasinoGamesCarouselSectionItem>();
  favoriteRequested = output<CasinoGamesCarouselSectionItem>();

  protected canScrollPrev = signal(false);
  protected canScrollNext = signal(false);
  protected effectiveActionsSize = computed<ButtonSize>(() => {
    return this.actionsSize() ?? this.titleSize();
  });

  protected onViewAllClicked(): void {
    this.viewAllClicked.emit();
  }

  protected onPreviousClicked(): void {
    this.previousClicked.emit();
    this.listLayout?.scrollPrev();
  }

  protected onNextClicked(): void {
    this.nextClicked.emit();
    this.listLayout?.scrollNext();
  }

  protected onScrollStateChange(state: HorizontalListScrollState): void {
    this.canScrollPrev.set(state.canScrollPrev);
    this.canScrollNext.set(state.canScrollNext);
  }

  protected onPlayRequested(item: CasinoGamesCarouselSectionItem): void {
    this.playRequested.emit(item);
  }

  protected onFavoriteRequested(item: CasinoGamesCarouselSectionItem): void {
    this.favoriteRequested.emit(item);
  }
}
