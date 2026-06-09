"""Greedy best-first search — fast but not guaranteed optimal."""

from __future__ import annotations

import heapq

from fruitbox.engine import apply_move
from fruitbox.models import GameState
from fruitbox.solvers.astar import _heuristic
from fruitbox.solvers.base import DIRECTIONS, Solver, SolverResult, reconstruct_path


class GreedySolver(Solver):
    name = "greedy"
    description = "Greedy best-first — prioritizes heuristic only, fast but incomplete."

    def solve(self, state: GameState, max_nodes: int = 500_000) -> SolverResult | None:
        start_key = state.key()
        if state.is_won():
            return SolverResult(moves=[], nodes_expanded=0, max_frontier=1)

        heap: list[tuple[float, int, tuple, GameState]] = []
        counter = 0
        heapq.heappush(heap, (_heuristic(state), counter, start_key, state))
        visited: set[tuple] = set()
        came_from: dict[tuple, tuple[tuple, object]] = {}
        nodes_expanded = 0
        max_frontier = 1

        while heap:
            _, _, key, current = heapq.heappop(heap)
            if key in visited:
                continue
            visited.add(key)
            nodes_expanded += 1
            if nodes_expanded > max_nodes:
                return None
            if current.is_won():
                return SolverResult(
                    moves=reconstruct_path(came_from, start_key, key),
                    nodes_expanded=nodes_expanded,
                    max_frontier=max_frontier,
                )
            for direction in DIRECTIONS:
                nxt = apply_move(current, direction)
                if nxt is None:
                    continue
                nxt_key = nxt.key()
                if nxt_key in visited:
                    continue
                came_from[nxt_key] = (key, direction)
                counter += 1
                heapq.heappush(heap, (_heuristic(nxt), counter, nxt_key, nxt))
                max_frontier = max(max_frontier, len(heap))
        return None
