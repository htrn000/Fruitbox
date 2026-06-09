"""Pluggable solvers for fruitbox puzzles."""

from fruitbox.solvers.astar import AStarSolver
from fruitbox.solvers.base import Solver, SolverResult
from fruitbox.solvers.bfs import BfsSolver
from fruitbox.solvers.dfs import DfsSolver
from fruitbox.solvers.greedy import GreedySolver

SOLVERS: dict[str, Solver] = {
    "bfs": BfsSolver(),
    "dfs": DfsSolver(),
    "astar": AStarSolver(),
    "greedy": GreedySolver(),
}

__all__ = [
    "AStarSolver",
    "BfsSolver",
    "DfsSolver",
    "GreedySolver",
    "Solver",
    "SolverResult",
    "SOLVERS",
]
