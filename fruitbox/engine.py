"""Move validation, enumeration, and win detection."""

from __future__ import annotations

from fruitbox.models import GameState, Move, MoveKind


def _in_bounds(state: GameState, row: int, col: int) -> bool:
    return 0 <= row < state.height and 0 <= col < state.width


def rectangle_sum(state: GameState, r0: int, c0: int, r1: int, c1: int) -> int:
    top, bottom = min(r0, r1), max(r0, r1)
    left, right = min(c0, c1), max(c0, c1)
    total = 0
    for row in range(top, bottom + 1):
        for col in range(left, right + 1):
            total += state.value_at(row, col)
    return total


def rectangle_cells(state: GameState, r0: int, c0: int, r1: int, c1: int) -> list[tuple[int, int]]:
    top, bottom = min(r0, r1), max(r0, r1)
    left, right = min(c0, c1), max(c0, c1)
    return [(row, col) for row in range(top, bottom + 1) for col in range(left, right + 1)]


def is_adjacent(r0: int, c0: int, r1: int, c1: int) -> bool:
    return (r0 == r1 and abs(c0 - c1) == 1) or (c0 == c1 and abs(r0 - r1) == 1)


def is_valid_rectangle(state: GameState, r0: int, c0: int, r1: int, c1: int) -> bool:
    cells = rectangle_cells(state, r0, c0, r1, c1)
    if len(cells) < 2:
        return False
    if any(state.value_at(row, col) == 0 for row, col in cells):
        return False
    return rectangle_sum(state, r0, c0, r1, c1) == 10


def is_valid_pair(state: GameState, r0: int, c0: int, r1: int, c1: int) -> bool:
    if not is_adjacent(r0, c0, r1, c1):
        return False
    v0 = state.value_at(r0, c0)
    v1 = state.value_at(r1, c1)
    if v0 == 0 or v1 == 0:
        return False
    return v0 + v1 == 10


def enumerate_moves(state: GameState) -> list[Move]:
    moves: list[Move] = []
    seen: set[tuple[str, int, int, int, int]] = set()

    for r0 in range(state.height):
        for c0 in range(state.width):
            if state.value_at(r0, c0) == 0:
                continue
            for r1 in range(r0, state.height):
                c_start = c0 if r1 == r0 else 0
                for c1 in range(c_start, state.width):
                    if r1 == r0 and c1 < c0:
                        continue
                    if not is_valid_rectangle(state, r0, c0, r1, c1):
                        continue
                    move = Move(kind=MoveKind.RECTANGLE, r0=r0, c0=c0, r1=r1, c1=c1).normalized()
                    key = move.key()
                    if key not in seen:
                        seen.add(key)
                        moves.append(move)

    for r0 in range(state.height):
        for c0 in range(state.width):
            if state.value_at(r0, c0) == 0:
                continue
            for dr, dc in ((0, 1), (1, 0)):
                r1, c1 = r0 + dr, c0 + dc
                if not _in_bounds(state, r1, c1):
                    continue
                if not is_valid_pair(state, r0, c0, r1, c1):
                    continue
                move = Move(kind=MoveKind.PAIR, r0=r0, c0=c0, r1=r1, c1=c1).normalized()
                key = move.key()
                if key not in seen:
                    seen.add(key)
                    moves.append(move)

    return moves


def apply_move(state: GameState, move: Move) -> GameState | None:
    move = move.normalized()
    if move.kind is MoveKind.RECTANGLE:
        if not is_valid_rectangle(state, move.r0, move.c0, move.r1, move.c1):
            return None
        cells = rectangle_cells(state, move.r0, move.c0, move.r1, move.c1)
    else:
        if not is_valid_pair(state, move.r0, move.c0, move.r1, move.c1):
            return None
        cells = [(move.r0, move.c0), (move.r1, move.c1)]

    new_rows: list[list[int]] = [list(row) for row in state.grid]
    for row, col in cells:
        new_rows[row][col] = 0
    return state.model_copy(update={"grid": tuple(tuple(row) for row in new_rows)})


def apply_moves(state: GameState, moves: list[Move]) -> GameState | None:
    current = state
    for move in moves:
        nxt = apply_move(current, move)
        if nxt is None:
            return None
        current = nxt
    return current


def cells_cleared(move: Move) -> int:
    move = move.normalized()
    if move.kind is MoveKind.PAIR:
        return 2
    return (move.r1 - move.r0 + 1) * (move.c1 - move.c0 + 1)
