"""
Build the Fruit Box web app using pygbag.

Usage:
    uv run python tools/build_web.py          # build only
    uv run python tools/build_web.py --serve  # build + local preview server
"""
import argparse
import os
import shutil
import subprocess
import sys

ROOT    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC     = os.path.join(ROOT, "src")
ONNX    = os.path.join(ROOT, "web_assets", "fruitbox_policy.onnx")
OUT_DIR = os.path.join(SRC, "build", "web")

HF_REPO      = "Fungster/fruitbox-ppo"
HF_ONNX_FILE = "fruitbox_policy.onnx"


_ORT_INJECT = """\
    <!-- onnxruntime-web: must load before Python so `ort` is in global scope -->
    <script src="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort.min.js"></script>
    <script>
        window._ort_tensor = (type, data, dims) => new ort.Tensor(type, data, dims);
        if (typeof ort !== "undefined") { ort.env.wasm.numThreads = 1; }
    </script>
"""


def _inject_ort(out_dir):
    """Inject the onnxruntime-web <script> into pygbag's generated index.html."""
    path = os.path.join(out_dir, "index.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    if "onnxruntime-web" in html:
        print("  ort script already present, skipping injection")
        return
    html = html.replace("</head>", _ORT_INJECT + "</head>", 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("  Injected onnxruntime-web script into index.html")


def _ensure_onnx():
    if os.path.isfile(ONNX):
        return
    print(f"ONNX model not found locally, downloading from Hugging Face ({HF_REPO})...")
    try:
        from huggingface_hub import hf_hub_download
    except ImportError:
        raise SystemExit("huggingface_hub is required: pip install huggingface_hub")
    try:
        cached = hf_hub_download(
            HF_REPO, HF_ONNX_FILE,
            token=os.environ.get("HF_TOKEN") or None,
        )
    except Exception as exc:
        raise SystemExit(f"Failed to download ONNX model: {exc}")
    os.makedirs(os.path.dirname(ONNX), exist_ok=True)
    shutil.copy2(cached, ONNX)
    print(f"Downloaded {ONNX} ({os.path.getsize(ONNX):,} bytes)")


def build():
    _ensure_onnx()
    print("Building web app with pygbag...")
    subprocess.run(
        [sys.executable, "-m", "pygbag", "--build", SRC],
        check=True,
        cwd=ROOT,
    )

    print(f"Copying ONNX model to {OUT_DIR}/fruitbox_policy.onnx")
    os.makedirs(OUT_DIR, exist_ok=True)
    shutil.copy2(ONNX, os.path.join(OUT_DIR, "fruitbox_policy.onnx"))

    _inject_ort(OUT_DIR)

    print(f"\nBuild complete: {OUT_DIR}")


def serve():
    import http.server
    import socketserver

    os.chdir(OUT_DIR)
    PORT = 8000
    print(f"Serving at http://localhost:{PORT}/  (Ctrl+C to stop)")
    with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        httpd.serve_forever()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--serve", action="store_true", help="start a local preview server after building")
    args = parser.parse_args()

    build()
    if args.serve:
        serve()
