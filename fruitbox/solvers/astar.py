"""A* search with remaining-cells heuristic."""

from __future__ import annotations

import heapq

from fruitbox.engine import apply_move, enumerate_moves
from fruitbox.models import GameState, Move
from fruitbox.solvers.base import Solver, SolverResult, reconstruct_path


def _heuristic(state: GameState) -> float:
    """Admissible lower bound: at least one move per remaining cell group."""
    remaining = state.remaining_cells()
    if remaining == 0:
        return 0.0
    return float(remaining / 10)


class AStarSolver(Solver):
    name = "astar"
    description = "A* — prioritizes fewer remaining cells; optimal when found."

    def solve(self, state: GameState, max_nodes: int = 500_000) -> SolverResult | None:
        start_key = state.key()
        if state.is_won():
            return SolverResult(moves=[], nodes_expanded=0, max_frontier=1)

        g_score: dict[tuple, int] = {start_key: 0}
        heap: list[tuple[float, int, tuple, GameState]] = []
        counter = 0
        heapq.heappush(heap, (_heuristic(state), counter, start_key, state))
        visited: set[tuple] = set()
        came_from: dict[tuple, tuple[tuple, Move]] = {}
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
            g = g_score[key]
            for move in enumerate_moves(current):
                nxt = apply_move(current, move)
                if nxt is None:
                    continue
                nxt_key = nxt.key()
                ng = g + 1
                if nxt_key in g_score and ng >= g_score[nxt_key]:
                    continue
                g_score[nxt_key] = ng
                came_from[nxt_key] = (key, move)
                counter += 1
                heapq.heappush(heap, (ng + _heuristic(nxt), counter, nxt_key, nxt))
                max_frontier = max(max_frontier, len(heap))
        return None
