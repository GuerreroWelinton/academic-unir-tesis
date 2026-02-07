# Contributing

## Purpose

This repository contains an MVP of a reusable UI component library for iGaming (ZGames Technology) using **Angular 21** and **Storybook**. The focus is on creating consistent, accessible, and well-documented presentational (dumb) components.

## Architecture Rules (mandatory)

- The `projects/ui` library only contains **presentational components**:
  - receive data via `input`
  - emit events via `output`
- Forbidden in the library:
  - service injection
  - business logic
  - HTTP calls / API access
  - access to router/store/localStorage (unless strictly UI and justified)

## Technical Conventions

### Modern Angular

- All components must be **Standalone** (no NgModules)
- **ChangeDetectionStrategy.OnPush** is mandatory
- **Signals** for internal UI state when appropriate
- Strict TypeScript, avoid `any`

### File Structure

Component co-location in `projects/ui/src/lib/atoms/<component>/`:

- `*.component.ts|html|scss`
- `*.stories.ts` (required)
- `*.spec.ts` (required)

### Atomic Design

We use **Atomic Design** as a guide for component organization. Folders are structured by category (`atoms/`, `molecules/`, `organisms/`). Atoms should be simple and reusable, molecules combine atoms to create functional units, and organisms compose complete interfaces. To see the updated component index and classification, check **Storybook (sidebar)**.

### Design Tokens

- **MANDATORY**: Styles must use design tokens from `src/styles/_tokens.scss`
- **FORBIDDEN**: Hardcoding colors, spacing, typography, radius
- Correct example: `color: var(--zg-color-primary)`

#### Token Architecture & Theming (Summary)

##### 3-Layer Token System

- **Layer 1: Primitives** — Raw base values (e.g., --zg-green-800, --zg-neutral-200). Used for theme variations.
- **Layer 2: Semantic Tokens** — Intention-based tokens (e.g., --zg-color-primary) referencing primitives. Used by multiple components.
- **Layer 3: Component Tokens** — Component-specific tokens (e.g., --zg-button-bg-primary) referencing semantic tokens. Must NOT reference primitives directly.

**Rule:** Component tokens must reference semantic tokens, not primitives, to ensure theme consistency.

##### Theming Strategies

- **Primitive Override:** Change base values for simple theme shifts (e.g., green800 → red).
- **Semantic Override:** Override intention tokens for precise control (e.g., primary → custom color).
- **Combined:** Use both for maximum flexibility (recommended).
- **Component Tokens:** Usually inherit from Layer 2; rarely overridden directly.
- Incorrect example: `color: #00b894`

## Storybook and Documentation

Every component must have a `*.stories.ts` file with:

- **Default** story (interactive with `args`)
- Demo stories using `render()` for:
  - Variants (all visual variants)
  - Sizes (all sizes)
  - States (disabled, loading, error, etc.)
  - WithIcons (if applicable)
  - RealWorldExamples

### Story Documentation

- Complete JSDoc in the component meta
- **Usage Guide** with when to use/avoid
- **Available ng-content selectors** if applicable
- **Accessibility** checklist
- Clear description of each argType

## Accessibility (mandatory)

- Use Storybook's addon-a11y for validation
- Implement keyboard navigation (Enter/Space for buttons)
- Visible focus states
- ARIA attributes when appropriate
- `aria-label` for icon-only components

**Note:** The a11y addon is configured to validate against **WCAG 2.1 Level AA** (`runOnly: { type: 'tag', values: ['wcag2aa', 'wcag21aa'] }`).

## Unit Tests (minimum)

Each component must have tests that verify:

- Renders without errors
- Respects key inputs (variant, size, disabled, etc.)
- Emits correct outputs on interaction
- Special states (loading, disabled, error)

## Commits

Recommended convention:

- `feat(button):` new feature
- `fix(button):` bugfix
- `docs:` documentation
- `style:` tokens, styles, formatting
- `test:` tests
- `chore:` tooling/config

## Development Process

1. **Plan**: Review project instructions and define the component API
2. **Implement**: Component + styles with tokens + basic tests
3. **Document**: Complete stories with all use cases
4. **Validate**: Accessibility in Storybook, passing tests
5. **Review**: PR with clear API and use case description
