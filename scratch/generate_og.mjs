// Renders public/og-image.png (link preview card). Usage: node scratch/generate_og.mjs
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const photo = fs.readFileSync(path.join(root, "public", "sourabh.jpg")).toString("base64");

const html = `<html><body style="margin:0;width:1200px;height:630px;background:#fafaf9;font-family:'Segoe UI',Roboto,Arial,sans-serif;color:#1c1917;display:flex;align-items:center;">
  <div style="padding:0 90px;display:flex;align-items:center;gap:64px;width:100%">
    <div style="flex:1">
      <div style="font-size:66px;font-weight:700;letter-spacing:-1.5px;line-height:1.1">Sourabh Ambarshetti</div>
      <div style="font-size:32px;color:#1d4ed8;font-weight:500;margin-top:14px">Senior Full Stack Engineer</div>
      <div style="font-size:26px;color:#57534e;margin-top:26px;line-height:1.5">Angular · Node.js · NestJS · TypeScript<br>7+ years in enterprise SaaS and fintech</div>
      <div style="font-size:22px;color:#78716c;margin-top:36px">Pune, India · sourabh-portfolio-beta.vercel.app</div>
    </div>
    <img src="data:image/jpeg;base64,${photo}" style="width:260px;height:260px;border-radius:50%;object-fit:cover;border:1px solid #e7e5e4">
  </div>
</body></html>`;

async function launch() {
  for (const channel of [undefined, "msedge", "chrome"]) {
    try { return await chromium.launch({ channel }); } catch {}
  }
  throw new Error("No Chromium browser found. Run: npx playwright install chromium");
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.screenshot({ path: path.join(root, "public", "og-image.png") });
await browser.close();
console.log("Wrote public/og-image.png");
