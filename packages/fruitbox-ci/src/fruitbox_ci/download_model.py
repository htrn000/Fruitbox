"""Download fruitbox_ppo_final.zip for CI / Windows builds."""

from __future__ import annotations

import os

from .hf import ensure_artifact


def _is_zip(path: str) -> bool:
    with open(path, "rb") as handle:
        return handle.read(2) == b"PK"


def _validate_zip(path: str) -> None:
    if not _is_zip(path):
        raise ValueError(f"{path} does not look like a zip archive")


def main() -> None:
    filename = os.environ["HF_MODEL_FILE"]
    dest = os.path.join(os.getcwd(), filename)
    ensure_artifact(
        filename=filename,
        dest=dest,
        validate=_validate_zip,
        exists_ok=_is_zip,
        label="model",
        extra_help=(
            "Optional mitigations: set HF_TOKEN, FRUITBOX_MODEL_MIRROR_URL, "
            "or publish fruitbox_ppo_final.zip to GitHub Releases."
        ),
    )


if __name__ == "__main__":
    main()
