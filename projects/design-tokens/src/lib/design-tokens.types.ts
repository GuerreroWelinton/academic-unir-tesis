import type {
  badgeTokens,
  buttonTokens,
  chipTokens,
  colorTokens,
  gameCardTokens,
  inputTokens,
  radiusTokens,
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
export type GameCardTokens = TokenOverrides<typeof gameCardTokens>;

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
  gameCard?: GameCardTokens;
}
