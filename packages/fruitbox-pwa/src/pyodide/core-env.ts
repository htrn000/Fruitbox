import {
  boolMaskToArray,
  ndarrayToFloat32,
  ndarrayToInt8,
  pyDictGet,
  type PyodideRuntime,
  type PyProxy,
} from "./loader";

interface FruitBoxEnvPy extends PyProxy {
  game: PyProxy;
  reset(): void;
  _obs(): PyProxy;
  action_masks(): PyProxy;
  _decode(action: number): [number, number, number, number];
}

export class CoreEnv {
  private py: FruitBoxEnvPy;

  private constructor(pyEnv: PyProxy) {
    this.py = pyEnv as FruitBoxEnvPy;
  }

  static create(runtime: PyodideRuntime, gridType = "random"): CoreEnv {
    const mod = runtime.pyimport("fruitbox_core.env");
    const FruitBoxEnv = mod.FruitBoxEnv as (
      rows: number,
      cols: number,
      dtPerStep: number,
      gridType: string,
    ) => PyProxy;
    const pyEnv = FruitBoxEnv(10, 17, 1.0, gridType) as FruitBoxEnvPy;
    pyEnv.reset();
    return new CoreEnv(pyEnv);
  }

  get game(): PyProxy {
    return this.py.game;
  }

  obs(): { grid: Int8Array; score: Float32Array } {
    const obsProxy = this.py._obs();
    return {
      grid: ndarrayToInt8(pyDictGet(obsProxy, "grid")),
      score: ndarrayToFloat32(pyDictGet(obsProxy, "score")),
    };
  }

  actionMasks(): boolean[] {
    return boolMaskToArray(this.py.action_masks());
  }

  decodeAction(action: number): [number, number, number, number] {
    return this.py._decode(action);
  }

  reset(): void {
    this.py.reset();
  }

  destroy(): void {
    this.py.destroy?.();
  }
}
