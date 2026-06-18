"""
Fruit Box — pygbag WASM entry point (main.py is pygbag's required filename).

Build:       uv run python tools/build_web.py
Local dev:   uv run python -m fruitbox_web
"""
import asyncio
import os
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
if _HERE not in sys.path:
    sys.path.insert(0, _HERE)

# pygbag: init pygame before asyncio.run (see pygame-web/pygbag docs)
import pygame  # noqa: E402

pygame.init()


async def main():
    import traceback

    try:
        from fruitbox_web.menu import WebMenu

        await WebMenu().run()
        pygame.quit()
    except Exception:
        traceback.print_exc()
        raise


asyncio.run(main())
