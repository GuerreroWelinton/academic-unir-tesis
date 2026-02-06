# ZGames UI Library

A modern, accessible, and themeable Angular component library for iGaming applications built with Angular 21 and Storybook.

## 📋 Overview

This is an MVP of a reusable UI component library for ZGames Technology. The library follows Angular best practices, prioritizes accessibility (WCAG), and provides a consistent design system with multi-client theming capabilities.

## 🏗️ Architecture

### Design Tokens

The library uses a **2-layer design token system**:

1. **Primitives** (`--zg-green-800`, `--zg-neutral-200`, etc.): Raw color scales and base values
2. **Semantic tokens** (`--zg-color-primary`, `--zg-color-success`, etc.): Intention-based tokens that reference primitives

All design tokens are defined as CSS variables in [src/styles/\_tokens.scss](src/styles/_tokens.scss).

### Component Pattern

All components follow the **Container-Presentation Pattern**:

- **Dumb Components** (inside `projects/ui/`): Purely presentational, receive data via `@Input()`, emit events via `@Output()`
- **Smart Components** (in consumer apps): Handle business logic, orchestrate data, and connect to services

All components are:

- **Standalone Components**
- Use `ChangeDetectionStrategy.OnPush`
- Follow strict TypeScript typing
- Documented with Storybook stories

### Multi-Client Theming

The library supports **runtime theme switching** for multiple casino clients. Each client can have multiple theme variants (light, dark, custom).

- Client themes are configured in [src/themes/client-themes.ts](src/themes/client-themes.ts)
- Themes can override semantic tokens and primitives
- Storybook includes a toolbar to preview all client themes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 21+

### Installation

```bash
npm install
```

### Development server

```bash
npm start
```

Navigate to `http://localhost:4200/` to see the demo app.

### Storybook

```bash
npm run storybook
```

Open `http://localhost:6006/` to explore the component library.

## 📦 Project Structure

```text
zg-ui/
├── projects/
│   ├── design-tokens/        # Design token system (CSS variables + TS API)
│   │   └── src/lib/
│   │       └── design-tokens.ts     # createTheme(), resetTheme(), token accessors
│   └── ui/                    # Component library
│       └── src/lib/
│           └── button/        # Example: Button component
│               ├── button.component.ts
│               ├── button.component.scss
│               ├── button.component.spec.ts
│               └── button.stories.ts
├── src/
│   ├── styles/
│   │   └── _tokens.scss       # Single source of truth for design tokens
│   └── themes/
│       └── client-themes.ts   # Multi-client theme configurations
├── .storybook/
│   └── theme-decorator.ts     # Storybook theme switcher
└── README.md
```

## 🎨 Design Tokens

### Color System

- **Primary**: Green scale for primary actions
- **Success**: Green tones for positive feedback
- **Warning**: Orange/yellow for warnings
- **Error**: Red tones for errors
- **Neutral**: Gray scale for text and surfaces

### Typography Scale

Font sizes from `xs` (12px) to `5xl` (48px) using ~1.2x ratio.

### Spacing Scale

Consistent spacing from `4` to `64` using 4px base unit.

## 🌈 Theming

### Applying a Client Theme

```typescript
import { applyClientTheme } from './themes/client-themes';

// Apply a theme at runtime
applyClientTheme('cliente1', 'dark');
applyClientTheme('cliente2', 'christmas');
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
npm test
```

## 📚 Documentation

- **Storybook**: Run `npm run storybook` for interactive component documentation
- **Type Documentation**: Run `npm run compodoc` for generated API documentation

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

## 📝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

[MIT License](LICENSE)
