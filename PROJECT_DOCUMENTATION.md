# ZGames UI Library - Project Documentation

## 📁 Final Project Structure

```
zg-ui/
├── .storybook/                    # Storybook configuration
│   ├── main.ts                    # Storybook main config
│   ├── preview.ts                 # Global decorators & parameters
│   └── theme-decorator.ts         # Custom theme switcher decorator
│
├── projects/
│   ├── design-tokens/             # Design token library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── design-tokens.ts      # Token API (createTheme, resetTheme, etc.)
│   │   │   │   └── design-tokens.spec.ts # Unit tests for token functions
│   │   │   └── public-api.ts             # Public exports
│   │   ├── ng-package.json
│   │   ├── package.json
│   │   └── tsconfig.lib.json
│   │
│   └── ui/                        # UI Component library
│       ├── src/
│       │   ├── lib/
│       │   │   └── button/               # Button component
│       │   │       ├── button.component.ts
│       │   │       ├── button.component.scss
│       │   │       ├── button.component.spec.ts
│       │   │       └── button.stories.ts
│       │   └── public-api.ts             # Public exports (@zg/ui)
│       ├── ng-package.json
│       ├── package.json
│       └── tsconfig.lib.json
│
├── src/
│   ├── app/                       # Demo application
│   │   ├── app.config.ts         # App configuration
│   │   ├── app.html              # Clean minimal template
│   │   ├── app.routes.ts         # Routing config
│   │   ├── app.scss              # App styles using design tokens
│   │   ├── app.spec.ts           # App unit tests
│   │   └── app.ts                # Root component
│   │
│   ├── styles/
│   │   ├── _tokens.scss          # ⭐ SINGLE SOURCE OF TRUTH for design tokens
│   │   └── styles.scss           # Global styles (imports tokens)
│   │
│   ├── themes/
│   │   └── client-themes.ts      # Multi-client theme configurations
│   │
│   ├── index.html                # Main HTML
│   └── main.ts                   # Bootstrap
│
├── public/
│   └── favicon.ico
│
├── .github/
│   └── instructions/
│       └── project.instructions.md  # Project rules & conventions
│
├── angular.json                  # Angular workspace config
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # Root TypeScript config (with path aliases)
├── tsconfig.app.json
├── tsconfig.spec.json
├── CONTRIBUTING.md
├── LICENSE
└── README.md                     # Project documentation
```

## 🎯 Key Files & Responsibilities

### Design Tokens Layer

#### `src/styles/_tokens.scss`

**Purpose:** Single source of truth for all design values (colors, typography, spacing, etc.)

**Structure:**

- Layer 1: Primitives (raw color scales: `--zg-green-800`, `--zg-neutral-200`)
- Layer 2: Semantic tokens (intention-based: `--zg-color-primary`, `--zg-button-bg-primary`)

**Token Categories:**

- Colors (primitives + semantic)
- Typography (font sizes, weights, line heights)
- Spacing (4px base scale)
- Border radius
- Shadows
- Transitions

#### `projects/design-tokens/src/lib/design-tokens.ts`

**Purpose:** TypeScript API for programmatic token access

**Exports:**

- `DesignTokens`: Object with all token names as constants
- `Theme`: Interface for theme configuration (semantic tokens + primitives)
- `createTheme(theme: Theme)`: Applies a theme by setting CSS variables
- `resetTheme()`: Resets all tokens to default
- `getTokenValue(name: string)`: Gets current token value
- `setTokenValue(name: string, value: string)`: Sets a token value

**Example:**

```typescript
import { createTheme, Theme } from '@zg/design-tokens';

const myTheme: Theme = {
  colorPrimary: '#00ff00',
  primitives: {
    green800: '#006600',
  },
};

createTheme(myTheme);
```

### Multi-Client Theming

#### `src/themes/client-themes.ts`

**Purpose:** Configuration registry for multiple casino clients

**Structure:**

- `ClientId`: Type for client identifiers ('zgames' | 'casino1' | 'casino2' | 'casino3')
- `ThemeVariant`: Theme variant names ('light' | 'dark' | 'custom')
- `CLIENT_THEMES`: Registry of all client themes
- `getClientTheme(clientId, variant)`: Gets a theme configuration
- `applyClientTheme(clientId, variant)`: Applies a client theme

**Clients Configured:**

1. **zgames** (default): Light, Dark
2. **casino1**: Light, Dark, Custom (red-gold luxury)
3. **casino2**: Light, Dark, Custom (blue-purple tech)
4. **casino3**: Light, Dark

**Example:**

```typescript
import { applyClientTheme } from './themes/client-themes';

applyClientTheme('casino1', 'custom');
```

### Storybook Integration

#### `.storybook/theme-decorator.ts`

**Purpose:** Storybook decorator for theme preview and switching

**Features:**

- Adds toolbar controls for Client and Theme selection
- Automatically applies selected theme to preview iframe
- Integrates with addon-a11y for accessibility validation

**Usage:** Automatically applied to all stories via `preview.ts`

### Components

#### `projects/ui/src/lib/button/`

**Purpose:** Reusable button component (first MVP component)

**Files:**

- `button.component.ts`: Component logic (Standalone, OnPush)
- `button.component.scss`: Styles using design tokens
- `button.component.spec.ts`: Unit tests
- `button.stories.ts`: Storybook stories (variants, sizes, states)

**API:**

- `@Input() variant`: 'primary' | 'secondary' | 'ghost'
- `@Input() size`: 'sm' | 'md' | 'lg'
- `@Input() disabled`: boolean
- `@Input() label`: string
- `@Output() clicked`: EventEmitter<MouseEvent>

**Design:**

- Uses only semantic tokens (no hardcoded colors)
- Fully accessible (ARIA, keyboard navigation)
- Responds to theme changes

### Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@zg/design-tokens": ["projects/design-tokens/src/public-api.ts"],
    "@zg/ui": ["projects/ui/src/public-api.ts"]
  }
}
```

**Usage:**

```typescript
import { createTheme } from '@zg/design-tokens';
import { ZgButtonComponent } from '@zg/ui';
```

## 🏛️ Architecture Principles

### 1. Container-Presentation Pattern (Mandatory)

**Library Components (Dumb):**

- ✅ Render UI only
- ✅ Receive data via `@Input()`
- ✅ Emit events via `@Output()`
- ❌ NO service injection
- ❌ NO HTTP calls
- ❌ NO business logic
- ❌ NO store/router access

**Consumer Components (Smart):**

- Orchestrate data
- Connect services/stores
- Create view-models
- Pass data to dumb components

### 2. Angular Modern Standards

- ✅ All components are Standalone
- ✅ ChangeDetectionStrategy.OnPush everywhere
- ✅ Signals for internal UI state
- ✅ Strict TypeScript typing
- ✅ No `any` types

### 3. Design Token First

- ✅ All styles use CSS variables
- ❌ NO hardcoded colors
- ✅ Components consume semantic tokens
- ✅ Theming via token overrides

### 4. Accessibility

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Contrast validation (Storybook addon-a11y)

### 5. Documentation

- ✅ Every component has Storybook stories
- ✅ Stories show variants, states, and composition
- ✅ Documentation explains purpose, API, and usage
- ✅ Co-located: component + styles + tests + stories

## 🚀 Development Workflow

### Adding a New Component

1. **Generate component:**

   ```bash
   ng generate component components/my-component --project=ui
   ```

2. **Implement component:**
   - Use Standalone + OnPush
   - Only semantic token CSS variables
   - Strict Input/Output typing
   - No service injection

3. **Create stories:**
   - Co-locate `my-component.stories.ts`
   - Document default + 2-3 variants
   - Include accessibility examples

4. **Write tests:**
   - Render test
   - Input validation
   - Output emission
   - State changes

5. **Export in public-api.ts:**
   ```typescript
   export * from './lib/my-component/my-component.component';
   ```

### Extending Design Tokens

1. **Add primitive (if needed):**

   ```scss
   // src/styles/_tokens.scss - Primitives section
   --zg-purple-500: #a855f7;
   ```

2. **Add semantic token:**

   ```scss
   // src/styles/_tokens.scss - Semantic tokens section
   --zg-color-info: var(--zg-purple-500);
   ```

3. **Update TypeScript interface:**
   ```typescript
   // projects/design-tokens/src/lib/design-tokens.ts
   export interface Theme {
     // ...existing tokens
     colorInfo?: string;
     primitives?: {
       // ...existing primitives
       purple500?: string;
     };
   }
   ```

### Creating a Client Theme

1. **Define theme in `client-themes.ts`:**

   ```typescript
   export const CLIENT_THEMES = {
     'new-casino': {
       light: {
         colorPrimary: '#...',
         // ...
       },
       dark: {
         /* ... */
       },
     },
   };
   ```

2. **Update types:**

   ```typescript
   export type ClientId = 'zgames' | 'casino1' | /* ... */ | 'new-casino';
   ```

3. **Test in Storybook:**
   - Toolbar will auto-include new client
   - Preview all component variants with the new theme

## 📊 Token System Reference

### Color Primitives

**Green Scale:**

- `--zg-green-50` to `--zg-green-950` (11 shades)

**Orange Scale:**

- `--zg-orange-50` to `--zg-orange-950` (11 shades)

**Red Scale:**

- `--zg-red-50` to `--zg-red-950` (11 shades)

**Yellow Scale:**

- `--zg-yellow-50` to `--zg-yellow-950` (11 shades)

**Blue Scale:**

- `--zg-blue-50` to `--zg-blue-950` (11 shades)

**Neutral Scale:**

- `--zg-neutral-50` to `--zg-neutral-950` (11 shades)

### Semantic Color Tokens

**Purpose-based:**

- `--zg-color-primary`
- `--zg-color-secondary`
- `--zg-color-success`
- `--zg-color-warning`
- `--zg-color-error`
- `--zg-color-info`

**Surface/Background:**

- `--zg-color-surface-primary`
- `--zg-color-surface-secondary`
- `--zg-color-background`

**Text:**

- `--zg-color-text-primary`
- `--zg-color-text-secondary`
- `--zg-color-text-on-primary`
- `--zg-color-text-on-secondary`

**Borders:**

- `--zg-color-border-primary`
- `--zg-color-border-secondary`

**Component-specific (Button example):**

- `--zg-button-bg-primary`
- `--zg-button-text-primary`
- `--zg-button-border-primary`
- `--zg-button-bg-primary-hover`
- (and more for secondary, ghost variants)

### Typography Scale

| Token                 | Size | Usage            |
| --------------------- | ---- | ---------------- |
| `--zg-font-size-xs`   | 12px | Captions, labels |
| `--zg-font-size-sm`   | 14px | Small text       |
| `--zg-font-size-base` | 16px | Body text        |
| `--zg-font-size-lg`   | 18px | Large body       |
| `--zg-font-size-xl`   | 20px | Subheadings      |
| `--zg-font-size-2xl`  | 24px | Section titles   |
| `--zg-font-size-3xl`  | 30px | Page titles      |
| `--zg-font-size-4xl`  | 36px | Hero text        |
| `--zg-font-size-5xl`  | 48px | Display text     |

**Font Weights:**

- `--zg-font-weight-normal`: 400
- `--zg-font-weight-medium`: 500
- `--zg-font-weight-semibold`: 600
- `--zg-font-weight-bold`: 700

### Spacing Scale

| Token             | Value | Usage            |
| ----------------- | ----- | ---------------- |
| `--zg-spacing-4`  | 4px   | Tight spacing    |
| `--zg-spacing-8`  | 8px   | Small gaps       |
| `--zg-spacing-12` | 12px  | Compact padding  |
| `--zg-spacing-16` | 16px  | Standard spacing |
| `--zg-spacing-24` | 24px  | Medium spacing   |
| `--zg-spacing-32` | 32px  | Large spacing    |
| `--zg-spacing-48` | 48px  | Section spacing  |
| `--zg-spacing-64` | 64px  | Major sections   |

### Border Radius

- `--zg-radius-sm`: 4px
- `--zg-radius-md`: 8px
- `--zg-radius-lg`: 12px
- `--zg-radius-xl`: 16px
- `--zg-radius-full`: 9999px

### Shadows

- `--zg-shadow-sm`: Subtle depth
- `--zg-shadow-md`: Cards, buttons
- `--zg-shadow-lg`: Modals, dropdowns
- `--zg-shadow-xl`: Maximum elevation

## ✅ Cleanup Completed

### Files Removed

1. ❌ `projects/ui/src/stories/` - Storybook example files
2. ❌ `projects/ui/src/lib/ui.ts` - CLI-generated dummy file
3. ❌ `projects/ui/src/lib/ui.spec.ts` - CLI-generated dummy test
4. ❌ `projects/ui/src/lib/examples/` - Example components folder
5. ❌ `src/app/app-theme-example.ts` - Example theme file
6. ❌ Angular CLI boilerplate from `app.html` (343 lines → 5 lines)

### Files Created/Updated

1. ✅ Clean `src/app/app.html` (minimal template)
2. ✅ New `src/app/app.scss` (using design tokens)
3. ✅ Updated `src/app/app.spec.ts` (matches new template)
4. ✅ Created `projects/ui/src/lib/button/button.stories.ts` (comprehensive Button stories)
5. ✅ Updated `README.md` (comprehensive project documentation)
6. ✅ Created `PROJECT_DOCUMENTATION.md` (this file - detailed reference)

## 🎯 Next Steps for MVP Completion

### Remaining Components to Implement (6-8 total)

Based on the project instructions, the priority components are:

1. ✅ **Button** (DONE)
2. ⏳ **Input** (text field with validation states)
3. ⏳ **Select/Dropdown** (with keyboard navigation)
4. ⏳ **Card** (container component with slots)
5. ⏳ **Badge/Tag** (status indicators)
6. ⏳ **Modal/Dialog** (accessible overlay)

Optional:

- Checkbox/Toggle
- Tooltip

### For Each New Component

1. Design API (Inputs/Outputs)
2. Implement with OnPush + Standalone
3. Style with semantic tokens only
4. Create Storybook stories
5. Write unit tests
6. Validate accessibility (addon-a11y)
7. Export in public-api.ts

### Demo Use Case

Create a simple demo page that composes multiple components to show real-world usage (e.g., a login form or settings panel).

## 🔧 NPM Scripts Reference

```bash
# Development
npm start                    # Start dev server (localhost:4200)
npm run storybook           # Start Storybook (localhost:6006)

# Building
npm run build:design-tokens # Build design tokens library
npm run build:ui            # Build UI library
npm run build               # Build demo app

# Testing
npm test                    # Run unit tests (Vitest)

# Documentation
npm run compodoc            # Generate API docs (if configured)
```

## 📚 External Resources

- [Angular Best Practices](https://angular.dev/best-practices)
- [Storybook for Angular](https://storybook.js.org/docs/angular)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Tokens Community Group](https://design-tokens.github.io/community-group/)

---

**Last Updated:** 2025-01-XX  
**Angular Version:** 21.x  
**Storybook Version:** Latest  
**Status:** MVP Phase - Core infrastructure complete, Button component done
