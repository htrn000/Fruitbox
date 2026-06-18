import { colors } from "../colors";
import type { StatsStore } from "../stats/stats-store";
import { downloadStatsDb, pickStatsDbFile } from "../stats/stats-sqlite";

export class StatsOverlay {
  private root: HTMLElement;
  private stats: StatsStore;
  private onClose: () => void;
  private view: "summary" | "history" = "summary";

  constructor(root: HTMLElement, stats: StatsStore, onClose: () => void) {
    this.root = root;
    this.stats = stats;
    this.onClose = onClose;
    this.render();
  }

  private fmtTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}m ${s}s`;
    }
    const h = Math.floor(seconds / 3600);
    return `${h}h ${Math.floor((seconds % 3600) / 60)}m`;
  }

  private render(): void {
    const C = colors();
    const s = this.stats.getSummary();

    this.root.className = "stats-overlay";
    this.root.innerHTML = `
      <div class="stats-card" style="background:${C.CARD_BG};border-color:${C.CARD_BORDER}">
        <button type="button" class="stats-close" data-action="close">×</button>
        <h2 style="color:${C.TEXT_PRIMARY}">${this.view === "summary" ? "Stats" : "History"}</h2>
        ${
          this.view === "summary"
            ? `
          <div class="stats-grid">
            <div><span style="color:${C.TEXT_SECONDARY}">Games</span><strong style="color:${C.TEXT_PRIMARY}">${s.total_games}</strong></div>
            <div><span style="color:${C.TEXT_SECONDARY}">Time played</span><strong style="color:${C.TEXT_PRIMARY}">${this.fmtTime(s.total_time)}</strong></div>
            <div><span style="color:${C.TEXT_SECONDARY}">VS AI</span><strong style="color:${C.TEXT_PRIMARY}">${s.vs_wins}W / ${s.vs_losses}L / ${s.vs_ties}T</strong></div>
            <div><span style="color:${C.TEXT_SECONDARY}">Best random</span><strong style="color:${C.TEXT_PRIMARY}">${s.random_best ?? "—"}</strong></div>
            <div><span style="color:${C.TEXT_SECONDARY}">Best solvable</span><strong style="color:${C.TEXT_PRIMARY}">${s.solvable_best ?? "—"}</strong></div>
          </div>
          <div class="stats-actions">
            <button type="button" data-action="history">History</button>
            <button type="button" data-action="export">Export .db</button>
            <button type="button" data-action="import">Import .db</button>
          </div>
        `
            : `
          <div class="history-list">
            ${this.stats
              .getHistory()
              .slice(0, 20)
              .map(
                (row) => `
              <div class="history-row" style="border-color:${C.DIVIDER}">
                <span style="color:${C.TEXT_PRIMARY}">${row.gamemode} · ${row.grid_type}</span>
                <span style="color:${C.TEXT_SECONDARY}">${row.self_score}${row.opp_score != null ? ` vs ${row.opp_score}` : ""} · seed ${row.seed}</span>
              </div>`,
              )
              .join("")}
          </div>
          <button type="button" data-action="back">Back</button>
        `
        }
      </div>
    `;

    this.root.querySelector('[data-action="close"]')!.addEventListener("click", () => this.onClose());
    this.root.querySelector('[data-action="history"]')?.addEventListener("click", () => {
      this.view = "history";
      this.render();
    });
    this.root.querySelector('[data-action="back"]')?.addEventListener("click", () => {
      this.view = "summary";
      this.render();
    });
    this.root.querySelector('[data-action="export"]')?.addEventListener("click", async () => {
      await downloadStatsDb(this.stats);
    });
    this.root.querySelector('[data-action="import"]')?.addEventListener("click", async () => {
      try {
        const data = await pickStatsDbFile();
        this.stats.importDatabase(data);
        await this.stats.persist();
        this.render();
      } catch {
        /* cancelled */
      }
    });
  }
}
