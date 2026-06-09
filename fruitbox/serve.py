"""FastAPI server for fruitbox web app and solver API."""

from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from fruitbox.engine import apply_move, enumerate_moves
from fruitbox.levels import list_level_ids, load_level
from fruitbox.models import GameState, Level, Move, MoveKind
from fruitbox.solvers import SOLVERS

STATIC_DIR = Path(__file__).parent / "static"


class LevelSummary(BaseModel):
    id: str
    name: str


class StateResponse(BaseModel):
    level_id: str
    width: int
    height: int
    grid: list[list[int]]
    remaining: int
    won: bool
    legal_moves: int


class MoveRequest(BaseModel):
    kind: MoveKind
    r0: int
    c0: int
    r1: int
    c1: int


class SolveRequest(BaseModel):
    level_id: str
    solver: str = "bfs"
    max_nodes: int = Field(default=500_000, ge=1, le=2_000_000)


class SolveMoveResponse(BaseModel):
    kind: str
    r0: int
    c0: int
    r1: int
    c1: int


class SolveResponse(BaseModel):
    solver: str
    solved: bool
    moves: list[SolveMoveResponse]
    nodes_expanded: int
    max_frontier: int


class SolverInfo(BaseModel):
    name: str
    description: str


def _state_response(state: GameState) -> StateResponse:
    return StateResponse(
        level_id=state.level_id,
        width=state.width,
        height=state.height,
        grid=[list(row) for row in state.grid],
        remaining=state.remaining_cells(),
        won=state.is_won(),
        legal_moves=len(enumerate_moves(state)),
    )


def create_app() -> FastAPI:
    app = FastAPI(title="Fruitbox", description="10-sum rectangle puzzle engine and solver playground")
    sessions: dict[str, GameState] = {}

    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/api/solvers", response_model=list[SolverInfo])
    def list_solvers() -> list[SolverInfo]:
        return [SolverInfo(name=s.name, description=s.description) for s in SOLVERS.values()]

    @app.get("/api/levels", response_model=list[LevelSummary])
    def levels() -> list[LevelSummary]:
        return [
            LevelSummary(id=load_level(level_id).id, name=load_level(level_id).name)
            for level_id in list_level_ids()
        ]

    @app.get("/api/levels/{level_id}", response_model=Level)
    def get_level(level_id: str) -> Level:
        try:
            return load_level(level_id)
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc

    @app.post("/api/sessions/{level_id}", response_model=StateResponse)
    def new_session(level_id: str) -> StateResponse:
        try:
            level = load_level(level_id)
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        state = GameState.from_level(level)
        sessions[level_id] = state
        return _state_response(state)

    @app.get("/api/sessions/{level_id}", response_model=StateResponse)
    def get_session(level_id: str) -> StateResponse:
        state = sessions.get(level_id)
        if state is None:
            raise HTTPException(status_code=404, detail="session not found; POST to create")
        return _state_response(state)

    @app.post("/api/sessions/{level_id}/move", response_model=StateResponse)
    def move(level_id: str, body: MoveRequest) -> StateResponse:
        state = sessions.get(level_id)
        if state is None:
            raise HTTPException(status_code=404, detail="session not found")
        game_move = Move(kind=body.kind, r0=body.r0, c0=body.c0, r1=body.r1, c1=body.c1)
        nxt = apply_move(state, game_move)
        if nxt is None:
            raise HTTPException(status_code=400, detail="illegal move")
        sessions[level_id] = nxt
        return _state_response(nxt)

    @app.post("/api/sessions/{level_id}/reset", response_model=StateResponse)
    def reset(level_id: str) -> StateResponse:
        try:
            level = load_level(level_id)
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        state = GameState.from_level(level)
        sessions[level_id] = state
        return _state_response(state)

    @app.post("/api/solve", response_model=SolveResponse)
    def solve(body: SolveRequest) -> SolveResponse:
        solver = SOLVERS.get(body.solver)
        if solver is None:
            raise HTTPException(status_code=400, detail=f"unknown solver: {body.solver}")
        try:
            level = load_level(body.level_id)
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        state = GameState.from_level(level)
        result = solver.solve(state, max_nodes=body.max_nodes)
        if result is None:
            return SolveResponse(
                solver=body.solver,
                solved=False,
                moves=[],
                nodes_expanded=body.max_nodes,
                max_frontier=0,
            )
        return SolveResponse(
            solver=body.solver,
            solved=True,
            moves=[
                SolveMoveResponse(
                    kind=m.kind.value,
                    r0=m.r0,
                    c0=m.c0,
                    r1=m.r1,
                    c1=m.c1,
                )
                for m in result.moves
            ],
            nodes_expanded=result.nodes_expanded,
            max_frontier=result.max_frontier,
        )

    @app.get("/manifest.json")
    def manifest() -> FileResponse:
        return FileResponse(STATIC_DIR / "manifest.json", media_type="application/manifest+json")

    @app.get("/sw.js")
    def service_worker() -> FileResponse:
        return FileResponse(STATIC_DIR / "sw.js", media_type="application/javascript")

    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
    return app


def run(host: str = "127.0.0.1", port: int = 8877, reload: bool = False) -> None:
    import uvicorn

    uvicorn.run("fruitbox.serve:create_app", factory=True, host=host, port=port, reload=reload)
