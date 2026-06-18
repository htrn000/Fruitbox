"""Verify pygbag web build artifacts (used by CI)."""
import os
import sys
import tarfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "src", "build", "web")

REQUIRED_FILES = (
    "index.html",
    "src.tar.gz",
    "fruitbox_policy.onnx",
    "favicon.png",
)

INDEX_MARKERS = (
    "cdn.jsdelivr.net/npm/browserfs",
    "onnxruntime-web",
)

TAR_PREFIXES = (
    "assets/main.py",
    "assets/fruitbox_core/",
    "assets/fruitbox_pygame/",
    "assets/fruitbox_web/",
    "assets/pygame_gui/",
)


def main() -> None:
    errors: list[str] = []

    for name in REQUIRED_FILES:
        path = os.path.join(OUT_DIR, name)
        if not os.path.isfile(path):
            errors.append(f"missing required file: {path}")
        elif os.path.getsize(path) == 0:
            errors.append(f"empty file: {path}")

    index_path = os.path.join(OUT_DIR, "index.html")
    if os.path.isfile(index_path):
        html = open(index_path, encoding="utf-8").read()
        for marker in INDEX_MARKERS:
            if marker not in html:
                errors.append(f"index.html missing marker: {marker!r}")

    tar_path = os.path.join(OUT_DIR, "src.tar.gz")
    if os.path.isfile(tar_path):
        with tarfile.open(tar_path, "r:gz") as tar:
            names = tar.getnames()
        for prefix in TAR_PREFIXES:
            if not any(n.startswith(prefix) for n in names):
                errors.append(f"src.tar.gz missing bundled path prefix: {prefix!r}")

    if errors:
        for err in errors:
            print(err, file=sys.stderr)
        raise SystemExit(1)

    print(f"Web build verification passed ({OUT_DIR})")


if __name__ == "__main__":
    main()
