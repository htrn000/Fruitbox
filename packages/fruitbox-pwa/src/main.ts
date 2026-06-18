import { initPyodide } from "./pyodide/loader";
import { SqliteStatsStore } from "./stats/stats-sqlite";
import { App } from "./ui/app";
import "./styles.css";

function setLoadingStatus(msg: string, pct?: number): void {
  const status = document.getElementById("loading-status");
  const fill = document.getElementById("loading-fill");
  if (status) status.textContent = msg;
  if (fill && pct != null) fill.style.width = `${Math.min(100, pct)}%`;
}

async function requestPersistentStorage(): Promise<void> {
  if (navigator.storage?.persist) {
    try {
      await navigator.storage.persist();
    } catch {
      /* optional */
    }
  }
}

async function bootstrap(): Promise<void> {
  setLoadingStatus("Loading stats…", 20);
  await requestPersistentStorage();
  const stats = await SqliteStatsStore.create();

  setLoadingStatus("Loading Python runtime…", 45);
  const pyodide = await initPyodide((msg) => setLoadingStatus(msg, 70));

  setLoadingStatus("Ready", 100);
  const appRoot = document.getElementById("app");
  if (!appRoot) throw new Error("#app missing");
  document.getElementById("loading-screen")?.remove();
  new App(appRoot, pyodide, stats);
}

bootstrap().catch((err) => {
  setLoadingStatus(`Error: ${err}`);
  console.error(err);
});
