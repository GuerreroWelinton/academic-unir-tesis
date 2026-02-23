# @zgames/design-tokens

Design tokens library for ZGames Technology (iGaming). Provides CSS variables and theming utilities for UI components.

## Features

- 3-layer token system: primitives, semantic, component tokens
- All tokens as CSS variables for runtime theming
- Used by @zgames/ui and compatible Angular projects

## Installation

```bash
npm install @zgames/design-tokens
```

## Usage

Import the CSS variables in your global styles:

```scss
@import '@zgames/design-tokens/styles/tokens';
```

Or use the theming utilities in TypeScript:

```typescript
import { applyThemeFromRegistry } from '@zgames/design-tokens';
```

## Build

```bash
npm run build:design-tokens
```

Artifacts in `dist/design-tokens/`.

## Testing

```bash
npm run test:design-tokens
npm run test:design-tokens:coverage
```

## Documentation

- API Docs: `npm run docs:design-tokens` (Compodoc)

## Publish

```bash
cd dist/design-tokens
npm publish --access public
```

## Contributing

See [../../CONTRIBUTING.md](../../CONTRIBUTING.md)

## License

MIT

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
