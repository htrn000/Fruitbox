import { chromium } from "playwright";

const BASE = process.env.STAGING_URL ?? "http://127.0.0.1:4173/Fruitbox/";

async function runProbe() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`));

  await page.goto(`${BASE}staging/pyodide-probe.html`, { waitUntil: "networkidle", timeout: 180000 });
  await page.waitForFunction(() => document.getElementById("log")?.textContent?.includes("done"), null, {
    timeout: 180000,
  });

  const text = await page.locator("#log").innerText();
  console.log("=== PROBE OUTPUT ===");
  console.log(text);
  console.log("=== CONSOLE ===");
  for (const line of logs) console.log(line);

  await browser.close();

  if (!text.includes("grid rows: 10") && !text.includes("grid shape: 10x17")) {
    throw new Error("Pyodide probe did not produce a valid grid");
  }
}

async function runSinglePlayer() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(() => !document.getElementById("loading-screen"), null, { timeout: 180000 });

  await page.getByRole("button", { name: /single player/i }).click();
  await page.waitForTimeout(2000);

  const errorText = await page.locator(".error-inline").count();
  if (errorText > 0) {
    const msg = await page.locator(".error-inline").innerText();
    throw new Error(`Single player failed: ${msg}`);
  }

  const canvas = page.locator("canvas");
  await canvas.waitFor({ state: "visible", timeout: 10000 });

  const hasGridPixels = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return false;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    const { width, height } = canvas;
    const sample = ctx.getImageData(0, 80, width, Math.min(200, height - 80));
    let nonBg = 0;
    for (let i = 0; i < sample.data.length; i += 4) {
      const r = sample.data[i];
      const g = sample.data[i + 1];
      const b = sample.data[i + 2];
      if (r + g + b < 700) nonBg++;
    }
    return nonBg > 100;
  });

  await browser.close();

  if (!hasGridPixels) {
    throw new Error(`Single player canvas appears empty. Errors: ${errors.join("; ")}`);
  }
  if (errors.length) {
    throw new Error(`Console errors during single player: ${errors.join("; ")}`);
  }
}

async function main() {
  const mode = process.argv[2] ?? "all";
  if (mode === "probe" || mode === "all") await runProbe();
  if (mode === "app" || mode === "all") await runSinglePlayer();
  console.log("STAGING OK");
}

main().catch((err) => {
  console.error("STAGING FAILED:", err);
  process.exit(1);
});
