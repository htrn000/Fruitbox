import {
  boolMaskToArray,
  ndarrayToFloat32,
  ndarrayToInt8,
  type PyodideRuntime,
  type PyProxy,
} from "./loader";

interface FruitBoxEnvPy extends PyProxy {
  game: PyProxy;
  reset(): void;
  _obs(): PyProxy;
  action_masks(): PyProxy;
  _decode(action: number): PyProxy;
}

export class CoreEnv {
  private py: FruitBoxEnvPy;

  private constructor(pyEnv: PyProxy) {
    this.py = pyEnv as FruitBoxEnvPy;
  }

  static create(runtime: PyodideRuntime, gridType = "random"): CoreEnv {
    const mod = runtime.pyimport("fruitbox_core.env");
    const FruitBoxEnv = mod.FruitBoxEnv as new (opts?: Record<string, unknown>) => PyProxy;
    const pyEnv = new FruitBoxEnv({ grid_type: gridType }) as FruitBoxEnvPy;
    pyEnv.reset();
    return new CoreEnv(pyEnv);
  }

  get game(): PyProxy {
    return this.py.game;
  }

  obs(): { grid: Int8Array; score: Float32Array } {
    const obsProxy = this.py._obs();
    const get = obsProxy.get as (k: string) => PyProxy;
    return {
      grid: ndarrayToInt8(get("grid")),
      score: ndarrayToFloat32(get("score")),
    };
  }

  actionMasks(): boolean[] {
    return boolMaskToArray(this.py.action_masks());
  }

  decodeAction(action: number): [number, number, number, number] {
    const decoded = this.py._decode(action);
    return decoded.toJs?.({ create_proxies: false }) as [number, number, number, number];
  }

  reset(): void {
    this.py.reset();
  }

  destroy(): void {
    this.py.destroy?.();
  }
}
