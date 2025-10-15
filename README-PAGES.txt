# Deploy pronto via GitHub Pages (pasta /docs)

## Como usar sem quebrar nada do projeto atual

1. **Baixe e extraia** este ZIP na **raiz do repositório** (vai criar a pasta `docs/`).  
2. Faça o commit:
   ```bash
   git add docs
   git commit -m "chore: add RIASEC static app in /docs (GitHub Pages)"
   git push
   ```
3. No GitHub, vá em **Settings → Pages** e configure:
   - **Source:** Deploy from a branch
   - **Branch:** `main` e pasta **/docs**
4. Acesse: **https://SEU_USUARIO.github.io/SEU_REPOSITORIO/**  
   No seu caso: https://devintegraiapps.github.io/TestVoca/ (force refresh Ctrl+F5).

### O que vem incluído
- `docs/index.html`: app completo (24 perguntas RIASEC + top 5 cursos + copiar resultado), 100% estático.
- **Sem Vite, sem Actions** — não interfere no código existente do seu app.

Se quiser voltar ao fluxo com Actions/Vite depois, basta mudar a origem do Pages novamente.
