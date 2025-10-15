# Deploy rápido para GitHub Pages (gh-pages)

Este pacote contém:
- `.gitignore` (para **não** versionar `node_modules/` e `dist/`)
- `.github/workflows/deploy.yml` (workflow para publicar a pasta `dist/` na branch `gh-pages`)

## Como usar

1. **Extraia** os arquivos deste ZIP na **raiz do seu projeto** (onde fica o `package.json`).

2. **Comandos** (no terminal, dentro da pasta do projeto):

```cmd
git add .gitignore .github/workflows/deploy.yml
git commit -m "ci: deploy Vite to gh-pages (workflow + .gitignore)"
git rm -r --cached node_modules dist
git commit -m "chore: stop tracking node_modules/dist"
git push
```

3. **Dispare o workflow** (uma das opções):
```cmd
gh workflow run "Deploy Vite to gh-pages"
:: ou
git commit --allow-empty -m "ci: trigger gh-pages"
git push
```

4. **Configurar Pages** no GitHub (web):
- Settings → **Pages**
- **Source**: *Deploy from a branch*
- **Branch**: `gh-pages` e `/` (root) → **Save**

5. **URL**
- `https://SEU-USUARIO.github.io/NOME-DO-REPO/`
  (no seu caso: `https://devintegraiapps.github.io/TestVoca/`)

## Pré‑requisitos importantes

- Em `vite.config.ts`, garanta:
```ts
export default defineConfig({
  // ...
  base: '/TestVoca/',  // nome exato do repositório
})
```

- Em Settings → **Actions → General**:
  - *Actions permissions*: **Allow all actions and reusable workflows**
  - *Workflow permissions*: **Read and write permissions**

## Dica

Se o workflow falhar com `vite: Permission denied`, é porque `node_modules/` estava versionado.
O `.gitignore` e o `git rm -r --cached node_modules dist` resolvem definitivamente.
