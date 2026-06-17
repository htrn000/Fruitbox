"""
Fruit Box — pygbag WASM entry point (main.py is pygbag's required filename).

Build:       python tools/build_web.py
Local dev:   uv run python -m fruitbox_web
"""
import asyncio
import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
if _HERE not in sys.path:
    sys.path.insert(0, _HERE)


async def main():
    import pygame

    # WASM: install pure-Python packages via micropip before importing game modules.
    # Must happen before any `import fruitbox*` since those pull in pygame_gui / gymnasium.
    try:
        import js  # only available in pyodide  # noqa: F401
        import micropip
        await micropip.install(["pygame_gui", "gymnasium"])
    except ImportError:
        pass  # local run — packages already installed

    from fruitbox_web.menu import WebMenu  # deferred: needs pygame_gui

    pygame.init()
    await WebMenu().run()
    pygame.quit()


asyncio.run(main())
