export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface Rgba extends Rgb {
  a: number;
}

export type ThemeColors = Record<string, string | Rgba>;

const LIGHT: ThemeColors = {
  BG: "#f5f3ee",
  CELL_BG: "#ffffff",
  CELL_BORDER: "#d2d0c8",
  CLEARED_BG: "#e6e4de",
  HUD_BG: "#ebe9e2",
  CARD_BG: "#ffffff",
  CARD_BORDER: "#d2d0c8",
  DIVIDER: "#dcdad2",
  TEXT_PRIMARY: "#2c2c2a",
  TEXT_SECONDARY: "#5f5e5a",
  TEXT_CLEARED: "#b4b2aa",
  ACCENT: "#185fa5",
  ACCENT_LIGHT: "#dcebff",
  SEL_FILL: "rgba(55, 138, 221, 0.24)",
  SEL_BORDER: "#185fa5",
  INVALID_FILL: "rgba(226, 75, 74, 0.24)",
  INVALID_BOR: "#a32d2d",
  VALID_FILL: "rgba(29, 158, 117, 0.24)",
  VALID_BOR: "#0f6e56",
  TIMER_OK: "#0f6e56",
  TIMER_WARN: "#ba7517",
  TIMER_DANGER: "#a32d2d",
  BTN: "#d2d0c8",
  BTN_HOV: "#bebcb4",
  BTN_BORDER: "#a09e96",
  DIM: "rgba(44, 44, 42, 0.63)",
  PAUSE_COVER: "#b4b2aa",
  WIN_CARD_BG: "#e8fcf0",
  WIN_CARD_BOR: "#16a34a",
  LOSE_CARD_BG: "#feeaea",
  LOSE_CARD_BOR: "#b93c3c",
  TIE_CARD_BG: "#fffbdc",
  TIE_CARD_BOR: "#b48c1e",
};

const DARK: ThemeColors = {
  BG: "#161614",
  CELL_BG: "#262522",
  CELL_BORDER: "#3a3834",
  CLEARED_BG: "#1e1e1b",
  HUD_BG: "#1c1c1a",
  CARD_BG: "#262522",
  CARD_BORDER: "#413f3a",
  DIVIDER: "#373531",
  TEXT_PRIMARY: "#dcdad4",
  TEXT_SECONDARY: "#82807a",
  TEXT_CLEARED: "#413f3a",
  ACCENT: "#5096e6",
  ACCENT_LIGHT: "#142d50",
  SEL_FILL: "rgba(80, 150, 230, 0.24)",
  SEL_BORDER: "#5096e6",
  INVALID_FILL: "rgba(226, 75, 74, 0.24)",
  INVALID_BOR: "#c84646",
  VALID_FILL: "rgba(29, 158, 117, 0.24)",
  VALID_BOR: "#148c69",
  TIMER_OK: "#148c69",
  TIMER_WARN: "#d28c23",
  TIMER_DANGER: "#c84646",
  BTN: "#373632",
  BTN_HOV: "#46443f",
  BTN_BORDER: "#504e48",
  DIM: "rgba(0, 0, 0, 0.7)",
  PAUSE_COVER: "#2d2c28",
  WIN_CARD_BG: "#0f2d19",
  WIN_CARD_BOR: "#16a34a",
  LOSE_CARD_BG: "#370f0f",
  LOSE_CARD_BOR: "#b93c3c",
  TIE_CARD_BG: "#322d0a",
  TIE_CARD_BOR: "#b48c1e",
};

let dark = localStorage.getItem("fruitbox_dark") === "1";

export function isDark(): boolean {
  return dark;
}

export function setDark(value: boolean): void {
  dark = value;
  localStorage.setItem("fruitbox_dark", value ? "1" : "0");
}

export function colors(): ThemeColors {
  return dark ? DARK : LIGHT;
}

export function css(name: string): string {
  const c = colors()[name];
  return typeof c === "string" ? c : `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
}
