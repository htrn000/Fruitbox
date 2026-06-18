"""Export MaskablePPO policy to ONNX."""

from __future__ import annotations

import argparse
import os

import numpy as np
import torch
import torch.nn as nn
from sb3_contrib import MaskablePPO
from sb3_contrib.common.wrappers import ActionMasker

from fruitbox_core.env import FruitBoxEnv

from .paths import repo_root


class _PolicyWrapper(nn.Module):
    def __init__(self, policy):
        super().__init__()
        self.features_extractor = policy.features_extractor
        self.mlp_extractor = policy.mlp_extractor
        self.action_net = policy.action_net

    def forward(self, grid: torch.Tensor, score: torch.Tensor) -> torch.Tensor:
        obs = {"grid": grid, "score": score}
        features = self.features_extractor(obs)
        latent_pi, _ = self.mlp_extractor(features)
        return self.action_net(latent_pi)


def export(model_path: str, output_path: str) -> None:
    print(f"Loading model from '{model_path}' ...")
    model = MaskablePPO.load(model_path, device="cpu")
    model.policy.eval()

    wrapper = _PolicyWrapper(model.policy)
    wrapper.eval()

    n = 170
    dummy_grid = torch.zeros(1, n, dtype=torch.float32)
    dummy_score = torch.zeros(1, 1, dtype=torch.float32)

    with torch.no_grad():
        test_out = wrapper(dummy_grid, dummy_score)
    print(f"Policy output shape: {tuple(test_out.shape)}  (expected [1, {n * n}])")

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    print(f"Exporting to '{output_path}' ...")
    torch.onnx.export(
        wrapper,
        (dummy_grid, dummy_score),
        output_path,
        input_names=["grid", "score"],
        output_names=["logits"],
        dynamic_axes={
            "grid": {0: "batch"},
            "score": {0: "batch"},
            "logits": {0: "batch"},
        },
        opset_version=17,
        dynamo=False,
    )
    print(f"Exported — {os.path.getsize(output_path) / 1_000_000:.1f} MB")


def validate(model_path: str, output_path: str, n_games: int = 10) -> None:
    try:
        import onnxruntime as ort
    except ImportError:
        print("onnxruntime not installed — skipping validation")
        return

    print(f"\nValidating against SB3 on {n_games} random board states ...")
    model = MaskablePPO.load(model_path, device="cpu")
    sess = ort.InferenceSession(output_path, providers=["CPUExecutionProvider"])

    def mask_fn(env):
        return env.action_masks()

    env = ActionMasker(FruitBoxEnv(), mask_fn)
    rows, cols = env.env.rows, env.env.cols
    n = rows * cols

    for i in range(n_games):
        obs, _ = env.reset()
        done = False
        steps = 0
        while not done:
            masks = env.env.action_masks()
            sb3_action, _ = model.predict(obs, action_masks=masks, deterministic=True)
            grid_in = obs["grid"].astype(np.float32).reshape(1, n)
            score_in = obs["score"].astype(np.float32).reshape(1, 1)
            logits = sess.run(["logits"], {"grid": grid_in, "score": score_in})[0][0]
            logits[~masks] = -1e9
            onnx_action = int(np.argmax(logits))
            if int(sb3_action) != onnx_action:
                print(f"  game {i} step {steps}: SB3={int(sb3_action)}  ONNX={onnx_action}  MISMATCH")
            steps += 1
            obs, _, terminated, truncated, _ = env.step(int(sb3_action))
            done = terminated or truncated
        print(f"  game {i + 1}: {steps} steps")
    print("Validation complete — any MISMATCH lines above indicate export issues.")


def main() -> None:
    root = repo_root()
    default_out = str(root / "web_assets" / "fruitbox_policy.onnx")
    parser = argparse.ArgumentParser(description="Export MaskablePPO policy to ONNX")
    parser.add_argument("--model", default="fruitbox_ppo_final")
    parser.add_argument("--out", default=default_out)
    parser.add_argument("--no-validate", action="store_true")
    args = parser.parse_args()

    export(args.model, args.out)
    if not args.no_validate:
        validate(args.model, args.out)


if __name__ == "__main__":
    main()
