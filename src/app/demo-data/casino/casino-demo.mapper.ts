import {
  type CasinoCatalogMode,
  type CasinoCatalogPageVm,
  type CasinoCatalogSnapshot,
  type CasinoGameVm,
} from './casino-demo.types';

const DEFAULT_VERTICAL_IMAGE = 'https://placehold.co/320x440?text=Casino+Game';
const DEFAULT_SQUARE_IMAGE = 'https://placehold.co/320x320?text=Casino+Game';

function extractGameSlug(sourceImageUrl: string): string | null {
  const [cleanUrl] = sourceImageUrl.split('?');
  const segments = cleanUrl.split('/');
  const fileName = segments[segments.length - 1];
  if (!fileName) {
    return null;
  }

  const slug = fileName.replace(/\.[^/.]+$/, '');
  return slug.length > 0 ? slug : null;
}

function toVerticalImageUrl(sourceImageUrl: string | null): string {
  if (!sourceImageUrl) {
    return DEFAULT_VERTICAL_IMAGE;
  }

  if (sourceImageUrl.includes('/vertical/')) {
    return sourceImageUrl;
  }

  const slug = extractGameSlug(sourceImageUrl);
  if (!slug) {
    return sourceImageUrl;
  }

  return `https://api-casino.zgames.tech/images/aleaplay/vertical/${slug}.webp`;
}

function toSquareImageUrl(sourceImageUrl: string | null): string {
  if (!sourceImageUrl) {
    return DEFAULT_SQUARE_IMAGE;
  }

  if (sourceImageUrl.includes('/square/')) {
    return sourceImageUrl;
  }

  const slug = extractGameSlug(sourceImageUrl);
  if (!slug) {
    return sourceImageUrl;
  }

  return `https://api-casino.zgames.tech/images/aleaplay/square/${slug}.webp`;
}

export function isCasinoCatalogMode(value: string): value is CasinoCatalogMode {
  return value === 'all-games' || value === 'most-bet' || value === 'most-played-games';
}

export function normalizeCategoryValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapGame(game: CasinoCatalogSnapshot['games'][number]): CasinoGameVm {
  return {
    id: game.id,
    title: game.title,
    provider: game.provider,
    category: game.category,
    imageUrl: toVerticalImageUrl(game.sourceImageUrl),
    squareImageUrl: toSquareImageUrl(game.sourceImageUrl),
    imageAlt: `${game.title} by ${game.provider}`,
    sourceImageUrl: game.sourceImageUrl,
  };
}

export function mapSnapshotToPageVm(snapshot: CasinoCatalogSnapshot): CasinoCatalogPageVm {
  return {
    mode: snapshot.mode,
    title: snapshot.title,
    breadcrumbs: [
      { id: 'home', label: 'Home' },
      { id: 'casino', label: 'Casino' },
      { id: 'catalog', label: snapshot.title, current: true },
    ],
    games: snapshot.games.map(mapGame),
    gamesCount: snapshot.games.length,
    categories: snapshot.categories.map((category) => ({ ...category })),
    selectedCategory: snapshot.selectedCategory,
    heroImageUrl: snapshot.heroImageUrl ?? undefined,
    parallaxImageUrl: snapshot.parallaxImageUrl ?? undefined,
    snapshotAt: snapshot.snapshotAt,
    sourceUrls: snapshot.sourceUrls,
  };
}
