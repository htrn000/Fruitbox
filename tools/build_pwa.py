"""
Build the Fruit Box PWA (Vite + Pyodide + sql.js).

Usage:
    uv run python tools/build_pwa.py          # build only
    uv run python tools/build_pwa.py --serve  # build + preview server
"""
from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PWA = os.path.join(ROOT, "packages", "fruitbox-pwa")
CORE = os.path.join(ROOT, "packages", "fruitbox-core")
ONNX_SRC = os.path.join(ROOT, "web_assets", "fruitbox_policy.onnx")
ONNX_DST = os.path.join(PWA, "public", "fruitbox_policy.onnx")
WHEELS_DIR = os.path.join(PWA, "public", "wheels")
DIST = os.path.join(PWA, "dist")

HF_REPO = "Fungster/fruitbox-ppo"
HF_ONNX_FILE = "fruitbox_policy.onnx"


def _run(cmd: list[str], *, cwd: str | None = None) -> None:
    print("+", " ".join(cmd))
    subprocess.run(cmd, check=True, cwd=cwd or ROOT)


def _ensure_onnx() -> None:
    if os.path.isfile(ONNX_SRC):
        src = ONNX_SRC
    else:
        print(f"ONNX model not found locally, downloading from Hugging Face ({HF_REPO})...")
        try:
            from huggingface_hub import hf_hub_download
        except ImportError as exc:
            raise SystemExit("huggingface_hub is required") from exc
        src = hf_hub_download(
            HF_REPO,
            HF_ONNX_FILE,
            token=os.environ.get("HF_TOKEN") or None,
        )
        os.makedirs(os.path.dirname(ONNX_SRC), exist_ok=True)
        shutil.copy2(src, ONNX_SRC)
    os.makedirs(os.path.dirname(ONNX_DST), exist_ok=True)
    shutil.copy2(src, ONNX_DST)
    print(f"Copied ONNX → {ONNX_DST}")


def _build_core_wheel() -> str:
    out = os.path.join(ROOT, "dist")
    uv = shutil.which("uv") or "uv"
    _run([uv, "build", "--package", "fruitbox-core", "-o", out])
    wheels = sorted(glob.glob(os.path.join(out, "fruitbox_core-*.whl")))
    if not wheels:
        raise SystemExit("fruitbox-core wheel not produced")
    os.makedirs(WHEELS_DIR, exist_ok=True)
    wheel = wheels[-1]
    dest = os.path.join(WHEELS_DIR, os.path.basename(wheel))
    shutil.copy2(wheel, dest)
    print(f"Copied wheel → {dest}")
    return dest


def _npm_install() -> None:
    if not shutil.which("npm"):
        raise SystemExit("npm is required to build fruitbox-pwa")
    _run(["npm", "install"], cwd=PWA)


def _vite_build() -> None:
    env = os.environ.copy()
    env.setdefault("VITE_BASE", "/Fruitbox/")
    _run(["npm", "run", "build"], cwd=PWA)


def build() -> str:
    os.makedirs(WHEELS_DIR, exist_ok=True)
    _ensure_onnx()
    _build_core_wheel()
    _npm_install()
    _vite_build()
    print(f"\nPWA build complete: {DIST}")
    return DIST


def serve() -> None:
    _run(["npm", "run", "preview", "--", "--host"], cwd=PWA)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--serve", action="store_true")
    args = parser.parse_args()
    build()
    if args.serve:
        serve()
