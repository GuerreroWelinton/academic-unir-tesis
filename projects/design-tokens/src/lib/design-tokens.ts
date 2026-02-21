/**
 * ZGames Design Tokens
 * TypeScript constants for type-safe access to design tokens
 * These values correspond to CSS variables defined in src/styles/_tokens.scss
 */

import type { Theme } from './design-tokens.types';

export * from './design-tokens.types';

/**
 * Design token names for programmatic access
 * Use these constants when you need to reference token names in TypeScript
 */
export const DesignTokens = {
  // Color tokens
  color: {
    // Primary brand colors
    primary: '--zg-color-primary',
    primaryHover: '--zg-color-primary-hover',
    primaryActive: '--zg-color-primary-active',
    primaryLight: '--zg-color-primary-light',
    primaryLighter: '--zg-color-primary-lighter',

    // Secondary colors
    secondary: '--zg-color-secondary',
    secondaryHover: '--zg-color-secondary-hover',
    secondaryActive: '--zg-color-secondary-active',

    // Accent & Highlight
    accent: '--zg-color-accent',
    highlight: '--zg-color-highlight',

    // Semantic feedback colors
    success: '--zg-color-success',
    successHover: '--zg-color-success-hover',
    successActive: '--zg-color-success-active',
    successLight: '--zg-color-success-light',
    warning: '--zg-color-warning',
    warningHover: '--zg-color-warning-hover',
    warningActive: '--zg-color-warning-active',
    warningLight: '--zg-color-warning-light',
    error: '--zg-color-error',
    errorHover: '--zg-color-error-hover',
    errorActive: '--zg-color-error-active',
    errorLight: '--zg-color-error-light',
    info: '--zg-color-info',
    infoHover: '--zg-color-info-hover',
    infoActive: '--zg-color-info-active',
    infoLight: '--zg-color-info-light',

    // iGaming specific colors
    betBuilder: '--zg-color-bet-builder',
    live: '--zg-color-live',
    favorite: '--zg-color-favorite',
    betOpen: '--zg-color-bet-open',
    betWon: '--zg-color-bet-won',
    betLost: '--zg-color-bet-lost',
    betOther: '--zg-color-bet-other',

    // Surface & UI colors
    surface: '--zg-color-surface',
    surfaceAlt: '--zg-color-surface-alt',
    surfaceHover: '--zg-color-surface-hover',
    border: '--zg-color-border',
    borderDark: '--zg-color-border-dark',

    // Text colors
    textPrimary: '--zg-color-text-primary',
    textSecondary: '--zg-color-text-secondary',
    textDisabled: '--zg-color-text-disabled',
    textInverse: '--zg-color-text-inverse',
    textInfo: '--zg-color-text-info',

    // Background colors
    bgPrimary: '--zg-color-bg-primary',
    bgSecondary: '--zg-color-bg-secondary',
    bgDark: '--zg-color-bg-dark',
    bgOverlay: '--zg-color-bg-overlay',
    bgCard: '--zg-color-bg-card',
    bgHeader: '--zg-color-bg-header',
  },

  // Typography tokens
  typography: {
    fontFamilyBase: '--zg-font-family-base',
    fontFamilySecondary: '--zg-font-family-secondary',
    fontSize: {
      xs: '--zg-font-size-xs',
      sm: '--zg-font-size-sm',
      base: '--zg-font-size-base',
      md: '--zg-font-size-md',
      lg: '--zg-font-size-lg',
      xl: '--zg-font-size-xl',
      '2xl': '--zg-font-size-2xl',
      '3xl': '--zg-font-size-3xl',
      '4xl': '--zg-font-size-4xl',
      '5xl': '--zg-font-size-5xl',
    },
    fontWeight: {
      light: '--zg-font-weight-light',
      regular: '--zg-font-weight-regular',
      medium: '--zg-font-weight-medium',
      semibold: '--zg-font-weight-semibold',
      bold: '--zg-font-weight-bold',
    },
    lineHeight: {
      tight: '--zg-line-height-tight',
      normal: '--zg-line-height-normal',
      relaxed: '--zg-line-height-relaxed',
    },
  },

  // Spacing tokens
  spacing: {
    0: '--zg-spacing-0',
    1: '--zg-spacing-1',
    2: '--zg-spacing-2',
    3: '--zg-spacing-3',
    4: '--zg-spacing-4',
    5: '--zg-spacing-5',
    6: '--zg-spacing-6',
    8: '--zg-spacing-8',
    10: '--zg-spacing-10',
    12: '--zg-spacing-12',
    16: '--zg-spacing-16',
    20: '--zg-spacing-20',
    24: '--zg-spacing-24',
  },

  // Radius tokens
  radius: {
    none: '--zg-radius-none',
    sm: '--zg-radius-sm',
    base: '--zg-radius-base',
    md: '--zg-radius-md',
    lg: '--zg-radius-lg',
    xl: '--zg-radius-xl',
    '2xl': '--zg-radius-2xl',
    full: '--zg-radius-full',
  },

  // Shadow tokens
  shadow: {
    xs: '--zg-shadow-xs',
    sm: '--zg-shadow-sm',
    base: '--zg-shadow-base',
    md: '--zg-shadow-md',
    lg: '--zg-shadow-lg',
    xl: '--zg-shadow-xl',
  },

  // Z-index tokens
  zIndex: {
    dropdown: '--zg-z-index-dropdown',
    sticky: '--zg-z-index-sticky',
    fixed: '--zg-z-index-fixed',
    modalBackdrop: '--zg-z-index-modal-backdrop',
    modal: '--zg-z-index-modal',
    popover: '--zg-z-index-popover',
    tooltip: '--zg-z-index-tooltip',
  },

  // Transition tokens
  transition: {
    fast: '--zg-transition-fast',
    base: '--zg-transition-base',
    slow: '--zg-transition-slow',
  },

  // Button tokens
  button: {
    // Background colors per variant
    bgPrimary: '--zg-button-bg-primary',
    bgPrimaryHover: '--zg-button-bg-primary-hover',
    bgPrimaryActive: '--zg-button-bg-primary-active',
    bgSecondary: '--zg-button-bg-secondary',
    bgSecondaryHover: '--zg-button-bg-secondary-hover',
    bgSecondaryActive: '--zg-button-bg-secondary-active',
    bgAccent: '--zg-button-bg-accent',
    bgAccentHover: '--zg-button-bg-accent-hover',
    bgAccentActive: '--zg-button-bg-accent-active',
    bgDanger: '--zg-button-bg-danger',
    bgDangerHover: '--zg-button-bg-danger-hover',
    bgDangerActive: '--zg-button-bg-danger-active',
    bgGhost: '--zg-button-bg-ghost',
    bgGhostHover: '--zg-button-bg-ghost-hover',
    bgGhostActive: '--zg-button-bg-ghost-active',

    // Text colors per variant
    textPrimary: '--zg-button-text-primary',
    textSecondary: '--zg-button-text-secondary',
    textAccent: '--zg-button-text-accent',
    textDanger: '--zg-button-text-danger',
    textGhost: '--zg-button-text-ghost',

    // Border colors per variant
    borderPrimary: '--zg-button-border-primary',
    borderSecondary: '--zg-button-border-secondary',
    borderAccent: '--zg-button-border-accent',
    borderDanger: '--zg-button-border-danger',
    borderGhost: '--zg-button-border-ghost',

    // Sizing
    heightSm: '--zg-button-height-sm',
    heightMd: '--zg-button-height-md',
    heightLg: '--zg-button-height-lg',
    paddingXSm: '--zg-button-padding-x-sm',
    paddingXMd: '--zg-button-padding-x-md',
    paddingXLg: '--zg-button-padding-x-lg',
    paddingYSm: '--zg-button-padding-y-sm',
    paddingYMd: '--zg-button-padding-y-md',
    paddingYLg: '--zg-button-padding-y-lg',
    iconGap: '--zg-button-icon-gap',

    // Border radius per shape
    radiusDefault: '--zg-button-radius-default',
    radiusPill: '--zg-button-radius-pill',
    radiusSquare: '--zg-button-radius-square',

    // Typography
    fontFamily: '--zg-button-font-family',
    fontFamilySecondary: '--zg-button-font-family-secondary',
    fontSizeSm: '--zg-button-font-size-sm',
    fontSizeMd: '--zg-button-font-size-md',
    fontSizeLg: '--zg-button-font-size-lg',
    fontWeight: '--zg-button-font-weight',

    // States
    disabledOpacity: '--zg-button-disabled-opacity',
    transition: '--zg-button-transition',
    focusRingColor: '--zg-button-focus-ring-color',
    focusRingWidth: '--zg-button-focus-ring-width',
    focusRingOffset: '--zg-button-focus-ring-offset',
  },
  input: {
    bg: '--zg-input-bg',
    bgDisabled: '--zg-input-bg-disabled',
    border: '--zg-input-border',
    borderFocused: '--zg-input-border-focused',
    borderDisabled: '--zg-input-border-disabled',
    errorBorder: '--zg-input-error-border',
    radius: '--zg-input-radius',
    labelColor: '--zg-input-label-color',
    labelFontSize: '--zg-input-label-font-size',
    labelFontWeight: '--zg-input-label-font-weight',
    labelMarginBottom: '--zg-input-label-margin-bottom',
    fontSize: '--zg-input-font-size',
    fontSizeSm: '--zg-input-font-size-sm',
    fontSizeLg: '--zg-input-font-size-lg',
    fontFamily: '--zg-input-font-family',
    color: '--zg-input-color',
    colorDisabled: '--zg-input-color-disabled',
    paddingXSm: '--zg-input-padding-x-sm',
    paddingXMd: '--zg-input-padding-x-md',
    paddingXlg: '--zg-input-padding-x-lg',
    paddingYMd: '--zg-input-padding-y-md',
    heightSm: '--zg-input-height-sm',
    heightMd: '--zg-input-height-md',
    heightLg: '--zg-input-height-lg',
    clearColor: '--zg-input-clear-color',
    clearPadding: '--zg-input-clear-padding',
    errorColor: '--zg-input-error-color',
    errorFontSize: '--zg-input-error-font-size',
    errorMarginTop: '--zg-input-error-margin-top',
    helperColor: '--zg-input-helper-color',
    helperFontSize: '--zg-input-helper-font-size',
    helperMarginTop: '--zg-input-helper-margin-top',
    focusRing: '--zg-input-focus-ring',
    iconGap: '--zg-input-icon-gap',
  },

  // Badge tokens
  badge: {
    // Background colors per variant
    bgPrimary: '--zg-badge-bg-primary',
    bgSecondary: '--zg-badge-bg-secondary',
    bgSuccess: '--zg-badge-bg-success',
    bgWarning: '--zg-badge-bg-warning',
    bgError: '--zg-badge-bg-error',
    bgInfo: '--zg-badge-bg-info',
    bgNeutral: '--zg-badge-bg-neutral',

    // Text colors per variant
    textPrimary: '--zg-badge-text-primary',
    textSecondary: '--zg-badge-text-secondary',
    textSuccess: '--zg-badge-text-success',
    textWarning: '--zg-badge-text-warning',
    textError: '--zg-badge-text-error',
    textInfo: '--zg-badge-text-info',
    textNeutral: '--zg-badge-text-neutral',

    // Sizing
    heightSm: '--zg-badge-height-sm',
    heightMd: '--zg-badge-height-md',
    heightLg: '--zg-badge-height-lg',
    paddingXSm: '--zg-badge-padding-x-sm',
    paddingXMd: '--zg-badge-padding-x-md',
    paddingXLg: '--zg-badge-padding-x-lg',
    minWidthSm: '--zg-badge-min-width-sm',
    minWidthMd: '--zg-badge-min-width-md',
    minWidthLg: '--zg-badge-min-width-lg',

    // Typography
    fontSizeSm: '--zg-badge-font-size-sm',
    fontSizeMd: '--zg-badge-font-size-md',
    fontSizeLg: '--zg-badge-font-size-lg',
    fontWeight: '--zg-badge-font-weight',
    fontFamily: '--zg-badge-font-family',
    lineHeight: '--zg-badge-line-height',

    // Border radius per shape
    radiusDefault: '--zg-badge-radius-default',
    radiusPill: '--zg-badge-radius-pill',
    radiusSquare: '--zg-badge-radius-square',

    // Close button
    closeGap: '--zg-badge-close-gap',
    closeSize: '--zg-badge-close-size',
    closeHoverOpacity: '--zg-badge-close-hover-opacity',

    // Dot mode
    dotSizeSm: '--zg-badge-dot-size-sm',
    dotSizeMd: '--zg-badge-dot-size-md',
    dotSizeLg: '--zg-badge-dot-size-lg',

    // Transitions
    transition: '--zg-badge-transition',
  },

  // Chip tokens
  chip: {
    // Background colors per variant - NORMAL state
    bgFilled: '--zg-chip-bg-filled',
    bgOutlined: '--zg-chip-bg-outlined',
    bgGhost: '--zg-chip-bg-ghost',

    // Background colors per variant - SELECTED state
    bgFilledSelected: '--zg-chip-bg-filled-selected',
    bgOutlinedSelected: '--zg-chip-bg-outlined-selected',
    bgGhostSelected: '--zg-chip-bg-ghost-selected',

    // Background colors per variant - HOVER state
    bgFilledHover: '--zg-chip-bg-filled-hover',
    bgOutlinedHover: '--zg-chip-bg-outlined-hover',
    bgGhostHover: '--zg-chip-bg-ghost-hover',

    // Background colors per variant - SELECTED + HOVER state
    bgFilledSelectedHover: '--zg-chip-bg-filled-selected-hover',
    bgOutlinedSelectedHover: '--zg-chip-bg-outlined-selected-hover',
    bgGhostSelectedHover: '--zg-chip-bg-ghost-selected-hover',

    // Border colors per variant - NORMAL state
    borderFilled: '--zg-chip-border-filled',
    borderOutlined: '--zg-chip-border-outlined',
    borderGhost: '--zg-chip-border-ghost',

    // Border colors per variant - SELECTED state
    borderFilledSelected: '--zg-chip-border-filled-selected',
    borderOutlinedSelected: '--zg-chip-border-outlined-selected',
    borderGhostSelected: '--zg-chip-border-ghost-selected',

    // Text colors per variant - NORMAL state
    textFilled: '--zg-chip-text-filled',
    textOutlined: '--zg-chip-text-outlined',
    textGhost: '--zg-chip-text-ghost',

    // Text colors per variant - SELECTED state
    textFilledSelected: '--zg-chip-text-filled-selected',
    textOutlinedSelected: '--zg-chip-text-outlined-selected',
    textGhostSelected: '--zg-chip-text-ghost-selected',

    // Text colors - DISABLED state
    textDisabled: '--zg-chip-text-disabled',

    // Sizing
    heightSm: '--zg-chip-height-sm',
    heightMd: '--zg-chip-height-md',
    heightLg: '--zg-chip-height-lg',
    paddingXSm: '--zg-chip-padding-x-sm',
    paddingXMd: '--zg-chip-padding-x-md',
    paddingXLg: '--zg-chip-padding-x-lg',

    // Typography
    fontSizeSm: '--zg-chip-font-size-sm',
    fontSizeMd: '--zg-chip-font-size-md',
    fontSizeLg: '--zg-chip-font-size-lg',
    fontWeight: '--zg-chip-font-weight',
    fontFamily: '--zg-chip-font-family',
    lineHeight: '--zg-chip-line-height',

    // Icon spacing
    iconGap: '--zg-chip-icon-gap',

    // Border radius
    radius: '--zg-chip-radius',

    // Border width
    borderWidth: '--zg-chip-border-width',

    // States
    disabledOpacity: '--zg-chip-disabled-opacity',
    transition: '--zg-chip-transition',
    focusRingColor: '--zg-chip-focus-ring-color',
    focusRingWidth: '--zg-chip-focus-ring-width',
    focusRingOffset: '--zg-chip-focus-ring-offset',
  },

  // Game card tokens
  gameCard: {
    bg: '--zg-game-card-bg',
    borderColor: '--zg-game-card-border-color',
    radius: '--zg-game-card-radius',
    shadow: '--zg-game-card-shadow',
    overlayBg: '--zg-game-card-overlay-bg',
    placeholderBg: '--zg-game-card-placeholder-bg',
    titleColor: '--zg-game-card-title-color',
    providerColor: '--zg-game-card-provider-color',
    iconButtonBg: '--zg-game-card-icon-button-bg',
    iconColor: '--zg-game-card-icon-color',
    favoriteColor: '--zg-game-card-favorite-color',
    favoriteActiveColor: '--zg-game-card-favorite-active-color',
    playButtonBg: '--zg-game-card-play-button-bg',
    playButtonColor: '--zg-game-card-play-button-color',
    aspectRatioPortrait: '--zg-game-card-aspect-ratio-portrait',
    aspectRatioSquare: '--zg-game-card-aspect-ratio-square',
    topRowOffset: '--zg-game-card-top-row-offset',
    topRowGap: '--zg-game-card-top-row-gap',
    overlayPadding: '--zg-game-card-overlay-padding',
    contentGap: '--zg-game-card-content-gap',
    textGap: '--zg-game-card-text-gap',
    iconButtonSize: '--zg-game-card-icon-button-size',
    playButtonHeight: '--zg-game-card-play-button-height',
    playButtonPaddingX: '--zg-game-card-play-button-padding-x',
    playButtonGap: '--zg-game-card-play-button-gap',
    disabledOpacity: '--zg-game-card-disabled-opacity',
    transition: '--zg-game-card-transition',
    focusRingColor: '--zg-game-card-focus-ring-color',
    focusRingWidth: '--zg-game-card-focus-ring-width',
    focusRingOffset: '--zg-game-card-focus-ring-offset',
  },
} as const;

/**
 * Helper function to get computed token value from CSS
 * @param tokenName - The CSS variable name (e.g., '--zg-color-primary')
 * @param element - Optional element to get computed style from (defaults to document.documentElement)
 * @returns The computed value of the CSS variable
 *
 * @example
 * ```ts
 * const primaryColor = getTokenValue(DesignTokens.color.primary);
 * ```
 */
export function getTokenValue(tokenName: string, element?: HTMLElement): string {
  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(tokenName).trim();
}

/**
 * Helper function to set a token value dynamically
 * @param tokenName - The CSS variable name
 * @param value - The new value
 * @param element - Optional element to set the style on (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * setTokenValue(DesignTokens.color.primary, '#ff0000');
 * ```
 */
export function setTokenValue(tokenName: string, value: string, element?: HTMLElement): void {
  const target = element || document.documentElement;
  target.style.setProperty(tokenName, value);
}

/**
 * Create and apply a custom theme by overriding default tokens
 * @param overrides - Partial theme configuration with token values to override
 * @param element - Optional element to apply theme to (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * // Recommended: Change primitives for complete theming
 * createTheme({
 *   primitives: {
 *     green800: '#custom-brand-color',
 *     green500: '#custom-secondary',
 *     neutral200: '#f0f0f0',
 *   }
 * });
 * // All semantic tokens update automatically!
 * ```
 *
 * @example
 * ```ts
 * // Alternative: Override semantic tokens directly
 * createTheme({
 *   color: {
 *     primary: '#ff6b35',
 *     primaryHover: '#ff5722',
 *     secondary: '#004e89',
 *   },
 *   radius: {
 *     base: '8px',
 *     lg: '16px',
 *   }
 * });
 * ```
 */
export function createTheme(overrides: Theme, element?: HTMLElement): void {
  const target = element || document.documentElement;

  // Apply primitive overrides (LAYER 1 - recommended)
  if (overrides.primitives) {
    Object.entries(overrides.primitives).forEach(([key, value]) => {
      if (value !== undefined) {
        // Convert camelCase to kebab-case (green800 -> --zg-green-800)
        const tokenName = `--zg-${key.replace(/([a-z])(\d)/g, '$1-$2')}`;
        target.style.setProperty(tokenName, value);
      }
    });
  }

  // Apply color overrides (LAYER 2 - semantic)
  if (overrides.color) {
    Object.entries(overrides.color).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.color[key as keyof typeof DesignTokens.color];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }

  // Apply typography overrides
  if (overrides.typography) {
    if (overrides.typography.fontFamilyBase) {
      target.style.setProperty(
        DesignTokens.typography.fontFamilyBase,
        overrides.typography.fontFamilyBase,
      );
    }
    if (overrides.typography.fontFamilySecondary) {
      target.style.setProperty(
        DesignTokens.typography.fontFamilySecondary,
        overrides.typography.fontFamilySecondary,
      );
    }
  }

  // Apply spacing overrides
  if (overrides.spacing) {
    Object.entries(overrides.spacing).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.spacing[key as unknown as keyof typeof DesignTokens.spacing];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }

  // Apply radius overrides
  if (overrides.radius) {
    Object.entries(overrides.radius).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.radius[key as keyof typeof DesignTokens.radius];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }

  // Apply shadow overrides
  if (overrides.shadow) {
    Object.entries(overrides.shadow).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.shadow[key as keyof typeof DesignTokens.shadow];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }

  // Apply transition overrides
  if (overrides.transition) {
    Object.entries(overrides.transition).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.transition[key as keyof typeof DesignTokens.transition];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }

  // Apply button overrides
  if (overrides.button) {
    Object.entries(overrides.button).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.button[key as keyof typeof DesignTokens.button];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }

  // Apply game card overrides
  if (overrides.gameCard) {
    Object.entries(overrides.gameCard).forEach(([key, value]) => {
      if (value !== undefined) {
        const tokenName = DesignTokens.gameCard[key as keyof typeof DesignTokens.gameCard];
        if (tokenName) {
          target.style.setProperty(tokenName, value);
        }
      }
    });
  }
}

/**
 * Reset theme to default values by removing all custom CSS properties
 * @param element - Optional element to reset (defaults to document.documentElement)
 *
 * @example
 * ```ts
 * resetTheme(); // Reset to default theme
 * ```
 */
export function resetTheme(element?: HTMLElement): void {
  const target = element || document.documentElement;

  // Get all inline styles and remove any that start with --zg-
  // This is more robust than maintaining a hardcoded list
  const inlineStyles = target.style;
  const propertiesToRemove: string[] = [];

  // Collect all --zg-* properties
  for (const propertyName of Array.from(inlineStyles)) {
    if (propertyName.startsWith('--zg-')) {
      propertiesToRemove.push(propertyName);
    }
  }

  // Remove all collected properties
  propertiesToRemove.forEach((propertyName) => {
    target.style.removeProperty(propertyName);
  });
}
