import type {
  BadgeTokens,
  ButtonTokens,
  ChipTokens,
  GameCardTokens,
  InputTokens,
  PrimitiveTokens,
  RadiusTokens,
  SemanticColorTokens,
  ShadowTokens,
  SpacingTokens,
  Theme,
  TransitionTokens,
  TypographyTokens,
  ZIndexTokens,
} from './design-tokens.types';

import {
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
  gameCard: gameCardTokens,
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
  applyTokenGroup(target, overrides.gameCard as GameCardTokens, DesignTokens.gameCard);
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
