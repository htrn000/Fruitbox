# Fruit Box

A client-side puzzle game (pygame) where you drag-select numbered fruits that sum to 10 to clear them. It also includes an RL training pipeline (PPO via stable-baselines3) and a WASM/web build (pygbag). There is **no backend server or database**.

- Desktop app: `src/fruitbox/` (entry: `python -m fruitbox`, console script `fruitbox`).
- Web app: `src/fruitbox_web/` + `src/main.py` (compiled to WASM via pygbag).
- Package manager: `uv` (`pyproject.toml`, `uv.lock`). Requires Python >=3.13.

## Cursor Cloud specific instructions

### Environment
- Deps are managed by `uv`. The startup update script runs `uv sync --extra cpu`, which installs CPU-only torch (avoids the large CUDA download). Use `--extra cu128` only if you specifically need GPU torch.
- `uv` is already on `PATH` in fresh shells (via `~/.bashrc` sourcing `~/.local/bin/env`); no manual PATH setup needed.
- Run anything Python via `uv run ...` so it uses the synced `.venv`.

### Running the desktop game (GUI)
- A VNC xfce desktop is already running on `DISPLAY=:1`. Launch the game there so it is visible to GUI/computer-use testing:
  `DISPLAY=:1 uv run --extra cpu python -m fruitbox`
- ALSA "cannot find card" / "Unknown PCM default" warnings on startup are harmless (no audio device in the VM); the game runs fine.
- Note: the README's "Building from Source" command references `fruitbox_menu.py`, which no longer exists. The correct entry point is `python -m fruitbox`.

### AI / Demo / "vs AI (RL Model)" modes
- These require the trained model `fruitbox_ppo_final.zip` at the repo root. It is git-ignored (~92 MB) and NOT downloaded by the update script.
- Download it with:
  `HF_MODEL_REPO=Fungster/fruitbox-ppo HF_MODEL_REVISION=main HF_MODEL_FILE=fruitbox_ppo_final.zip GITHUB_REPOSITORY=jeff1216/Fruitbox uv run --with huggingface_hub python .github/scripts/download_hf_model.py`
- Single Player and the "vs AI (Solver)" opponent do NOT need the model.

### Web build (optional)
- `uv sync --group web` then `uv run python tools/build_web.py --serve` builds the WASM bundle and serves it on `http://localhost:8000`.

### Lint / Test / Build
- There are **no automated tests** and **no linter configured** in this repo (no pytest/ruff/flake8/mypy config). Don't fabricate them unless asked.
- Windows `.exe` build is CI-only (`.github/workflows/build-windows.yml`, PyInstaller on `windows-latest`) and not reproducible on this Linux VM.
