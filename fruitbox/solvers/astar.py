"""A* search with Manhattan heuristic."""

from __future__ import annotations

import heapq

from fruitbox.engine import apply_move
from fruitbox.models import GameState
from fruitbox.solvers.base import DIRECTIONS, Solver, SolverResult, reconstruct_path


def _manhattan(a: tuple[int, int], b: tuple[int, int]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def _heuristic(state: GameState) -> float:
    boxes = list(state.boxes)
    goals = list(state.goals)
    if not boxes:
        return 0.0
    total = 0
    for box in boxes:
        dists = sorted(_manhattan(box, g) for g in goals)
        total += dists[0] if dists else 0
    return float(total)


class AStarSolver(Solver):
    name = "astar"
    description = "A* with Manhattan box-to-goal heuristic."

    def solve(self, state: GameState, max_nodes: int = 500_000) -> SolverResult | None:
        start_key = state.key()
        if state.is_won():
            return SolverResult(moves=[], nodes_expanded=0, max_frontier=1)

        g_score: dict[tuple, int] = {start_key: 0}
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
            g = g_score[key]
            for direction in DIRECTIONS:
                nxt = apply_move(current, direction)
                if nxt is None:
                    continue
                nxt_key = nxt.key()
                ng = g + 1
                if nxt_key in g_score and ng >= g_score[nxt_key]:
                    continue
                g_score[nxt_key] = ng
                came_from[nxt_key] = (key, direction)
                counter += 1
                heapq.heappush(heap, (ng + _heuristic(nxt), counter, nxt_key, nxt))
                max_frontier = max(max_frontier, len(heap))
        return None
