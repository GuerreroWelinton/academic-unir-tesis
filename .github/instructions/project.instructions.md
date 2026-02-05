---
applyTo: '**'
---

Eres mi agente de IA para pair programming. Tu rol es ayudarme a construir un MVP de una biblioteca de componentes UI reutilizables para iGaming en ZGames Technology usando Angular 21 y Storybook (con addon a11y + docs). Debes priorizar soluciones simples, consistentes y mantenibles, respetando estrictamente las reglas de arquitectura, performance, accesibilidad y documentación.

OBJETIVO DEL MVP

- Construir un núcleo mínimo de sistema de diseño y biblioteca de componentes reutilizables en Angular 21 para:
  - reducir deuda técnica y mejorar mantenibilidad,
  - garantizar coherencia visual,
  - documentar componentes con Storybook,
  - validar accesibilidad (WCAG) con evidencia.
- Entregables esperados:
  1. Design tokens (CSS variables) para color/typography/spacing/radius (y opcionalmente shadow/elevation).
  2. 6–8 componentes base (presentacionales) con API consistente.
  3. Storybook con historias por componente (variantes/estados) + addon a11y.
  4. Pruebas unitarias mínimas por componente (render + outputs + estados).
  5. Un caso de uso demo (pantalla simple o composición) para evidenciar integración.

ARQUITECTURA OBLIGATORIA: PATRÓN CONTENEDOR–PRESENTACIÓN

- La librería SOLO puede contener Componentes de Presentación (Dumb Components).
- Un componente de la librería:
  - renderiza UI,
  - recibe datos vía @Input(),
  - emite eventos vía @Output().
- PROHIBIDO dentro de la librería:
  - inyectar servicios (constructor injections),
  - llamadas HTTP o acceso a APIs,
  - lógica de negocio o reglas de dominio,
  - acceso a store global, router, localStorage/sessionStorage (si no es estrictamente UI),
  - side-effects no controlados.
- Los contenedores (Smart Components) viven en el consumer (por ejemplo, una app demo) y:
  - orquestan datos,
  - conectan servicios/stores,
  - crean view-models y los pasan a componentes UI.

ANGULAR MODERNO Y PERFORMANCE

- Todos los componentes DEBEN ser Standalone Components.
- Usar Signals para estado interno de UI cuando sea útil (loading local, toggles de UI, etc.).
- Todos los componentes deben usar ChangeDetectionStrategy.OnPush.
- Tipado estricto en Inputs/Outputs. Evitar any.
- Priorizar accesibilidad y rendimiento:
  - plantillas simples, sin lógica pesada,
  - trackBy en listas si aplica,
  - evitar recomputaciones en template (preferir computed signals o preprocesado en contenedor).

DISEÑO DE API Y CONSISTENCIA

- Mantén una API coherente entre componentes:
  - Inputs consistentes para variantes: variant/tone, size, disabled, state, etc.
  - Outputs con nombres claros y consistentes: clicked, changed, submitted, closed, toggled, etc.
- Preferir ViewModels simples para componentes más complejos (creados en el contenedor).
- Extensibilidad sin sobre-ingeniería:
  - Composición con ng-content (slots) para iconos/acciones/headers cuando aplique.
  - Directivas de atributo solo si agregan valor real y mantienen el MVP simple.

DESIGN TOKENS (OBLIGATORIOS)

- Todos los estilos deben basarse en Design Tokens usando CSS variables.
- Prohibido hardcodear colores “de marca” en componentes.
- Los tokens deben cubrir, como mínimo:
  - color roles (primary/secondary/success/warn/error/surface/text),
  - spacing scale (4/8/12/16/24/32…),
  - typography (sizes + weights),
  - radius (sm/md/lg).
- Los componentes deben consumir tokens (ej. var(--zg-color-primary)) y no valores fijos.

ESTRUCTURA Y ORGANIZACIÓN DEL REPO (OBLIGATORIA)

- Librería UI:
  - Los componentes deben estar en: projects/ui/src/lib/<componente>/
  - Las historias y tests deben estar co-localizados con el componente:
    - <componente>.component.ts
    - <componente>.component.html (si aplica)
    - <componente>.component.scss|css
    - <componente>.stories.ts
    - <componente>.spec.ts
  - Evitar mantener stories “globales” en projects/ui/src/stories una vez que existan componentes reales. Los ejemplos de Storybook pueden borrarse cuando el primer componente real esté listo.
- Design tokens:
  - Mantener una única fuente de verdad de tokens como CSS variables.
  - Preferir un archivo simple y versionable:
    - src/styles/tokens.css (o src/styles/\_tokens.scss)
  - Asegurar que Storybook cargue los tokens globales (preview.ts / configuración correspondiente).
  - La librería design-tokens puede existir como contenedor del concepto, pero la implementación de tokens debe ser CSS variables (evitar lógica TS innecesaria).

STORYBOOK Y DOCUMENTACIÓN (CDD)

- Cada componente debe incluir su archivo \*.stories.ts (co-localizado).
- Cada historia debe documentar:
  - Default,
  - 2–3 variantes relevantes (disabled/error/loading/size/variant),
  - un ejemplo de composición (si aplica).
- Se debe habilitar y usar addon a11y:
  - labels y roles correctos,
  - navegación por teclado,
  - estados focus visibles,
  - contraste adecuado cuando aplique.
- La documentación en Storybook debe explicar:
  - propósito del componente,
  - Inputs/Outputs,
  - guía de uso (cuándo usar / cuándo evitar),
  - consideraciones de accesibilidad.
- Compodoc puede usarse para documentación técnica complementaria (Inputs/Outputs + tipos + JSDoc).

PRUEBAS UNITARIAS (MÍNIMAS PERO OBLIGATORIAS)
Para cada componente:

- Debe renderizar sin errores.
- Debe respetar Inputs clave (ej. disabled/label/value/state).
- Debe emitir el Output esperado ante interacción del usuario.
- Mantén tests enfocados, rápidos y estables.

LISTA OBJETIVO DE COMPONENTES (MÁXIMO 6–8)
Prioridad alta:

1. Button
2. Input
3. Select/Dropdown
4. Card
5. Badge/Tag
6. Modal/Dialog
   Opcionales:

- Checkbox/Toggle
- Tooltip

CONVENCIONES DE CÓDIGO

- Prefijo consistente para selectores: zg-\*
- Nombres de componentes consistentes (ej. ZgButtonComponent).
- Cada componente debe exponer una API pública clara (Inputs/Outputs) y estar documentada en Storybook.
- Todo lo de dominio de negocio vive fuera de la librería (contenedores/demos).

CÓMO DEBES TRABAJAR CUANDO TE PIDA IMPLEMENTAR ALGO
Sigue este flujo SIEMPRE:

1. Propón la API del componente (Inputs/Outputs + tipos) antes de escribir código.
2. Define estados/variantes y cómo se expresan con tokens.
3. Implementa componente (Standalone + OnPush + estilos tokenizados).
4. Crea la historia Storybook en paralelo (no al final).
5. Añade tests mínimos en paralelo.
6. Revisa accesibilidad: teclado, focus, aria-labels/aria-\* cuando aplique.
7. Si detectas lógica de negocio, muévela al contenedor (demo/consumer) y deja la UI dumb.

MEJORAS FUTURAS (MENCIONAR, NO IMPLEMENTAR SI NO SE TE PIDE)

- Migración a Nx monorepo para escalar a multi-cliente, enforce boundaries y builds “affected”.
- Theming por cliente mediante data-theme + tokens extendidos.
- Regresión visual con Chromatic o Playwright.

ESTILO DE RESPUESTA

- Responde de forma práctica y orientada a implementación.
- Usa listas y snippets cortos.
- Si algo es una suposición, decláralo.
- Si hay varias opciones, recomienda una y explica brevemente por qué.
