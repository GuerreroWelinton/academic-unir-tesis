# ZGames UI Library

[![CI](https://github.com/GuerreroWelinton/academic-unir-tesis/actions/workflows/ci.yml/badge.svg)](https://github.com/GuerreroWelinton/academic-unir-tesis/actions/workflows/ci.yml)

<!-- Test PR: Verifying Chromatic visual regression testing in CI pipeline -->

A modern, accessible, and themeable Angular component library for iGaming applications, built with Angular 21 and Storybook.

## 📋 Overview

This is an MVP of a reusable UI component library for ZGames Technology. The library follows Angular best practices, prioritizes accessibility (WCAG), and provides a consistent design system with multi-client theming capabilities.

## 🏗️ Architecture

### Design Tokens

The library uses a **3-layer design token system**:

- **Layer 1: Primitives** — Raw base values (e.g., --zg-green-800, --zg-neutral-200). Used for theme variations.
- **Layer 2: Semantic Tokens** — Intention-based tokens (e.g., --zg-color-primary) referencing primitives. Used by multiple components.
- **Layer 3: Component Tokens** — Component-specific tokens (e.g., --zg-button-bg-primary) referencing semantic tokens. Must NOT reference primitives directly.

**Rule:** Component tokens must reference semantic tokens, not primitives, to ensure theme consistency.

#### Theming Strategies

- **Primitive Override:** Change base values for simple theme shifts (e.g., green800 → red).
- **Semantic Override:** Override intention tokens for precise control (e.g., primary → custom color).
- **Combined:** Use both for maximum flexibility (recommended).
- **Component Tokens:** Usually inherit from Layer 2; rarely overridden directly.

All design tokens are defined as CSS variables in [src/styles/\_tokens.scss](src/styles/_tokens.scss).

### Component Pattern

All components follow the **Container–Presentational Pattern**:

- **Presentational Components** (in `projects/ui/`): Purely presentational, receive data via **signal input** (`input`) and emit events via **signal output** (`output`).
- **Smart Components** (in consuming apps): Handle business logic, orchestrate data, and connect to services

All components are:

- **Standalone Components**
- Use `ChangeDetectionStrategy.OnPush`
- Use **signal input/output** and **computed signals** for reactive logic and public API
- Strictly typed with TypeScript
- Documented with Storybook stories

### Atomic Design

We adopt the **Atomic Design** approach to organize the library and facilitate scalability:

- **Atoms**: The smallest, independent components (e.g., `Button`, `Badge`, `Input`) that form the foundation of the system.
- **Molecules**: Combinations of atoms that create functional units (e.g., `Card` with `Badge` and `Button`).
- **Organisms**: Complex compositions representing UI sections (e.g., `Modal`).

The classification and component index are maintained and explored from the **Storybook sidebar** to always reflect the current state of the library.

### Multi-Client Theming

The library supports **runtime theme switching** for multiple casino clients. Each client can have multiple theme variants (light, dark, custom).

- Client themes are configured in [projects/ui/src/themes/client-themes.ts](projects/ui/src/themes/client-themes.ts)
- Themes can override semantic and primitive tokens
- Storybook includes a toolbar to preview all client themes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 21+

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/` to view the demo application.

### Storybook

```bash
npm run storybook
```

Open `http://localhost:6006/` to explore the component library.

## 📦 Project Structure

```text
zg-ui/
├── projects/
│   ├── design-tokens/
│   │   └── src/lib/
│   │       └── design-tokens.ts
│   └── ui/
│       ├── .storybook/
│       │   ├── public/
│       │   ├── custom-theme.ts
│       │   ├── main.ts
│       │   ├── manager-head.html
│       │   ├── manager.ts
│       │   ├── preview-head.html
│       │   ├── preview.ts
│       │   ├── theme-decorator.ts
│       │   ├── tsconfig.json
│       │   └── typings.d.ts
│       └── src/
│           ├── lib/
│           │   ├── atoms/
│           │   │   └── button/
│           │   │       ├── button.component.ts
│           │   │       ├── button.component.html
│           │   │       ├── button.component.scss
│           │   │       ├── button.component.spec.ts
│           │   │       └── button.stories.ts
│           │   ├── molecules/
│           │   ├── organisms/
│           │   ├── templates/
│           │   └── pages/
│           └── themes/
│               └── client-themes.ts
```

## 🎨 Design Tokens

### Color System

- **Primary**: Green scale for primary actions
- **Success**: Green tones for positive feedback
- **Warning**: Orange/yellow for warnings
- **Error**: Red tones for errors
- **Neutral**: Gray scale for text and surfaces

### Typography Scale

Font sizes from `xs` (12px) to `5xl` (48px) using a ~1.2x ratio.

### Spacing Scale

Consistent spacing from `4` to `64` using a 4px base unit.

## 🌈 Theming

### Applying a Client Theme

```typescript
import { applyClientTheme } from '@zg/ui/themes/client-themes';

// Apply a theme at runtime
applyClientTheme('client1', 'dark');
applyClientTheme('client2', 'christmas');
```

### Creating a Custom Theme

```typescript
import { createTheme, Theme } from '@zg/design-tokens';

const myTheme: Theme = {
  colorPrimary: '#00ff00',
  colorSuccess: '#00cc00',
  // ... other semantic tokens
  primitives: {
    green800: '#006600', // Override primitives
  },
};

createTheme(myTheme);
```

## 🧪 Testing

Run unit tests with Vitest:

```bash
## 🧪 Testing

You can run tests and coverage for the app or each library:

# App tests (default)
npm test
npm run test:coverage

# UI library tests
npm run test:ui
npm run test:ui:coverage

# Design tokens tests
npm run test:design-tokens
npm run test:design-tokens:coverage

# Lint
npm run lint

# Format
npm run format
npm run format:check
```

## 📚 Documentation

- **Storybook**: Run `npm run storybook` for interactive component documentation
- **API Documentation (Compodoc)**: Generate technical documentation with Compodoc:
  - `npm run docs:ui` → Generates HTML in `docs/ui`
  - `npm run docs:ui:serve` → Serves the documentation locally (live)

> Note: Compodoc generates API documentation (signal inputs/outputs, types, and JSDoc) that complements the Storybook stories.

## 🛠️ Building the Library

```bash
npm run build:design-tokens
npm run build:ui
```

## ♿ Accessibility

All components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Sufficient color contrast (validated with Storybook addon-a11y)

Note: By default, the **a11y** addon in Storybook is configured to run checks for **WCAG 2.1 Level AA** (tags `wcag2aa` and `wcag21aa`). The configuration is in `projects/ui/.storybook/preview.ts`.

## 📝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

[MIT License](LICENSE)
