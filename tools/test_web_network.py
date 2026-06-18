"""Check network failures loading fruitbox web."""
import asyncio
from playwright.async_api import async_playwright


async def main():
    fails = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        page.on("requestfailed", lambda req: fails.append(f"{req.url} -> {req.failure}"))
        page.on("console", lambda msg: None)
        await page.goto("http://127.0.0.1:8000/", wait_until="networkidle", timeout=180_000)
        await asyncio.sleep(60)
        print("FAILURES:")
        for f in fails:
            print(f)
        await browser.close()


asyncio.run(main())
