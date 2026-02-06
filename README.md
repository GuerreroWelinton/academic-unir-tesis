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

- **Componentes Tontos** (dentro de `projects/ui/`): Puramente presentacionales, reciben datos vía `@Input()`, emiten eventos vía `@Output()`
- **Componentes Inteligentes** (en apps consumidoras): Manejan lógica de negocio, orquestan datos y se conectan a servicios

Todos los componentes son:

- **Componentes Standalone**
- Usan `ChangeDetectionStrategy.OnPush`
- Siguen tipado estricto de TypeScript
- Documentados con historias de Storybook

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
- **Documentación de Tipos**: Ejecuta `npm run compodoc` para documentación generada de API

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

## 📝 Contribuyendo

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para guías.

## 📄 Licencia

[Licencia MIT](LICENSE)
