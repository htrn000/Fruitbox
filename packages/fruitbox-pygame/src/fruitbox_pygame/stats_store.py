from typing import Protocol

from fruitbox_core.models import GameInfo


class StatsStore(Protocol):
    def record(self, info: GameInfo) -> str: ...

    def get_summary(self) -> dict: ...

    def get_vs_stats(self) -> dict: ...

    def get_history(self) -> list[dict]: ...


_EMPTY_SUMMARY = {
    "total_games": 0,
    "total_time": 0,
    "vs_wins": 0,
    "vs_losses": 0,
    "vs_ties": 0,
    "random_best": None,
    "random_best_seed": None,
    "random_best_time": None,
    "solvable_best": None,
    "solvable_best_seed": None,
    "solvable_best_time": None,
}


class NoOpStatsStore:
    """Stats sink for modes or platforms without persistence."""

    def record(self, info: GameInfo) -> str:
        return ""

    def get_summary(self) -> dict:
        return dict(_EMPTY_SUMMARY)

    def get_vs_stats(self) -> dict:
        return {"wins": 0, "losses": 0, "ties": 0}

    def get_history(self) -> list[dict]:
        return []
