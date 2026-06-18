import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import type { GameInfo, HistoryRow, StatsStore, StatsSummary } from "./stats-store";

const SCHEMA = `
CREATE TABLE IF NOT EXISTS game_history (
    game_id      TEXT PRIMARY KEY,
    gamemode     TEXT,
    grid_type    TEXT,
    self_score   INTEGER,
    opp_score    INTEGER,
    time_elapsed REAL,
    seed         INTEGER
);
`;

const IDB_NAME = "fruitbox-pwa";
const IDB_STORE = "sqlite";
const IDB_KEY = "fruitbox_stats.db";

const EMPTY_SUMMARY: StatsSummary = {
  total_games: 0,
  total_time: 0,
  vs_wins: 0,
  vs_losses: 0,
  vs_ties: 0,
  random_best: null,
  random_best_seed: null,
  random_best_time: null,
  solvable_best: null,
  solvable_best_seed: null,
  solvable_best_time: null,
};

let sqlPromise: Promise<SqlJsStatic> | null = null;

function loadSql(): Promise<SqlJsStatic> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({ locateFile: () => wasmUrl });
  }
  return sqlPromise;
}

function openIdb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readPersistedDb(): Promise<Uint8Array | null> {
  const idb = await openIdb();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, "readonly");
    const req = tx.objectStore(IDB_STORE).get(IDB_KEY);
    req.onsuccess = () => resolve((req.result as Uint8Array | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
}

async function writePersistedDb(data: Uint8Array): Promise<void> {
  const idb = await openIdb();
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(data, IDB_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function uuid(): string {
  return crypto.randomUUID();
}

export class SqliteStatsStore implements StatsStore {
  private db: Database;
  private static sql: SqlJsStatic;

  private constructor(db: Database) {
    this.db = db;
    this.db.run(SCHEMA);
  }

  static async create(): Promise<SqliteStatsStore> {
    const SQL = await loadSql();
    SqliteStatsStore.sql = SQL;
    const existing = await readPersistedDb();
    const db = existing ? new SQL.Database(existing) : new SQL.Database();
    return new SqliteStatsStore(db);
  }

  async persist(): Promise<void> {
    await writePersistedDb(this.db.export());
  }

  record(info: GameInfo): string {
    const gameId = uuid();
    this.db.run(
      "INSERT INTO game_history VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        gameId,
        info.gamemode,
        info.grid_type,
        info.self_score,
        info.opp_score ?? null,
        Math.round(info.time_elapsed),
        info.seed,
      ],
    );
    return gameId;
  }

  getSummary(): StatsSummary {
    const totals = this.db.exec(`
      SELECT COUNT(*) AS total_games, COALESCE(SUM(time_elapsed), 0) AS total_time
      FROM game_history
    `);
    if (!totals.length || !totals[0].values.length) return { ...EMPTY_SUMMARY };

    const [totalGames, totalTime] = totals[0].values[0] as [number, number];

    const vs = this.db.exec(`
      SELECT
        COALESCE(SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END), 0)
      FROM game_history WHERE gamemode = 'vs_ai'
    `);
    const [wins, losses, ties] = (vs[0]?.values[0] ?? [0, 0, 0]) as [number, number, number];

    const randomBest = this._bestFor("random");
    const solvableBest = this._bestFor("solvable");

    return {
      total_games: totalGames,
      total_time: Math.trunc(totalTime),
      vs_wins: wins,
      vs_losses: losses,
      vs_ties: ties,
      random_best: randomBest?.self_score ?? null,
      random_best_seed: randomBest?.seed ?? null,
      random_best_time: randomBest?.time_elapsed ?? null,
      solvable_best: solvableBest?.self_score ?? null,
      solvable_best_seed: solvableBest?.seed ?? null,
      solvable_best_time: solvableBest?.time_elapsed ?? null,
    };
  }

  private _bestFor(gridType: string): HistoryRow | null {
    const rows = this.db.exec(`
      SELECT game_id, gamemode, grid_type, self_score, opp_score, time_elapsed, seed
      FROM game_history
      WHERE grid_type = ? AND gamemode IN ('single_player', 'vs_ai')
      ORDER BY self_score DESC, time_elapsed ASC LIMIT 1
    `, [gridType]);
    if (!rows.length || !rows[0].values.length) return null;
    const v = rows[0].values[0];
    return {
      game_id: String(v[0]),
      gamemode: String(v[1]),
      grid_type: String(v[2]),
      self_score: Number(v[3]),
      opp_score: v[4] == null ? null : Number(v[4]),
      time_elapsed: Number(v[5]),
      seed: Number(v[6]),
    };
  }

  getVsStats(): { wins: number; losses: number; ties: number } {
    const rows = this.db.exec(`
      SELECT
        SUM(CASE WHEN self_score > opp_score THEN 1 ELSE 0 END),
        SUM(CASE WHEN self_score < opp_score THEN 1 ELSE 0 END),
        SUM(CASE WHEN self_score = opp_score THEN 1 ELSE 0 END)
      FROM game_history WHERE gamemode = 'vs_ai'
    `);
    if (!rows.length || !rows[0].values.length) {
      return { wins: 0, losses: 0, ties: 0 };
    }
    const [wins, losses, ties] = rows[0].values[0] as [number | null, number | null, number | null];
    return { wins: wins ?? 0, losses: losses ?? 0, ties: ties ?? 0 };
  }

  getHistory(): HistoryRow[] {
    const rows = this.db.exec(
      "SELECT game_id, gamemode, grid_type, self_score, opp_score, time_elapsed, seed FROM game_history ORDER BY rowid DESC",
    );
    if (!rows.length) return [];
    const cols = rows[0].columns;
    return rows[0].values.map((v) => {
      const obj: Record<string, unknown> = {};
      cols.forEach((c, i) => {
        obj[c] = v[i];
      });
      return obj as unknown as HistoryRow;
    });
  }

  exportDatabase(): Uint8Array {
    return this.db.export();
  }

  importDatabase(data: Uint8Array): void {
    this.db.close();
    this.db = new SqliteStatsStore.sql.Database(data);
    this.db.run(SCHEMA);
  }
}

export async function downloadStatsDb(store: StatsStore, filename = "fruitbox_stats.db"): Promise<void> {
  const bytes = store.exportDatabase();
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/x-sqlite3" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function pickStatsDbFile(): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".db,application/x-sqlite3";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("No file selected"));
        return;
      }
      resolve(new Uint8Array(await file.arrayBuffer()));
    };
    input.click();
  });
}
