import {
  createTheme,
  DesignTokens,
  getTokenValue,
  resetTheme,
  setTokenValue,
} from './design-tokens';

describe('DesignTokens', () => {
  afterEach(() => {
    resetTheme();
  });

  it('should export token constants', () => {
    expect(DesignTokens).toBeDefined();
    expect(DesignTokens.color).toBeDefined();
    expect(DesignTokens.typography).toBeDefined();
    expect(DesignTokens.spacing).toBeDefined();
    expect(DesignTokens.radius).toBeDefined();
  });

  it('should have correct token names', () => {
    expect(DesignTokens.color.primary).toBe('--zg-color-primary');
    expect(DesignTokens.spacing[4]).toBe('--zg-spacing-4');
    expect(DesignTokens.radius.base).toBe('--zg-radius-base');
  });

  describe('getTokenValue', () => {
    it('should get token value from document', () => {
      document.documentElement.style.setProperty('--test-token', '#ff0000');
      const value = getTokenValue('--test-token');
      expect(value).toBe('#ff0000');
    });
  });

  describe('setTokenValue', () => {
    it('should set token value on document', () => {
      setTokenValue('--test-token-set', '#00ff00');
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--test-token-set')
        .trim();
      expect(value).toBe('#00ff00');
    });
  });

  describe('createTheme', () => {
    it('should apply primitive overrides', () => {
      createTheme({
        primitives: {
          green800: '#custom-green',
          neutral200: '#custom-neutral',
        },
      });

      const green800 = document.documentElement.style.getPropertyValue('--zg-green-800');
      const neutral200 = document.documentElement.style.getPropertyValue('--zg-neutral-200');

      expect(green800).toBe('#custom-green');
      expect(neutral200).toBe('#custom-neutral');
    });

    it('should apply color overrides', () => {
      createTheme({
        color: {
          primary: '#ff0000',
          secondary: '#00ff00',
        },
      });

      const primary = document.documentElement.style.getPropertyValue('--zg-color-primary');
      const secondary = document.documentElement.style.getPropertyValue('--zg-color-secondary');

      expect(primary).toBe('#ff0000');
      expect(secondary).toBe('#00ff00');
    });

    it('should apply typography overrides', () => {
      createTheme({
        typography: {
          fontFamilyBase: 'Comic Sans MS',
        },
      });

      const fontFamily = document.documentElement.style.getPropertyValue('--zg-font-family-base');
      expect(fontFamily).toBe('Comic Sans MS');
    });

    it('should apply spacing overrides', () => {
      createTheme({
        spacing: {
          '4': '2rem',
          '8': '4rem',
        },
      });

      const spacing4 = document.documentElement.style.getPropertyValue('--zg-spacing-4');
      const spacing8 = document.documentElement.style.getPropertyValue('--zg-spacing-8');

      expect(spacing4).toBe('2rem');
      expect(spacing8).toBe('4rem');
    });

    it('should apply radius overrides', () => {
      createTheme({
        radius: {
          base: '12px',
          lg: '24px',
        },
      });

      const radiusBase = document.documentElement.style.getPropertyValue('--zg-radius-base');
      const radiusLg = document.documentElement.style.getPropertyValue('--zg-radius-lg');

      expect(radiusBase).toBe('12px');
      expect(radiusLg).toBe('24px');
    });

    it('should apply shadow overrides', () => {
      createTheme({
        shadow: {
          base: '0 4px 8px rgba(0,0,0,0.2)',
        },
      });

      const shadow = document.documentElement.style.getPropertyValue('--zg-shadow-base');
      expect(shadow).toBe('0 4px 8px rgba(0,0,0,0.2)');
    });

    it('should apply transition overrides', () => {
      createTheme({
        transition: {
          fast: '100ms ease',
          base: '300ms ease-out',
        },
      });

      const fast = document.documentElement.style.getPropertyValue('--zg-transition-fast');
      const base = document.documentElement.style.getPropertyValue('--zg-transition-base');

      expect(fast).toBe('100ms ease');
      expect(base).toBe('300ms ease-out');
    });

    it('should apply multiple category overrides at once', () => {
      createTheme({
        color: {
          primary: '#ff6b35',
          bgPrimary: '#1f2937',
        },
        radius: {
          base: '8px',
        },
        spacing: {
          '4': '2rem',
        },
      });

      expect(document.documentElement.style.getPropertyValue('--zg-color-primary')).toBe('#ff6b35');
      expect(document.documentElement.style.getPropertyValue('--zg-color-bg-primary')).toBe(
        '#1f2937',
      );
      expect(document.documentElement.style.getPropertyValue('--zg-radius-base')).toBe('8px');
      expect(document.documentElement.style.getPropertyValue('--zg-spacing-4')).toBe('2rem');
    });

    it('should apply theme to specific element', () => {
      const testElement = document.createElement('div');

      createTheme(
        {
          color: { primary: '#123456' },
        },
        testElement,
      );

      const primary = testElement.style.getPropertyValue('--zg-color-primary');
      expect(primary).toBe('#123456');
    });
  });

  describe('resetTheme', () => {
    it('should remove all custom token values', () => {
      // Apply a theme first
      createTheme({
        color: {
          primary: '#ff0000',
          secondary: '#00ff00',
        },
        spacing: {
          '4': '2rem',
        },
      });

      expect(document.documentElement.style.getPropertyValue('--zg-color-primary')).toBe('#ff0000');
      expect(document.documentElement.style.getPropertyValue('--zg-spacing-4')).toBe('2rem');

      resetTheme();

      expect(document.documentElement.style.getPropertyValue('--zg-color-primary')).toBe('');
      expect(document.documentElement.style.getPropertyValue('--zg-spacing-4')).toBe('');
    });

    it('should reset specific element', () => {
      const testElement = document.createElement('div');

      createTheme(
        {
          color: { primary: '#123456' },
        },
        testElement,
      );

      expect(testElement.style.getPropertyValue('--zg-color-primary')).toBe('#123456');

      resetTheme(testElement);

      expect(testElement.style.getPropertyValue('--zg-color-primary')).toBe('');
    });
  });
});
