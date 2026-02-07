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
});
