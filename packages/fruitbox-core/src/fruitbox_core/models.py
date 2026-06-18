from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class GameInfo:
    gamemode: str
    grid_type: str
    self_score: int
    seed: int
    time_elapsed: float
    opp_score: int | None = None
