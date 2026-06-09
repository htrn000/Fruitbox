/** Fruitbox PWA — 10-sum rectangle puzzle with offline play. */

const levelSelect = document.getElementById("level-select");
const solverSelect = document.getElementById("solver-select");
const btnReset = document.getElementById("btn-reset");
const btnSolve = document.getElementById("btn-solve");
const btnReplay = document.getElementById("btn-replay");
const statusEl = document.getElementById("status");
const selectionInfoEl = document.getElementById("selection-info");
const solverStatsEl = document.getElementById("solver-stats");
const boardEl = document.getElementById("board");

let currentLevelId = null;
let state = null;
let replayMoves = [];
let pairSelection = null;
let dragStart = null;
let dragEnd = null;
let isDragging = false;

function setStatus(msg) {
  statusEl.textContent = msg;
}

function setSelectionInfo(msg, show = true) {
  selectionInfoEl.hidden = !show;
  selectionInfoEl.textContent = msg;
}

function normalizeRect(r0, c0, r1, c1) {
  return {
    r0: Math.min(r0, r1),
    c0: Math.min(c0, c1),
    r1: Math.max(r0, r1),
    c1: Math.max(c0, c1),
  };
}

function inRect(row, col, rect) {
  return row >= rect.r0 && row <= rect.r1 && col >= rect.c0 && col <= rect.c1;
}

function rectCells(rect) {
  const cells = [];
  for (let r = rect.r0; r <= rect.r1; r += 1) {
    for (let c = rect.c0; c <= rect.c1; c += 1) {
      cells.push([r, c]);
    }
  }
  return cells;
}

function isAdjacent(r0, c0, r1, c1) {
  return (r0 === r1 && Math.abs(c0 - c1) === 1) || (c0 === c1 && Math.abs(r0 - r1) === 1);
}

function rectSum(grid, rect) {
  let total = 0;
  for (const [r, c] of rectCells(rect)) {
    total += grid[r][c];
  }
  return total;
}

function isValidRect(grid, rect) {
  const cells = rectCells(rect);
  if (cells.length < 2) return false;
  if (cells.some(([r, c]) => grid[r][c] === 0)) return false;
  return rectSum(grid, rect) === 10;
}

function isValidPair(grid, r0, c0, r1, c1) {
  if (!isAdjacent(r0, c0, r1, c1)) return false;
  const v0 = grid[r0][c0];
  const v1 = grid[r1][c1];
  if (v0 === 0 || v1 === 0) return false;
  return v0 + v1 === 10;
}

function applyMoveLocal(grid, move) {
  const next = grid.map((row) => [...row]);
  if (move.kind === "rectangle") {
    const rect = normalizeRect(move.r0, move.c0, move.r1, move.c1);
    if (!isValidRect(next, rect)) return null;
    for (const [r, c] of rectCells(rect)) {
      next[r][c] = 0;
    }
    return next;
  }
  if (!isValidPair(next, move.r0, move.c0, move.r1, move.c1)) return null;
  next[move.r0][move.c0] = 0;
  next[move.r1][move.c1] = 0;
  return next;
}

function remainingCells(grid) {
  return grid.flat().filter((v) => v !== 0).length;
}

function enumerateMovesLocal(grid) {
  const moves = [];
  const h = grid.length;
  const w = grid[0]?.length ?? 0;

  for (let r0 = 0; r0 < h; r0 += 1) {
    for (let c0 = 0; c0 < w; c0 += 1) {
      if (grid[r0][c0] === 0) continue;
      for (let r1 = r0; r1 < h; r1 += 1) {
        const cStart = r1 === r0 ? c0 : 0;
        for (let c1 = cStart; c1 < w; c1 += 1) {
          const rect = normalizeRect(r0, c0, r1, c1);
          if (isValidRect(grid, rect)) {
            moves.push({ kind: "rectangle", ...rect });
          }
        }
      }
    }
  }

  for (let r0 = 0; r0 < h; r0 += 1) {
    for (let c0 = 0; c0 < w; c0 += 1) {
      if (grid[r0][c0] === 0) continue;
      for (const [dr, dc] of [[0, 1], [1, 0]]) {
        const r1 = r0 + dr;
        const c1 = c0 + dc;
        if (r1 >= h || c1 >= w) continue;
        if (isValidPair(grid, r0, c0, r1, c1)) {
          moves.push({ kind: "pair", r0, c0, r1, c1 });
        }
      }
    }
  }
  return moves;
}

function isWonLocal(grid) {
  if (remainingCells(grid) === 0) return true;
  return enumerateMovesLocal(grid).length === 0;
}

function cellFromEvent(ev) {
  const target = ev.target.closest(".cell");
  if (!target) return null;
  return {
    row: Number(target.dataset.row),
    col: Number(target.dataset.col),
  };
}

function renderBoard() {
  if (!state) return;
  const { grid, width, height } = state;
  boardEl.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  boardEl.innerHTML = "";

  let activeRect = null;
  if (dragStart && dragEnd) {
    activeRect = normalizeRect(dragStart.row, dragStart.col, dragEnd.row, dragEnd.col);
  }

  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      const value = grid[row][col];
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);

      if (value === 0) {
        cell.classList.add("empty");
        cell.textContent = "";
      } else {
        cell.textContent = String(value);
      }

      if (pairSelection && pairSelection.row === row && pairSelection.col === col) {
        cell.classList.add("selected");
      }

      if (activeRect && inRect(row, col, activeRect)) {
        cell.classList.add("in-rect");
        const sum = rectSum(grid, activeRect);
        const hasEmpty = rectCells(activeRect).some(([r, c]) => grid[r][c] === 0);
        if (!hasEmpty && rectCells(activeRect).length >= 2) {
          cell.classList.add(sum === 10 ? "valid" : "invalid");
        }
      }

      boardEl.appendChild(cell);
    }
  }

  if (activeRect) {
    const sum = rectSum(grid, activeRect);
    const count = rectCells(activeRect).length;
    const hasEmpty = rectCells(activeRect).some(([r, c]) => grid[r][c] === 0);
    if (count >= 2 && !hasEmpty) {
      setSelectionInfo(`Sum: ${sum}${sum === 10 ? " ✓" : ""}`);
    } else {
      setSelectionInfo(`Select 2+ filled cells (sum: ${sum})`);
    }
  } else if (pairSelection) {
    setSelectionInfo(`Pair: tap adjacent cell (${grid[pairSelection.row][pairSelection.col]} + ?)`);
  } else {
    setSelectionInfo("", false);
  }

  if (state.won) {
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
  pairSelection = null;
  dragStart = null;
  dragEnd = null;
  btnReplay.disabled = true;
  solverStatsEl.hidden = true;

  const data = await api(`/api/sessions/${currentLevelId}`, { method: "POST" });
  state = {
    level_id: data.level_id,
    width: data.width,
    height: data.height,
    grid: data.grid,
    won: data.won,
  };
  setStatus("Drag a rectangle or tap pairs that sum to 10");
  renderBoard();
}

async function animateClear(cells) {
  for (const cell of boardEl.querySelectorAll(".cell")) {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    if (cells.some(([r, c]) => r === row && c === col)) {
      cell.classList.add("clearing");
    }
  }
  await new Promise((r) => setTimeout(r, 320));
}

async function tryMove(move) {
  if (!state || state.won) return false;

  let cells;
  if (move.kind === "rectangle") {
    const rect = normalizeRect(move.r0, move.c0, move.r1, move.c1);
    cells = rectCells(rect);
  } else {
    cells = [[move.r0, move.c0], [move.r1, move.c1]];
  }

  try {
    const data = await api(`/api/sessions/${currentLevelId}/move`, {
      method: "POST",
      body: JSON.stringify(move),
    });
    await animateClear(cells);
    state = {
      level_id: data.level_id,
      width: data.width,
      height: data.height,
      grid: data.grid,
      won: data.won,
    };
    pairSelection = null;
    renderBoard();
    return true;
  } catch {
    const next = applyMoveLocal(state.grid, move);
    if (!next) return false;
    await animateClear(cells);
    state = {
      ...state,
      grid: next,
      won: isWonLocal(next),
    };
    pairSelection = null;
    renderBoard();
    return true;
  }
}

async function finishRectDrag() {
  if (!dragStart || !dragEnd) return;
  const rect = normalizeRect(dragStart.row, dragStart.col, dragEnd.row, dragEnd.col);
  dragStart = null;
  dragEnd = null;
  isDragging = false;

  if (isValidRect(state.grid, rect)) {
    await tryMove({ kind: "rectangle", ...rect });
  } else {
    renderBoard();
  }
}

async function handlePairTap(row, col) {
  if (state.grid[row][col] === 0) {
    pairSelection = null;
    renderBoard();
    return;
  }

  if (!pairSelection) {
    pairSelection = { row, col };
    renderBoard();
    return;
  }

  if (pairSelection.row === row && pairSelection.col === col) {
    pairSelection = null;
    renderBoard();
    return;
  }

  const move = {
    kind: "pair",
    r0: pairSelection.row,
    c0: pairSelection.col,
    r1: row,
    c1: col,
  };
  pairSelection = null;
  await tryMove(move);
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

async function replayAll() {
  await resetSession();
  for (const move of replayMoves) {
    await tryMove(move);
    await new Promise((r) => setTimeout(r, 400));
  }
}

levelSelect.addEventListener("change", () => resetSession());
btnReset.addEventListener("click", () => resetSession());
btnSolve.addEventListener("click", () => solveLevel());
btnReplay.addEventListener("click", () => replayAll());

boardEl.addEventListener("pointerdown", (ev) => {
  if (state?.won) return;
  const pos = cellFromEvent(ev);
  if (!pos || state.grid[pos.row][pos.col] === 0) return;
  ev.preventDefault();
  isDragging = true;
  dragStart = pos;
  dragEnd = pos;
  pairSelection = null;
  boardEl.setPointerCapture(ev.pointerId);
  renderBoard();
});

boardEl.addEventListener("pointermove", (ev) => {
  if (!isDragging) return;
  const pos = cellFromEvent(ev);
  if (!pos) return;
  dragEnd = pos;
  renderBoard();
});

boardEl.addEventListener("pointerup", async (ev) => {
  if (!isDragging) return;
  boardEl.releasePointerCapture(ev.pointerId);
  const moved =
    dragStart &&
    dragEnd &&
    (dragStart.row !== dragEnd.row || dragStart.col !== dragEnd.col);

  if (moved) {
    await finishRectDrag();
    return;
  }

  isDragging = false;
  const pos = cellFromEvent(ev);
  dragStart = null;
  dragEnd = null;
  if (pos) await handlePairTap(pos.row, pos.col);
});

boardEl.addEventListener("pointercancel", () => {
  isDragging = false;
  dragStart = null;
  dragEnd = null;
  renderBoard();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

loadMeta().catch((err) => setStatus(`Load error: ${err.message}`));
