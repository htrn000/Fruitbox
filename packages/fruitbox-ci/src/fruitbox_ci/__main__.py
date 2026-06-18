"""fruitbox-ci — build scripts and CI helpers for the Fruitbox monorepo."""

from __future__ import annotations

import argparse
from collections.abc import Callable

from . import (
    build_pwa,
    build_web,
    check_exe_size,
    download_model,
    download_onnx,
    export_onnx,
    verify_torch_cpu,
)

_COMMANDS: dict[str, Callable[[], None]] = {
    "download-onnx": download_onnx.main,
    "download-model": download_model.main,
    "check-exe-size": check_exe_size.main,
    "verify-torch-cpu": verify_torch_cpu.main,
    "build-pwa": build_pwa.main,
    "build-web": build_web.main,
    "export-onnx": export_onnx.main,
}


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(
        prog="fruitbox-ci",
        description="CI and build helpers for the Fruitbox monorepo",
    )
    parser.add_argument("command", choices=sorted(_COMMANDS))
    parser.add_argument("args", nargs=argparse.REMAINDER, help="Arguments passed to the subcommand")
    ns = parser.parse_args(argv)

    if ns.args and ns.args[0] == "--":
        ns.args = ns.args[1:]

    import sys

    prev = sys.argv
    try:
        sys.argv = [ns.command, *ns.args]
        _COMMANDS[ns.command]()
    finally:
        sys.argv = prev


if __name__ == "__main__":
    main()
