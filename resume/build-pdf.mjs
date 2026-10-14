// Renders resume/resume.html to public/Sourabh_Ambarshetti_Resume.pdf.
// Usage: npm run resume
import { chromium } from "@playwright/test";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const source = pathToFileURL(path.join(dir, "resume.html")).href;
const output = path.join(dir, "..", "public", "Sourabh_Ambarshetti_Resume.pdf");

// Fall back to the system's Edge or Chrome when Playwright's own browser isn't downloaded.
async function launch() {
  for (const channel of [undefined, "msedge", "chrome"]) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error("No Chromium browser found. Run: npx playwright install chromium");
}

const browser = await launch();
const page = await browser.newPage();
await page.goto(source, { waitUntil: "load" });
await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });
await browser.close();

console.log(`Wrote ${output}`);
