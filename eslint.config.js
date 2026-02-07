const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.angular/**',
      'coverage/**',
      'docs/**',
      'storybook-static/**',
      '**/*.config.js',
      '!eslint.config.js',
      '**/*.d.ts',
    ],
  },
  {
    files: ['**/*.ts'],
    ...eslint.configs.recommended,
  },
  ...tseslint.configs.recommended.map((config) => ({
    files: ['**/*.ts'],
    ...config,
  })),
  ...tseslint.configs.stylistic.map((config) => ({
    files: ['**/*.ts'],
    ...config,
  })),
  ...angular.configs.tsRecommended.map((config) => ({
    files: ['**/*.ts'],
    ...config,
  })),
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['zg', 'lib'],
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: ['zg', 'lib'],
          style: 'camelCase',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  ...angular.configs.templateRecommended.map((config) => ({
    files: ['**/*.html'],
    ...config,
  })),
  ...angular.configs.templateAccessibility.map((config) => ({
    files: ['**/*.html'],
    ...config,
  })),
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/label-has-associated-control': 'error',
    },
  },
  prettier,
];
