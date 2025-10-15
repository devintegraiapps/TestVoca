# Pacote de correção (Vite + React + GH Pages)

Sobrescreva estes arquivos na raiz do projeto:
- src/App.tsx
- src/main.tsx
- src/ErrorBoundary.tsx (opcional, mas útil p/ ver erros na tela)
- vite.config.ts

## Publicar
npm run build
git add src/App.tsx src/main.tsx src/ErrorBoundary.tsx vite.config.ts
git commit -m "fix: App + main + ErrorBoundary + base Vite"
git push
gh workflow run "Deploy Vite to gh-pages"
gh run watch
