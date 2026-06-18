import { PYODIDE_CDN } from "../layout";

export type PyodideRuntime = {
  runPythonAsync: (code: string) => Promise<unknown>;
  pyimport: (name: string) => PyProxy;
  FS: {
    writeFile: (path: string, data: Uint8Array) => void;
  };
  loadPackage: (names: string | string[]) => Promise<void>;
};

export type PyProxy = {
  [key: string]: unknown;
  toJs?: (opts?: { depth?: number; create_proxies?: boolean }) => unknown;
  destroy?: () => void;
};

let pyodidePromise: Promise<PyodideRuntime> | null = null;

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideRuntime>;
  }
}

async function loadPyodideScript(): Promise<void> {
  if (window.loadPyodide) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${PYODIDE_CDN}pyodide.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide"));
    document.head.appendChild(script);
  });
}

export async function initPyodide(
  onStatus?: (msg: string) => void,
  wheelUrl?: string,
): Promise<PyodideRuntime> {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    onStatus?.("Loading Python runtime…");
    await loadPyodideScript();
    if (!window.loadPyodide) throw new Error("loadPyodide missing");

    const pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    onStatus?.("Loading numpy…");
    await pyodide.loadPackage("numpy");
    await pyodide.loadPackage("micropip");

    const wheel = wheelUrl ?? `${import.meta.env.BASE_URL}wheels/fruitbox_core-0.1.0-py3-none-any.whl`;
    onStatus?.("Installing fruitbox-core…");
    await pyodide.runPythonAsync(`
import micropip
await micropip.install("gymnasium")
await micropip.install("${wheel}")
`);

    onStatus?.("Python ready");
    return pyodide;
  })();

  return pyodidePromise;
}

export function gridToJs(gridProxy: PyProxy, rows: number, cols: number): number[][] {
  const tolist = (gridProxy as { tolist?: () => number[][] }).tolist;
  if (typeof tolist === "function") {
    const grid = tolist.call(gridProxy);
    if (grid.length === rows && grid[0]?.length === cols) {
      return grid;
    }
  }

  const js = gridProxy.toJs?.({ depth: -1, create_proxies: false });

  if (Array.isArray(js) && js.length === rows) {
    const grid: number[][] = [];
    for (const row of js) {
      if (Array.isArray(row)) {
        grid.push(row as number[]);
        continue;
      }
      if (row instanceof Int8Array || row instanceof Int32Array || row instanceof Float64Array) {
        grid.push(Array.from(row));
        continue;
      }
      if (row && typeof row === "object" && typeof (row as PyProxy).toJs === "function") {
        const inner = (row as PyProxy).toJs?.({ create_proxies: false });
        if (Array.isArray(inner)) {
          grid.push(inner as number[]);
          continue;
        }
        if (inner instanceof Int8Array || inner instanceof Int32Array || inner instanceof Float64Array) {
          grid.push(Array.from(inner));
          continue;
        }
      }
      break;
    }
    if (grid.length === rows && grid[0]?.length === cols) {
      return grid;
    }
  }

  const flat: number[] =
    js instanceof Int8Array || js instanceof Int32Array || js instanceof Float64Array
      ? Array.from(js)
      : Array.isArray(js)
        ? (js as number[])
        : [];

  if (flat.length === rows * cols) {
    const grid: number[][] = [];
    for (let row = 0; row < rows; row++) {
      grid.push(flat.slice(row * cols, (row + 1) * cols));
    }
    return grid;
  }

  throw new Error(`Unexpected grid shape: ${flat.length} values for ${rows}x${cols}`);
}

export function pyDictGet(dict: PyProxy, key: string): PyProxy {
  const d = dict as { get(key: string): PyProxy };
  return d.get(key);
}

export function ndarrayToFloat32(arrProxy: PyProxy): Float32Array {
  const tolist = (arrProxy as { tolist?: () => number[] }).tolist;
  if (typeof tolist === "function") {
    return Float32Array.from(tolist.call(arrProxy));
  }
  const js = arrProxy.toJs?.({ create_proxies: false });
  if (js instanceof Float32Array) return js;
  if (Array.isArray(js)) return Float32Array.from(js as number[]);
  throw new Error("Expected float array from Python");
}

export function ndarrayToInt8(arrProxy: PyProxy): Int8Array {
  const tolist = (arrProxy as { tolist?: () => number[] }).tolist;
  if (typeof tolist === "function") {
    return Int8Array.from(tolist.call(arrProxy));
  }
  const js = arrProxy.toJs?.({ create_proxies: false });
  if (js instanceof Int8Array) return js;
  if (Array.isArray(js)) return Int8Array.from(js as number[]);
  throw new Error("Expected int8 array from Python");
}

export function boolMaskToArray(maskProxy: PyProxy): boolean[] {
  const tolist = (maskProxy as { tolist?: () => boolean[] }).tolist;
  if (typeof tolist === "function") {
    return tolist.call(maskProxy);
  }
  const js = maskProxy.toJs?.({ create_proxies: false });
  if (Array.isArray(js)) return js as boolean[];
  throw new Error("Expected boolean mask from Python");
}
