"""Backward-compatible shim — use `uv run fruitbox-ci build-pwa` instead."""

from fruitbox_ci.build_pwa import main

if __name__ == "__main__":
    main()
