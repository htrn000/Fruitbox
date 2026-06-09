/** Fruitbox PWA client — offline-capable play with online solvers. */

const DIRS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

const KEY_MAP = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

const levelSelect = document.getElementById("level-select");
const solverSelect = document.getElementById("solver-select");
const btnReset = document.getElementById("btn-reset");
const btnSolve = document.getElementById("btn-solve");
const btnReplay = document.getElementById("btn-replay");
const statusEl = document.getElementById("status");
const solverStatsEl = document.getElementById("solver-stats");
const boardEl = document.getElementById("board");

let currentLevelId = null;
let state = null;
let replayMoves = [];
let replayIndex = 0;
let touchStart = null;

function setStatus(msg) {
  statusEl.textContent = msg;
}

function posKey([x, y]) {
  return `${x},${y}`;
}

function setFromLists(walls, goals, boxes, player) {
  return {
    walls: new Set(walls.map((p) => posKey(p))),
    goals: new Set(goals.map((p) => posKey(p))),
    boxes: new Set(boxes.map((p) => posKey(p))),
    player: [...player],
    width: state?.width ?? 0,
    height: state?.height ?? 0,
    level_id: state?.level_id ?? currentLevelId,
  };
}

function isWalkable(s, x, y, ignoreBoxes = false) {
  if (x < 0 || y < 0 || x >= s.width || y >= s.height) return false;
  const key = posKey([x, y]);
  if (s.walls.has(key)) return false;
  if (!ignoreBoxes && s.boxes.has(key)) return false;
  return true;
}

function applyMoveLocal(s, direction) {
  const [dx, dy] = DIRS[direction];
  const [px, py] = s.player;
  const nx = px + dx;
  const ny = py + dy;
  const next = posKey([nx, ny]);
  if (!isWalkable(s, nx, ny)) return null;

  const boxes = new Set(s.boxes);
  if (boxes.has(next)) {
    const bx = nx + dx;
    const by = ny + dy;
    if (!isWalkable(s, bx, by)) return null;
    boxes.delete(next);
    boxes.add(posKey([bx, by]));
  }

  return {
    ...s,
    player: [nx, ny],
    boxes,
  };
}

function isWon(s) {
  for (const g of s.goals) {
    if (!s.boxes.has(g)) return false;
  }
  return s.goals.size > 0;
}

function renderBoard() {
  if (!state) return;
  boardEl.style.gridTemplateColumns = `repeat(${state.width}, 1fr)`;
  boardEl.style.gridTemplateRows = `repeat(${state.height}, 1fr)`;
  boardEl.innerHTML = "";

  for (let y = 0; y < state.height; y += 1) {
    for (let x = 0; x < state.width; x += 1) {
      const key = posKey([x, y]);
      const cell = document.createElement("div");
      cell.className = "cell";
      const isGoal = state.goals.has(key);
      const isBox = state.boxes.has(key);
      const isPlayer = state.player[0] === x && state.player[1] === y;

      if (state.walls.has(key)) {
        cell.classList.add("wall");
        cell.textContent = "";
      } else if (isGoal) {
        cell.classList.add("goal");
      } else {
        cell.classList.add("floor");
      }

      if (isBox) cell.textContent = "🍎";
      if (isPlayer) cell.textContent = isBox ? "🧑‍🌾" : "🧑";
      if (isGoal && !isBox && !isPlayer) cell.textContent = "○";

      boardEl.appendChild(cell);
    }
  }

  if (isWon(state)) {
    setStatus("You win! 🎉");
  }
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || res.statusText);
  }
  return res.json();
}

async function loadMeta() {
  const [levels, solvers] = await Promise.all([
    api("/api/levels"),
    api("/api/solvers"),
  ]);

  levelSelect.innerHTML = levels
    .map((l) => `<option value="${l.id}">${l.name}</option>`)
    .join("");
  solverSelect.innerHTML = solvers
    .map((s) => `<option value="${s.name}">${s.name} — ${s.description}</option>`)
    .join("");

  currentLevelId = levels[0]?.id;
  if (currentLevelId) await resetSession();
}

async function resetSession() {
  currentLevelId = levelSelect.value;
  replayMoves = [];
  replayIndex = 0;
  btnReplay.disabled = true;
  solverStatsEl.hidden = true;

  const data = await api(`/api/sessions/${currentLevelId}`, { method: "POST" });
  state = {
    level_id: data.level_id,
    width: data.width,
    height: data.height,
    walls: new Set(data.walls.map((p) => posKey(p))),
    goals: new Set(data.goals.map((p) => posKey(p))),
    boxes: new Set(data.boxes.map((p) => posKey(p))),
    player: data.player,
  };
  setStatus("Ready — move with arrows or swipe");
  renderBoard();
}

async function tryMove(direction) {
  if (!state || isWon(state)) return;
  try {
    const data = await api(`/api/sessions/${currentLevelId}/move`, {
      method: "POST",
      body: JSON.stringify({ direction }),
    });
    state = setFromLists(data.walls, data.goals, data.boxes, data.player);
    renderBoard();
  } catch {
    const local = applyMoveLocal(state, direction);
    if (local) {
      state = local;
      renderBoard();
    }
  }
}

async function solveLevel() {
  btnSolve.disabled = true;
  setStatus("Solving…");
  try {
    const result = await api("/api/solve", {
      method: "POST",
      body: JSON.stringify({
        level_id: currentLevelId,
        solver: solverSelect.value,
      }),
    });
    if (!result.solved) {
      setStatus("Solver could not solve within budget");
      return;
    }
    replayMoves = result.moves;
    replayIndex = 0;
    btnReplay.disabled = replayMoves.length === 0;
    solverStatsEl.hidden = false;
    solverStatsEl.textContent = `${result.solver}: ${result.moves.length} moves, ${result.nodes_expanded} nodes expanded`;
    setStatus(`Solution found (${result.moves.length} moves). Tap Replay.`);
  } catch (err) {
    setStatus(`Solve failed: ${err.message}`);
  } finally {
    btnSolve.disabled = false;
  }
}

async function replayStep() {
  if (replayIndex >= replayMoves.length) {
    setStatus("Replay complete");
    return;
  }
  await tryMove(replayMoves[replayIndex]);
  replayIndex += 1;
}

async function replayAll() {
  await resetSession();
  for (const move of replayMoves) {
    await tryMove(move);
    await new Promise((r) => setTimeout(r, 180));
  }
}

levelSelect.addEventListener("change", () => resetSession());
btnReset.addEventListener("click", () => resetSession());
btnSolve.addEventListener("click", () => solveLevel());
btnReplay.addEventListener("click", () => replayAll());

document.addEventListener("keydown", (ev) => {
  const dir = KEY_MAP[ev.key];
  if (dir) {
    ev.preventDefault();
    tryMove(dir);
  }
});

boardEl.addEventListener(
  "touchstart",
  (ev) => {
    const t = ev.changedTouches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  },
  { passive: true },
);

boardEl.addEventListener(
  "touchend",
  (ev) => {
    if (!touchStart) return;
    const t = ev.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      tryMove(dx > 0 ? "right" : "left");
    } else {
      tryMove(dy > 0 ? "down" : "up");
    }
  },
  { passive: true },
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

loadMeta().catch((err) => setStatus(`Load error: ${err.message}`));
