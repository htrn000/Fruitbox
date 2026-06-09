from fruitbox.engine import (
    apply_move,
    apply_moves,
    enumerate_moves,
    is_valid_pair,
    is_valid_rectangle,
    rectangle_sum,
)
from fruitbox.levels import load_level
from fruitbox.models import GameState, Move, MoveKind


def test_tutorial_not_won_initially() -> None:
    state = GameState.from_level(load_level("tutorial"))
    assert not state.is_won()
    assert state.remaining_cells() == 8


def test_rectangle_clear_top_row() -> None:
    state = GameState.from_level(load_level("tutorial"))
    move = Move(kind=MoveKind.RECTANGLE, r0=0, c0=0, r1=0, c1=3)
    assert is_valid_rectangle(state, 0, 0, 0, 3)
    assert rectangle_sum(state, 0, 0, 0, 3) == 10
    nxt = apply_move(state, move)
    assert nxt is not None
    assert nxt.value_at(0, 0) == 0
    assert nxt.remaining_cells() == 4


def test_pair_clear() -> None:
    state = GameState.from_level(load_level("tutorial"))
    state = apply_move(
        state,
        Move(kind=MoveKind.RECTANGLE, r0=0, c0=0, r1=0, c1=3),
    )
    assert state is not None
    assert is_valid_pair(state, 2, 0, 2, 1)
    final = apply_move(state, Move(kind=MoveKind.PAIR, r0=2, c0=0, r1=2, c1=1))
    assert final is not None
    assert is_valid_pair(final, 1, 0, 1, 1)
    won = apply_move(final, Move(kind=MoveKind.PAIR, r0=1, c0=0, r1=1, c1=1))
    assert won is not None
    assert won.is_won()


def test_invalid_rectangle_with_empty_cell() -> None:
    state = GameState.from_level(load_level("tutorial"))
    assert not is_valid_rectangle(state, 0, 0, 1, 1)


def test_enumerate_moves_nonempty() -> None:
    state = GameState.from_level(load_level("tutorial"))
    moves = enumerate_moves(state)
    assert moves
    kinds = {m.kind for m in moves}
    assert MoveKind.RECTANGLE in kinds
    assert MoveKind.PAIR in kinds
