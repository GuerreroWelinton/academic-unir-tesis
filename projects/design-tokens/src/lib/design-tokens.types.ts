import type {
  badgeTokens,
  breadcrumbTokens,
  buttonTokens,
  casinoGameCardTokens,
  casinoProviderParallaxShowcaseTokens,
  casinoRankedGamesCarouselSectionTokens,
  casinoProviderCarouselTokens,
  casinoSearchBarTokens,
  casinoTwoRowGamesCarouselSectionTokens,
  chipTokens,
  casinoCatalogHeaderTokens,
  casinoHomeHeroTokens,
  casinoGamesGridSectionTokens,
  colorTokens,
  contentSectionHeaderTokens,
  inputTokens,
  luckyPickerTokens,
  radiusTokens,
  sectionActionsTokens,
  sectionTitleTokens,
  siteHeaderTokens,
  shadowTokens,
  spacingTokens,
  transitionTokens,
  typographyThemeTokens,
  zIndexTokens,
} from './tokens';

export type TokenOverrides<T extends Record<string, string>> = Partial<Record<keyof T, string>>;

/**
 * Primitive color scales for theming.
 * These are raw values, not semantic aliases.
 */
export interface PrimitiveTokens {
  green950?: string;
  green900?: string;
  green800?: string;
  green700?: string;
  green600?: string;
  green500?: string;
  green400?: string;
  green300?: string;
  green200?: string;
  green100?: string;
  green50?: string;
  orange900?: string;
  orange800?: string;
  orange700?: string;
  orange600?: string;
  orange500?: string;
  orange400?: string;
  orange300?: string;
  orange200?: string;
  orange100?: string;
  red900?: string;
  red800?: string;
  red700?: string;
  red600?: string;
  red500?: string;
  red400?: string;
  red300?: string;
  red200?: string;
  red100?: string;
  red50?: string;
  yellow900?: string;
  yellow800?: string;
  yellow700?: string;
  yellow600?: string;
  yellow500?: string;
  yellow400?: string;
  yellow300?: string;
  yellow200?: string;
  yellow100?: string;
  blue900?: string;
  blue800?: string;
  blue700?: string;
  blue600?: string;
  blue500?: string;
  blue400?: string;
  blue300?: string;
  blue200?: string;
  blue100?: string;
  neutral100?: string;
  neutral200?: string;
  neutral300?: string;
  neutral400?: string;
  neutral500?: string;
  neutral600?: string;
  neutral700?: string;
  neutral800?: string;
  neutral900?: string;
}

export type SemanticColorTokens = TokenOverrides<typeof colorTokens>;
export type TypographyTokens = TokenOverrides<typeof typographyThemeTokens>;
export type SpacingTokens = TokenOverrides<typeof spacingTokens>;
export type RadiusTokens = TokenOverrides<typeof radiusTokens>;
export type ShadowTokens = TokenOverrides<typeof shadowTokens>;
export type ZIndexTokens = TokenOverrides<typeof zIndexTokens>;
export type TransitionTokens = TokenOverrides<typeof transitionTokens>;
export type ButtonTokens = TokenOverrides<typeof buttonTokens>;
export type InputTokens = TokenOverrides<typeof inputTokens>;
export type BadgeTokens = TokenOverrides<typeof badgeTokens>;
export type ChipTokens = TokenOverrides<typeof chipTokens>;
export type CasinoCatalogHeaderTokens = TokenOverrides<typeof casinoCatalogHeaderTokens>;
export type CasinoHomeHeroTokens = TokenOverrides<typeof casinoHomeHeroTokens>;
export type CasinoGamesGridSectionTokens = TokenOverrides<typeof casinoGamesGridSectionTokens>;
export type BreadcrumbTokens = TokenOverrides<typeof breadcrumbTokens>;
export type CasinoGameCardTokens = TokenOverrides<typeof casinoGameCardTokens>;
export type CasinoRankedGamesCarouselSectionTokens = TokenOverrides<
  typeof casinoRankedGamesCarouselSectionTokens
>;
export type CasinoProviderCarouselTokens = TokenOverrides<typeof casinoProviderCarouselTokens>;
export type CasinoSearchBarTokens = TokenOverrides<typeof casinoSearchBarTokens>;
export type CasinoTwoRowGamesCarouselSectionTokens = TokenOverrides<
  typeof casinoTwoRowGamesCarouselSectionTokens
>;
export type CasinoProviderParallaxShowcaseTokens = TokenOverrides<
  typeof casinoProviderParallaxShowcaseTokens
>;
export type LuckyPickerTokens = TokenOverrides<typeof luckyPickerTokens>;
export type SectionTitleTokens = TokenOverrides<typeof sectionTitleTokens>;
export type SectionActionsTokens = TokenOverrides<typeof sectionActionsTokens>;
export type ContentSectionHeaderTokens = TokenOverrides<typeof contentSectionHeaderTokens>;
export type SiteHeaderTokens = TokenOverrides<typeof siteHeaderTokens>;

export interface Theme {
  primitives?: PrimitiveTokens;
  color?: SemanticColorTokens;
  typography?: TypographyTokens;
  spacing?: SpacingTokens;
  radius?: RadiusTokens;
  shadow?: ShadowTokens;
  zIndex?: ZIndexTokens;
  transition?: TransitionTokens;
  button?: ButtonTokens;
  input?: InputTokens;
  badge?: BadgeTokens;
  chip?: ChipTokens;
  casinoCatalogHeader?: CasinoCatalogHeaderTokens;
  casinoHomeHero?: CasinoHomeHeroTokens;
  casinoGamesGridSection?: CasinoGamesGridSectionTokens;
  breadcrumb?: BreadcrumbTokens;
  casinoGameCard?: CasinoGameCardTokens;
  casinoRankedGamesCarouselSection?: CasinoRankedGamesCarouselSectionTokens;
  casinoProviderCarousel?: CasinoProviderCarouselTokens;
  casinoSearchBar?: CasinoSearchBarTokens;
  casinoTwoRowGamesCarouselSection?: CasinoTwoRowGamesCarouselSectionTokens;
  casinoProviderParallaxShowcase?: CasinoProviderParallaxShowcaseTokens;
  luckyPicker?: LuckyPickerTokens;
  sectionTitle?: SectionTitleTokens;
  sectionActions?: SectionActionsTokens;
  contentSectionHeader?: ContentSectionHeaderTokens;
  siteHeader?: SiteHeaderTokens;
}

export type ThemeRegistry<TClient extends string = string> = Record<TClient, Record<string, Theme>>;
