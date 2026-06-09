"""Core data models for fruitbox levels and game state."""

from __future__ import annotations

from enum import Enum
from typing import Self

from pydantic import BaseModel, Field


class Direction(str, Enum):
    UP = "up"
    DOWN = "down"
    LEFT = "left"
    RIGHT = "right"

    @property
    def delta(self) -> tuple[int, int]:
        return _DELTAS[self]


_DELTAS: dict[Direction, tuple[int, int]] = {
    Direction.UP: (0, -1),
    Direction.DOWN: (0, 1),
    Direction.LEFT: (-1, 0),
    Direction.RIGHT: (1, 0),
}


class Cell(str, Enum):
    WALL = "#"
    FLOOR = " "
    GOAL = "."
    BOX = "$"
    PLAYER = "@"
    BOX_ON_GOAL = "*"
    PLAYER_ON_GOAL = "+"


class Level(BaseModel):
    id: str
    name: str
    width: int
    height: int
    tiles: list[str] = Field(min_length=1)

    def model_post_init(self, __context: object) -> None:
        if len(self.tiles) != self.height:
            raise ValueError(f"expected {self.height} tile rows, got {len(self.tiles)}")
        for row in self.tiles:
            if len(row) != self.width:
                raise ValueError(f"row width mismatch: expected {self.width}, got {len(row)}")

    @classmethod
    def from_ascii(cls, level_id: str, name: str, ascii_map: str) -> Self:
        rows = [line.rstrip("\n") for line in ascii_map.strip("\n").splitlines()]
        height = len(rows)
        width = max(len(row) for row in rows) if rows else 0
        padded = [row.ljust(width) for row in rows]
        return cls(id=level_id, name=name, width=width, height=height, tiles=padded)

    def cell_at(self, x: int, y: int) -> Cell | None:
        if x < 0 or y < 0 or x >= self.width or y >= self.height:
            return None
        ch = self.tiles[y][x]
        try:
            return Cell(ch)
        except ValueError:
            raise ValueError(f"invalid cell character {ch!r} at ({x}, {y})") from None


class GameState(BaseModel):
    """Mutable-free game snapshot for engine and solvers."""

    level_id: str
    width: int
    height: int
    walls: frozenset[tuple[int, int]]
    goals: frozenset[tuple[int, int]]
    boxes: frozenset[tuple[int, int]]
    player: tuple[int, int]

    model_config = {"frozen": True}

    @classmethod
    def from_level(cls, level: Level) -> Self:
        walls: set[tuple[int, int]] = set()
        goals: set[tuple[int, int]] = set()
        boxes: set[tuple[int, int]] = set()
        player: tuple[int, int] | None = None

        for y, row in enumerate(level.tiles):
            for x, ch in enumerate(row):
                cell = Cell(ch)
                pos = (x, y)
                if cell is Cell.WALL:
                    walls.add(pos)
                elif cell in (Cell.GOAL, Cell.BOX_ON_GOAL, Cell.PLAYER_ON_GOAL):
                    goals.add(pos)
                if cell in (Cell.BOX, Cell.BOX_ON_GOAL):
                    boxes.add(pos)
                if cell in (Cell.PLAYER, Cell.PLAYER_ON_GOAL):
                    if player is not None:
                        raise ValueError("level has multiple players")
                    player = pos

        if player is None:
            raise ValueError("level has no player")

        return cls(
            level_id=level.id,
            width=level.width,
            height=level.height,
            walls=frozenset(walls),
            goals=frozenset(goals),
            boxes=frozenset(boxes),
            player=player,
        )

    def is_won(self) -> bool:
        return self.boxes == self.goals

    def is_walkable(self, pos: tuple[int, int], ignore_boxes: bool = False) -> bool:
        x, y = pos
        if x < 0 or y < 0 or x >= self.width or y >= self.height:
            return False
        if pos in self.walls:
            return False
        if not ignore_boxes and pos in self.boxes:
            return False
        return True

    def key(self) -> tuple[tuple[int, int], frozenset[tuple[int, int]]]:
        """Hashable state key for search algorithms."""
        return (self.player, self.boxes)
