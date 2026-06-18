"""fruitbox-ci — build scripts and CI helpers for the Fruitbox monorepo."""

from __future__ import annotations

import argparse
import importlib
from collections.abc import Callable

_COMMAND_MODULES: dict[str, str] = {
    "download-onnx": "fruitbox_ci.download_onnx",
    "download-model": "fruitbox_ci.download_model",
    "check-exe-size": "fruitbox_ci.check_exe_size",
    "verify-torch-cpu": "fruitbox_ci.verify_torch_cpu",
    "build-pwa": "fruitbox_ci.build_pwa",
    "build-web": "fruitbox_ci.build_web",
    "export-onnx": "fruitbox_ci.export_onnx",
}


def _load_command(name: str) -> Callable[[], None]:
    module = importlib.import_module(_COMMAND_MODULES[name])
    return module.main


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(
        prog="fruitbox-ci",
        description="CI and build helpers for the Fruitbox monorepo",
    )
    parser.add_argument("command", choices=sorted(_COMMAND_MODULES))
    parser.add_argument("args", nargs=argparse.REMAINDER, help="Arguments passed to the subcommand")
    ns = parser.parse_args(argv)

    if ns.args and ns.args[0] == "--":
        ns.args = ns.args[1:]

    import sys

    prev = sys.argv
    try:
        sys.argv = [ns.command, *ns.args]
        _load_command(ns.command)()
    finally:
        sys.argv = prev


if __name__ == "__main__":
    main()
