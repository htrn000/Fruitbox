import type { PyodideRuntime } from "../pyodide/loader";
import { CoreGame } from "../pyodide/core-game";
import type { StatsStore } from "../stats/stats-store";
import { GameScreen } from "./game-screen";
import { MenuScreen, type MenuAction } from "./menu";
import { StatsOverlay } from "./stats-overlay";
import { VsScreen } from "./vs-screen";

type ActiveScreen = { destroy: () => void } | null;

export class App {
  private root: HTMLElement;
  private stage: HTMLElement;
  private runtime: PyodideRuntime;
  private stats: StatsStore;
  private menu: MenuScreen;
  private active: ActiveScreen = null;

  constructor(root: HTMLElement, runtime: PyodideRuntime, stats: StatsStore) {
    this.root = root;
    this.runtime = runtime;
    this.stats = stats;

    this.stage = document.createElement("div");
    this.stage.id = "stage";
    this.root.replaceChildren(this.stage);

    this.menu = new MenuScreen(this.stage, (action) => void this.handleMenu(action));
  }

  private clearActive(): void {
    this.active?.destroy();
    this.active = null;
  }

  private showMenu(): void {
    this.clearActive();
    this.menu = new MenuScreen(this.stage, (action) => void this.handleMenu(action));
  }

  private async handleMenu(action: MenuAction): Promise<void> {
    if (!action || action === "dark") return;

    if (action === "stats") {
      const overlay = document.createElement("div");
      this.root.appendChild(overlay);
      new StatsOverlay(overlay, this.stats, () => {
        overlay.remove();
      });
      return;
    }

    this.clearActive();
    const gridType = this.menu.gridType;

    if (action === "single_player") {
      const game = CoreGame.create(this.runtime, { gridType });
      this.active = new GameScreen(this.stage, game, this.stats, "single_player", () => this.showMenu());
      return;
    }

    if (action === "vs_ai") {
      this.stage.innerHTML = `<p class="loading-inline">Loading AI…</p>`;
      this.active = await VsScreen.create(this.stage, this.runtime, this.stats, gridType, () => this.showMenu());
    }
  }
}
