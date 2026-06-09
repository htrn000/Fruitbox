import pytest

from fruitbox.levels import load_level
from fruitbox.models import GameState
from fruitbox.solvers import SOLVERS


@pytest.mark.parametrize("solver_name", list(SOLVERS))
def test_solvers_solve_tutorial(solver_name: str) -> None:
    state = GameState.from_level(load_level("tutorial"))
    solver = SOLVERS[solver_name]
    result = solver.solve(state, max_nodes=50_000)
    assert result is not None
    assert result.moves
    current = state
    from fruitbox.engine import apply_move

    for move in result.moves:
        nxt = apply_move(current, move)
        assert nxt is not None
        current = nxt
    assert current.is_won()


@pytest.mark.parametrize("solver_name", ["bfs", "astar"])
def test_optimal_solvers_solve_corner(solver_name: str) -> None:
    state = GameState.from_level(load_level("corner"))
    result = SOLVERS[solver_name].solve(state)
    assert result is not None
    assert result.moves
