export type CasinoCatalogMode = 'all-games' | 'most-bet' | 'most-played-games';

export interface CasinoCatalogCategoryFixture {
  id: string;
  label: string;
  gamesCount: number | null;
}

export interface CasinoCatalogGameFixture {
  id: string;
  title: string;
  provider: string;
  category: string;
  sourceImageUrl: string | null;
}

export interface CasinoCatalogSnapshot {
  mode: CasinoCatalogMode;
  title: string;
  selectedCategory: string;
  heroImageUrl: string | null;
  parallaxImageUrl: string | null;
  snapshotAt: string;
  sourceUrls: readonly string[];
  categories: readonly CasinoCatalogCategoryFixture[];
  games: readonly CasinoCatalogGameFixture[];
}

export interface CasinoBreadcrumbVm {
  id: string;
  label: string;
  href?: string;
  disabled?: boolean;
  current?: boolean;
}

export interface CasinoCategoryVm {
  id: string;
  label: string;
  gamesCount: number | null;
}

export interface CasinoGameVm {
  id: string;
  title: string;
  provider: string;
  category: string;
  imageUrl: string;
  squareImageUrl: string;
  imageAlt: string;
  sourceImageUrl: string | null;
}

export interface CasinoCatalogPageVm {
  mode: CasinoCatalogMode;
  title: string;
  breadcrumbs: readonly CasinoBreadcrumbVm[];
  games: readonly CasinoGameVm[];
  gamesCount: number;
  categories: readonly CasinoCategoryVm[];
  selectedCategory: string;
  heroImageUrl?: string;
  parallaxImageUrl?: string;
  snapshotAt: string;
  sourceUrls: readonly string[];
}
