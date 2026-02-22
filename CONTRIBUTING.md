# Contributing

## Purpose

This repository contains an MVP of a reusable UI component library for iGaming (ZGames Technology) using **Angular 21** and **Storybook**. The focus is on building consistent, accessible, and well-documented presentational components.

## Branching and Pull Requests (mandatory)

- Create feature branches from `development`.
- Open all feature PRs to `development`.
- Do not open PRs directly to `main`.
- `main` is reserved for integration/release promotion from `development`.

## CI and Deploy Flow (current)

Current GitHub Actions configuration:

- `CI` workflow runs on:
  - push to `main`
  - pull_request targeting `main`
- `Deploy to GitHub Pages` runs after successful `CI` on `main`.

Because contribution PRs must target `development`, contributors must run the full local quality gate before opening/updating a PR:

- `npm run ci:local`

This local gate includes:

- lint + format check
- tests + coverage
- app/libs build
- Storybook build

## Namespace and Local Development Flow (mandatory)

- Canonical import namespace is `@zgames/*`.
- For local development in this monorepo, `tsconfig.json` resolves:
  - `@zgames/ui` -> `projects/ui/src/public-api.ts`
  - `@zgames/design-tokens` -> `projects/design-tokens/src/public-api.ts`
- This avoids drift against published npm packages during day-to-day development.
- Release/consumer flow remains package-based (`@zgames/ui`, `@zgames/design-tokens`) after publishing from `dist/*`.

## Architecture Rules (mandatory)

- The `projects/ui` library only contains **presentational components**.
- Library components:
  - render UI
  - receive data via signal `input`
  - emit events via signal `output`
- Forbidden in the library:
  - service injection
  - business/domain logic
  - HTTP/API access
  - router/store/localStorage/sessionStorage access (unless strictly UI-related and justified)
  - uncontrolled side effects

## Technical Conventions

### Modern Angular

- Components must be **Standalone**.
- **ChangeDetectionStrategy.OnPush** is mandatory.
- Use **Signals** for internal UI state.
- Strict typing; avoid `any`.

### Component Organization

- Atomic Design folder structure:
  - `projects/ui/src/lib/atoms/<component>/`
  - `projects/ui/src/lib/molecules/<component>/`
  - future: `organisms/`, `templates/`, `pages/`
- Co-located files per component:
  - `*.component.ts|html|scss`
  - `*.stories.ts` (required)
  - `*.spec.ts` (required)

## Design Tokens (mandatory)

- All styles must consume design tokens (CSS variables).
- Hardcoded brand values are forbidden.

### SCSS Token Source (modular)

- `src/styles/tokens/_index.scss` (aggregator)
- `src/styles/tokens/_foundation.tokens.scss` (foundation)
- `src/styles/tokens/_<component>.tokens.scss` (component tokens)
- Compatibility entrypoint:
  - `src/styles/_tokens.scss`

### TypeScript Token Maps (`projects/design-tokens`)

- Token maps are modular in:
  - `projects/design-tokens/src/lib/tokens/foundation.tokens.ts`
  - `projects/design-tokens/src/lib/tokens/<component>.tokens.ts`
  - `projects/design-tokens/src/lib/tokens/index.ts`
- `DesignTokens` aggregates those maps in:
  - `projects/design-tokens/src/lib/design-tokens.ts`
- `design-tokens.types.ts` derives override types from token maps.

### Synchronization Rules

- If you add semantic/component tokens (`--zg-color-*`, `--zg-spacing-*`, `--zg-button-*`, `--zg-input-*`, etc.):
  - update SCSS token module
  - update TS token map in `projects/design-tokens/src/lib/tokens/`
- If you add primitive scale tokens (`--zg-[color]-[number]`):
  - no TS map update required
  - they are handled dynamically through `createTheme({ primitives: ... })`
- `createTheme()` must support all active groups:
  - `color`, `typography`, `spacing`, `radius`, `shadow`, `zIndex`, `transition`, `button`, `input`, `badge`, `chip`, `gameCard`

## Storybook and Documentation

Every component must have a `*.stories.ts` file with:

- Default story
- 2-3 relevant variants/states
- Composition example (when applicable)

Rules:

- No emojis in story `name`.
- Include usage guidance and accessibility notes in docs.
- Keep API docs clear (`inputs`, `outputs`, types).

Compodoc:

- `npm run docs:ui`
- `npm run docs:design-tokens`

## Accessibility (mandatory)

- Validate with Storybook addon-a11y.
- Keyboard support (Enter/Space where applicable).
- Visible focus states.
- Correct ARIA usage.
- `aria-label` for icon-only actions.

WCAG target: **2.1 AA**.

## Unit Tests (minimum)

Each component must test:

- render without errors
- key inputs/states
- outputs on interaction

Tests must be focused, fast, and stable.

## Commit Convention

- `feat(scope):` new feature
- `fix(scope):` bug fix
- `docs:` documentation
- `style:` styles/tokens/formatting
- `test:` tests
- `chore:` tooling/config

## Development Workflow

1. Define component API (`inputs`, `outputs`, types).
2. Define variants/states and token usage.
3. Implement component (Standalone + OnPush).
4. Implement story in parallel.
5. Implement tests in parallel.
6. Validate a11y and run `npm run ci:local`.
7. Open PR to `development` with clear scope and checklist.
