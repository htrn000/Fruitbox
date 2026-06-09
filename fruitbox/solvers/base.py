"""Solver protocol and shared search utilities."""

from __future__ import annotations

from abc import ABC, abstractmethod
from collections import deque
from dataclasses import dataclass

from fruitbox.engine import apply_move
from fruitbox.models import Direction, GameState

DIRECTIONS: tuple[Direction, ...] = (
    Direction.UP,
    Direction.DOWN,
    Direction.LEFT,
    Direction.RIGHT,
)


@dataclass(frozen=True)
class SolverResult:
    moves: list[Direction]
    nodes_expanded: int
    max_frontier: int


class Solver(ABC):
    name: str
    description: str

    @abstractmethod
    def solve(self, state: GameState, max_nodes: int = 500_000) -> SolverResult | None:
        """Return a move sequence that wins, or None if unsolved within budget."""


def reconstruct_path(
    came_from: dict[tuple, tuple[tuple, Direction]],
    start_key: tuple,
    goal_key: tuple,
) -> list[Direction]:
    moves: list[Direction] = []
    current = goal_key
    while current != start_key:
        prev, move = came_from[current]
        moves.append(move)
        current = prev
    moves.reverse()
    return moves


def breadth_first_search(
    state: GameState,
    max_nodes: int,
    *,
    pop_index: int = 0,
    priority_fn=None,
) -> SolverResult | None:
    """Generic graph search; BFS uses pop_index=0, DFS uses -1."""
    start_key = state.key()
    if state.is_won():
        return SolverResult(moves=[], nodes_expanded=0, max_frontier=1)

    frontier: deque[tuple[tuple, GameState]] = deque([(start_key, state)])
    if priority_fn is not None:
        import heapq

        heap: list[tuple[float, int, tuple, GameState]] = []
        counter = 0
        heapq.heappush(heap, (priority_fn(state, 0), counter, start_key, state))
        frontier = None  # type: ignore[assignment]
    else:
        heap = None
        counter = 0

    visited: set[tuple] = {start_key}
    came_from: dict[tuple, tuple[tuple, Direction]] = {}
    nodes_expanded = 0
    max_frontier = 1

    while True:
        if heap is not None:
            if not heap:
                return None
            _, _, key, current = heapq.heappop(heap)
        else:
            if not frontier:
                return None
            key, current = frontier.pop() if pop_index == -1 else frontier.popleft()

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
            visited.add(nxt_key)
            came_from[nxt_key] = (key, direction)
            if heap is not None:
                counter += 1
                heapq.heappush(heap, (priority_fn(nxt, counter), counter, nxt_key, nxt))
                max_frontier = max(max_frontier, len(heap))
            else:
                if pop_index == -1:
                    frontier.append((nxt_key, nxt))
                else:
                    frontier.append((nxt_key, nxt))
                max_frontier = max(max_frontier, len(frontier))
