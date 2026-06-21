import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const EXEC = "/home/vagent/.cache/ms-playwright/chromium-1148/chrome-linux/chrome";
const BASE = "http://localhost:3210";
const OUT = "/tmp/sca-shots";
mkdirSync(OUT, { recursive: true });

const shots = [
  { path: "/", name: "home", waitSplash: true },
  { path: "/seguimiento?folio=SCA-2025-001", name: "seguimiento", waitSplash: true },
  { path: "/admin/dashboard", name: "admin-dashboard", waitSplash: false },
  { path: "/admin/ordenes", name: "admin-ordenes", waitSplash: false },
];

const viewports = [
  { w: 390, h: 844, tag: "390" },
  { w: 1440, h: 900, tag: "1440" },
];

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const s of shots) {
    // En desktop, las rutas /admin y home son las más representativas.
    if (vp.tag === "1440" && (s.name === "seguimiento" || s.name === "admin-ordenes")) continue;
    await page.goto(BASE + s.path, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(2700); // esperar a que el splash global desaparezca
    await page.screenshot({ path: `${OUT}/${s.name}-${vp.tag}.png`, fullPage: false });
    console.log(`shot ${s.name}-${vp.tag}.png`);
  }
  await ctx.close();
}
await browser.close();
console.log("done");
