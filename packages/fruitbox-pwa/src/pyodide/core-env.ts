import {
  boolMaskToArray,
  callPyMethod,
  ndarrayToFloat32,
  ndarrayToInt8,
  type PyodideRuntime,
  type PyProxy,
} from "./loader";

export class CoreEnv {
  private py: PyProxy;

  private constructor(pyEnv: PyProxy) {
    this.py = pyEnv;
  }

  static create(runtime: PyodideRuntime, gridType = "random"): CoreEnv {
    const mod = runtime.pyimport("fruitbox_core.env");
    const FruitBoxEnv = mod.FruitBoxEnv as new (opts?: Record<string, unknown>) => PyProxy;
    const pyEnv = new FruitBoxEnv({ grid_type: gridType });
    callPyMethod(pyEnv, "reset");
    return new CoreEnv(pyEnv);
  }

  get game(): PyProxy {
    return this.py.game as PyProxy;
  }

  obs(): { grid: Int8Array; score: Float32Array } {
    const obsProxy = callPyMethod<PyProxy>(this.py, "_obs");
    const get = obsProxy.get as (k: string) => PyProxy;
    return {
      grid: ndarrayToInt8(get("grid")),
      score: ndarrayToFloat32(get("score")),
    };
  }

  actionMasks(): boolean[] {
    return boolMaskToArray(callPyMethod<PyProxy>(this.py, "action_masks"));
  }

  decodeAction(action: number): [number, number, number, number] {
    const decoded = callPyMethod<PyProxy>(this.py, "_decode", action);
    return decoded.toJs?.({ create_proxies: false }) as [number, number, number, number];
  }

  reset(): void {
    callPyMethod(this.py, "reset");
  }

  destroy(): void {
    this.py.destroy?.();
  }
}
