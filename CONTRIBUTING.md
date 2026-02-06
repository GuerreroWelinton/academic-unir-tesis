# Colaborar

## Objetivo

Este repositorio contiene un MVP de una biblioteca de componentes UI reutilizables para iGaming (ZGames Technology) usando **Angular 21** y **Storybook**. El enfoque es crear componentes presentacionales (dumb) consistentes, accesibles y documentados.

## Reglas de arquitectura (obligatorias)

- La librería `projects/ui` solo contiene **componentes de presentación**:
  - reciben datos por `@Input()`
  - emiten eventos por `@Output()`
- Prohibido en la librería:
  - inyección de servicios
  - lógica de negocio
  - llamadas HTTP / acceso a APIs
  - acceso a router/store/localStorage (salvo que sea estrictamente UI y se justifique)

## Convenciones técnicas

### Angular Moderno

- Todos los componentes deben ser **Standalone** (sin NgModules)
- Usar **ChangeDetectionStrategy.OnPush** obligatorio
- **Signals** para estado interno de UI cuando corresponda
- TypeScript estricto, evitar `any`

### Estructura de archivos

Co-localización por componente en `projects/ui/src/lib/atoms/<componente>/`:

- `*.component.ts|html|scss`
- `*.stories.ts` (obligatorio)
- `*.spec.ts` (obligatorio)

### Design Tokens

- **OBLIGATORIO**: Estilos deben usar design tokens de `src/styles/_tokens.scss`
- **PROHIBIDO**: Hardcodear colores, espaciado, tipografía, radius
- Ejemplo correcto: `color: var(--zg-color-primary)`
- Ejemplo incorrecto: `color: #00b894`

## Storybook y documentación

Todo componente debe tener `*.stories.ts` con:

- **Default** story (interactiva con `args`)
- Historias de demostración con `render()` para:
  - Variants (todas las variantes visuales)
  - Sizes (todos los tamaños)
  - States (disabled, loading, error, etc.)
  - WithIcons (si aplica)
  - RealWorldExamples

### Documentación en stories

- JSDoc completo en el meta del componente
- **Usage Guide** con cuándo usar/no usar
- **Available ng-content selectors** si aplica
- **Accessibility** checklist
- Descripción clara de cada argType

## Accesibilidad (obligatorio)

- Usar addon-a11y de Storybook para validar
- Implementar navegación por teclado (Enter/Space para botones)
- Estados de focus visibles
- ARIA attributes cuando corresponda
- `aria-label` para componentes solo-icono

## Tests unitarios (mínimos)

Cada componente debe tener tests que verifiquen:

- Renderiza sin errores
- Respeta Inputs clave (variant, size, disabled, etc.)
- Emite Outputs correctos ante interacción
- Estados especiales (loading, disabled, error)

## ng-content y slots

Para componentes con contenido proyectado:

- Definir slots específicos con selectores claros (`[icon-left]`, `[icon-right]`)
- Documentar todos los selectores en Usage Guide
- Proveer tanto API simple (`text` property) como compleja (ng-content)
- Usar CSS flexbox con `order` para garantizar layout correcto

## Commits

Convención recomendada:

- `feat(button):` nueva funcionalidad
- `fix(button):` corrección
- `docs:` documentación
- `style:` tokens, estilos, formato
- `test:` tests
- `chore:` tooling/config

## Setup actual

Para trabajar en el proyecto:

```bash
# Instalar dependencias
npm install

# Storybook (desarrollo principal)
npm run storybook  # localhost:6006

# App demo
npm start  # localhost:4200

# Tests
npm test

# Builds
npm run build:ui
npm run build:design-tokens
```

## Proceso de desarrollo

1. **Planificar**: Revisar las instrucciones del proyecto y definir API del componente
2. **Implementar**: Componente + estilos con tokens + tests básicos
3. **Documentar**: Stories completas con todos los casos de uso
4. **Validar**: Accesibilidad en Storybook, tests pasando
5. **Review**: PR con descripción clara de la API y casos de uso
