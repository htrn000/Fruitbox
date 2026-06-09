import pytest

from fruitbox.engine import apply_move
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
    for move in result.moves:
        nxt = apply_move(current, move)
        assert nxt is not None
        current = nxt
    assert current.is_won()


@pytest.mark.parametrize("solver_name", ["bfs", "astar"])
def test_optimal_solvers_solve_mixed(solver_name: str) -> None:
    state = GameState.from_level(load_level("mixed"))
    result = SOLVERS[solver_name].solve(state, max_nodes=200_000)
    assert result is not None
    assert result.moves
