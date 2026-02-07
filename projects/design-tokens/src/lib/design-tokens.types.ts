/**
 * ZGames Design Tokens - Type Definitions
 * Type definitions and interfaces for the design token system
 */

/**
 * Primitive color scales for theming
 * These are the raw color values that can be overridden to create themes
 */
export interface PrimitiveTokens {
  // Green scale
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

  // Orange scale
  orange900?: string;
  orange800?: string;
  orange700?: string;
  orange600?: string;
  orange500?: string;
  orange400?: string;
  orange300?: string;
  orange200?: string;
  orange100?: string;

  // Red scale
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

  // Yellow scale
  yellow900?: string;
  yellow800?: string;
  yellow700?: string;
  yellow600?: string;
  yellow500?: string;
  yellow400?: string;
  yellow300?: string;
  yellow200?: string;
  yellow100?: string;

  // Blue scale
  blue900?: string;
  blue800?: string;
  blue700?: string;
  blue600?: string;
  blue500?: string;
  blue400?: string;
  blue300?: string;
  blue200?: string;
  blue100?: string;

  // Neutral scale
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

/**
 * Semantic color tokens
 * These provide meaningful names for colors based on their usage
 */
export interface SemanticColorTokens {
  // Primary brand colors
  primary?: string;
  primaryHover?: string;
  primaryActive?: string;
  primaryLight?: string;
  primaryLighter?: string;

  // Secondary colors
  secondary?: string;
  secondaryHover?: string;
  secondaryActive?: string;

  // Accent & Highlight
  accent?: string;
  highlight?: string;

  // Semantic feedback colors
  success?: string;
  successLight?: string;
  warning?: string;
  warningLight?: string;
  error?: string;
  errorLight?: string;
  info?: string;
  infoLight?: string;

  // iGaming specific colors
  betBuilder?: string;
  live?: string;
  favorite?: string;
  betOpen?: string;
  betWon?: string;
  betLost?: string;
  betOther?: string;

  // Surface & UI colors
  surface?: string;
  surfaceAlt?: string;
  surfaceHover?: string;
  border?: string;
  borderDark?: string;

  // Text colors
  textPrimary?: string;
  textSecondary?: string;
  textDisabled?: string;
  textInverse?: string;
  textInfo?: string;

  // Background colors
  bgPrimary?: string;
  bgSecondary?: string;
  bgDark?: string;
  bgOverlay?: string;
  bgCard?: string;
  bgHeader?: string;
}

/**
 * Typography tokens
 */
export interface TypographyTokens {
  fontFamilyBase?: string;
  fontFamilySecondary?: string;
}

/**
 * Spacing tokens
 */
export type SpacingTokens = Record<string, string>;

/**
 * Border radius tokens
 */
export type RadiusTokens = Record<string, string>;

/**
 * Shadow tokens
 */
export type ShadowTokens = Record<string, string>;

/**
 * Transition tokens
 */
export interface TransitionTokens {
  fast?: string;
  base?: string;
  slow?: string;
}

/**
 * Button-specific tokens
 */
export interface ButtonTokens {
  bgPrimary?: string;
  bgSecondary?: string;
  colorPrimary?: string;
  radius?: string;
}

/**
 * Complete theme configuration
 * Use this interface to define custom themes
 */
export interface Theme {
  // LAYER 1: Primitive color scales (recommended for theming)
  primitives?: PrimitiveTokens;

  // LAYER 2: Semantic tokens (use only if you need specific overrides)
  color?: SemanticColorTokens;
  typography?: TypographyTokens;
  spacing?: SpacingTokens;
  radius?: RadiusTokens;
  shadow?: ShadowTokens;
  transition?: TransitionTokens;
  button?: ButtonTokens;
}
