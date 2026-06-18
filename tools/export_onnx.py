"""Backward-compatible shim — use `uv run fruitbox-ci export-onnx` instead."""

from fruitbox_ci.export_onnx import main

if __name__ == "__main__":
    main()
