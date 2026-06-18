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

export function callPyMethod<T>(obj: PyProxy, method: string, ...args: unknown[]): T {
  const fn = obj[method];
  if (typeof fn !== "function") {
    throw new Error(`${method} is not callable on Python object`);
  }
  return (fn as (...a: unknown[]) => T).call(obj, ...args);
}

export function gridToJs(gridProxy: PyProxy, rows: number, cols: number): number[][] {
  const js = gridProxy.toJs?.({ depth: -1, create_proxies: false });

  if (Array.isArray(js) && js.length > 0 && Array.isArray(js[0])) {
    return js as number[][];
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

export function ndarrayToFloat32(arrProxy: PyProxy): Float32Array {
  const js = arrProxy.toJs?.({ create_proxies: false });
  if (js instanceof Float32Array) return js;
  if (Array.isArray(js)) return Float32Array.from(js as number[]);
  throw new Error("Expected float array from Python");
}

export function ndarrayToInt8(arrProxy: PyProxy): Int8Array {
  const js = arrProxy.toJs?.({ create_proxies: false });
  if (js instanceof Int8Array) return js;
  if (Array.isArray(js)) return Int8Array.from(js as number[]);
  throw new Error("Expected int8 array from Python");
}

export function boolMaskToArray(maskProxy: PyProxy): boolean[] {
  const js = maskProxy.toJs?.({ create_proxies: false });
  if (Array.isArray(js)) return js as boolean[];
  throw new Error("Expected boolean mask from Python");
}
