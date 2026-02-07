#!/bin/bash

# 🧪 Script para probar el pipeline CI localmente
# Simula lo que ejecutará GitHub Actions

set -e  # Exit on error

echo "🚀 Starting local CI simulation..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

run_step() {
  echo ""
  echo -e "${BLUE}▶ $1${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

success_step() {
  echo -e "${GREEN}✅ $1 passed!${NC}"
}

# Job 1: Lint & Format
run_step "Job 1: Lint & Format Check"
npm run lint
npm run format:check
success_step "Lint & Format"

# Job 2: Tests
run_step "Job 2: Running Tests"
npm run test:once
success_step "Tests"

# Job 3: Build
run_step "Job 3: Building Projects"
npm run build:all
success_step "Build"

# Job 4: Storybook
run_step "Job 4: Building Storybook"
npm run build-storybook
success_step "Storybook"

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 All CI checks passed locally!${NC}"
echo "You can safely push to GitHub"
echo ""
