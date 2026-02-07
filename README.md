# ZGames UI Library

Una biblioteca de componentes Angular moderna, accesible y tematizable para aplicaciones de iGaming construida con Angular 21 y Storybook.

## 📋 Descripción General

Este es un MVP de una biblioteca de componentes UI reutilizables para ZGames Technology. La biblioteca sigue las mejores prácticas de Angular, prioriza la accesibilidad (WCAG) y proporciona un sistema de diseño consistente con capacidades de tematización multi-cliente.

## 🏗️ Arquitectura

### Design Tokens

La biblioteca utiliza un **sistema de design tokens de 2 capas**:

1. **Primitivos** (`--zg-green-800`, `--zg-neutral-200`, etc.): Escalas de color crudo y valores base
2. **Tokens semánticos** (`--zg-color-primary`, `--zg-color-success`, etc.): Tokens basados en intención que referencian primitivos

Todos los design tokens están definidos como variables CSS en [src/styles/\_tokens.scss](src/styles/_tokens.scss).

### Patrón de Componentes

Todos los componentes siguen el **Patrón Contenedor-Presentación**:

- **Componentes Tontos** (dentro de `projects/ui/`): Puramente presentacionales, reciben datos vía **signal input** (`input()`) y emiten eventos vía **signal output** (`output()`).
- **Componentes Inteligentes** (en apps consumidoras): Manejan lógica de negocio, orquestan datos y se conectan a servicios

Todos los componentes son:

- **Componentes Standalone**
- Usan `ChangeDetectionStrategy.OnPush`
- Usan **signal input/output** y **computed signals** para lógica reactiva y API pública
- Siguen tipado estricto de TypeScript
- Documentados con historias de Storybook

#### Signal Inputs/Outputs y Computed Signals

Desde Angular 17+ (usamos Angular 21), los componentes usan la nueva API de signals:

- **Signal Input**: `input<T>(defaultValue)` reemplaza a `@Input()`
- **Signal Output**: `output<T>()` reemplaza a `@Output()`
- **Computed signals**: Para lógica reactiva y clases dinámicas

Esto permite una API más reactiva, predecible y fácil de testear. Ejemplo:

```typescript
import { input, output, computed } from '@angular/core';

export class ZgButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  clicked = output<MouseEvent>();

  hostClasses = computed(() => (this.variant() === 'primary' ? 'btn-primary' : 'btn-secondary'));
}
```

### Atomic Design

Adoptamos el enfoque de **Atomic Design** para organizar la biblioteca y facilitar la escalabilidad:

- **Átomos**: Componentes más pequeños e independientes (ej. `Button`, `Badge`, `Input`) que forman la base del sistema.
- **Moléculas**: Combinaciones de átomos que crean unidades funcionales (ej. `Card` con `Badge` y `Button`).
- **Organismos**: Composiciones complejas que representan secciones de la UI (ej. `Modal`).

La clasificación y el índice de componentes se mantienen y se exploran desde el **Storybook (barra lateral)** para que siempre refleje el estado actual de la librería.

### Tematización Multi-Cliente

La biblioteca soporta **cambio de tema en tiempo de ejecución** para múltiples clientes de casino. Cada cliente puede tener múltiples variantes de tema (claro, oscuro, personalizado).

- Los temas de cliente están configurados en [projects/ui/src/themes/client-themes.ts](projects/ui/src/themes/client-themes.ts)
- Los temas pueden sobrescribir tokens semánticos y primitivos
- Storybook incluye una barra de herramientas para previsualizar todos los temas de cliente

## 🚀 Comenzando

### Prerequisitos

- Node.js 18+ y npm
- Angular CLI 21+

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
npm start
```

Navega a `http://localhost:4200/` para ver la aplicación demo.

### Storybook

```bash
npm run storybook
```

Abre `http://localhost:6006/` para explorar la biblioteca de componentes.

## 📦 Estructura del Proyecto

```text
zg-ui/
├── projects/
│   ├── design-tokens/        # Sistema de design tokens (variables CSS + API TS)
│   │   └── src/lib/
│   │       └── design-tokens.ts     # createTheme(), resetTheme(), accesores de tokens
│   └── ui/                    # Biblioteca de componentes
│       ├── .storybook/        # Configuración Storybook específica del UI
│       │   ├── main.ts
│       │   ├── preview.ts
│       │   ├── custom-theme.ts
│       │   ├── manager.ts
│       │   └── theme-decorator.ts
│       └── src/
│           ├── lib/
│           │   ├── atoms/
│           │   │   └── button/
│           │   │       ├── button.component.ts
│           │   │       ├── button.component.html
│           │   │       ├── button.component.scss
│           │   │       ├── button.component.spec.ts
│           │   │       └── button.stories.ts
│           │   ├── molecules/
│           │   ├── organisms/
│           │   ├── templates/
│           │   └── pages/
│           └── themes/
│               └── client-themes.ts   # Configuraciones de temas multi-cliente
├── src/
│   ├── app/                   # Aplicación demo
│   └── styles/
│       └── _tokens.scss       # Fuente única de verdad para design tokens
└── README.md
```

## 🎨 Design Tokens

### Sistema de Colores

- **Primary**: Escala verde para acciones primarias
- **Success**: Tonos verdes para retroalimentación positiva
- **Warning**: Naranja/amarillo para advertencias
- **Error**: Tonos rojos para errores
- **Neutral**: Escala gris para texto y superficies

### Escala Tipográfica

Tamaños de fuente desde `xs` (12px) hasta `5xl` (48px) usando ratio ~1.2x.

### Escala de Espaciado

Espaciado consistente de `4` a `64` usando unidad base de 4px.

## 🌈 Tematización

### Aplicando un Tema de Cliente

```typescript
import { applyClientTheme } from '@zg/ui/themes/client-themes';

// Aplicar un tema en tiempo de ejecución
applyClientTheme('client1', 'dark');
applyClientTheme('client2', 'christmas');
```

### Creando un Tema Personalizado

```typescript
import { createTheme, Theme } from '@zg/design-tokens';

const myTheme: Theme = {
  colorPrimary: '#00ff00',
  colorSuccess: '#00cc00',
  // ... otros tokens semánticos
  primitives: {
    green800: '#006600', // Sobrescribir primitivos
  },
};

createTheme(myTheme);
```

## 🧪 Pruebas

Ejecutar pruebas unitarias con Vitest:

```bash
npm test
```

## 📚 Documentación

- **Storybook**: Ejecuta `npm run storybook` para documentación interactiva de componentes
- **Documentación de API (Compodoc)**: Genera la documentación técnica con Compodoc:
  - `npm run docs:ui` → Genera HTML en `docs/ui`
  - `npm run docs:ui:serve` → Sirve la documentación localmente (live)

> Nota: Compodoc genera documentación de APIs (Inputs/Outputs, tipos y JSDoc) que complementa las historias de Storybook.

## 🛠️ Construyendo la Biblioteca

```bash
npm run build:design-tokens
npm run build:ui
```

## ♿ Accesibilidad

Todos los componentes están construidos con la accesibilidad en mente:

- Atributos ARIA apropiados
- Soporte para navegación por teclado
- Gestión del foco
- Contraste de color suficiente (validado con addon-a11y de Storybook)

Nota: Por defecto, las comprobaciones automáticas del addon **a11y** en Storybook están configuradas para ejecutar las reglas correspondientes a **WCAG 2.1 Nivel AA** (etiquetas `wcag2aa` y `wcag21aa`). La configuración se encuentra en `projects/ui/.storybook/preview.ts`.

## 📝 Contribuyendo

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para guías.

## 📄 Licencia

[Licencia MIT](LICENSE)
