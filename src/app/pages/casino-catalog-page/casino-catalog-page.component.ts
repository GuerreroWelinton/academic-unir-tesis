import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import {
  ZgCasinoGameCardComponent,
  ZgCasinoGamesGridSectionComponent,
  ZgCasinoGamesGridTemplateComponent,
  ZgCasinoSearchBarComponent,
  ZgCategoryFilterTabsComponent,
  ZgSiteHeaderComponent,
  type CategoryFilterTabItem,
  type SiteHeaderNavItem,
} from '@zgames/ui';
import { filter, map, startWith } from 'rxjs';
import { ALL_GAMES_FIXTURE } from '../../demo-data/casino/all-games.fixture';
import {
  isCasinoCatalogMode,
  mapSnapshotToPageVm,
  normalizeCategoryValue,
} from '../../demo-data/casino/casino-demo.mapper';
import {
  type CasinoCatalogMode,
  type CasinoGameVm,
} from '../../demo-data/casino/casino-demo.types';
import { MOST_BET_FIXTURE } from '../../demo-data/casino/most-bet.fixture';
import { MOST_PLAYED_FIXTURE } from '../../demo-data/casino/most-played.fixture';

const CHUNK_SIZE = 24;
const DEFAULT_MODE: CasinoCatalogMode = 'all-games';
const FALLBACK_ROUTE = '/casino';

const SNAPSHOTS_BY_MODE = {
  'all-games': ALL_GAMES_FIXTURE,
  'most-bet': MOST_BET_FIXTURE,
  'most-played-games': MOST_PLAYED_FIXTURE,
} as const;

const HEADER_NAV_ITEMS: { id: string; label: string; route?: string; disabled?: boolean }[] = [
  { id: 'sports', label: 'SPORTS', disabled: true },
  { id: 'casino', label: 'CASINO', route: '/casino' },
  { id: 'live-casino', label: 'LIVE CASINO', disabled: true },
  { id: 'virtuals', label: 'VIRTUALS', disabled: true },
  { id: 'promotions', label: 'PROMOTIONS', disabled: true },
] as const;

function humanizeCategoryLabel(categoryId: string): string {
  return categoryId
    .split('-')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function resolveModeFromUrl(url: string): CasinoCatalogMode {
  const segments = url.split('?')[0].split('/').filter(Boolean);
  const maybeMode = segments[segments.length - 1] ?? '';
  return isCasinoCatalogMode(maybeMode) ? maybeMode : DEFAULT_MODE;
}

@Component({
  selector: 'zg-casino-catalog-page',
  standalone: true,
  imports: [
    ZgCasinoGamesGridTemplateComponent,
    ZgSiteHeaderComponent,
    ZgCasinoSearchBarComponent,
    ZgCategoryFilterTabsComponent,
    ZgCasinoGamesGridSectionComponent,
    ZgCasinoGameCardComponent,
  ],
  templateUrl: './casino-catalog-page.component.html',
  styleUrl: './casino-catalog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoCatalogPageComponent {
  private readonly router = inject(Router);
  private readonly loadMoreAnchor = viewChild<ElementRef<HTMLElement>>('loadMoreAnchor');

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly supportsIntersectionObserver = typeof IntersectionObserver !== 'undefined';

  readonly mode = computed<CasinoCatalogMode>(() => resolveModeFromUrl(this.currentUrl()));
  readonly searchQuery = signal('');
  readonly selectedCategory = signal('all');
  readonly visibleCount = signal(CHUNK_SIZE);

  readonly snapshot = computed(() => SNAPSHOTS_BY_MODE[this.mode()]);
  readonly baseVm = computed(() => mapSnapshotToPageVm(this.snapshot()));

  readonly navItems = computed<readonly SiteHeaderNavItem[]>(() => {
    return HEADER_NAV_ITEMS.map((item) => ({
      id: item.id,
      label: item.label,
      active: item.id === 'casino',
      disabled: item.disabled,
    }));
  });

  readonly categoryItems = computed<readonly CategoryFilterTabItem[]>(() => {
    const counts = new Map<string, number>();
    for (const game of this.baseVm().games) {
      const categoryId = normalizeCategoryValue(game.category);
      counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
    }

    const dynamicCategories: CategoryFilterTabItem[] = [];
    for (const [categoryId, count] of counts.entries()) {
      dynamicCategories.push({
        id: categoryId,
        label: `${humanizeCategoryLabel(categoryId)} (${count.toLocaleString('en-US')})`,
      });
    }

    return [{ id: 'all', label: 'All categories' }, ...dynamicCategories];
  });

  readonly filteredGames = computed<readonly CasinoGameVm[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const category = normalizeCategoryValue(this.selectedCategory());

    return this.baseVm().games.filter((game) => {
      const gameCategory = normalizeCategoryValue(game.category);
      const categoryMatches = category === 'all' || gameCategory === category;
      if (!categoryMatches) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        game.title.toLowerCase().includes(query) ||
        game.provider.toLowerCase().includes(query) ||
        gameCategory.includes(query)
      );
    });
  });

  readonly visibleGames = computed(() => this.filteredGames().slice(0, this.visibleCount()));
  readonly hasMoreGames = computed(() => this.visibleGames().length < this.filteredGames().length);

  readonly vm = computed(() => ({
    ...this.baseVm(),
    selectedCategory: this.selectedCategory(),
    gamesCount: this.filteredGames().length,
    games: this.visibleGames(),
  }));

  constructor() {
    effect(() => {
      this.mode();
      this.searchQuery.set('');
      this.selectedCategory.set(this.baseVm().selectedCategory);
      this.visibleCount.set(CHUNK_SIZE);
    });

    effect(() => {
      this.searchQuery();
      this.selectedCategory();
      this.visibleCount.set(CHUNK_SIZE);
    });

    effect((onCleanup) => {
      if (!this.supportsIntersectionObserver || !this.hasMoreGames()) {
        return;
      }

      const anchor = this.loadMoreAnchor()?.nativeElement;
      if (!anchor) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.loadMore();
          }
        },
        { rootMargin: '280px 0px' },
      );

      observer.observe(anchor);
      onCleanup(() => observer.disconnect());
    });
  }

  onSearchChanged(query: string): void {
    this.searchQuery.set(query);
  }

  onCategoryChanged(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  onNavItemClicked(item: SiteHeaderNavItem): void {
    const nextItem = HEADER_NAV_ITEMS.find((navItem) => navItem.id === item.id);
    if (!nextItem || nextItem.disabled || !nextItem.route) {
      return;
    }

    void this.router.navigateByUrl(nextItem.route);
  }

  onBrandClicked(): void {
    void this.router.navigateByUrl(FALLBACK_ROUTE);
  }

  onBreadcrumbItemClicked(item: { id: string }): void {
    if (item.id === 'catalog') {
      return;
    }

    void this.router.navigateByUrl(FALLBACK_ROUTE);
  }

  onGamePlayClicked(game: CasinoGameVm): void {
    void game;
  }

  onProvidersClicked(): void {
    // Presentational output handled by container when needed.
  }

  onLoginClicked(): void {
    // Presentational output handled by container when needed.
  }

  onRegisterClicked(): void {
    // Presentational output handled by container when needed.
  }

  loadMore(): void {
    if (!this.hasMoreGames()) {
      return;
    }

    this.visibleCount.update((current) => current + CHUNK_SIZE);
  }
}
