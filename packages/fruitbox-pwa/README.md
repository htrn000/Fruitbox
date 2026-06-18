# fruitbox-pwa

Progressive Web App for Fruit Box.

## Stack

- **Vite + TypeScript** — UI, canvas rendering, PWA shell
- **Pyodide** — loads `fruitbox-core` Python wheel in the browser (game rules, env, masks)
- **onnxruntime-web** — VS AI inference (model preloaded from local bundle or Hugging Face)
- **sql.js** — SQLite stats in the browser with **import/export** of `fruitbox_stats.db` (desktop-compatible schema)

## Build

From repo root:

```bash
uv sync --package fruitbox-ci --group build
uv run fruitbox-ci build-pwa          # build → packages/fruitbox-pwa/dist
uv run fruitbox-ci build-pwa --serve  # build + preview on :4173
```

GitHub Pages deploys `packages/fruitbox-pwa/dist` via `.github/workflows/deploy-web.yml`.

**Pages settings required:** Settings → Pages → **Deploy from a branch** → branch `gh-pages` → `/ (root)`.

- **Production** (`master`/`main`): https://htrn000.github.io/Fruitbox/
- **PR previews** (when PR is marked ready, and on each push while open): `https://htrn000.github.io/Fruitbox/pr-preview/pr-<number>/` — link posted as a PR comment automatically

## Dev

```bash
cd packages/fruitbox-pwa
npm install
npm run dev
```

For local dev you still need the wheel and ONNX in `public/` — run `fruitbox-ci build-pwa` once, or copy them manually.
