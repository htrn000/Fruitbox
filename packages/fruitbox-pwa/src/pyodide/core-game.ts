import { gridToJs, type PyodideRuntime, type PyProxy } from "./loader";

/** Python FruitBoxGame proxy — call methods directly on the proxy object. */
interface FruitBoxGamePy extends PyProxy {
  rows: number;
  columns: number;
  score: number;
  seed: number;
  grid_type: string;
  time_limit: number;
  paused: boolean;
  time_remaining: number;
  elapsed: number;
  grid: PyProxy;
  reset(seed?: number | null): unknown;
  tick(dt: number): boolean;
  toggle_pause(): void;
  pause(): void;
  resume(): void;
  validate_move(r1: number, c1: number, r2: number, c2: number): boolean;
  apply_move(r1: number, c1: number, r2: number, c2: number): PyProxy | [number, boolean];
}

export interface CoreGameOptions {
  rows?: number;
  columns?: number;
  timeLimit?: number;
  gridType?: string;
}

export class CoreGame {
  private readonly py: FruitBoxGamePy;

  private constructor(_runtime: PyodideRuntime, pyGame: PyProxy) {
    this.py = pyGame as FruitBoxGamePy;
  }

  static create(runtime: PyodideRuntime, opts: CoreGameOptions = {}): CoreGame {
    const mod = runtime.pyimport("fruitbox_core.game");
    const FruitBoxGame = mod.FruitBoxGame as (
      rows: number,
      columns: number,
      timeLimit: number,
      gridType: string,
    ) => PyProxy;
    const pyGame = FruitBoxGame(
      opts.rows ?? 10,
      opts.columns ?? 17,
      opts.timeLimit ?? 120,
      opts.gridType ?? "random",
    );
    return new CoreGame(runtime, pyGame);
  }

  static fromProxy(runtime: PyodideRuntime, pyGame: PyProxy): CoreGame {
    return new CoreGame(runtime, pyGame);
  }

  syncGridFrom(other: CoreGame): void {
    const grid = other.py.grid as PyProxy & { copy(): PyProxy };
    this.py.grid = grid.copy();
    this.py.seed = other.py.seed;
  }

  get rows(): number {
    return this.py.rows;
  }

  get columns(): number {
    return this.py.columns;
  }

  get score(): number {
    return this.py.score;
  }

  get seed(): number {
    return this.py.seed;
  }

  get gridType(): string {
    return this.py.grid_type;
  }

  get timeLimit(): number {
    return this.py.time_limit;
  }

  get paused(): boolean {
    return this.py.paused;
  }

  get timeRemaining(): number {
    return this.py.time_remaining;
  }

  reset(seed?: number | null): number[][] {
    this.py.reset(seed ?? null);
    return this.grid();
  }

  tick(dt: number): boolean {
    return this.py.tick(dt);
  }

  togglePause(): void {
    this.py.toggle_pause();
  }

  pause(): void {
    this.py.pause();
  }

  resume(): void {
    this.py.resume();
  }

  validateMove(r1: number, c1: number, r2: number, c2: number): boolean {
    return this.py.validate_move(r1, c1, r2, c2);
  }

  applyMove(r1: number, c1: number, r2: number, c2: number): { points: number; done: boolean } {
    const result = this.py.apply_move(r1, c1, r2, c2);
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
