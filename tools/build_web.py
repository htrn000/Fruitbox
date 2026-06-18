"""
Build the Fruit Box web app using pygbag.

Usage:
    uv run python tools/build_web.py          # build only
    uv run python tools/build_web.py --serve  # build + local preview server
"""
import argparse
import os
import re
import shutil
import subprocess
import sys
import sysconfig

ROOT    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC     = os.path.join(ROOT, "src")
ONNX    = os.path.join(ROOT, "web_assets", "fruitbox_policy.onnx")
OUT_DIR = os.path.join(SRC, "build", "web")

# Workspace packages copied into src/ so pygbag bundles them in src.tar.gz
VENDOR_PACKAGES = (
    ("packages/fruitbox-core/src/fruitbox_core", "fruitbox_core"),
    ("packages/fruitbox-pygame/src/fruitbox_pygame", "fruitbox_pygame"),
    ("packages/fruitbox-web/src/fruitbox_web", "fruitbox_web"),
)

# Pure-Python deps not included in pygbag's runtime — copy from the build venv
THIRD_PARTY_PACKAGES = ("pygame_gui", "i18n")

# pygame_gui ships ~40MB of CJK fonts; keep only fonts the default theme needs
_PYGAME_GUI_FONT_DROP = (
    "NotoSansSC-Bold.otf",
    "NotoSansSC-Regular.otf",
    "NotoSansKR-Regular.ttf",
    "NotoSansKR-Bold.ttf",
    "NotoSansJP-Bold.otf",
    "NotoSansJP-Regular.otf",
    "NotoSansArabic-Regular.ttf",
    "NotoSansArabic-Bold.ttf",
)

HF_REPO      = "Fungster/fruitbox-ppo"
HF_ONNX_FILE = "fruitbox_policy.onnx"

# pygbag 0.9.3 template points at a BrowserFS file missing from the pygbag CDN
_BROWSERFS_JS = "https://cdn.jsdelivr.net/npm/browserfs@1.4.3/dist/browserfs.min.js"


_ORT_INJECT = """\
    <!-- onnxruntime-web: must load before Python so `ort` is in global scope -->
    <script src="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort.min.js"></script>
    <script>
        window._ort_tensor = (type, data, dims) => new ort.Tensor(type, data, dims);
        if (typeof ort !== "undefined") { ort.env.wasm.numThreads = 1; }
    </script>
"""


def _vendor_packages():
    """Copy workspace packages into src/ for pygbag to bundle."""
    print("Vendoring workspace packages into src/...")
    for rel_src, name in VENDOR_PACKAGES:
        src_pkg = os.path.join(ROOT, rel_src)
        dst_pkg = os.path.join(SRC, name)
        if not os.path.isdir(src_pkg):
            raise SystemExit(f"Missing package source: {src_pkg}")
        if os.path.exists(dst_pkg):
            shutil.rmtree(dst_pkg)
        shutil.copytree(
            src_pkg,
            dst_pkg,
            ignore=shutil.ignore_patterns("__pycache__", "*.pyc", "*.pyo"),
        )
        print(f"  {name}")

    site_pkgs = sysconfig.get_paths()["purelib"]
    print("Vendoring third-party packages into src/...")
    for name in THIRD_PARTY_PACKAGES:
        src_pkg = os.path.join(site_pkgs, name)
        dst_pkg = os.path.join(SRC, name)
        if not os.path.isdir(src_pkg):
            raise SystemExit(
                f"Missing third-party package {name!r} in {site_pkgs}. "
                "Run: uv sync --extra cpu --all-packages --group web"
            )
        if os.path.exists(dst_pkg):
            shutil.rmtree(dst_pkg)
        shutil.copytree(
            src_pkg,
            dst_pkg,
            ignore=shutil.ignore_patterns(
                "__pycache__", "*.pyc", "*.pyo",
                "data/translations",
                "data/licenses",
                "__pyinstaller",
            ),
        )
        if name == "pygame_gui":
            data_dir = os.path.join(dst_pkg, "data")
            for fname in _PYGAME_GUI_FONT_DROP:
                path = os.path.join(data_dir, fname)
                if os.path.isfile(path):
                    os.remove(path)
        print(f"  {name}")

    for stray in ("main_full.py", "main_minimal.py"):
        path = os.path.join(SRC, stray)
        if os.path.isfile(path):
            os.remove(path)


def _patch_index_html(out_dir):
    """Fix pygbag template issues and inject onnxruntime-web."""
    path = os.path.join(out_dir, "index.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()

    html, n = re.subn(
        r'<script src="[^"]*browserfs\.min\.js"></script>',
        f'<script src="{_BROWSERFS_JS}"></script>',
        html,
        count=1,
        flags=re.I,
    )
    if n:
        print("  Patched BrowserFS script URL in index.html")

    if "onnxruntime-web" not in html:
        html = html.replace("</head>", _ORT_INJECT + "</head>", 1)
        print("  Injected onnxruntime-web script into index.html")

    if re.search(r"autorun\s*:\s*0", html):
        html = re.sub(r"autorun\s*:\s*0", "autorun : 1", html, count=1)
        print("  Enabled autorun in index.html")

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)


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
    _vendor_packages()
    print("Building web app with pygbag...")
    subprocess.run(
        [
            sys.executable, "-m", "pygbag",
            "--build",
            "--no_opt",
            "--ume_block", "0",
            "--title", "Fruit Box",
            SRC,
        ],
        check=True,
        cwd=ROOT,
    )

    print(f"Copying ONNX model to {OUT_DIR}/fruitbox_policy.onnx")
    os.makedirs(OUT_DIR, exist_ok=True)
    shutil.copy2(ONNX, os.path.join(OUT_DIR, "fruitbox_policy.onnx"))

    _patch_index_html(OUT_DIR)

    print(f"\nBuild complete: {OUT_DIR}")


def serve():
    """Serve the build with headers suitable for pygbag WASM."""
    import mimetypes
    from functools import partial
    from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

    if ".wasm" not in mimetypes.types_map:
        mimetypes.add_type("application/wasm", ".wasm")

    class Handler(SimpleHTTPRequestHandler):
        def end_headers(self):
            self.send_header("Cross-Origin-Opener-Policy", "same-origin")
            self.send_header("Cross-Origin-Embedder-Policy", "credentialless")
            self.send_header("Access-Control-Allow-Origin", "*")
            super().end_headers()

    port = 8000
    bind = "127.0.0.1"
    handler = partial(Handler, directory=OUT_DIR)
    print(f"Serving at http://{bind}:{port}/  (Ctrl+C to stop)")
    with ThreadingHTTPServer((bind, port), handler) as httpd:
        httpd.serve_forever()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--serve", action="store_true", help="start a local preview server after building")
    args = parser.parse_args()

    build()
    if args.serve:
        serve()
