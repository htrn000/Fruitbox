"""Download fruitbox_policy.onnx for CI / web builds."""

from __future__ import annotations

import os

from .hf import ensure_artifact


def _validate_onnx(path: str) -> None:
    with open(path, "rb") as handle:
        header = handle.read(8)
    if len(header) < 4:
        raise ValueError(f"{path} is too small to be an ONNX model")


def _exists_ok(path: str) -> bool:
    return os.path.getsize(path) > 1024


def main() -> None:
    filename = os.environ.get("HF_ONNX_FILE", "fruitbox_policy.onnx")
    dest = os.path.join(os.getcwd(), filename)
    ensure_artifact(
        filename=filename,
        dest=dest,
        validate=_validate_onnx,
        exists_ok=_exists_ok,
        label="ONNX",
    )


if __name__ == "__main__":
    main()
