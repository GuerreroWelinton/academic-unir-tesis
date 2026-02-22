import {
  applyThemeFromRegistry,
  createTheme,
  DesignTokens,
  getThemeVariantsFromRegistry,
  getTokenValue,
  resetTheme,
  resolveThemeFromRegistry,
  setTokenValue,
} from './design-tokens';

describe('DesignTokens', () => {
  beforeEach(() => {
    resetTheme();
  });

  it('should export token constants', () => {
    expect(DesignTokens).toBeDefined();
    expect(DesignTokens.color).toBeDefined();
    expect(DesignTokens.spacing).toBeDefined();
    expect(DesignTokens.radius).toBeDefined();
  });

  it('should have correct token names', () => {
    expect(DesignTokens.color.primary).toBe('--zg-color-primary');
    expect(DesignTokens.spacing[4]).toBe('--zg-spacing-4');
    expect(DesignTokens.radius.base).toBe('--zg-radius-base');
    expect(DesignTokens.sectionTitle.fontSizeMd).toBe('--zg-section-title-font-size-md');
    expect(DesignTokens.sectionActions.gap).toBe('--zg-section-actions-gap');
    expect(DesignTokens.contentSectionHeader.gap).toBe('--zg-content-section-header-gap');
    expect(DesignTokens.casinoCatalogHeader.gap).toBe('--zg-casino-catalog-header-gap');
    expect(DesignTokens.casinoGamesGridSection.gap).toBe('--zg-casino-games-grid-section-gap');
    expect(DesignTokens.breadcrumb.gap).toBe('--zg-breadcrumb-gap');
    expect(DesignTokens.casinoGameCard.bg).toBe('--zg-casino-game-card-bg');
    expect(DesignTokens.casinoProviderCarousel.gap).toBe('--zg-casino-provider-carousel-gap');
    expect(DesignTokens.casinoSearchBar.gap).toBe('--zg-casino-search-bar-gap');
    expect(DesignTokens.casinoTwoRowGamesCarouselSection.gap).toBe(
      '--zg-casino-two-row-games-carousel-section-gap',
    );
    expect(DesignTokens.casinoProviderParallaxShowcase.minHeight).toBe(
      '--zg-casino-provider-parallax-showcase-min-height',
    );
    expect(DesignTokens.luckyPicker.bg).toBe('--zg-lucky-picker-bg');
    expect(DesignTokens.gameCard.bg).toBe('--zg-casino-game-card-bg');
  });

  it('should set and get token value', () => {
    setTokenValue('--test-token', '#ff0000');
    expect(getTokenValue('--test-token')).toBe('#ff0000');
  });

  it('should apply theme and reset', () => {
    createTheme({ color: { primary: '#123456' } });
    expect(getTokenValue('--zg-color-primary')).toBe('#123456');
    resetTheme();
    expect(getTokenValue('--zg-color-primary')).toBe('');
  });

  it('should apply casino game card token overrides', () => {
    createTheme({
      casinoGameCard: {
        bg: '#101010',
        borderColor: '#202020',
        playButtonBg: '#00aa00',
      },
    });

    expect(getTokenValue(DesignTokens.casinoGameCard.bg)).toBe('#101010');
    expect(getTokenValue(DesignTokens.casinoGameCard.borderColor)).toBe('#202020');
    expect(getTokenValue(DesignTokens.casinoGameCard.playButtonBg)).toBe('#00aa00');
  });

  it('should apply all supported override groups', () => {
    createTheme({
      primitives: { green800: '#0f0f0f' },
      color: { primary: '#111111' },
      typography: { fontFamilyBase: 'Arial, sans-serif' },
      spacing: { 4: '1.25rem' },
      radius: { md: '0.75rem' },
      shadow: { md: '0 6px 14px rgba(0, 0, 0, 0.2)' },
      zIndex: { modal: '2000' },
      transition: { fast: '120ms ease' },
      button: { bgPrimary: '#222222' },
      input: { bg: '#f5f5f5' },
      badge: { bgPrimary: '#333333' },
      chip: { bgFilled: '#444444' },
      casinoCatalogHeader: { gap: '1.5rem' },
      casinoGamesGridSection: { gridGap: '0.75rem' },
      breadcrumb: { gap: '0.375rem' },
      sectionTitle: { textColorPrimary: '#118811' },
      sectionActions: { gap: '0.875rem' },
      contentSectionHeader: { gap: '1.125rem' },
      casinoGameCard: { focusRingColor: '#33ff33' },
      casinoProviderCarousel: { gap: '0.5rem' },
      casinoSearchBar: { gap: '0.625rem' },
      casinoTwoRowGamesCarouselSection: { gap: '1rem' },
      casinoProviderParallaxShowcase: { minHeight: '30rem' },
      luckyPicker: { bg: '#121212' },
    });

    expect(getTokenValue('--zg-green-800')).toBe('#0f0f0f');
    expect(getTokenValue(DesignTokens.color.primary)).toBe('#111111');
    expect(getTokenValue(DesignTokens.typography.fontFamilyBase)).toBe('Arial, sans-serif');
    expect(getTokenValue(DesignTokens.spacing[4])).toBe('1.25rem');
    expect(getTokenValue(DesignTokens.radius.md)).toBe('0.75rem');
    expect(getTokenValue(DesignTokens.shadow.md)).toBe('0 6px 14px rgba(0, 0, 0, 0.2)');
    expect(getTokenValue(DesignTokens.zIndex.modal)).toBe('2000');
    expect(getTokenValue(DesignTokens.transition.fast)).toBe('120ms ease');
    expect(getTokenValue(DesignTokens.button.bgPrimary)).toBe('#222222');
    expect(getTokenValue(DesignTokens.input.bg)).toBe('#f5f5f5');
    expect(getTokenValue(DesignTokens.badge.bgPrimary)).toBe('#333333');
    expect(getTokenValue(DesignTokens.chip.bgFilled)).toBe('#444444');
    expect(getTokenValue(DesignTokens.casinoCatalogHeader.gap)).toBe('1.5rem');
    expect(getTokenValue(DesignTokens.casinoGamesGridSection.gridGap)).toBe('0.75rem');
    expect(getTokenValue(DesignTokens.breadcrumb.gap)).toBe('0.375rem');
    expect(getTokenValue(DesignTokens.sectionTitle.textColorPrimary)).toBe('#118811');
    expect(getTokenValue(DesignTokens.sectionActions.gap)).toBe('0.875rem');
    expect(getTokenValue(DesignTokens.contentSectionHeader.gap)).toBe('1.125rem');
    expect(getTokenValue(DesignTokens.casinoGameCard.focusRingColor)).toBe('#33ff33');
    expect(getTokenValue(DesignTokens.casinoProviderCarousel.gap)).toBe('0.5rem');
    expect(getTokenValue(DesignTokens.casinoSearchBar.gap)).toBe('0.625rem');
    expect(getTokenValue(DesignTokens.casinoTwoRowGamesCarouselSection.gap)).toBe('1rem');
    expect(getTokenValue(DesignTokens.casinoProviderParallaxShowcase.minHeight)).toBe('30rem');
    expect(getTokenValue(DesignTokens.luckyPicker.bg)).toBe('#121212');
  });

  it('should resolve and apply themes from a registry', () => {
    const registry = {
      demo: {
        light: { color: { primary: '#101010' } },
        dark: { color: { primary: '#202020' } },
      },
      fallback: {
        light: { color: { primary: '#303030' } },
      },
    } as const;

    const resolved = resolveThemeFromRegistry(registry, 'demo', 'dark', 'fallback');
    expect(resolved.color?.primary).toBe('#202020');

    applyThemeFromRegistry(registry, 'demo', {
      variant: 'dark',
      fallbackClientId: 'fallback',
    });
    expect(getTokenValue(DesignTokens.color.primary)).toBe('#202020');
  });

  it('should return available theme variants from a registry', () => {
    const registry = {
      demo: {
        light: { color: { primary: '#101010' } },
        dark: { color: { primary: '#202020' } },
      },
    } as const;

    expect(getThemeVariantsFromRegistry(registry, 'demo')).toEqual(['light', 'dark']);
  });
});
