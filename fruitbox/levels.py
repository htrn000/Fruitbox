"""Built-in sample levels."""

from __future__ import annotations

import json
from pathlib import Path

from fruitbox.models import Level

_PACKAGE = "fruitbox.data.levels"


def _levels_dir() -> Path:
    return Path(__import__("fruitbox").__file__).parent / "data" / "levels"


def list_level_ids() -> list[str]:
    return sorted(p.stem for p in _levels_dir().glob("*.json"))


def load_level(level_id: str) -> Level:
    path = _levels_dir() / f"{level_id}.json"
    if not path.exists():
        raise FileNotFoundError(f"level not found: {level_id}")
    data = json.loads(path.read_text(encoding="utf-8"))
    return Level.model_validate(data)


def load_all_levels() -> list[Level]:
    return [load_level(level_id) for level_id in list_level_ids()]
