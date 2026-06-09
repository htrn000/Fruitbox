"""Core data models for fruitbox levels and game state."""

from __future__ import annotations

from enum import Enum
from typing import Self

from pydantic import BaseModel, Field, field_validator


class MoveKind(str, Enum):
    RECTANGLE = "rectangle"
    PAIR = "pair"


class Move(BaseModel):
    """A legal game action: clear a sum-10 rectangle or adjacent pair."""

    kind: MoveKind
    r0: int
    c0: int
    r1: int
    c1: int

    model_config = {"frozen": True}

    def normalized(self) -> Move:
        if self.kind is MoveKind.RECTANGLE:
            return Move(
                kind=self.kind,
                r0=min(self.r0, self.r1),
                c0=min(self.c0, self.c1),
                r1=max(self.r0, self.r1),
                c1=max(self.c0, self.c1),
            )
        r0, c0, r1, c1 = self.r0, self.c0, self.r1, self.c1
        if (r1, c1) < (r0, c0):
            r0, c0, r1, c1 = r1, c1, r0, c0
        return Move(kind=self.kind, r0=r0, c0=c0, r1=r1, c1=c1)

    def key(self) -> tuple[str, int, int, int, int]:
        n = self.normalized()
        return (n.kind.value, n.r0, n.c0, n.r1, n.c1)


class Level(BaseModel):
    id: str
    name: str
    width: int
    height: int
    grid: list[list[int]] = Field(min_length=1)

    @field_validator("grid")
    @classmethod
    def validate_grid(cls, grid: list[list[int]]) -> list[list[int]]:
        for row in grid:
            for value in row:
                if value < 0 or value > 9:
                    raise ValueError(f"cell values must be 0–9, got {value}")
        return grid

    def model_post_init(self, __context: object) -> None:
        if len(self.grid) != self.height:
            raise ValueError(f"expected {self.height} rows, got {len(self.grid)}")
        for row in self.grid:
            if len(row) != self.width:
                raise ValueError(f"row width mismatch: expected {self.width}, got {len(row)}")

    @classmethod
    def from_rows(cls, level_id: str, name: str, rows: list[str]) -> Self:
        """Parse digit rows (0 = empty)."""
        grid = [[int(ch) for ch in row] for row in rows]
        height = len(grid)
        width = max(len(row) for row in grid) if grid else 0
        padded = [row + [0] * (width - len(row)) for row in grid]
        return cls(id=level_id, name=name, width=width, height=height, grid=padded)

    def value_at(self, row: int, col: int) -> int:
        if row < 0 or col < 0 or row >= self.height or col >= self.width:
            raise IndexError(f"out of bounds: ({row}, {col})")
        return self.grid[row][col]


class GameState(BaseModel):
    """Immutable board snapshot for engine and solvers."""

    level_id: str
    width: int
    height: int
    grid: tuple[tuple[int, ...], ...]

    model_config = {"frozen": True}

    @classmethod
    def from_level(cls, level: Level) -> Self:
        frozen = tuple(tuple(row) for row in level.grid)
        return cls(
            level_id=level.id,
            width=level.width,
            height=level.height,
            grid=frozen,
        )

    def value_at(self, row: int, col: int) -> int:
        return self.grid[row][col]

    def remaining_cells(self) -> int:
        return sum(1 for row in self.grid for value in row if value != 0)

    def is_cleared(self) -> bool:
        return self.remaining_cells() == 0

    def is_won(self) -> bool:
        """Win when the board is empty or no legal moves remain."""
        if self.is_cleared():
            return True
        from fruitbox.engine import enumerate_moves

        return not enumerate_moves(self)

    def key(self) -> tuple[tuple[int, ...], ...]:
        return self.grid
