from fruitbox.engine import apply_move, apply_moves
from fruitbox.levels import load_level
from fruitbox.models import Direction, GameState


def test_tutorial_not_won_initially() -> None:
    state = GameState.from_level(load_level("tutorial"))
    assert not state.is_won()


def test_push_box_to_goal_wins() -> None:
    state = GameState.from_level(load_level("tutorial"))
    final = apply_move(state, Direction.DOWN)
    assert final is not None
    assert final.is_won()


def test_illegal_push_into_wall() -> None:
    state = GameState.from_level(load_level("tutorial"))
    # push box into right wall
    result = apply_move(state, Direction.RIGHT)
    assert result is None
