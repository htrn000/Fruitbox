import { callPyMethod, gridToJs, type PyodideRuntime, type PyProxy } from "./loader";

export interface CoreGameOptions {
  rows?: number;
  columns?: number;
  timeLimit?: number;
  gridType?: string;
}

export class CoreGame {
  readonly py: PyProxy;

  private constructor(_runtime: PyodideRuntime, pyGame: PyProxy) {
    this.py = pyGame;
  }

  static create(runtime: PyodideRuntime, opts: CoreGameOptions = {}): CoreGame {
    const mod = runtime.pyimport("fruitbox_core.game");
    const FruitBoxGame = mod.FruitBoxGame as new (opts?: Record<string, unknown>) => PyProxy;
    const pyGame = new FruitBoxGame({
      rows: opts.rows ?? 10,
      columns: opts.columns ?? 17,
      time_limit: opts.timeLimit ?? 120,
      grid_type: opts.gridType ?? "random",
    });
    return new CoreGame(runtime, pyGame);
  }

  static fromProxy(runtime: PyodideRuntime, pyGame: PyProxy): CoreGame {
    return new CoreGame(runtime, pyGame);
  }

  syncGridFrom(other: CoreGame): void {
    const grid = other.py.grid as PyProxy;
    const copy = callPyMethod<PyProxy>(grid, "copy");
    this.py.grid = copy;
    this.py.seed = other.py.seed;
  }

  get rows(): number {
    return this.py.rows as number;
  }

  get columns(): number {
    return this.py.columns as number;
  }

  get score(): number {
    return this.py.score as number;
  }

  get seed(): number {
    return this.py.seed as number;
  }

  get gridType(): string {
    return this.py.grid_type as string;
  }

  get timeLimit(): number {
    return this.py.time_limit as number;
  }

  get paused(): boolean {
    return this.py.paused as boolean;
  }

  get timeRemaining(): number {
    return this.py.time_remaining as number;
  }

  reset(seed?: number | null): number[][] {
    callPyMethod(this.py, "reset", seed ?? null);
    return this.grid();
  }

  tick(dt: number): boolean {
    return callPyMethod<boolean>(this.py, "tick", dt);
  }

  togglePause(): void {
    callPyMethod(this.py, "toggle_pause");
  }

  pause(): void {
    callPyMethod(this.py, "pause");
  }

  resume(): void {
    callPyMethod(this.py, "resume");
  }

  validateMove(r1: number, c1: number, r2: number, c2: number): boolean {
    return callPyMethod<boolean>(this.py, "validate_move", r1, c1, r2, c2);
  }

  applyMove(r1: number, c1: number, r2: number, c2: number): { points: number; done: boolean } {
    const result = callPyMethod<PyProxy | [number, boolean]>(this.py, "apply_move", r1, c1, r2, c2);
    if (Array.isArray(result)) {
      return { points: result[0], done: result[1] };
    }
    const tuple = result.toJs?.({ create_proxies: false }) as [number, boolean];
    return { points: tuple[0], done: tuple[1] };
  }

  grid(): number[][] {
    return gridToJs(this.py.grid as PyProxy, this.rows, this.columns);
  }

  syncElapsed(seconds: number): void {
    this.py.elapsed = seconds;
  }

  destroy(): void {
    this.py.destroy?.();
  }
}
