import * as ort from "onnxruntime-web/wasm";
import ortWasmUrl from "onnxruntime-web/ort-wasm-simd-threaded.wasm?url";
import ortWasmMjsUrl from "onnxruntime-web/ort-wasm-simd-threaded.mjs?url";
import { GRID_N, HF_ONNX_URL } from "../layout";

export type ModelLoadState = "idle" | "loading" | "ready" | "error";

let sessionPromise: Promise<ort.InferenceSession> | null = null;
let loadState: ModelLoadState = "idle";
let loadError: string | null = null;
let wasmConfigured = false;

const LOCAL_MODEL = `${import.meta.env.BASE_URL}fruitbox_policy.onnx`;
const MODEL_LOAD_TIMEOUT_MS = 120_000;

export function getModelLoadState(): { state: ModelLoadState; error: string | null } {
  return { state: loadState, error: loadError };
}

function configureOrtWasm(): void {
  if (wasmConfigured) return;
  wasmConfigured = true;
  ort.env.wasm.wasmPaths = {
    mjs: ortWasmMjsUrl,
    wasm: ortWasmUrl,
  };
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.simd = true;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error(`${label} timed out after ${Math.round(ms / 1000)}s`));
    }, ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        window.clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/** Load ONNX on demand (VS AI). Single-player does not need this. */
export function preloadOnnxModel(
  onProgress?: (msg: string) => void,
): Promise<ort.InferenceSession> {
  if (sessionPromise) return sessionPromise;

  sessionPromise = (async () => {
    loadState = "loading";
    configureOrtWasm();
    onProgress?.("Loading AI model…");

    const urls = [LOCAL_MODEL, HF_ONNX_URL];
    let lastError: unknown = null;

    for (const url of urls) {
      try {
        onProgress?.(
          `Loading model from ${url.includes("huggingface") ? "Hugging Face" : "local"}…`,
        );
        const session = await withTimeout(
          ort.InferenceSession.create(url, {
            executionProviders: ["wasm"],
          }),
          MODEL_LOAD_TIMEOUT_MS,
          "Model load",
        );
        loadState = "ready";
        loadError = null;
        onProgress?.("AI model ready");
        return session;
      } catch (err) {
        lastError = err;
        console.warn("ONNX load failed for", url, err);
      }
    }

    loadState = "error";
    loadError = String(lastError);
    sessionPromise = null;
    throw lastError;
  })();

  return sessionPromise;
}

export class OnnxAgent {
  private session: ort.InferenceSession;
  private n: number;

  private constructor(session: ort.InferenceSession, n: number) {
    this.session = session;
    this.n = n;
  }

  static async create(onProgress?: (msg: string) => void): Promise<OnnxAgent> {
    const session = await preloadOnnxModel(onProgress);
    return new OnnxAgent(session, GRID_N);
  }

  async predict(
    obs: { grid: Int8Array | number[]; score: Float32Array | number[] },
    actionMasks?: boolean[] | null,
    deterministic = true,
  ): Promise<number> {
    void deterministic;
    const grid = obs.grid instanceof Int8Array ? obs.grid : Int8Array.from(obs.grid);
    const score = obs.score instanceof Float32Array ? obs.score : Float32Array.from(obs.score);

    const gridIn = new Float32Array(grid.length);
    for (let i = 0; i < grid.length; i++) gridIn[i] = grid[i];

    const feeds: Record<string, ort.Tensor> = {
      grid: new ort.Tensor("float32", gridIn, [1, this.n]),
      score: new ort.Tensor("float32", score, [1, 1]),
    };

    const results = await this.session.run(feeds);
    const logits = results.logits?.data as Float32Array;
    if (!logits) throw new Error("ONNX model missing logits output");

    let best = 0;
    let bestVal = -Infinity;
    for (let i = 0; i < logits.length; i++) {
      if (actionMasks && !actionMasks[i]) continue;
      const v = actionMasks && !actionMasks[i] ? -1e9 : logits[i];
      if (v > bestVal) {
        bestVal = v;
        best = i;
      }
    }
    return best;
  }
}
