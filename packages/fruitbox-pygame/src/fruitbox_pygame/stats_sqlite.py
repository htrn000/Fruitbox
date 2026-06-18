import os
import sqlite3
import sys
import uuid

from fruitbox_core.models import GameInfo

from .stats_store import _EMPTY_SUMMARY, StatsStore


def _stats_db_path() -> str:
    if getattr(sys, "frozen", False):
        base = os.environ.get("LOCALAPPDATA") or os.path.expanduser("~")
        data_dir = os.path.join(base, "FruitBox")
        os.makedirs(data_dir, exist_ok=True)
        return os.path.join(data_dir, "fruitbox_stats.db")
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), "fruitbox_stats.db")


_SCHEMA = """
CREATE TABLE IF NOT EXISTS game_history (
    game_id      TEXT PRIMARY KEY,
    gamemode     TEXT,
    grid_type    TEXT,
    self_score   INTEGER,
    opp_score    INTEGER,
    time_elapsed REAL,
    seed         INTEGER
)
"""


class SqliteStatsStore:
    """Desktop stats persistence (compatible schema with PWA sql.js export)."""

    def __init__(self, path: str | None = None) -> None:
        self._path = path or _stats_db_path()

    def _connect(self):
        conn = sqlite3.connect(self._path)
        conn.row_factory = sqlite3.Row
        conn.execute(_SCHEMA)
        conn.commit()
        return conn

    def record(self, info: GameInfo) -> str:
        game_id = str(uuid.uuid4())
        with self._connect() as conn:
            conn.execute(
                "INSERT INTO game_history VALUES (?, ?, ?, ?, ?, ?, ?)",
                (
                    game_id,
                    info.gamemode,
                    info.grid_type,
                    info.self_score,
                    info.opp_score,
                    round(info.time_elapsed),
                    info.seed,
                ),
            )
        return game_id

    def get_summary(self) -> dict:
        with self._connect() as conn:
            totals = conn.execute("""
                SELECT COUNT(*) AS total_games, COALESCE(SUM(time_elapsed), 0) AS total_time
                FROM game_history
            """).fetchone()
            vs = conn.execute("""
                SELECT
                    COALESCE(SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END), 0) AS wins,
                    COALESCE(SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END), 0) AS losses,
                    COALESCE(SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END), 0) AS ties
                FROM game_history WHERE gamemode = 'vs_ai'
            """).fetchone()
            random_best = conn.execute("""
                SELECT self_score, seed, time_elapsed FROM game_history
                WHERE grid_type = 'random' AND gamemode IN ('single_player', 'vs_ai')
                ORDER BY self_score DESC, time_elapsed ASC LIMIT 1
            """).fetchone()
            solvable_best = conn.execute("""
                SELECT self_score, seed, time_elapsed FROM game_history
                WHERE grid_type = 'solvable' AND gamemode IN ('single_player', 'vs_ai')
                ORDER BY self_score DESC, time_elapsed ASC LIMIT 1
            """).fetchone()
        if totals is None:
            return dict(_EMPTY_SUMMARY)
        return {
            "total_games": totals["total_games"],
            "total_time": int(totals["total_time"]),
            "vs_wins": vs["wins"],
            "vs_losses": vs["losses"],
            "vs_ties": vs["ties"],
            "random_best": random_best["self_score"] if random_best else None,
            "random_best_seed": random_best["seed"] if random_best else None,
            "random_best_time": random_best["time_elapsed"] if random_best else None,
            "solvable_best": solvable_best["self_score"] if solvable_best else None,
            "solvable_best_seed": solvable_best["seed"] if solvable_best else None,
            "solvable_best_time": solvable_best["time_elapsed"] if solvable_best else None,
        }

    def get_vs_stats(self) -> dict:
        with self._connect() as conn:
            row = conn.execute("""
                SELECT
                    SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END) AS wins,
                    SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END) AS losses,
                    SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END) AS ties
                FROM game_history
                WHERE gamemode = 'vs_ai'
            """).fetchone()
        if row is None:
            return {"wins": 0, "losses": 0, "ties": 0}
        return {"wins": row["wins"] or 0, "losses": row["losses"] or 0, "ties": row["ties"] or 0}

    def get_history(self) -> list[dict]:
        with self._connect() as conn:
            rows = conn.execute("SELECT * FROM game_history ORDER BY rowid DESC").fetchall()
        return [dict(r) for r in rows]


_default_store: SqliteStatsStore | None = None


def get_default_stats_store() -> StatsStore:
    global _default_store
    if _default_store is None:
        _default_store = SqliteStatsStore()
    return _default_store
