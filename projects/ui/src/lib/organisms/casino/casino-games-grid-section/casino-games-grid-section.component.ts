import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ZgCasinoCatalogHeaderComponent } from '../../../molecules/casino/casino-catalog-header/casino-catalog-header.component';
import { type BreadcrumbItem } from '../../../molecules/shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'zg-casino-games-grid-section',
  standalone: true,
  imports: [ZgCasinoCatalogHeaderComponent],
  templateUrl: './casino-games-grid-section.component.html',
  styleUrl: './casino-games-grid-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"zg-casino-games-grid-section"',
    '[style.--zg-casino-games-grid-section-card-min-width]': 'effectiveCardMinWidth()',
  },
})
export class ZgCasinoGamesGridSectionComponent {
  breadcrumbs = input<readonly BreadcrumbItem[]>([]);
  breadcrumbAriaLabel = input<string>('Catalog breadcrumb');
  title = input<string>('All games');
  gamesCount = input<number | null>(null);
  gamesCountSuffix = input<string>('games');
  headerAriaLabel = input<string>('Casino catalog header');

  sectionAriaLabel = input<string>('Casino games grid section');
  gridAriaLabel = input<string>('Games grid');
  emptyStateLabel = input<string>('No games available');
  showEmptyState = input<boolean>(false);
  cardMinWidth = input<number | null>(null);

  breadcrumbItemClicked = output<BreadcrumbItem>();

  protected effectiveCardMinWidth = computed<string | null>(() => {
    const cardMinWidth = this.cardMinWidth();
    if (cardMinWidth === null || cardMinWidth <= 0) {
      return null;
    }
    return `${cardMinWidth}px`;
  });

  protected onBreadcrumbItemClicked(item: BreadcrumbItem): void {
    this.breadcrumbItemClicked.emit(item);
  }
}
