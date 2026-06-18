"""Fail CI if a built executable exceeds the size budget."""

from __future__ import annotations

import os
import sys

LIMIT_MB = 700


def main() -> None:
    paths = sys.argv[1:] or ["dist/fruitbox.exe", "dist/fruitbox-onnx.exe"]
    failed = False
    for path in paths:
        if not os.path.isfile(path):
            print(f"WARNING: missing {path}", file=sys.stderr)
            continue
        size_mb = os.path.getsize(path) / 1024 / 1024
        status = "OK" if size_mb <= LIMIT_MB else "FAIL"
        print(f"{status}: {path} = {size_mb:.1f} MB (limit {LIMIT_MB} MB)")
        if size_mb > LIMIT_MB:
            failed = True
    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
