# @zgames/ui

Modern, accessible, and themeable Angular UI component library for iGaming, built with Angular 21 and Storybook.

## Features

- Standalone presentational components (atoms, molecules)
- 3-layer design token system (primitives, semantic, component tokens)
- Strict accessibility (WCAG 2.1 AA)
- Storybook documentation and a11y validation
- Unit tests (Vitest)

## Installation

```bash
npm install @zgames/ui @zgames/design-tokens
```

## Usage

Import the standalone component in your Angular app:

```typescript
import { ZgButtonComponent } from '@zgames/ui';
```

## Theming

All styles use CSS variables from @zgames/design-tokens. See the main README for theming strategies.

## Build

```bash
npm run build:ui
```

Artifacts in `dist/ui/`.

## Testing

```bash
npm run test:ui
npm run test:ui:coverage
```

## Documentation

- Storybook: `npm run storybook` (local) or see deployed Storybook
- API Docs: `npm run docs:ui` (Compodoc)

## Publish

```bash
cd dist/ui
npm publish --access public
```

## Contributing

See [../../CONTRIBUTING.md](../../CONTRIBUTING.md)

## License

MIT

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
