"""Fruitbox CLI — serve web app or solve levels from the terminal."""

from __future__ import annotations

import json

import typer

from fruitbox.engine import apply_moves
from fruitbox.levels import list_level_ids, load_level
from fruitbox.models import GameState
from fruitbox.solvers import SOLVERS

app = typer.Typer(help="Fruitbox puzzle engine")


@app.command()
def serve(
    host: str = typer.Option("127.0.0.1", help="Bind host"),
    port: int = typer.Option(8877, help="Bind port"),
    reload: bool = typer.Option(False, help="Auto-reload on code changes"),
) -> None:
    """Run the fruitbox PWA dev server."""
    from fruitbox.serve import run

    typer.echo(f"Fruitbox at http://{host}:{port}")
    run(host=host, port=port, reload=reload)


@app.command("list-levels")
def list_levels_cmd() -> None:
    """List built-in level ids."""
    for level_id in list_level_ids():
        level = load_level(level_id)
        typer.echo(f"{level.id}\t{level.name}")


@app.command()
def solve(
    level_id: str = typer.Argument(..., help="Level id"),
    solver: str = typer.Option("bfs", help="Solver name"),
    max_nodes: int = typer.Option(500_000, help="Search node budget"),
    json_output: bool = typer.Option(False, "--json", help="Emit JSON result"),
) -> None:
    """Solve a level with the chosen algorithm."""
    engine = SOLVERS.get(solver)
    if engine is None:
        typer.echo(f"unknown solver: {solver}. choices: {', '.join(SOLVERS)}", err=True)
        raise typer.Exit(1)
    level = load_level(level_id)
    state = GameState.from_level(level)
    result = engine.solve(state, max_nodes=max_nodes)
    if result is None:
        typer.echo("unsolved within node budget", err=True)
        raise typer.Exit(2)
    moves = [m.value for m in result.moves]
    if json_output:
        typer.echo(
            json.dumps(
                {
                    "level_id": level_id,
                    "solver": solver,
                    "moves": moves,
                    "nodes_expanded": result.nodes_expanded,
                    "max_frontier": result.max_frontier,
                }
            )
        )
        return
    typer.echo(f"solver={solver} moves={len(moves)} nodes={result.nodes_expanded}")
    typer.echo(" ".join(moves))
    final = apply_moves(state, result.moves)
    if final is None or not final.is_won():
        typer.echo("warning: solution did not reach win state", err=True)
        raise typer.Exit(3)


if __name__ == "__main__":
    app()
