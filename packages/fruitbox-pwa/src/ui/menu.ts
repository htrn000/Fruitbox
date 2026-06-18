import { colors, isDark, setDark } from "../colors";

export type MenuAction = "single_player" | "vs_ai" | "stats" | "dark" | null;

const GRID_TYPES = ["random", "solvable"] as const;

export class MenuScreen {
  private root: HTMLElement;
  private gridTypeIdx = 0;
  private onAction: (action: MenuAction) => void;

  constructor(root: HTMLElement, onAction: (action: MenuAction) => void) {
    this.root = root;
    this.onAction = onAction;
    this.render();
  }

  get gridType(): string {
    return GRID_TYPES[this.gridTypeIdx];
  }

  private render(): void {
    const C = colors();
    this.root.className = "menu-screen";
    this.root.innerHTML = `
      <div class="menu-card" style="background:${C.CARD_BG};border-color:${C.CARD_BORDER}">
        <h1 style="color:${C.TEXT_PRIMARY}">Fruit Box</h1>
        <p class="menu-sub" style="color:${C.TEXT_SECONDARY}">Select fruits that sum to 10</p>
        <div class="grid-pill" style="background:${C.PILL_BG};border-color:${C.PILL_BORDER}">
          <button type="button" class="pill-arrow" data-action="grid-prev">‹</button>
          <span style="color:${C.ACCENT}">${GRID_TYPES[this.gridTypeIdx]}</span>
          <button type="button" class="pill-arrow" data-action="grid-next">›</button>
        </div>
        <button type="button" class="menu-btn primary" data-action="single_player">Single Player</button>
        <button type="button" class="menu-btn" data-action="vs_ai">VS AI</button>
        <button type="button" class="menu-btn" data-action="stats">Stats</button>
        <button type="button" class="menu-btn subtle" data-action="dark">${isDark() ? "Light mode" : "Dark mode"}</button>
      </div>
    `;

    this.root.querySelector('[data-action="single_player"]')!.addEventListener("click", () => this.onAction("single_player"));
    this.root.querySelector('[data-action="vs_ai"]')!.addEventListener("click", () => this.onAction("vs_ai"));
    this.root.querySelector('[data-action="stats"]')!.addEventListener("click", () => this.onAction("stats"));
    this.root.querySelector('[data-action="dark"]')!.addEventListener("click", () => {
      setDark(!isDark());
      this.onAction("dark");
      this.render();
    });
    this.root.querySelector('[data-action="grid-prev"]')!.addEventListener("click", () => {
      this.gridTypeIdx = (this.gridTypeIdx - 1 + GRID_TYPES.length) % GRID_TYPES.length;
      this.render();
    });
    this.root.querySelector('[data-action="grid-next"]')!.addEventListener("click", () => {
      this.gridTypeIdx = (this.gridTypeIdx + 1) % GRID_TYPES.length;
      this.render();
    });
  }
}
