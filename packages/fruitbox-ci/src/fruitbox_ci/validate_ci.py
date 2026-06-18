"""Verify CI install commands and fruitbox-ci entrypoints (run in CI or locally)."""

from __future__ import annotations

import os
import subprocess
import sys


def _run(cmd: list[str], *, cwd: str | None = None, env: dict[str, str] | None = None) -> None:
    print("+", " ".join(cmd), flush=True)
    merged = os.environ.copy()
    if env:
        merged.update(env)
    subprocess.run(cmd, check=True, cwd=cwd, env=merged)


from .paths import repo_root


def main() -> None:
    root = str(repo_root())

    syncs: list[list[str]] = [
        ["uv", "sync", "--package", "fruitbox-ci", "--group", "build"],
        [
            "uv",
            "sync",
            "--package",
            "fruitbox-ci",
            "--package",
            "fruitbox-app-onnx",
            "--package",
            "fruitbox-pygame",
            "--package",
            "fruitbox-core",
            "--group",
            "build",
        ],
        [
            "uv",
            "sync",
            "--package",
            "fruitbox-ci",
            "--extra",
            "cpu",
            "--package",
            "fruitbox-app-torch",
            "--package",
            "fruitbox-pygame",
            "--package",
            "fruitbox-core",
            "--group",
            "build",
        ],
    ]

    for cmd in syncs:
        _run(cmd, cwd=root)

    checks: list[list[str]] = [
        ["uv", "run", "fruitbox-ci", "check-exe-size", "/nonexistent.exe"],
        ["uv", "run", "python", "-c", "import huggingface_hub; print('hf ok')"],
    ]

    for cmd in checks:
        _run(cmd, cwd=root)

    # download-onnx with CI env (uses cache if model already present)
    _run(
        ["uv", "run", "fruitbox-ci", "download-onnx"],
        cwd=root,
        env={
            "HF_MODEL_REPO": "Fungster/fruitbox-ppo",
            "HF_MODEL_REVISION": "main",
            "HF_ONNX_FILE": "fruitbox_policy.onnx",
        },
    )

    print("validate-ci: all checks passed", flush=True)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as exc:
        print(f"validate-ci: failed ({exc.returncode})", file=sys.stderr)
        raise SystemExit(exc.returncode) from exc
