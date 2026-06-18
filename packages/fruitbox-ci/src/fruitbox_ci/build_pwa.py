"""Build the Fruit Box PWA (Vite + Pyodide + sql.js)."""

from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess

from .paths import repo_root

HF_REPO = "Fungster/fruitbox-ppo"
HF_ONNX_FILE = "fruitbox_policy.onnx"


def _run(cmd: list[str], *, cwd: str | None = None, env: dict[str, str] | None = None) -> None:
    print("+", " ".join(cmd))
    subprocess.run(cmd, check=True, cwd=cwd or str(repo_root()), env=env)


def _ensure_onnx(root: str, pwa: str) -> None:
    onnx_src = os.path.join(root, "web_assets", HF_ONNX_FILE)
    onnx_dst = os.path.join(pwa, "public", HF_ONNX_FILE)

    if os.path.isfile(onnx_src):
        src = onnx_src
    else:
        print(f"ONNX model not found locally, downloading from Hugging Face ({HF_REPO})...")
        from huggingface_hub import hf_hub_download

        src = hf_hub_download(
            HF_REPO,
            HF_ONNX_FILE,
            token=os.environ.get("HF_TOKEN") or None,
        )
        os.makedirs(os.path.dirname(onnx_src), exist_ok=True)
        shutil.copy2(src, onnx_src)

    os.makedirs(os.path.dirname(onnx_dst), exist_ok=True)
    shutil.copy2(src, onnx_dst)
    print(f"Copied ONNX → {onnx_dst}")


def _build_core_wheel(root: str, wheels_dir: str) -> str:
    out = os.path.join(root, "dist")
    uv = shutil.which("uv") or "uv"
    _run([uv, "build", "--package", "fruitbox-core", "-o", out])
    wheels = sorted(glob.glob(os.path.join(out, "fruitbox_core-*.whl")))
    if not wheels:
        raise SystemExit("fruitbox-core wheel not produced")
    os.makedirs(wheels_dir, exist_ok=True)
    wheel = wheels[-1]
    dest = os.path.join(wheels_dir, os.path.basename(wheel))
    shutil.copy2(wheel, dest)
    print(f"Copied wheel → {dest}")
    return dest


def build() -> str:
    root = str(repo_root())
    pwa = os.path.join(root, "packages", "fruitbox-pwa")
    wheels_dir = os.path.join(pwa, "public", "wheels")
    dist = os.path.join(pwa, "dist")

    os.makedirs(wheels_dir, exist_ok=True)
    _ensure_onnx(root, pwa)
    _build_core_wheel(root, wheels_dir)

    if not shutil.which("npm"):
        raise SystemExit("npm is required to build fruitbox-pwa")
    _run(["npm", "install"], cwd=pwa)

    env = os.environ.copy()
    env.setdefault("VITE_BASE", "/Fruitbox/")
    print("+ npm run build")
    subprocess.run(["npm", "run", "build"], check=True, cwd=pwa, env=env)

    print(f"\nPWA build complete: {dist}")
    return dist


def serve() -> None:
    pwa = os.path.join(str(repo_root()), "packages", "fruitbox-pwa")
    _run(["npm", "run", "preview", "--", "--host"], cwd=pwa)


def staging() -> None:
    """Build, serve locally, and run browser smoke test (single player)."""
    import time

    pwa = os.path.join(str(repo_root()), "packages", "fruitbox-pwa")
    build()
    proc = subprocess.Popen(
        ["npm", "run", "preview", "--", "--host", "127.0.0.1", "--port", "4173"],
        cwd=pwa,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        time.sleep(2)
        env = os.environ.copy()
    env["STAGING_URL"] = "http://127.0.0.1:4173/Fruitbox/"
        _run(["node", "staging/smoke.mjs", "app"], cwd=pwa, env=env)
        _run(["node", "staging/smoke.mjs", "vs"], cwd=pwa, env=env)
        print("staging: single-player and VS AI smoke tests passed")
    finally:
        proc.terminate()
        proc.wait(timeout=10)


def main() -> None:
    parser = argparse.ArgumentParser(description="Build fruitbox-pwa for GitHub Pages")
    parser.add_argument("--serve", action="store_true", help="preview after build")
    parser.add_argument("--staging", action="store_true", help="build + browser smoke test")
    args = parser.parse_args()
    if args.staging:
        staging()
        return
    build()
    if args.serve:
        serve()


if __name__ == "__main__":
    main()
