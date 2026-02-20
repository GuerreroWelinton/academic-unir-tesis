# 🔄 CI/CD Setup Guide

## ✅ CI Pipeline Configurado

El CI se ejecuta automáticamente en:

- ✅ Push a `main`
- ✅ Pull Requests a `main`

---

## 📋 Jobs del Pipeline

| Job              | Descripción                             | Duración |
| ---------------- | --------------------------------------- | -------- |
| 🔍 **Lint**      | ESLint + Prettier check                 | ~30s     |
| 🧪 **Tests**     | Tests de todos los proyectos + coverage | ~2min    |
| 🏗️ **Build**     | Build de app + librerías                | ~2min    |
| 📚 **Storybook** | Build de documentación                  | ~1min    |
| 👁️ **Chromatic** | Visual regression (solo PRs)            | ~2min    |

**Total:** ~7-8 minutos

---

## 🧪 Probar localmente (antes de push)

### Opción 1: Comando rápido

```bash
npm run ci:local
```

### Opción 2: Jobs individuales

```bash
# Lint
npm run lint
npm run format:check

# Tests
npm run test:once

# Build
npm run build:all

# Storybook
npm run build-storybook
```

---

## 🚀 Primera vez: Configurar secrets en GitHub

### 1. **Chromatic Token** (Visual Regression)

Si ya tienes proyecto en Chromatic:

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Nombre: `CHROMATIC_PROJECT_TOKEN`
5. Valor: Tu token de Chromatic (lo tienes en tu `.env` local)

Si no tienes Chromatic configurado, comenta el job en [.github/workflows/ci.yml](.github/workflows/ci.yml):

```yaml
# chromatic:
#   name: 👁️ Visual Regression (Chromatic)
#   ...
```

---

## 🔍 Verificar que funciona

### Método 1: Crear PR de prueba

```bash
git checkout -b test-ci
git add .
git commit -m "test: verificar CI pipeline"
git push origin test-ci
```

Luego crea un Pull Request en GitHub y verás los checks corriendo.

### Método 2: Push directo a main

```bash
git add .
git commit -m "ci: add CI pipeline"
git push origin main
```

Ve a: `GitHub → Actions` para ver el progreso.

---

## 📊 Ver resultados

### En GitHub:

1. Ve a tu repositorio
2. Click en "Actions" (arriba)
3. Verás todos los workflows
4. Click en uno para ver detalles

### Badges (opcional):

Agrega esto a tu README.md principal:

```markdown
![CI](https://github.com/TU_USUARIO/zg-ui/workflows/CI/badge.svg)
```

---

## ⚙️ Configuración avanzada (opcional)

### Cache de dependencias

Ya está configurado en el workflow con:

```yaml
cache: 'npm'
```

### Artifacts

Los builds se guardan 7 días y puedes descargarlos desde Actions.

### Coverage reports

Si quieres reportes públicos de coverage, crea cuenta en:

- [Codecov](https://codecov.io) (gratis para open source)
- [Coveralls](https://coveralls.io) (gratis para open source)

---

## 🐛 Solución de problemas

### "npm ci failed"

```bash
# Borra node_modules y package-lock.json
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "fix: regenerate package-lock"
```

### "Test failed in CI but passes locally"

- Verifica rutas absolutas vs relativas
- Verifica variables de entorno
- Ejecuta `npm run ci:local` para simular CI

### "Chromatic job failed"

- Verifica que el secret `CHROMATIC_PROJECT_TOKEN` esté configurado
- O comenta el job si no lo necesitas aún

---

## 🎯 Próximos pasos (CD)

Cuando estés listo para publicar:

1. **Deploy Storybook** → GitHub Pages, Vercel, Chromatic
2. **Publish to NPM** → `@zgames/ui` y `@zgames/design-tokens`
3. **Semantic Release** → Versionado automático

_(Lo configuramos cuando lo necesites)_
