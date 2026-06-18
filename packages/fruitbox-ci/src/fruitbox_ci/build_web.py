"""Build the legacy pygbag web app."""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys

from .paths import repo_root

HF_REPO = "Fungster/fruitbox-ppo"
HF_ONNX_FILE = "fruitbox_policy.onnx"

_ORT_INJECT = """\
    <!-- onnxruntime-web: must load before Python so `ort` is in global scope -->
    <script src="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort.min.js"></script>
    <script>
        window._ort_tensor = (type, data, dims) => new ort.Tensor(type, data, dims);
        if (typeof ort !== "undefined") { ort.env.wasm.numThreads = 1; }
    </script>
"""


def _inject_ort(out_dir: str) -> None:
    path = os.path.join(out_dir, "index.html")
    with open(path, encoding="utf-8") as handle:
        html = handle.read()
    if "onnxruntime-web" in html:
        print("  ort script already present, skipping injection")
        return
    html = html.replace("</head>", _ORT_INJECT + "</head>", 1)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(html)
    print("  Injected onnxruntime-web script into index.html")


def _ensure_onnx(onnx_path: str) -> None:
    if os.path.isfile(onnx_path):
        return
    print(f"ONNX model not found locally, downloading from Hugging Face ({HF_REPO})...")
    try:
        from huggingface_hub import hf_hub_download
    except ImportError as exc:
        raise SystemExit("huggingface_hub is required") from exc
    cached = hf_hub_download(
        HF_REPO,
        HF_ONNX_FILE,
        token=os.environ.get("HF_TOKEN") or None,
    )
    os.makedirs(os.path.dirname(onnx_path), exist_ok=True)
    shutil.copy2(cached, onnx_path)
    print(f"Downloaded {onnx_path} ({os.path.getsize(onnx_path):,} bytes)")


def build() -> str:
    root = str(repo_root())
    src = os.path.join(root, "src")
    onnx = os.path.join(root, "web_assets", HF_ONNX_FILE)
    out_dir = os.path.join(src, "build", "web")

    _ensure_onnx(onnx)
    print("Building web app with pygbag...")
    subprocess.run([sys.executable, "-m", "pygbag", "--build", src], check=True, cwd=root)

    print(f"Copying ONNX model to {out_dir}/{HF_ONNX_FILE}")
    os.makedirs(out_dir, exist_ok=True)
    shutil.copy2(onnx, os.path.join(out_dir, HF_ONNX_FILE))
    _inject_ort(out_dir)
    print(f"\nBuild complete: {out_dir}")
    return out_dir


def serve() -> None:
    import http.server
    import socketserver

    out_dir = os.path.join(str(repo_root()), "src", "build", "web")
    os.chdir(out_dir)
    port = 8000
    print(f"Serving at http://localhost:{port}/  (Ctrl+C to stop)")
    with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
        httpd.serve_forever()


def main() -> None:
    parser = argparse.ArgumentParser(description="Build legacy pygbag web app")
    parser.add_argument("--serve", action="store_true")
    args = parser.parse_args()
    build()
    if args.serve:
        serve()


if __name__ == "__main__":
    main()
