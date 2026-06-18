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
uv sync --group build --all-packages
uv run fruitbox-ci build-pwa          # build → packages/fruitbox-pwa/dist
uv run fruitbox-ci build-pwa --serve  # build + preview on :4173
```

GitHub Pages deploys `packages/fruitbox-pwa/dist` via `.github/workflows/deploy-web.yml`.

## Dev

```bash
cd packages/fruitbox-pwa
npm install
npm run dev
```

For local dev you still need the wheel and ONNX in `public/` — run `fruitbox-ci build-pwa` once, or copy them manually.
