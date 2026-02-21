import {
  createTheme,
  DesignTokens,
  getTokenValue,
  resetTheme,
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
    expect(DesignTokens.gameCard.bg).toBe('--zg-game-card-bg');
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

  it('should apply game card token overrides', () => {
    createTheme({
      gameCard: {
        bg: '#101010',
        borderColor: '#202020',
        playButtonBg: '#00aa00',
      },
    });

    expect(getTokenValue(DesignTokens.gameCard.bg)).toBe('#101010');
    expect(getTokenValue(DesignTokens.gameCard.borderColor)).toBe('#202020');
    expect(getTokenValue(DesignTokens.gameCard.playButtonBg)).toBe('#00aa00');
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
      gameCard: { focusRingColor: '#33ff33' },
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
    expect(getTokenValue(DesignTokens.gameCard.focusRingColor)).toBe('#33ff33');
  });
});
