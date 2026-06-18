"""Repository root (workspace)."""

from __future__ import annotations

from pathlib import Path

_PKG = Path(__file__).resolve().parent
REPO_ROOT = _PKG.parents[3]


def repo_root() -> Path:
    return REPO_ROOT
