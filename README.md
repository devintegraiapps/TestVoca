# Teste Vocacional (RIASEC) — Web
Projeto React + Vite + TypeScript com Tailwind.

## Rodar localmente
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy rápido
### Vercel
1. Crie um repositório no GitHub e suba estes arquivos.
2. No vercel.com: **New Project** → **Import Git** → selecione o repo.
3. Framework = Vite. Build command: `npm run build`. Output dir: `dist`.

### Netlify
1. New site → Import from Git.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### GitHub Pages
1. No `package.json`, adicione `"homepage": "."` (já funciona sem, mas ajuda paths relativos).
2. Build: `npm run build`.
3. Habilite Pages apontando para a pasta `dist` (usando ação `peaceiris/actions-gh-pages` ou Netlify/Vercel).

## Observações
- Este pacote não coleta dados. Tudo é calculado no navegador.
- Para white-label (logo/cores/texto), edite `src/App.tsx`.
