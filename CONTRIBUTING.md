# Contributing

## Objetivo

Este repositorio contiene un MVP de una biblioteca de componentes UI reutilizables para iGaming (ZGames Technology) usando Angular y Storybook. El enfoque es crear componentes presentacionales (dumb) consistentes, accesibles y documentados.

## Reglas de arquitectura (obligatorias)

- La librería `projects/ui` solo contiene **componentes de presentación**:
  - reciben datos por `@Input()`
  - emiten eventos por `@Output()`
- Prohibido en la librería:
  - inyección de servicios
  - lógica de negocio
  - llamadas HTTP / acceso a APIs
  - acceso a router/store/localStorage (salvo que sea estrictamente UI y se justifique)

## Convenciones de implementación

- Todos los componentes deben ser **Standalone** y usar **ChangeDetectionStrategy.OnPush**.
- Estilos deben usar **Design Tokens** (CSS variables). No hardcodear colores.
- Co-localización (por componente):
  - `projects/ui/src/lib/<componente>/...`
  - `*.component.ts|html|scss`
  - `*.stories.ts`
  - `*.spec.ts`

## Storybook y accesibilidad

- Todo componente debe tener `*.stories.ts` con:
  - `Default`
  - 2–3 variantes relevantes (disabled/error/loading/size/variant)
- Revisar el panel de accesibilidad (addon a11y) y corregir problemas detectados.

## Tests (mínimos)

Cada componente debe:

- renderizar sin errores
- respetar Inputs clave
- emitir Outputs correctos ante interacción

## Commits

Se recomienda convención simple:

- `feat:` nueva funcionalidad (componente, variante, token)
- `fix:` corrección
- `docs:` documentación
- `chore:` tooling / config / dependencias
- `test:` pruebas

## Ejecución local

- Instalar:
  - `npm install`
- Storybook:
  - `ng run ui:storybook`
- Tests:
  - `ng test`
- Lint:
  - `ng lint`
