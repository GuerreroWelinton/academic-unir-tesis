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

export interface CasinoTwoRowGamesCarouselSectionItem {
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

interface TwoRowColumn {
  id: string;
  items: readonly CasinoTwoRowGamesCarouselSectionItem[];
}

@Component({
  selector: 'zg-casino-two-row-games-carousel-section',
  standalone: true,
  imports: [
    ZgButtonComponent,
    ZgSectionTitleComponent,
    ZgSectionActionsComponent,
    ZgContentSectionHeaderComponent,
    ZgHorizontalListLayoutComponent,
    ZgCasinoGameCardComponent,
  ],
  templateUrl: './casino-two-row-games-carousel-section.component.html',
  styleUrl: './casino-two-row-games-carousel-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-two-row-games-carousel-section"',
  },
})
export class ZgCasinoTwoRowGamesCarouselSectionComponent {
  @ViewChild('listLayout') private listLayout?: ZgHorizontalListLayoutComponent;

  title = input<string>('All games');
  titleTone = input<SectionTitleTone>('primary');
  titleSize = input<SectionTitleSize>('md');
  actionsSize = input<ButtonSize | null>(null);
  showTitleAccent = input<boolean>(true);
  showHeader = input<boolean>(true);

  items = input<readonly CasinoTwoRowGamesCarouselSectionItem[]>([]);
  listAriaLabel = input<string>('Two row games carousel');
  sectionAriaLabel = input<string>('Two row games section');
  actionsGroupAriaLabel = input<string>('Two row carousel actions');

  allActionLabel = input<string>('All');
  showAllAction = input<boolean>(true);

  scrollStep = input<number>(520);
  cardWidth = input<number>(160);
  rowGap = input<string>('var(--zg-spacing-2)');

  viewAllClicked = output<void>();
  previousClicked = output<void>();
  nextClicked = output<void>();
  playRequested = output<CasinoTwoRowGamesCarouselSectionItem>();
  favoriteRequested = output<CasinoTwoRowGamesCarouselSectionItem>();

  protected canScrollPrev = signal(false);
  protected canScrollNext = signal(false);

  protected effectiveActionsSize = computed<ButtonSize>(
    () => this.actionsSize() ?? this.titleSize(),
  );
  protected itemColumns = computed<readonly TwoRowColumn[]>(() => {
    const source = this.items();
    const columns: TwoRowColumn[] = [];

    for (let index = 0; index < source.length; index += 2) {
      const slice = source.slice(index, index + 2);
      columns.push({
        id: `${slice[0]?.id ?? index}-${index}`,
        items: slice,
      });
    }

    return columns;
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

  protected onPlayRequested(item: CasinoTwoRowGamesCarouselSectionItem): void {
    this.playRequested.emit(item);
  }

  protected onFavoriteRequested(item: CasinoTwoRowGamesCarouselSectionItem): void {
    this.favoriteRequested.emit(item);
  }
}
