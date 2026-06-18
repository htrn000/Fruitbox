# fruitbox-ci

CI scripts and build helpers for the Fruitbox monorepo.

## Commands

```bash
uv run fruitbox-ci download-onnx      # HF ONNX for web / Windows ONNX exe
uv run fruitbox-ci download-model     # HF SB3 zip for Windows torch exe
uv run fruitbox-ci check-exe-size     # Fail if .exe exceeds size budget
uv run fruitbox-ci verify-torch-cpu   # Fail if CUDA torch is installed
uv run fruitbox-ci build-pwa          # Vite PWA → packages/fruitbox-pwa/dist
uv run fruitbox-ci build-web          # Legacy pygbag build
uv run fruitbox-ci export-onnx        # SB3 → ONNX (needs --extra export)
```

## Extras

| Extra | Adds |
|---|---|
| `web` | pygbag for `build-web` |
| `export` | torch, SB3, onnxruntime for `export-onnx` |
| `windows` | PyInstaller (used by Windows workflow alongside app packages) |

```bash
uv sync --package fruitbox-ci --group build
uv run fruitbox-ci export-onnx   # needs --group export
```

GitHub Actions workflows invoke these via `uv run fruitbox-ci <command>`.

## GitHub Pages

Deploy workflow: `.github/workflows/deploy-web.yml`

Requires repo **Settings → Pages → Deploy from a branch → `gh-pages`**.

| Trigger | Result |
|---|---|
| Push to `master`/`main` | Production at `/Fruitbox/` |
| PR marked ready (`ready_for_review`) | Preview deploy + PR comment |
| Push to open, non-draft PR | Preview updated |
| PR closed | Preview removed |
