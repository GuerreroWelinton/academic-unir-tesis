import type {
  BadgeTokens,
  BreadcrumbTokens,
  ButtonTokens,
  CasinoCatalogHeaderTokens,
  CasinoGamesGridSectionTokens,
  CasinoGameCardTokens,
  CasinoProviderParallaxShowcaseTokens,
  CasinoRankedGamesCarouselSectionTokens,
  CasinoProviderCarouselTokens,
  CasinoSearchBarTokens,
  CasinoTwoRowGamesCarouselSectionTokens,
  ChipTokens,
  ContentSectionHeaderTokens,
  InputTokens,
  LuckyPickerTokens,
  PrimitiveTokens,
  RadiusTokens,
  SemanticColorTokens,
  SectionActionsTokens,
  SectionTitleTokens,
  ShadowTokens,
  SpacingTokens,
  Theme,
  ThemeRegistry,
  TransitionTokens,
  TypographyTokens,
  ZIndexTokens,
} from './design-tokens.types';

import {
  badgeTokens,
  breadcrumbTokens,
  buttonTokens,
  casinoCatalogHeaderTokens,
  casinoGamesGridSectionTokens,
  casinoGameCardTokens,
  casinoProviderParallaxShowcaseTokens,
  casinoRankedGamesCarouselSectionTokens,
  casinoProviderCarouselTokens,
  casinoSearchBarTokens,
  casinoTwoRowGamesCarouselSectionTokens,
  chipTokens,
  colorTokens,
  contentSectionHeaderTokens,
  inputTokens,
  luckyPickerTokens,
  radiusTokens,
  sectionActionsTokens,
  sectionTitleTokens,
  shadowTokens,
  spacingTokens,
  transitionTokens,
  typographyThemeTokens,
  typographyTokens,
  zIndexTokens,
} from './tokens';

export const DesignTokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  zIndex: zIndexTokens,
  transition: transitionTokens,
  button: buttonTokens,
  input: inputTokens,
  badge: badgeTokens,
  chip: chipTokens,
  casinoCatalogHeader: casinoCatalogHeaderTokens,
  casinoGamesGridSection: casinoGamesGridSectionTokens,
  breadcrumb: breadcrumbTokens,
  sectionTitle: sectionTitleTokens,
  sectionActions: sectionActionsTokens,
  contentSectionHeader: contentSectionHeaderTokens,
  casinoGameCard: casinoGameCardTokens,
  casinoRankedGamesCarouselSection: casinoRankedGamesCarouselSectionTokens,
  casinoProviderCarousel: casinoProviderCarouselTokens,
  casinoSearchBar: casinoSearchBarTokens,
  casinoTwoRowGamesCarouselSection: casinoTwoRowGamesCarouselSectionTokens,
  casinoProviderParallaxShowcase: casinoProviderParallaxShowcaseTokens,
  luckyPicker: luckyPickerTokens,
  gameCard: casinoGameCardTokens,
} as const;

type TokenMap = Record<string, string>;

function applyTokenGroup(
  target: HTMLElement,
  overrides: Record<string, string | undefined> | undefined,
  tokenMap: TokenMap,
): void {
  if (!overrides) {
    return;
  }

  Object.entries(overrides).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }
    const tokenName = tokenMap[key];
    if (tokenName) {
      target.style.setProperty(tokenName, value);
    }
  });
}

export function getTokenValue(tokenName: string, element?: HTMLElement): string {
  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(tokenName).trim();
}

export function setTokenValue(tokenName: string, value: string, element?: HTMLElement): void {
  const target = element || document.documentElement;
  target.style.setProperty(tokenName, value);
}

export function createTheme(overrides: Theme, element?: HTMLElement): void {
  const target = element || document.documentElement;

  if (overrides.primitives) {
    Object.entries(overrides.primitives as PrimitiveTokens).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = `--zg-${key.replace(/([a-z])(\d)/g, '$1-$2')}`;
        target.style.setProperty(tokenName, value);
      }
    });
  }

  applyTokenGroup(target, overrides.color as SemanticColorTokens, DesignTokens.color);
  applyTokenGroup(target, overrides.typography as TypographyTokens, typographyThemeTokens);
  applyTokenGroup(target, overrides.spacing as SpacingTokens, DesignTokens.spacing);
  applyTokenGroup(target, overrides.radius as RadiusTokens, DesignTokens.radius);
  applyTokenGroup(target, overrides.shadow as ShadowTokens, DesignTokens.shadow);
  applyTokenGroup(target, overrides.zIndex as ZIndexTokens, DesignTokens.zIndex);
  applyTokenGroup(target, overrides.transition as TransitionTokens, DesignTokens.transition);
  applyTokenGroup(target, overrides.button as ButtonTokens, DesignTokens.button);
  applyTokenGroup(target, overrides.input as InputTokens, DesignTokens.input);
  applyTokenGroup(target, overrides.badge as BadgeTokens, DesignTokens.badge);
  applyTokenGroup(target, overrides.chip as ChipTokens, DesignTokens.chip);
  applyTokenGroup(
    target,
    overrides.casinoCatalogHeader as CasinoCatalogHeaderTokens,
    DesignTokens.casinoCatalogHeader,
  );
  applyTokenGroup(
    target,
    overrides.casinoGamesGridSection as CasinoGamesGridSectionTokens,
    DesignTokens.casinoGamesGridSection,
  );
  applyTokenGroup(target, overrides.breadcrumb as BreadcrumbTokens, DesignTokens.breadcrumb);
  applyTokenGroup(target, overrides.sectionTitle as SectionTitleTokens, DesignTokens.sectionTitle);
  applyTokenGroup(
    target,
    overrides.sectionActions as SectionActionsTokens,
    DesignTokens.sectionActions,
  );
  applyTokenGroup(
    target,
    overrides.contentSectionHeader as ContentSectionHeaderTokens,
    DesignTokens.contentSectionHeader,
  );
  applyTokenGroup(
    target,
    overrides.casinoGameCard as CasinoGameCardTokens,
    DesignTokens.casinoGameCard,
  );
  applyTokenGroup(
    target,
    overrides.casinoRankedGamesCarouselSection as CasinoRankedGamesCarouselSectionTokens,
    DesignTokens.casinoRankedGamesCarouselSection,
  );
  applyTokenGroup(
    target,
    overrides.casinoProviderCarousel as CasinoProviderCarouselTokens,
    DesignTokens.casinoProviderCarousel,
  );
  applyTokenGroup(
    target,
    overrides.casinoSearchBar as CasinoSearchBarTokens,
    DesignTokens.casinoSearchBar,
  );
  applyTokenGroup(
    target,
    overrides.casinoTwoRowGamesCarouselSection as CasinoTwoRowGamesCarouselSectionTokens,
    DesignTokens.casinoTwoRowGamesCarouselSection,
  );
  applyTokenGroup(
    target,
    overrides.casinoProviderParallaxShowcase as CasinoProviderParallaxShowcaseTokens,
    DesignTokens.casinoProviderParallaxShowcase,
  );
  applyTokenGroup(target, overrides.luckyPicker as LuckyPickerTokens, DesignTokens.luckyPicker);
}

function getFirstTheme(clientThemes: Record<string, Theme> | undefined): Theme | undefined {
  if (!clientThemes) {
    return undefined;
  }
  const [firstTheme] = Object.values(clientThemes);
  return firstTheme;
}

export function resolveThemeFromRegistry<TClient extends string>(
  registry: ThemeRegistry<TClient>,
  clientId: TClient,
  variant = 'light',
  fallbackClientId: TClient = clientId,
  fallbackVariant = 'light',
): Theme {
  const clientThemes = registry[clientId];
  const fallbackClientThemes = registry[fallbackClientId];

  const resolvedTheme =
    clientThemes?.[variant] ??
    clientThemes?.[fallbackVariant] ??
    fallbackClientThemes?.[variant] ??
    fallbackClientThemes?.[fallbackVariant] ??
    getFirstTheme(clientThemes) ??
    getFirstTheme(fallbackClientThemes);

  if (!resolvedTheme) {
    throw new Error('No theme could be resolved from the provided registry.');
  }

  return resolvedTheme;
}

export function getThemeVariantsFromRegistry<TClient extends string>(
  registry: ThemeRegistry<TClient>,
  clientId: TClient,
  fallbackClientId?: TClient,
): string[] {
  const clientThemes =
    registry[clientId] || (fallbackClientId ? registry[fallbackClientId] : undefined);
  return clientThemes ? Object.keys(clientThemes) : [];
}

export function applyThemeFromRegistry<TClient extends string>(
  registry: ThemeRegistry<TClient>,
  clientId: TClient,
  options?: {
    variant?: string;
    fallbackClientId?: TClient;
    fallbackVariant?: string;
    element?: HTMLElement;
    resetFirst?: boolean;
  },
): Theme {
  const variant = options?.variant || 'light';
  const fallbackClientId = options?.fallbackClientId ?? clientId;
  const fallbackVariant = options?.fallbackVariant || 'light';
  const element = options?.element;
  const resetFirst = options?.resetFirst ?? true;

  const theme = resolveThemeFromRegistry(
    registry,
    clientId,
    variant,
    fallbackClientId,
    fallbackVariant,
  );

  if (resetFirst) {
    resetTheme(element);
  }

  createTheme(theme, element);
  return theme;
}

export function resetTheme(element?: HTMLElement): void {
  const target = element || document.documentElement;
  const inlineStyles = target.style;
  const propertiesToRemove: string[] = [];

  for (const propertyName of Array.from(inlineStyles)) {
    if (propertyName.startsWith('--zg-')) {
      propertiesToRemove.push(propertyName);
    }
  }

  propertiesToRemove.forEach((propertyName) => {
    target.style.removeProperty(propertyName);
  });
}
