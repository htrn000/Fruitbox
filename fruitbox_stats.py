import sqlite3
import uuid
import os
from dataclasses import dataclass

_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fruitbox_stats.db")


@dataclass(frozen=True, slots=True)
class GameInfo:
    gamemode:     str
    grid_type:    str
    self_score:   int
    seed:         int
    time_elapsed: float
    opp_score:    int | None = None


def _connect():
    conn = sqlite3.connect(_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("""
        CREATE TABLE IF NOT EXISTS game_history (
            game_id      TEXT PRIMARY KEY,
            gamemode     TEXT,
            grid_type    TEXT,
            self_score   INTEGER,
            opp_score    INTEGER,
            time_elapsed REAL,
            seed         INTEGER
        )
    """)
    conn.commit()
    return conn


def record(info: GameInfo):
    game_id = str(uuid.uuid4())
    with _connect() as conn:
        conn.execute(
            "INSERT INTO game_history VALUES (?, ?, ?, ?, ?, ?, ?)",
            (game_id, info.gamemode, info.grid_type, info.self_score,
             info.opp_score, round(info.time_elapsed), info.seed),
        )
    return game_id


def get_vs_stats():
    with _connect() as conn:
        row = conn.execute("""
            SELECT
                SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END) AS wins,
                SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END) AS losses,
                SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END) AS ties
            FROM game_history
            WHERE gamemode = 'vs_ai'
        """).fetchone()
    return {"wins": row["wins"] or 0, "losses": row["losses"] or 0, "ties": row["ties"] or 0}


def get_history():
    with _connect() as conn:
        rows = conn.execute("SELECT * FROM game_history ORDER BY rowid DESC").fetchall()
    return [dict(r) for r in rows]
