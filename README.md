# Fruitbox

Grid-based box-pushing puzzle engine (Sokoban-style) with pluggable solvers and a mobile-friendly PWA web app.

## Quick start

From the depot workspace root:

```bash
uv sync --package fruitbox
uv run --package fruitbox fruitbox serve
```

Open http://127.0.0.1:8877 — swipe or use arrow keys to play.

## CLI

```bash
# List levels
uv run --package fruitbox fruitbox list-levels

# Solve from terminal
uv run --package fruitbox fruitbox solve tutorial --solver astar
```

## Solvers

| Name | Description |
|------|-------------|
| `bfs` | Breadth-first — optimal move count |
| `dfs` | Depth-first — low memory |
| `astar` | A* with Manhattan heuristic |
| `greedy` | Greedy best-first — fast, not guaranteed |

## PWA / offline

- `manifest.json` + `sw.js` enable install and shell caching.
- Static assets (HTML, CSS, JS) work offline after first visit.
- Solver API requires network; interactive play falls back to client-side move logic when offline.

## Tests

```bash
uv run --package fruitbox pytest workspaces/fruitbox/tests -q
```

## Layout

```
workspaces/fruitbox/
  fruitbox/
    engine.py      # move validation
    models.py      # Level, GameState
    solvers/       # bfs, dfs, astar, greedy
    serve.py       # FastAPI + static PWA
    static/        # web UI
    data/levels/   # sample JSON levels
```
