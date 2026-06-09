"""Breadth-first search solver."""

from __future__ import annotations

from fruitbox.models import GameState
from fruitbox.solvers.base import Solver, SolverResult, breadth_first_search


class BfsSolver(Solver):
    name = "bfs"
    description = "Breadth-first search — optimal move count, higher memory."

    def solve(self, state: GameState, max_nodes: int = 500_000) -> SolverResult | None:
        return breadth_first_search(state, max_nodes, pop_index=0)
