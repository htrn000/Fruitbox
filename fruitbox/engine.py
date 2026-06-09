"""Move validation and win detection."""

from __future__ import annotations

from fruitbox.models import Direction, GameState


def apply_move(state: GameState, direction: Direction) -> GameState | None:
    """Return a new state after moving, or None if the move is illegal."""
    dx, dy = direction.delta
    px, py = state.player
    nx, ny = px + dx, py + dy
    next_pos = (nx, ny)

    if next_pos in state.boxes:
        beyond = (nx + dx, ny + dy)
        if not state.is_walkable(beyond):
            return None
        new_boxes = frozenset((state.boxes - {next_pos}) | {beyond})
        return state.model_copy(update={"player": next_pos, "boxes": new_boxes})

    if not state.is_walkable(next_pos):
        return None

    return state.model_copy(update={"player": next_pos})


def apply_moves(state: GameState, moves: list[Direction]) -> GameState | None:
    current = state
    for move in moves:
        nxt = apply_move(current, move)
        if nxt is None:
            return None
        current = nxt
    return current
