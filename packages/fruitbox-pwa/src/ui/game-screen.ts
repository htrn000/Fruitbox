import type { CoreGame } from "../pyodide/core-game";
import type { StatsStore } from "../stats/stats-store";
import type { GameInfo } from "../stats/stats-store";
import { css } from "../colors";
import { gameWindowSize } from "../layout";
import {
  DEFAULT_LAYOUT,
  drawGameOverCard,
  drawGrid,
  drawHud,
  drawPausedOverlay,
  pixelToCell,
  selectionBounds,
  type Cell,
} from "../game/canvas";
import { mountCanvas } from "./canvas-host";

function rectContains(rect: DOMRect, x: number, y: number): boolean {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

export class GameScreen {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private game: CoreGame;
  private stats: StatsStore;
  private gamemode: string;
  private onMenu: () => void;

  private dragStart: Cell | null = null;
  private dragEnd: Cell | null = null;
  private gameOver = false;
  private overReason = "";
  private showGameOver = true;
  private gameStart = 0;
  private resultRecorded = false;
  private pauseAlpha = 0;
  private raf = 0;
  private lastTs = 0;

  private restartRect: DOMRect | null = null;
  private closeRect: DOMRect | null = null;
  private canvasCleanup: (() => void) | null = null;

  constructor(
    root: HTMLElement,
    game: CoreGame,
    stats: StatsStore,
    gamemode: string,
    onMenu: () => void,
    seed?: number | null,
  ) {
    this.game = game;
    this.stats = stats;
    this.gamemode = gamemode;
    this.onMenu = onMenu;

    const [w, h] = gameWindowSize(game.rows, game.columns);
    this.canvas = document.createElement("canvas");
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d")!;

    const toolbar = document.createElement("div");
    toolbar.className = "game-toolbar";
    toolbar.innerHTML = `
      <button type="button" data-action="menu">Menu</button>
      <button type="button" data-action="pause">Pause</button>
      <button type="button" data-action="restart">Restart</button>
    `;
    const { wrapper, cleanup } = mountCanvas(this.canvas, w, h);
    this.canvasCleanup = cleanup;
    root.replaceChildren(toolbar, wrapper);
    toolbar.querySelector('[data-action="menu"]')!.addEventListener("click", () => this.onMenu());
    toolbar.querySelector('[data-action="pause"]')!.addEventListener("click", () => this.togglePause());
    toolbar.querySelector('[data-action="restart"]')!.addEventListener("click", () => this.restart());

    this.game.reset(seed ?? null);
    this.gameStart = performance.now() / 1000;
    this.bindInput();
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  private bindInput(): void {
    this.canvas.addEventListener("pointerdown", (e) => {
      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch {
        /* optional */
      }
      this.onPointerDown(e);
    });
    this.canvas.addEventListener("pointermove", (e) => this.onPointerMove(e));
    this.canvas.addEventListener("pointerup", (e) => {
      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* optional */
      }
      this.onPointerUp();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.onMenu();
      if (e.key === "r" || e.key === "R") this.restart();
      if (e.key === " ") {
        e.preventDefault();
        this.togglePause();
      }
    });
  }

  private togglePause(): void {
    if (this.gameOver) return;
    this.game.togglePause();
    if (!this.game.paused) {
      this.dragStart = this.dragEnd = null;
    }
  }

  private restart(): void {
    this.game.reset(this.game.seed);
    this.game.resume();
    this.dragStart = this.dragEnd = null;
    this.gameOver = false;
    this.overReason = "";
    this.showGameOver = true;
    this.resultRecorded = false;
    this.gameStart = performance.now() / 1000;
    this.pauseAlpha = 0;
  }

  private onPointerDown(e: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * this.canvas.height;

    if (this.gameOver && this.showGameOver) {
      if (this.restartRect && rectContains(this.restartRect, x, y)) this.restart();
      else if (this.closeRect && rectContains(this.closeRect, x, y)) this.showGameOver = false;
      return;
    }

    if (this.gameOver || this.game.paused) return;
    const cell = pixelToCell(x, y, this.game.rows, this.game.columns, DEFAULT_LAYOUT);
    if (cell) {
      this.dragStart = cell;
      this.dragEnd = cell;
    }
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.dragStart || this.gameOver || this.game.paused) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * this.canvas.height;
    const cell = pixelToCell(x, y, this.game.rows, this.game.columns, DEFAULT_LAYOUT);
    if (cell) this.dragEnd = cell;
  }

  private async recordResult(): Promise<void> {
    if (this.resultRecorded) return;
    const info: GameInfo = {
      gamemode: this.gamemode,
      grid_type: this.game.gridType,
      self_score: this.game.score,
      time_elapsed: performance.now() / 1000 - this.gameStart,
      seed: this.game.seed,
    };
    this.stats.record(info);
    await this.stats.persist();
    this.resultRecorded = true;
  }

  private onPointerUp(): void {
    if (!this.gameOver && !this.game.paused) {
      const bounds = selectionBounds(this.dragStart, this.dragEnd);
      if (bounds) {
        const { done } = this.game.applyMove(bounds[0], bounds[1], bounds[2], bounds[3]);
        if (done) {
          this.gameOver = true;
          this.overReason = "No more valid moves";
          void this.recordResult();
        }
      }
    }
    this.dragStart = this.dragEnd = null;
  }

  private loop = (ts: number): void => {
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;

    if (!this.gameOver) {
      const timedOut = this.game.tick(dt);
      if (timedOut) {
        this.gameOver = true;
        this.overReason = "Time's up!";
        void this.recordResult();
      }
    }

    this.pauseAlpha = this.game.paused
      ? Math.min(1, this.pauseAlpha + dt * 3)
      : 0;

    this.draw();

    this.raf = requestAnimationFrame(this.loop);
  };

  private draw(): void {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.fillStyle = css("BG");
    ctx.fillRect(0, 0, w, h);

    drawHud(ctx, w, this.game.score, this.game.timeRemaining, this.game.timeLimit, DEFAULT_LAYOUT);
    drawGrid(
      ctx,
      this.game.grid(),
      DEFAULT_LAYOUT,
      this.dragStart,
      this.dragEnd,
      (r1, c1, r2, c2) => this.game.validateMove(r1, c1, r2, c2),
    );

    if (this.game.paused) {
      drawPausedOverlay(ctx, w, h, DEFAULT_LAYOUT, this.game.columns, this.game.rows, this.pauseAlpha);
    }

    if (this.gameOver && this.showGameOver) {
      const rects = drawGameOverCard(ctx, w, h, this.overReason, this.game.score);
      this.restartRect = rects.restart;
      this.closeRect = rects.close;
    }
  }

  destroy(): void {
    cancelAnimationFrame(this.raf);
    this.canvasCleanup?.();
    this.game.destroy();
  }
}
