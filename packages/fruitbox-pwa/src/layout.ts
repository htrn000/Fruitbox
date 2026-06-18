export const CELL = 52;
export const PADDING = 16;
export const HUD_H = 72;
export const COLS = 17;
export const ROWS = 10;
export const GRID_N = COLS * ROWS;
export const FPS = 60;
export const AI_INTERVAL = 0.5;

export function gameWindowSize(rows = ROWS, cols = COLS): [number, number] {
  return [cols * CELL + PADDING * 2, rows * CELL + PADDING * 2 + HUD_H];
}

export const VS_CELL = 50;
export const VS_PADDING = 14;
export const VS_HUD_H = 80;
export const VS_GAP = 24;
export const VS_BOARD_W = COLS * VS_CELL;
export const VS_BOARD_H = ROWS * VS_CELL;
export const VS_WIN_W = VS_BOARD_W * 2 + VS_PADDING * 4 + VS_GAP;
export const VS_WIN_H = VS_BOARD_H + VS_PADDING * 2 + VS_HUD_H;

export const HF_ONNX_URL =
  "https://huggingface.co/Fungster/fruitbox-ppo/resolve/main/fruitbox_policy.onnx";

export const PYODIDE_VERSION = "0.26.4";
export const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
