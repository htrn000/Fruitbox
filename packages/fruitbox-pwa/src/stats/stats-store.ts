export interface GameInfo {
  gamemode: string;
  grid_type: string;
  self_score: number;
  seed: number;
  time_elapsed: number;
  opp_score?: number | null;
}

export interface StatsSummary {
  total_games: number;
  total_time: number;
  vs_wins: number;
  vs_losses: number;
  vs_ties: number;
  random_best: number | null;
  random_best_seed: number | null;
  random_best_time: number | null;
  solvable_best: number | null;
  solvable_best_seed: number | null;
  solvable_best_time: number | null;
}

export interface HistoryRow {
  game_id: string;
  gamemode: string;
  grid_type: string;
  self_score: number;
  opp_score: number | null;
  time_elapsed: number;
  seed: number;
}

export interface StatsStore {
  record(info: GameInfo): string;
  getSummary(): StatsSummary;
  getVsStats(): { wins: number; losses: number; ties: number };
  getHistory(): HistoryRow[];
  exportDatabase(): Uint8Array;
  importDatabase(data: Uint8Array): void;
  persist(): Promise<void>;
}
