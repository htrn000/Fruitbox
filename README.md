# Fruitbox

Mobile-style **10-sum rectangle puzzle**: select rectangular regions (or adjacent pairs) whose numbers add to exactly **10** to clear them. Includes pluggable solvers and a mobile-friendly PWA web app.

## Game rules

| Rule | Detail |
|------|--------|
| Grid | Rectangular 2D grid of integers **1–9**; cleared cells become **0** (empty) |
| Rectangle clear | Drag/select any contiguous rectangle; if **every cell is non-empty** and the **sum is exactly 10**, those cells clear |
| Pair clear | Tap two **orthogonally adjacent** non-empty cells whose values sum to **10** |
| Grid behavior | **Static** — cleared cells stay empty; no column collapse or refill |
| Win | Board is completely empty **or** no legal rectangle/pair moves remain |

This matches the common mobile “sum to 10” / “fruit box” variant where you draw boxes over number groups.

## Quick start

From the depot workspace root:

```bash
uv sync --package fruitbox --group dev
uv run --package fruitbox fruitbox serve
```

Open http://127.0.0.1:8877 — drag rectangles or tap adjacent pairs on touch devices.

## CLI

```bash
# List levels
uv run --package fruitbox fruitbox list-levels

# Solve from terminal
uv run --package fruitbox fruitbox solve tutorial --solver bfs
uv run --package fruitbox fruitbox solve mixed --solver astar --json
```

## Solvers

Each solver treats **legal rectangle and pair clears** as moves and searches for a sequence that reaches a win state.

| Name | Description |
|------|-------------|
| `bfs` | Breadth-first — fewest moves when a solution exists |
| `dfs` | Depth-first — low memory |
| `astar` | A* with remaining-cells heuristic |
| `greedy` | Greedy best-first — fast, not guaranteed |

## PWA / offline

- `manifest.json` + `sw.js` enable install and shell caching.
- Static assets (HTML, CSS, JS) work offline after first visit.
- Solver API requires network; interactive play falls back to client-side move logic when offline.

## Tests

```bash
uv sync --package fruitbox --group dev
uv run --package fruitbox --group dev pytest workspaces/fruitbox/tests -q
```

## Layout

```
workspaces/fruitbox/
  fruitbox/
    engine.py      # move validation, enumeration
    models.py      # Level, GameState, Move
    solvers/       # bfs, dfs, astar, greedy
    serve.py       # FastAPI + static PWA
    static/        # web UI
    data/levels/   # sample JSON number grids
```

## Level format

```json
{
  "id": "tutorial",
  "name": "Tutorial",
  "width": 4,
  "height": 4,
  "grid": [
    [1, 2, 3, 4],
    [7, 3, 0, 0],
    [1, 9, 0, 0],
    [0, 0, 0, 0]
  ]
}
```
