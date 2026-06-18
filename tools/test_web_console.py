"""Capture browser console output and canvas state for the fruitbox web build."""
import asyncio
import sys

from playwright.async_api import async_playwright


async def main():
    url = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8000/"
    wait_s = int(sys.argv[2]) if len(sys.argv) > 2 else 180
    logs: list[str] = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page(viewport={"width": 1280, "height": 720})

        page.on("console", lambda msg: logs.append(f"[{msg.type}] {msg.text}"))
        page.on("pageerror", lambda err: logs.append(f"[pageerror] {err}"))

        await page.goto(url, wait_until="domcontentloaded", timeout=120_000)
        isolated = await page.evaluate("() => crossOriginIsolated")
        print(f"crossOriginIsolated={isolated}")

        for selector in ("#infobox", "#canvas", "text=Click", "text=Loading"):
            try:
                loc = page.locator(selector).first
                if await loc.count() > 0:
                    await loc.click(timeout=2000, force=True)
                    await asyncio.sleep(1)
            except Exception:
                pass

        for elapsed in range(0, wait_s, 30):
            await asyncio.sleep(30)
            canvas_info = await page.evaluate(
                """() => {
                    const c = document.getElementById('canvas');
                    if (!c) return {missing: true};
                    const ctx = c.getContext('2d');
                    if (!ctx) return {noctx: true, w: c.width, h: c.height};
                    const d = ctx.getImageData(0, 0, Math.min(64,c.width), Math.min(64,c.height)).data;
                    let nonbg = 0;
                    for (let i = 0; i < d.length; i += 4) {
                        if (d[i] > 10 || d[i+1] > 10 || d[i+2] > 10) nonbg++;
                    }
                    return {w: c.width, h: c.height, nonbg, infobox: document.getElementById('infobox')?.innerText};
                }"""
            )
            print(f"[{elapsed+30}s] canvas={canvas_info} log_lines={len(logs)}")

        print(f"--- captured {len(logs)} console lines ---")
        for line in logs:
            if any(k in line.lower() for k in ("error", "traceback", "exception", "fruit", "default.tmpl", "installing")):
                print(line)

        await page.screenshot(path="/tmp/fruitbox_web_test.png", full_page=True)
        print("screenshot: /tmp/fruitbox_web_test.png")
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
