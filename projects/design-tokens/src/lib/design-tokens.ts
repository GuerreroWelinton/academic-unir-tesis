/**
 * ZGames Design Tokens
 * TypeScript constants for type-safe access to design tokens
 * These values correspond to CSS variables defined in src/styles/_tokens.scss
 */

/**
 * Design token names for programmatic access
 * Use these constants when you need to reference token names in TypeScript
 */
export const DesignTokens = {
  // Color tokens
  color: {
    primary: '--zg-color-primary',
    primaryHover: '--zg-color-primary-hover',
    primaryActive: '--zg-color-primary-active',
    primaryLight: '--zg-color-primary-light',
    primaryLighter: '--zg-color-primary-lighter',
    secondary: '--zg-color-secondary',
    secondaryHover: '--zg-color-secondary-hover',
    secondaryActive: '--zg-color-secondary-active',
    success: '--zg-color-success',
    successLight: '--zg-color-success-light',
    warning: '--zg-color-warning',
    warningLight: '--zg-color-warning-light',
    error: '--zg-color-error',
    errorLight: '--zg-color-error-light',
    info: '--zg-color-info',
    infoLight: '--zg-color-info-light',
    surface: '--zg-color-surface',
    surfaceAlt: '--zg-color-surface-alt',
    surfaceHover: '--zg-color-surface-hover',
    border: '--zg-color-border',
    borderDark: '--zg-color-border-dark',
    textPrimary: '--zg-color-text-primary',
    textSecondary: '--zg-color-text-secondary',
    textDisabled: '--zg-color-text-disabled',
    textInverse: '--zg-color-text-inverse',
    bgPrimary: '--zg-color-bg-primary',
    bgSecondary: '--zg-color-bg-secondary',
    bgDark: '--zg-color-bg-dark',
    bgOverlay: '--zg-color-bg-overlay',
  },

  // Typography tokens
  typography: {
    fontFamilyBase: '--zg-font-family-base',
    fontFamilyMono: '--zg-font-family-mono',
    fontSize: {
      xs: '--zg-font-size-xs',
      sm: '--zg-font-size-sm',
      base: '--zg-font-size-base',
      lg: '--zg-font-size-lg',
      xl: '--zg-font-size-xl',
      '2xl': '--zg-font-size-2xl',
      '3xl': '--zg-font-size-3xl',
      '4xl': '--zg-font-size-4xl',
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
 * Theme configuration type
 * Defines the structure for theme overrides
 */
export interface Theme {
  // LAYER 1: Primitive color scales (recommended for theming)
  primitives?: {
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
  };

  // LAYER 2: Semantic tokens (use only if you need specific overrides)
  color?: {
    primary?: string;
    primaryHover?: string;
    primaryActive?: string;
    primaryLight?: string;
    primaryLighter?: string;
    secondary?: string;
    secondaryHover?: string;
    secondaryActive?: string;
    success?: string;
    successLight?: string;
    warning?: string;
    warningLight?: string;
    error?: string;
    errorLight?: string;
    info?: string;
    infoLight?: string;
    surface?: string;
    surfaceAlt?: string;
    surfaceHover?: string;
    border?: string;
    borderDark?: string;
    textPrimary?: string;
    textSecondary?: string;
    textDisabled?: string;
    textInverse?: string;
    bgPrimary?: string;
    bgSecondary?: string;
    bgDark?: string;
    bgOverlay?: string;
  };
  typography?: {
    fontFamilyBase?: string;
    fontFamilyMono?: string;
  };
  spacing?: {
    [key: string]: string;
  };
  radius?: {
    [key: string]: string;
  };
  shadow?: {
    [key: string]: string;
  };
  transition?: {
    fast?: string;
    base?: string;
    slow?: string;
  };
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
    if (overrides.typography.fontFamilyMono) {
      target.style.setProperty(
        DesignTokens.typography.fontFamilyMono,
        overrides.typography.fontFamilyMono,
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

  // Remove all zg-* custom properties
  const allTokens = [
    ...Object.values(DesignTokens.color),
    DesignTokens.typography.fontFamilyBase,
    DesignTokens.typography.fontFamilyMono,
    ...Object.values(DesignTokens.spacing),
    ...Object.values(DesignTokens.radius),
    ...Object.values(DesignTokens.shadow),
    ...Object.values(DesignTokens.transition),
  ];

  allTokens.forEach((tokenName) => {
    target.style.removeProperty(tokenName);
  });
}
