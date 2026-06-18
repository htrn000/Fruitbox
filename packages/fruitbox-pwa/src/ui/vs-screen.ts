import type { PyodideRuntime } from "../pyodide/loader";
import { CoreGame } from "../pyodide/core-game";
import { CoreEnv } from "../pyodide/core-env";
import { OnnxAgent } from "../ai/onnx-agent";
import type { StatsStore, GameInfo } from "../stats/stats-store";
import { css } from "../colors";
import {
  AI_INTERVAL,
  VS_BOARD_H,
  VS_BOARD_W,
  VS_CELL,
  VS_GAP,
  VS_HUD_H,
  VS_PADDING,
  VS_WIN_H,
  VS_WIN_W,
} from "../layout";
import {
  drawGameOverCard,
  drawGrid,
  drawPausedOverlay,
  pixelToCell,
  selectionBounds,
  type BoardLayout,
  type Cell,
} from "../game/canvas";
import { mountCanvas } from "./canvas-host";

function rectContains(rect: DOMRect, x: number, y: number): boolean {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

export class VsScreen {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private human: CoreGame;
  private ai: CoreGame;
  private aiEnv: CoreEnv;
  private agent: OnnxAgent;
  private stats: StatsStore;
  private onMenu: () => void;
  private gridType: string;

  private dragStart: Cell | null = null;
  private dragEnd: Cell | null = null;
  private aiDragStart: Cell | null = null;
  private aiDragEnd: Cell | null = null;
  private aiSelClearAt = 0;

  private humanOver = false;
  private aiOver = false;
  private gameOver = false;
  private overReason = "";
  private showGameOver = true;
  private gameStart = 0;
  private resultRecorded = false;
  private pauseAlpha = 0;
  private aiBoardVisible = false;
  private lastAiMove = 0;
  private vsStats = { wins: 0, losses: 0, ties: 0 };

  private raf = 0;
  private lastTs = 0;
  private restartRect: DOMRect | null = null;
  private closeRect: DOMRect | null = null;
  private canvasCleanup: (() => void) | null = null;

  private humanLayout: BoardLayout = {
    cell: VS_CELL,
    padding: VS_PADDING,
    hudH: VS_HUD_H,
    offsetX: VS_PADDING,
  };

  private aiLayout: BoardLayout = {
    cell: VS_CELL,
    padding: VS_PADDING,
    hudH: VS_HUD_H,
    offsetX: VS_PADDING * 2 + VS_BOARD_W + VS_GAP,
  };

  private constructor(
    root: HTMLElement,
    human: CoreGame,
    ai: CoreGame,
    aiEnv: CoreEnv,
    agent: OnnxAgent,
    stats: StatsStore,
    gridType: string,
    onMenu: () => void,
  ) {
    this.human = human;
    this.ai = ai;
    this.aiEnv = aiEnv;
    this.agent = agent;
    this.stats = stats;
    this.gridType = gridType;
    this.onMenu = onMenu;
    this.vsStats = stats.getVsStats();

    this.canvas = document.createElement("canvas");
    this.canvas.width = VS_WIN_W;
    this.canvas.height = VS_WIN_H;
    this.ctx = this.canvas.getContext("2d")!;

    const toolbar = document.createElement("div");
    toolbar.className = "game-toolbar";
    toolbar.innerHTML = `
      <button type="button" data-action="menu">Menu</button>
      <button type="button" data-action="pause">Pause</button>
      <button type="button" data-action="restart">Restart</button>
      <button type="button" data-action="toggle-ai">Show AI</button>
    `;
    const { wrapper, cleanup } = mountCanvas(this.canvas, VS_WIN_W, VS_WIN_H, { scrollable: true });
    this.canvasCleanup = cleanup;
    root.replaceChildren(toolbar, wrapper);
    toolbar.querySelector('[data-action="menu"]')!.addEventListener("click", () => this.onMenu());
    toolbar.querySelector('[data-action="pause"]')!.addEventListener("click", () => this.togglePause());
    toolbar.querySelector('[data-action="restart"]')!.addEventListener("click", () => this.reset());
    toolbar.querySelector('[data-action="toggle-ai"]')!.addEventListener("click", () => {
      this.aiBoardVisible = !this.aiBoardVisible;
    });

    this.reset();
    this.bindInput();
    this.lastTs = performance.now();
    this.loop(this.lastTs);
  }

  static async create(
    root: HTMLElement,
    runtime: PyodideRuntime,
    stats: StatsStore,
    gridType: string,
    onMenu: () => void,
    onProgress?: (msg: string) => void,
  ): Promise<VsScreen> {
    const human = CoreGame.create(runtime, { gridType });
    const aiEnv = CoreEnv.create(runtime, gridType);
    const ai = CoreGame.fromProxy(runtime, aiEnv.game);
    const agent = await OnnxAgent.create(onProgress);
    return new VsScreen(root, human, ai, aiEnv, agent, stats, gridType, onMenu);
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
      if (e.key === "r" || e.key === "R") this.reset();
      if (e.key === " ") {
        e.preventDefault();
        this.togglePause();
      }
    });
  }

  private reset(): void {
    this.human.reset();
    this.human.resume();
    this.aiEnv.reset();
    this.ai.syncGridFrom(this.human);

    this.dragStart = this.dragEnd = null;
    this.aiDragStart = this.aiDragEnd = null;
    this.humanOver = this.aiOver = this.gameOver = false;
    this.overReason = "";
    this.showGameOver = true;
    this.resultRecorded = false;
    this.gameStart = performance.now() / 1000;
    this.lastAiMove = performance.now() / 1000 + AI_INTERVAL;
    this.pauseAlpha = 0;
  }

  private togglePause(): void {
    if (this.gameOver) return;
    this.human.togglePause();
    if (!this.human.paused) this.lastAiMove = performance.now() / 1000 + AI_INTERVAL;
    this.dragStart = this.dragEnd = null;
  }

  private onPointerDown(e: PointerEvent): void {
    const { x, y } = this.eventToCanvas(e);
    if (this.gameOver && this.showGameOver) {
      if (this.restartRect && rectContains(this.restartRect, x, y)) this.reset();
      else if (this.closeRect && rectContains(this.closeRect, x, y)) this.showGameOver = false;
      return;
    }
    if (this.gameOver || this.humanOver || this.human.paused) return;
    const cell = pixelToCell(x, y, this.human.rows, this.human.columns, this.humanLayout);
    if (cell) {
      this.dragStart = cell;
      this.dragEnd = cell;
    }
  }

  private onPointerMove(e: PointerEvent): void {
    if (!this.dragStart || this.gameOver || this.humanOver || this.human.paused) return;
    const { x, y } = this.eventToCanvas(e);
    const cell = pixelToCell(x, y, this.human.rows, this.human.columns, this.humanLayout);
    if (cell) this.dragEnd = cell;
  }

  private onPointerUp(): void {
    if (!this.gameOver && !this.humanOver && !this.human.paused) {
      const bounds = selectionBounds(this.dragStart, this.dragEnd);
      if (bounds) {
        const { done } = this.human.applyMove(...bounds);
        if (done) this.humanOver = true;
      }
    }
    this.dragStart = this.dragEnd = null;
  }

  private eventToCanvas(e: PointerEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * this.canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * this.canvas.height,
    };
  }

  private async stepAi(): Promise<void> {
    const obs = this.aiEnv.obs();
    const masks = this.aiEnv.actionMasks();
    const action = await this.agent.predict(obs, masks, true);
    const [r0, c0, r1, c1] = this.aiEnv.decodeAction(action);
    this.aiDragStart = [r0, c0];
    this.aiDragEnd = [r1, c1];
    this.aiSelClearAt = performance.now() / 1000 + 0.2;
    const { done } = this.ai.applyMove(r0, c0, r1, c1);
    if (done) this.aiOver = true;
  }

  private async recordResult(): Promise<void> {
    if (this.resultRecorded) return;
    const h = this.human.score;
    const a = this.ai.score;
    const info: GameInfo = {
      gamemode: "vs_ai",
      grid_type: this.gridType,
      self_score: h,
      opp_score: a,
      time_elapsed: performance.now() / 1000 - this.gameStart,
      seed: this.human.seed,
    };
    this.stats.record(info);
    await this.stats.persist();
    this.vsStats = this.stats.getVsStats();
    this.resultRecorded = true;
  }

  private loop = (ts: number): void => {
    const dt = Math.min(0.05, (ts - this.lastTs) / 1000);
    this.lastTs = ts;
    const now = performance.now() / 1000;

    if (!this.gameOver) {
      const timedOut = this.human.tick(dt);
      const elapsed = this.human.timeLimit - this.human.timeRemaining;
      this.ai.syncElapsed(elapsed);

      if (timedOut) {
        this.humanOver = true;
        this.aiOver = true;
      }

      if (!this.aiOver && !this.human.paused && now >= this.lastAiMove) {
        this.lastAiMove = now + AI_INTERVAL;
        void this.stepAi();
      }

      if (now >= this.aiSelClearAt) this.aiDragStart = this.aiDragEnd = null;

      if (this.humanOver && this.aiOver) {
        this.gameOver = true;
        const h = this.human.score;
        const a = this.ai.score;
        if (h > a) this.overReason = `You win!  ${h} – ${a}`;
        else if (a > h) this.overReason = `ONNX wins!  ${h} – ${a}`;
        else this.overReason = `Tie!  ${h} – ${a}`;
        void this.recordResult();
      }
    }

    this.pauseAlpha = this.human.paused ? Math.min(1, this.pauseAlpha + dt * 3) : 0;
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private draw(): void {
    const ctx = this.ctx;
    ctx.fillStyle = css("BG");
    ctx.fillRect(0, 0, VS_WIN_W, VS_WIN_H);

    ctx.fillStyle = css("HUD_BG");
    ctx.fillRect(0, 0, VS_WIN_W, VS_HUD_H);
    ctx.strokeStyle = css("CELL_BORDER");
    ctx.beginPath();
    ctx.moveTo(0, VS_HUD_H);
    ctx.lineTo(VS_WIN_W, VS_HUD_H);
    ctx.stroke();

    ctx.fillStyle = css("TEXT_SECONDARY");
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillText("YOU", VS_PADDING, 24);
    ctx.fillStyle = css("TEXT_PRIMARY");
    ctx.font = "bold 20px system-ui, sans-serif";
    ctx.fillText(String(this.human.score), VS_PADDING, 48);

    const aiLabelX = VS_PADDING * 2 + VS_BOARD_W + VS_GAP;
    ctx.fillStyle = css("TEXT_SECONDARY");
    ctx.fillText("AI", aiLabelX, 24);
    ctx.fillStyle = css("TEXT_PRIMARY");
    ctx.fillText(String(this.ai.score), aiLabelX, 48);

    const t = this.human.timeRemaining;
    const tcol = t > 30 ? css("TIMER_OK") : t > 10 ? css("TIMER_WARN") : css("TIMER_DANGER");
    const barW = 160;
    const barX = VS_WIN_W / 2 - barW / 2;
    ctx.fillStyle = css("TEXT_SECONDARY");
    ctx.fillText("TIME", barX, 24);
    ctx.fillStyle = tcol;
    ctx.font = "bold 20px system-ui, sans-serif";
    ctx.fillText(`${Math.floor(t)}s`, barX, 48);

    const rec = `W ${this.vsStats.wins}  L ${this.vsStats.losses}  T ${this.vsStats.ties}`;
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillStyle = css("TEXT_SECONDARY");
    ctx.fillText(rec, VS_WIN_W - VS_PADDING - ctx.measureText(rec).width, 24);

    drawGrid(
      ctx,
      this.human.grid(),
      this.humanLayout,
      this.dragStart,
      this.dragEnd,
      (r1, c1, r2, c2) => this.human.validateMove(r1, c1, r2, c2),
    );

    if (this.human.paused) {
      drawPausedOverlay(ctx, VS_WIN_W, VS_WIN_H, this.humanLayout, this.human.columns, this.human.rows, this.pauseAlpha);
    }

    if (this.aiBoardVisible) {
      drawGrid(
        ctx,
        this.ai.grid(),
        this.aiLayout,
        this.aiDragStart,
        this.aiDragEnd,
        (r1, c1, r2, c2) => this.ai.validateMove(r1, c1, r2, c2),
      );
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(this.aiLayout.offsetX!, VS_HUD_H + VS_PADDING, VS_BOARD_W, VS_BOARD_H);
    }

    if (this.gameOver && this.showGameOver) {
      const rects = drawGameOverCard(ctx, VS_WIN_W, VS_WIN_H, this.overReason, this.human.score);
      this.restartRect = rects.restart;
      this.closeRect = rects.close;
    }
  }

  destroy(): void {
    cancelAnimationFrame(this.raf);
    this.canvasCleanup?.();
    this.human.destroy();
    this.aiEnv.destroy();
  }
}
