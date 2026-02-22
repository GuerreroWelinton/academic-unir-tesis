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

export interface CasinoRankedGamesCarouselItem {
  id: string;
  title: string;
  provider?: string;
  imageUrl: string;
  imageAlt?: string;
  rank?: number;
  ctaLabel?: string;
  favorite?: boolean;
  disabled?: boolean;
  showFavorite?: boolean;
  aspectRatio?: GameCardAspectRatio;
}

@Component({
  selector: 'zg-casino-ranked-games-carousel-section',
  standalone: true,
  imports: [
    ZgButtonComponent,
    ZgSectionTitleComponent,
    ZgSectionActionsComponent,
    ZgContentSectionHeaderComponent,
    ZgHorizontalListLayoutComponent,
    ZgCasinoGameCardComponent,
  ],
  templateUrl: './casino-ranked-games-carousel-section.component.html',
  styleUrl: './casino-ranked-games-carousel-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-ranked-games-carousel-section"',
  },
})
export class ZgCasinoRankedGamesCarouselSectionComponent {
  @ViewChild('listLayout') private listLayout?: ZgHorizontalListLayoutComponent;

  title = input<string>('Top 10 casino');
  titleTone = input<SectionTitleTone>('primary');
  titleSize = input<SectionTitleSize>('md');
  actionsSize = input<ButtonSize | null>(null);
  showTitleAccent = input<boolean>(true);

  items = input<readonly CasinoRankedGamesCarouselItem[]>([]);
  listAriaLabel = input<string>('Ranked games carousel');
  sectionAriaLabel = input<string>('Ranked games section');
  actionsGroupAriaLabel = input<string>('Ranked games actions');

  allActionLabel = input<string>('All');
  showAllAction = input<boolean>(false);

  scrollStep = input<number>(360);
  cardWidth = input<number>(180);

  viewAllClicked = output<void>();
  previousClicked = output<void>();
  nextClicked = output<void>();
  playRequested = output<CasinoRankedGamesCarouselItem>();
  favoriteRequested = output<CasinoRankedGamesCarouselItem>();

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

  protected onPlayRequested(item: CasinoRankedGamesCarouselItem): void {
    this.playRequested.emit(item);
  }

  protected onFavoriteRequested(item: CasinoRankedGamesCarouselItem): void {
    this.favoriteRequested.emit(item);
  }

  protected rankFor(item: CasinoRankedGamesCarouselItem, index: number): number {
    return item.rank ?? index + 1;
  }
}
