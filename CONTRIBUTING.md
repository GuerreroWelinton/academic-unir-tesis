# Contributing

## Scope

This repo builds an MVP UI library (`@zgames/ui`) and design tokens (`@zgames/design-tokens`) with Angular 21 + Storybook.

## Branch and PR

- Create branches from `development`.
- Open PRs to `development`.
- Do not open feature PRs directly to `main`.

## Core Rules

- UI library components are presentational only.
- Use `Standalone` + `ChangeDetectionStrategy.OnPush`.
- Use signal `input` / `output` with strict typing (no `any`).
- Keep business logic, services, API calls, and store/router access out of the library.

## Structure

- `atoms` are `shared` by default.
- `molecules` can be `shared` or domain-based (`casino`, `sport`, ...).
- Co-locate files per component:
  - `*.component.ts|html|scss`
  - `*.stories.ts`
  - `*.spec.ts`

## Styles and Tokens

- Use design tokens (CSS variables). Do not hardcode brand values.
- If you add semantic/component tokens, update both:
  - SCSS token file in `src/styles/tokens/`
  - TS token map in `projects/design-tokens/src/lib/tokens/`
- Primitive scale tokens (`--zg-[color]-[number]`) do not require TS map updates.

## Storybook and Tests

- Every component must have stories and unit tests.
- Include accessibility coverage (keyboard/focus/ARIA) and run addon-a11y.
- Keep story/testing conventions consistent across the repo:
  - clear `argTypes` for public inputs/outputs
  - accessibility-focused stories when applicable
  - focused, deterministic interaction tests

## Before Opening a PR

Run:

```bash
npm run ci:local
```

This validates lint, format, tests, builds, and Storybook build.

## Commit Format

- `feat(scope): ...`
- `fix(scope): ...`
- `docs: ...`
- `style: ...`
- `test: ...`
- `chore: ...`
