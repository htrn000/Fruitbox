import { css } from "../colors";
import { CELL, HUD_H, PADDING } from "../layout";

export type Cell = [number, number];

export interface BoardLayout {
  cell: number;
  padding: number;
  hudH: number;
  offsetX?: number;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
): void {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function cellRect(
  row: number,
  col: number,
  layout: BoardLayout,
): { x: number; y: number; w: number; h: number } {
  const { cell, padding, hudH, offsetX = 0 } = layout;
  return {
    x: offsetX + padding + col * cell,
    y: hudH + padding + row * cell,
    w: cell - 1,
    h: cell - 1,
  };
}

export function pixelToCell(
  px: number,
  py: number,
  rows: number,
  cols: number,
  layout: BoardLayout,
): Cell | null {
  const { cell, padding, hudH, offsetX = 0 } = layout;
  const col = Math.floor((px - offsetX - padding) / cell);
  const row = Math.floor((py - hudH - padding) / cell);
  if (row >= 0 && row < rows && col >= 0 && col < cols) return [row, col];
  return null;
}

export function selectionBounds(start: Cell | null, end: Cell | null): [number, number, number, number] | null {
  if (!start || !end) return null;
  return [
    Math.min(start[0], end[0]),
    Math.min(start[1], end[1]),
    Math.max(start[0], end[0]),
    Math.max(start[1], end[1]),
  ];
}

export function drawHud(
  ctx: CanvasRenderingContext2D,
  width: number,
  score: number,
  timeRemaining: number,
  timeLimit: number,
  layout: BoardLayout,
): void {
  const hudH = layout.hudH;
  ctx.fillStyle = css("HUD_BG");
  ctx.fillRect(0, 0, width, hudH);
  ctx.strokeStyle = css("CELL_BORDER");
  ctx.beginPath();
  ctx.moveTo(0, hudH);
  ctx.lineTo(width, hudH);
  ctx.stroke();

  ctx.fillStyle = css("TEXT_SECONDARY");
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillText("SCORE", PADDING, 24);
  ctx.fillStyle = css("TEXT_PRIMARY");
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.fillText(String(score), PADDING, 48);

  const t = timeRemaining;
  const tcol = t > 30 ? css("TIMER_OK") : t > 10 ? css("TIMER_WARN") : css("TIMER_DANGER");
  const barW = 180;
  const barX = width - PADDING - barW;
  const fillW = Math.max(0, Math.floor(barW * (t / timeLimit)));

  ctx.fillStyle = css("TEXT_SECONDARY");
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillText("TIME", barX, 24);
  ctx.fillStyle = tcol;
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.fillText(`${Math.floor(t)}s`, barX, 48);

  drawRoundedRect(ctx, barX, 48, barW, 6, 3);
  ctx.fillStyle = css("CELL_BORDER");
  ctx.fill();
  drawRoundedRect(ctx, barX, 48, fillW, 6, 3);
  ctx.fillStyle = tcol;
  ctx.fill();
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  layout: BoardLayout,
  dragStart: Cell | null,
  dragEnd: Cell | null,
  validate: (r1: number, c1: number, r2: number, c2: number) => boolean,
): void {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const bounds = selectionBounds(dragStart, dragEnd);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const rect = cellRect(row, col, layout);
      const val = grid[row][col];
      const cleared = val === -1;

      drawRoundedRect(ctx, rect.x, rect.y, rect.w, rect.h, 6);
      ctx.fillStyle = cleared ? css("CLEARED_BG") : css("CELL_BG");
      ctx.fill();
      ctx.strokeStyle = css("CELL_BORDER");
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!cleared) {
        ctx.fillStyle = css("TEXT_PRIMARY");
        ctx.font = "bold 20px system-ui, sans-serif";
        const text = String(val);
        const tw = ctx.measureText(text).width;
        ctx.fillText(text, rect.x + (rect.w - tw) / 2, rect.y + rect.h / 2 + 7);
      }
    }
  }

  if (bounds) {
    const [r1, c1, r2, c2] = bounds;
    const valid = validate(r1, c1, r2, c2);
    const tl = cellRect(r1, c1, layout);
    const br = cellRect(r2, c2, layout);
    const sel = { x: tl.x, y: tl.y, w: br.x + br.w - tl.x, h: br.y + br.h - tl.y };

    drawRoundedRect(ctx, sel.x, sel.y, sel.w, sel.h, 8);
    ctx.fillStyle = valid ? css("VALID_FILL") : css("SEL_FILL");
    ctx.fill();
    ctx.strokeStyle = valid ? css("VALID_BOR") : css("SEL_BORDER");
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export function drawPausedOverlay(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  layout: BoardLayout,
  cols: number,
  rows: number,
  alpha: number,
): void {
  const gridW = cols * layout.cell;
  const gridH = rows * layout.cell;
  const x = layout.offsetX ?? 0 + layout.padding;
  const y = layout.hudH + layout.padding;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = css("PAUSE_COVER");
  ctx.fillRect(x + layout.padding - layout.padding, y, gridW, gridH);
  ctx.fillStyle = css("TEXT_PRIMARY");
  ctx.font = "bold 36px system-ui, sans-serif";
  const text = "Paused";
  ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);
  ctx.restore();
}

export function drawGameOverCard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  reason: string,
  score: number,
): { restart: DOMRect; close: DOMRect } {
  ctx.fillStyle = css("DIM");
  ctx.fillRect(0, 0, width, height);

  const cardW = 340;
  const cardH = 210;
  const cardX = (width - cardW) / 2;
  const cardY = (height - cardH) / 2;

  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 14);
  ctx.fillStyle = css("CARD_BG");
  ctx.fill();
  ctx.strokeStyle = css("CARD_BORDER");
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = css("TEXT_PRIMARY");
  ctx.font = "bold 36px system-ui, sans-serif";
  const title = "Game over";
  ctx.fillText(title, cardX + (cardW - ctx.measureText(title).width) / 2, cardY + 52);

  ctx.fillStyle = css("TEXT_SECONDARY");
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText(reason, cardX + (cardW - ctx.measureText(reason).width) / 2, cardY + 92);

  const scoreText = `Final score: ${score}`;
  ctx.fillStyle = css("TEXT_PRIMARY");
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.fillText(scoreText, cardX + (cardW - ctx.measureText(scoreText).width) / 2, cardY + 124);

  const restart = new DOMRect(cardX + (cardW - 90) / 2, cardY + 156, 90, 34);
  drawRoundedRect(ctx, restart.x, restart.y, restart.width, restart.height, 6);
  ctx.fillStyle = css("BTN");
  ctx.fill();
  ctx.strokeStyle = css("BTN_BORDER");
  ctx.stroke();
  ctx.fillStyle = css("TEXT_PRIMARY");
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.fillText("Restart", restart.x + 16, restart.y + 22);

  const close = new DOMRect(cardX + cardW - 34, cardY + 8, 26, 26);
  ctx.fillStyle = css("TEXT_SECONDARY");
  ctx.fillText("X", close.x + 8, close.y + 18);

  return { restart, close };
}

export const DEFAULT_LAYOUT: BoardLayout = {
  cell: CELL,
  padding: PADDING,
  hudH: HUD_H,
};
