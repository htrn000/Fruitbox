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
uv run fruitbox-ci export-onnx        # SB3 → ONNX (needs --group export)
uv run fruitbox-ci validate-ci        # Smoke-test all CI uv sync commands
```

CI workflows run `uv run --package fruitbox-ci fruitbox-ci validate-ci` first.

```bash
uv sync --package fruitbox-ci --group build   # always include fruitbox-ci with --group
```

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

Deploy workflows:

- `.github/workflows/deploy-web.yml` — build PWA, push to `gh-pages`, publish
- `.github/workflows/deploy-pages-sync.yml` — publish `gh-pages` via `deploy-pages`

Pages should use **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The `github-pages` environment is limited to the `master` branch. PR previews write to
`gh-pages` first, then `deploy-web` dispatches `deploy-pages-sync` on `master` so the
preview is published without widening environment branch policies.

| Trigger | Result |
|---|---|
| Push to `master`/`main` | Production at `/Fruitbox/` |
| PR marked ready (`ready_for_review`) | Preview deploy + PR comment |
| Push to open, non-draft PR | Preview updated |
| PR closed | Preview removed |
