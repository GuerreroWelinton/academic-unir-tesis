/* Copiado desde src/themes/client-themes.ts */

/**
 * Client Theme Configurations
 * Each client can have multiple theme variants with flexible naming
 */

import { createTheme, resetTheme, type Theme } from '@zg/design-tokens';

// ...existing code...

// (Pego aquí el contenido completo del archivo leído)

/**
 * =============================================================================
 * REFERENCIA: Vinculaciones Semántico → Primitivo (Base en _tokens.scss)
 * =============================================================================
 *
 * Semantic Token              → Primitive Default
 * --zg-color-primary          → var(--zg-green-800)
 * --zg-color-primary-hover    → var(--zg-green-700)
 * --zg-color-primary-active   → var(--zg-green-600)
 * --zg-color-secondary        → var(--zg-green-500)
 * --zg-color-secondary-hover  → var(--zg-green-400)
 * --zg-color-accent           → var(--zg-green-400)
 * --zg-color-highlight        → var(--zg-green-100)
 * --zg-color-success          → var(--zg-green-500)
 * --zg-color-error            → var(--zg-red-600)
 * --zg-color-warning          → var(--zg-yellow-600)
 * --zg-color-info             → var(--zg-blue-700)
 * --zg-color-text-primary     → var(--zg-neutral-900)
 * --zg-color-text-secondary   → var(--zg-neutral-700)
 * --zg-color-bg-primary       → var(--zg-neutral-100)
 * --zg-color-bg-secondary     → var(--zg-neutral-200)
 *
 * =============================================================================
 * ARQUITECTURA DE 3 CAPAS
 * =============================================================================
 *
 * CAPA 1: PRIMITIVOS (--zg-green-800, --zg-neutral-200)
 *   - Valores base sin significado semántico
 *   - Modificables vía themes para crear variaciones
 *
 * CAPA 2: SEMÁNTICOS GENÉRICOS (--zg-color-primary, --zg-color-text-primary)
 *   - Apuntan a primitivos: var(--zg-green-800)
 *   - Usados por múltiples componentes
 *   - Dan significado de intención (primary = acción principal)
 *
 * CAPA 3: SEMÁNTICOS DE COMPONENTE (--zg-button-bg-primary, --zg-card-shadow)
 *   - Tokens específicos por componente
 *   - REGLA: DEBEN usar CAPA 2, NO primitivos directos
 *   - ✅ Correcto: --zg-button-bg-primary: var(--zg-color-primary)
 *   - ❌ Incorrecto: --zg-button-bg-primary: var(--zg-green-800)
 *
 * ⚠️ POR QUÉ ES IMPORTANTE:
 * Si usas primitivos en CAPA 3, los temas que sobrescriben CAPA 2 NO afectan
 * a esos componentes, rompiendo la coherencia del sistema.
 *
 * =============================================================================
 * ESTRATEGIAS DE THEMING
 * =============================================================================
 *
 * 1. SOBRESCRIBIR PRIMITIVOS (Temas simples)
 *    - Cambia un primitivo y todo lo vinculado se actualiza automáticamente
 *    - Ejemplo: green800: '#FF0000' → primary se vuelve rojo
 *    - Usa cuando: El tema usa la misma "estructura" de colores (verde → otro verde)
 *
 * 2. SOBRESCRIBIR SEMÁNTICOS DIRECTAMENTE (Temas complejos)
 *    - Control quirúrgico de cada token sin afectar vinculaciones
 *    - Ejemplo: color: { primary: '#c62828' } → primary rojo sin tocar green800
 *    - Usa cuando: Necesitas cambios drásticos (morado → rojo navideño)
 *
 * 3. COMBINACIÓN (Recomendado)
 *    - Define primitivos base + sobrescribe semánticos específicos
 *    - Máxima flexibilidad y claridad
 *
 * 4. TOKENS DE COMPONENTE
 *    - Normalmente NO necesitas sobrescribirlos (heredan de CAPA 2)
 *    - Solo sobrescribe button: {} si necesitas efectos especiales (gradientes custom, etc.)
 *
 * =============================================================================
 */

/**
 * Client theme configuration
 * Flexible record allowing any theme variant names (light, dark, christmas, promo-gold, etc.)
 */
export type ClientThemeConfig = Record<string, Theme>;

/**
 * Available clients
 */
export type ClientId = 'cliente1' | 'cliente2';

/**
 * Client themes registry
 * Define all client themes here
 */
export const CLIENT_THEMES: Record<ClientId, ClientThemeConfig> = {
  // Cliente 1 (ZGames) - Default brand
  cliente1: {
    light: {
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#00c42e',
        neutral200: '#fafafa',
        neutral300: '#f5f5f5',
        neutral900: '#0a2c18',
      },
    },
    dark: {
      primitives: {
        green800: '#114b2a',
        green500: '#42c148',
        green400: '#5cd662',
        neutral200: '#0e0e11',
        neutral300: '#18181b',
        neutral400: '#27272a',
        neutral900: '#d4fd2b',
      },
    },
    christmas: {
      primitives: {
        green800: '#0f5132',
        green500: '#198754',
        green400: '#00c42e',
        red500: '#dc3545',
        red600: '#bb2d3b',
        orange500: '#ffc107',
        neutral200: '#f8f9fa',
        neutral900: '#0a3622',
      },
      color: {
        primary: '#dc3545',
        primaryHover: '#198754',
        secondary: '#dc3545',
        accent: '#ffc107',
        error: '#bb2d3b',
      },
    },
  },

  // Cliente 2 - Purple/Yellow theme
  cliente2: {
    light: {
      primitives: {
        green800: '#6a1b9a',
        green500: '#8e24aa',
        green400: '#9c27b0',
        orange500: '#ffd028',
        yellow500: '#ffeb3b',
        neutral200: '#f3e5f5',
        neutral300: '#e1bee7',
        neutral900: '#4a148c',
      },
    },
    dark: {
      primitives: {
        green800: '#7b1fa2',
        green500: '#9c27b0',
        green400: '#ab47bc',
        orange500: '#ffd028',
        neutral200: '#1a0033',
        neutral300: '#2d0052',
        neutral400: '#4a148c',
        neutral900: '#e1bee7',
      },
    },
    christmas: {
      primitives: {
        red500: '#c62828',
        red600: '#b71c1c',
        green800: '#165b33',
        green500: '#2e7d32',
        green400: '#4caf50',
        orange500: '#ffd700',
        yellow500: '#ffcc00',
        neutral200: '#fff8e1',
        neutral900: '#1b5e20',
      },
      color: {
        primary: '#c62828',
        primaryHover: '#b71c1c',
        secondary: '#2e7d32',
        accent: '#ffd700',
        highlight: '#ffcc00',
        bgPrimary: '#fff8e1',
        textPrimary: '#1b5e20',
      },
    },
  },
};

/**
 * Get theme configuration for a specific client and variant
 * @param clientId - The client identifier
 * @param variant - Theme variant name (e.g., 'light', 'dark', 'christmas', 'promo-gold')
 * @returns Theme configuration
 */
export function getClientTheme(clientId: ClientId, variant: string = 'light'): Theme {
  const clientThemes = CLIENT_THEMES[clientId];
  return clientThemes[variant] || CLIENT_THEMES['cliente1']['light'];
}

/**
 * Get available variants for a client
 * @param clientId - The client identifier
 * @returns Array of available theme variant names
 */
export function getAvailableVariants(clientId: ClientId): string[] {
  const clientThemes = CLIENT_THEMES[clientId];
  return Object.keys(clientThemes);
}

/**
 * Apply client theme to document
 * @param clientId - The client identifier
 * @param variant - Theme variant name
 */
export function applyClientTheme(clientId: ClientId, variant: string = 'light'): void {
  const theme = getClientTheme(clientId, variant);

  // Reset previous theme to avoid conflicts
  resetTheme();

  // Apply new theme
  createTheme(theme);
}
