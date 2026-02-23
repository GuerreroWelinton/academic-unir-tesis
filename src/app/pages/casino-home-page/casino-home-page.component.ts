import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  ZgCasinoGamesCarouselSectionComponent,
  ZgCasinoHomeHeroComponent,
  ZgCasinoHomeTemplateComponent,
  ZgCasinoProviderCarouselComponent,
  ZgCasinoProviderParallaxShowcaseComponent,
  ZgCasinoRankedGamesCarouselSectionComponent,
  ZgCasinoSearchBarComponent,
  ZgCasinoTwoRowGamesCarouselSectionComponent,
  ZgCategoryFilterTabsComponent,
  ZgLuckyPickerComponent,
  ZgSiteHeaderComponent,
  type CasinoGamesCarouselSectionItem,
  type CasinoProviderCarouselItem,
  type CasinoRankedGamesCarouselItem,
  type CasinoTwoRowGamesCarouselSectionItem,
  type CategoryFilterTabItem,
  type SiteHeaderNavItem,
} from '@zgames/ui';
import { ALL_GAMES_FIXTURE } from '../../demo-data/casino/all-games.fixture';
import {
  mapSnapshotToPageVm,
  normalizeCategoryValue,
} from '../../demo-data/casino/casino-demo.mapper';
import {
  type CasinoCatalogMode,
  type CasinoGameVm,
} from '../../demo-data/casino/casino-demo.types';
import { MOST_BET_FIXTURE } from '../../demo-data/casino/most-bet.fixture';
import { MOST_PLAYED_FIXTURE } from '../../demo-data/casino/most-played.fixture';

const NAV_ITEMS: { id: string; label: string; route?: string; disabled?: boolean }[] = [
  { id: 'sports', label: 'SPORTS', disabled: true },
  { id: 'casino', label: 'CASINO', route: '/casino' },
  { id: 'live-casino', label: 'LIVE CASINO', disabled: true },
  { id: 'virtuals', label: 'VIRTUALS', disabled: true },
  { id: 'promotions', label: 'PROMOTIONS', disabled: true },
] as const;

const CATALOG_ROUTE_BY_MODE: Readonly<Record<CasinoCatalogMode, string>> = {
  'all-games': '/casino/all-games',
  'most-bet': '/casino/most-bet',
  'most-played-games': '/casino/most-played-games',
};

const BASE_PROVIDER_ITEMS: readonly CasinoProviderCarouselItem[] = [
  {
    id: 'wazdan',
    name: 'WAZDAN',
    logoUrl: 'https://placehold.co/260x80?text=WAZDAN',
  },
  {
    id: 'kagaming',
    name: 'KAGAMING',
    logoUrl: 'https://placehold.co/260x80?text=KAGAMING',
  },
  {
    id: 'evoplay',
    name: 'EVOPLAY',
    logoUrl: 'https://placehold.co/260x80?text=EVOPLAY',
  },
  {
    id: 'spribe',
    name: 'SPRIBE',
    logoUrl: 'https://placehold.co/260x80?text=SPRIBE',
  },
];

const PROVIDER_ITEMS: readonly CasinoProviderCarouselItem[] = Array.from(
  { length: 3 },
  (_, repeatIndex) =>
    BASE_PROVIDER_ITEMS.map((item) => ({
      ...item,
      id: `${item.id}-${repeatIndex + 1}`,
    })),
).flat();

function humanizeCategoryLabel(categoryId: string): string {
  return categoryId
    .split('-')
    .filter((part) => part.length > 0)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function gameMatchesFilters(game: CasinoGameVm, query: string, selectedCategory: string): boolean {
  const normalizedCategory = normalizeCategoryValue(game.category);
  const categoryMatches = selectedCategory === 'all' || normalizedCategory === selectedCategory;
  if (!categoryMatches) {
    return false;
  }

  if (!query) {
    return true;
  }

  return (
    game.title.toLowerCase().includes(query) ||
    game.provider.toLowerCase().includes(query) ||
    normalizedCategory.includes(query)
  );
}

function toCarouselItem(game: CasinoGameVm): CasinoGamesCarouselSectionItem {
  return {
    id: game.id,
    title: game.title,
    provider: game.provider,
    imageUrl: game.squareImageUrl,
    imageAlt: game.imageAlt,
  };
}

@Component({
  selector: 'zg-casino-home-page',
  standalone: true,
  imports: [
    ZgCasinoHomeTemplateComponent,
    ZgSiteHeaderComponent,
    ZgCasinoHomeHeroComponent,
    ZgCasinoSearchBarComponent,
    ZgCategoryFilterTabsComponent,
    ZgCasinoGamesCarouselSectionComponent,
    ZgCasinoRankedGamesCarouselSectionComponent,
    ZgCasinoProviderParallaxShowcaseComponent,
    ZgCasinoProviderCarouselComponent,
    ZgLuckyPickerComponent,
    ZgCasinoTwoRowGamesCarouselSectionComponent,
  ],
  templateUrl: './casino-home-page.component.html',
  styleUrl: './casino-home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoHomePageComponent {
  private readonly router = inject(Router);

  private readonly allGamesVm = mapSnapshotToPageVm(ALL_GAMES_FIXTURE);
  private readonly mostBetVm = mapSnapshotToPageVm(MOST_BET_FIXTURE);
  private readonly mostPlayedVm = mapSnapshotToPageVm(MOST_PLAYED_FIXTURE);

  readonly searchQuery = signal('');
  readonly selectedCategory = signal('all');

  readonly navItems = computed<readonly SiteHeaderNavItem[]>(() => {
    return NAV_ITEMS.map((item) => ({
      id: item.id,
      label: item.label,
      active: item.id === 'casino',
      disabled: item.disabled,
    }));
  });

  readonly categoryItems = computed<readonly CategoryFilterTabItem[]>(() => {
    const counts = new Map<string, number>();
    for (const game of this.allGamesVm.games) {
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

  readonly providerItems = PROVIDER_ITEMS;

  readonly filteredAllGames = computed<readonly CasinoGameVm[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const selectedCategory = normalizeCategoryValue(this.selectedCategory());

    return this.allGamesVm.games.filter((game) =>
      gameMatchesFilters(game, query, selectedCategory),
    );
  });

  readonly mostBetGames = computed<readonly CasinoGamesCarouselSectionItem[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const selectedCategory = normalizeCategoryValue(this.selectedCategory());

    return this.mostBetVm.games
      .filter((game) => gameMatchesFilters(game, query, selectedCategory))
      .map((game) => toCarouselItem(game));
  });

  readonly mostPlayedGames = computed<readonly CasinoGamesCarouselSectionItem[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const selectedCategory = normalizeCategoryValue(this.selectedCategory());

    return this.mostPlayedVm.games
      .filter((game) => gameMatchesFilters(game, query, selectedCategory))
      .map((game) => toCarouselItem(game));
  });

  readonly rankedGames = computed<readonly CasinoRankedGamesCarouselItem[]>(() => {
    return this.mostPlayedGames()
      .slice(0, 10)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  });

  readonly twoRowGames = computed<readonly CasinoTwoRowGamesCarouselSectionItem[]>(() => {
    return this.filteredAllGames().map((game) => ({
      id: game.id,
      title: game.title,
      provider: game.provider,
      imageUrl: game.squareImageUrl,
      imageAlt: game.imageAlt,
    }));
  });

  onNavItemClicked(item: SiteHeaderNavItem): void {
    const navItem = NAV_ITEMS.find((entry) => entry.id === item.id);
    if (!navItem || navItem.disabled || !navItem.route) {
      return;
    }

    void this.router.navigateByUrl(navItem.route);
  }

  onBrandClicked(): void {
    void this.router.navigateByUrl('/casino');
  }

  onSearchChanged(query: string): void {
    this.searchQuery.set(query);
  }

  onCategoryChanged(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  onMostBetViewAllClicked(): void {
    this.navigateToCatalog('most-bet');
  }

  onMostPlayedViewAllClicked(): void {
    this.navigateToCatalog('most-played-games');
  }

  onAllGamesViewAllClicked(): void {
    this.navigateToCatalog('all-games');
  }

  onProvidersClicked(): void {
    // Presentational output handled by container when needed.
  }

  onProviderSelected(provider: CasinoProviderCarouselItem): void {
    void provider;
  }

  onLuckyPickerClicked(): void {
    // Presentational output handled by container when needed.
  }

  onGamePlayRequested(
    item:
      | CasinoGamesCarouselSectionItem
      | CasinoRankedGamesCarouselItem
      | CasinoTwoRowGamesCarouselSectionItem,
  ): void {
    void item;
  }

  onGameFavoriteRequested(
    item:
      | CasinoGamesCarouselSectionItem
      | CasinoRankedGamesCarouselItem
      | CasinoTwoRowGamesCarouselSectionItem,
  ): void {
    void item;
  }

  onLoginClicked(): void {
    // Presentational output handled by container when needed.
  }

  onRegisterClicked(): void {
    // Presentational output handled by container when needed.
  }

  private navigateToCatalog(mode: CasinoCatalogMode): void {
    void this.router.navigateByUrl(CATALOG_ROUTE_BY_MODE[mode]);
  }
}
