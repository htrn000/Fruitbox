"""Backward-compatible shim — use `uv run fruitbox-ci build-web` instead."""

from fruitbox_ci.build_web import main

if __name__ == "__main__":
    main()
