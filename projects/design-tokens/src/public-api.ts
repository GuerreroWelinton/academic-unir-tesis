/*
 * Public API Surface of design-tokens
 */

export {
  applyThemeFromRegistry,
  getThemeVariantsFromRegistry,
  resetTheme,
} from './lib/design-tokens';

export type {
  BadgeTokens,
  ButtonTokens,
  ChipTokens,
  InputTokens,
  PrimitiveTokens,
  RadiusTokens,
  SemanticColorTokens,
  ShadowTokens,
  SpacingTokens,
  Theme,
  ThemeRegistry,
  TransitionTokens,
  TypographyTokens,
  ZIndexTokens,
} from './lib/design-tokens.types';
