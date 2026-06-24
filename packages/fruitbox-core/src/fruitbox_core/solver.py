import sys
import time

from .board_viz import BoardVizMeta, VizMode, build_solver_trace_meta

ROWS = 10
COLS = 17
TIMEOUT = 45

_start    = time.time()
_cache    = set()
_moves    = []
_best     = {'score': 0, 'moves': [], 'grid': None}
_timed_out = False


def _hash(grid):
    h = 0
    for row in grid:
        for v in row:
            h = h * 33 + v + 1
    return h % (1 << 64)


def _print_solution(sol):
    parts = [f"({m[1]},{m[2]},{m[3]},{m[4]})" for m in sol['moves']]
    print(f"{sol['score']}: {' -> '.join(parts)}")


def _search(grid, score):
    global _best, _timed_out

    if _timed_out:
        return
    if time.time() - _start > TIMEOUT:
        _timed_out = True
        return

    h = _hash(grid)
    if h in _cache:
        return
    _cache.add(h)

    if score > _best['score']:
        _best = {'score': score, 'moves': list(_moves), 'grid': [r[:] for r in grid]}

    # column prefix sums: csum[r][c] = sum of grid[0..r-1][c]
    csum = [[0] * COLS for _ in range(ROWS + 1)]
    for r in range(ROWS):
        for c in range(COLS):
            csum[r + 1][c] = csum[r][c] + grid[r][c]

    INF = 256
    top4 = [(INF, 0, 0, 0, 0)] * 4

    for r0 in range(ROWS):
        for r1 in range(r0, ROWS):
            s  = 0
            c1 = -1
            for c0 in range(COLS):
                # extend right until sum >= 10
                while c1 < COLS - 1 and s < 10:
                    c1 += 1
                    s += csum[r1 + 1][c1] - csum[r0][c1]

                if s == 10:
                    cleared = sum(
                        grid[r][c] != 0
                        for r in range(r0, r1 + 1)
                        for c in range(c0, c1 + 1)
                    )
                    mv = (cleared, r0, c0, r1, c1)
                    # keep top 4 by fewest cells cleared (ascending)
                    if   cleared < top4[0][0]: top4 = [mv, top4[0], top4[1], top4[2]]
                    elif cleared < top4[1][0]: top4 = [top4[0], mv, top4[1], top4[2]]
                    elif cleared < top4[2][0]: top4 = [top4[0], top4[1], mv, top4[2]]
                    elif cleared < top4[3][0]: top4 = [top4[0], top4[1], top4[2], mv]

                # shrink left
                s -= csum[r1 + 1][c0] - csum[r0][c0]

    for m in top4:
        if m[0] == INF:
            break
        cleared, r0, c0, r1, c1 = m

        ngrid = [r[:] for r in grid]
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1):
                ngrid[r][c] = 0

        _moves.append(m)
        _search(ngrid, score + cleared)
        _moves.pop()


def solve(grid):
    """Solve a 10×17 grid (values 1-9, 0 for cleared). Returns the best solution found."""
    global _cache, _moves, _best, _start, _timed_out
    _cache     = set()
    _moves     = []
    _best      = {'score': 0, 'moves': [], 'grid': None}
    _start     = time.time()
    _timed_out = False
    _search([list(row) for row in grid], 0)
    elapsed = time.time() - _start
    return _best, elapsed


def _grid_dims(grid):
    rows = len(grid)
    cols = len(grid[0]) if rows else 0
    return rows, cols


def _active_components(grid, rows, cols):
    seen = [[False] * cols for _ in range(rows)]
    components = 0
    for r in range(rows):
        for c in range(cols):
            if seen[r][c] or grid[r][c] == 0:
                continue
            components += 1
            stack = [(r, c)]
            seen[r][c] = True
            while stack:
                cr, cc = stack.pop()
                for nr, nc in ((cr - 1, cc), (cr + 1, cc), (cr, cc - 1), (cr, cc + 1)):
                    if (
                        0 <= nr < rows
                        and 0 <= nc < cols
                        and not seen[nr][nc]
                        and grid[nr][nc] != 0
                    ):
                        seen[nr][nc] = True
                        stack.append((nr, nc))
    return components


def _assign_trace_depths(initial_grid, moves):
    rows, cols = _grid_dims(initial_grid)
    work = [list(row) for row in initial_grid]
    stack_depth = 0
    components = _active_components(work, rows, cols)
    cell_depth = {}
    cell_tuple = {}
    tuple_id = 0

    for cleared, r0, c0, r1, c1 in moves:
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1):
                cell_depth[(r, c)] = stack_depth
                cell_tuple[(r, c)] = tuple_id
        tuple_id += 1

        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1):
                work[r][c] = 0

        new_components = _active_components(work, rows, cols)
        if new_components > components:
            stack_depth += 1
            components = new_components

    depths = list(cell_depth.values())
    stats = (len(set(depths)), max(depths) if depths else 0)
    return cell_depth, cell_tuple, stats


def _valid_moves(grid, rows, cols):
    csum = [[0] * cols for _ in range(rows + 1)]
    for r in range(rows):
        for c in range(cols):
            csum[r + 1][c] = csum[r][c] + grid[r][c]

    moves = []
    for r0 in range(rows):
        for r1 in range(r0, rows):
            s = 0
            c1 = -1
            for c0 in range(cols):
                while c1 < cols - 1 and s < 10:
                    c1 += 1
                    s += csum[r1 + 1][c1] - csum[r0][c1]

                if s == 10:
                    cleared = sum(
                        grid[r][c] != 0
                        for r in range(r0, r1 + 1)
                        for c in range(c0, c1 + 1)
                    )
                    if cleared:
                        moves.append((cleared, r0, c0, r1, c1))

                s -= csum[r1 + 1][c0] - csum[r0][c0]
    return moves


def find_best_solver_trace(grid, *, timeout=TIMEOUT):
    """Find a complete solve trace minimizing distinct depth levels."""
    rows, cols = _grid_dims(grid)
    solver_grid = [[0 if v == -1 else v for v in row] for row in grid]
    total_cells = sum(v != 0 for row in solver_grid for v in row)
    if total_cells == 0:
        return BoardVizMeta()

    start = time.time()
    timed_out = False

    def out_of_time():
        nonlocal timed_out
        if time.time() - start > timeout:
            timed_out = True
            return True
        return False

    def h(g):
        hh = 0
        for row in g:
            for v in row:
                hh = hh * 33 + v + 1
        return hh % (1 << 64)

    best = {"stats": (10**9, 10**9), "moves": None}

    sol = _solve_grid(solver_grid, rows, cols, timeout=min(timeout * 0.4, 20.0))
    if sol["score"] == total_cells and sol["moves"]:
        _, _, stats = _assign_trace_depths(solver_grid, sol["moves"])
        best = {"stats": stats, "moves": list(sol["moves"])}

    reach: dict[tuple[int, int], bool] = {}

    def can_finish(g, score):
        if out_of_time():
            return False
        key = (h(g), score)
        cached = reach.get(key)
        if cached is not None:
            return cached
        if score == total_cells:
            reach[key] = True
            return True
        ok = False
        for mv in _valid_moves(g, rows, cols):
            cleared, r0, c0, r1, c1 = mv
            ngrid = [row[:] for row in g]
            for r in range(r0, r1 + 1):
                for c in range(c0, c1 + 1):
                    ngrid[r][c] = 0
            if can_finish(ngrid, score + cleared):
                ok = True
                break
        reach[key] = ok
        return ok

    if not can_finish(solver_grid, 0):
        if best["moves"] is None:
            return BoardVizMeta()
        cell_depth, cell_tuple, _ = _assign_trace_depths(solver_grid, best["moves"])
        return build_solver_trace_meta(cell_depth, cell_tuple)

    seen: set[int] = set()
    moves: list[tuple] = []

    def search(g, score):
        if out_of_time():
            return

        key = h(g)
        if key in seen:
            return
        seen.add(key)

        if score == total_cells:
            _, _, stats = _assign_trace_depths(solver_grid, moves)
            if stats < best["stats"]:
                best["stats"] = stats
                best["moves"] = list(moves)
            return

        for mv in sorted(_valid_moves(g, rows, cols), key=lambda m: -m[0]):
            cleared, r0, c0, r1, c1 = mv
            ngrid = [row[:] for row in g]
            for r in range(r0, r1 + 1):
                for c in range(c0, c1 + 1):
                    ngrid[r][c] = 0
            if not can_finish(ngrid, score + cleared):
                continue
            moves.append(mv)
            search(ngrid, score + cleared)
            moves.pop()

    search(solver_grid, 0)

    if best["moves"] is None:
        return BoardVizMeta()

    cell_depth, cell_tuple, _ = _assign_trace_depths(solver_grid, best["moves"])
    return build_solver_trace_meta(cell_depth, cell_tuple)


def _solve_grid(grid, rows, cols, *, timeout=TIMEOUT):
    start = time.time()
    cache: set[int] = set()
    moves: list[tuple] = []
    best = {"score": 0, "moves": [], "grid": None}

    def h(g):
        hh = 0
        for row in g:
            for v in row:
                hh = hh * 33 + v + 1
        return hh % (1 << 64)

    def search(g, score):
        if time.time() - start > timeout:
            return

        key = h(g)
        if key in cache:
            return
        cache.add(key)

        if score > best["score"]:
            best["score"] = score
            best["moves"] = list(moves)
            best["grid"] = [row[:] for row in g]

        csum = [[0] * cols for _ in range(rows + 1)]
        for r in range(rows):
            for c in range(cols):
                csum[r + 1][c] = csum[r][c] + g[r][c]

        INF = 256
        top4 = [(INF, 0, 0, 0, 0)] * 4

        for r0 in range(rows):
            for r1 in range(r0, rows):
                s = 0
                c1 = -1
                for c0 in range(cols):
                    while c1 < cols - 1 and s < 10:
                        c1 += 1
                        s += csum[r1 + 1][c1] - csum[r0][c1]

                    if s == 10:
                        cleared = sum(
                            g[r][c] != 0
                            for r in range(r0, r1 + 1)
                            for c in range(c0, c1 + 1)
                        )
                        mv = (cleared, r0, c0, r1, c1)
                        if cleared < top4[0][0]:
                            top4 = [mv, top4[0], top4[1], top4[2]]
                        elif cleared < top4[1][0]:
                            top4 = [top4[0], mv, top4[1], top4[2]]
                        elif cleared < top4[2][0]:
                            top4 = [top4[0], top4[1], mv, top4[2]]
                        elif cleared < top4[3][0]:
                            top4 = [top4[0], top4[1], top4[2], mv]

                    s -= csum[r1 + 1][c0] - csum[r0][c0]

        for m in top4:
            if m[0] == INF:
                break
            cleared, r0, c0, r1, c1 = m
            ngrid = [row[:] for row in g]
            for r in range(r0, r1 + 1):
                for c in range(c0, c1 + 1):
                    ngrid[r][c] = 0
            moves.append(m)
            search(ngrid, score + cleared)
            moves.pop()

    search([row[:] for row in grid], 0)
    return best


def main():
    grid = []
    for line in sys.stdin:
        row = list(map(int, line.split()))
        if row:
            grid.append(row)
        if len(grid) == ROWS:
            break

    sol, elapsed = solve(grid)
    _print_solution(sol)
    print(f"Time elapsed: {elapsed:.3f}s")


if __name__ == "__main__":
    main()

