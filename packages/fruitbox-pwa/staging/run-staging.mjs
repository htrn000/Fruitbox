import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}/Fruitbox/`;

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: false, ...opts });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not ready: ${url}`);
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

  if ((await page.locator(".error-inline").count()) > 0) {
    const msg = await page.locator(".error-inline").innerText();
    throw new Error(`Single player failed: ${msg}`);
  }

  await page.locator("canvas").waitFor({ state: "visible", timeout: 10000 });
  const hasGridPixels = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return false;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    const { width, height } = canvas;
    const sample = ctx.getImageData(0, 80, width, Math.min(200, height - 80));
    let nonBg = 0;
    for (let i = 0; i < sample.data.length; i += 4) {
      if (sample.data[i] + sample.data[i + 1] + sample.data[i + 2] < 700) nonBg++;
    }
    return nonBg > 100;
  });

  await browser.close();
  if (!hasGridPixels) throw new Error(`Canvas empty. Errors: ${errors.join("; ")}`);
  if (errors.length) throw new Error(`Console errors: ${errors.join("; ")}`);
}

const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(PORT)], {
  cwd: new URL("..", import.meta.url).pathname,
  stdio: "ignore",
});

try {
  await waitForServer(BASE);
  process.env.STAGING_URL = BASE;
  await runSinglePlayer();
  console.log("STAGING OK — single player renders grid");
} finally {
  preview.kill("SIGTERM");
}
