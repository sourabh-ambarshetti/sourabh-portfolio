const { chromium } = require('@playwright/test');
const path = require('path');

async function generatePerfectBanner() {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1584px;
    height: 396px;
    background: #060911;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #f8fafc;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Deep subtle ambient gradient background (NO rings, NO circles) */
  .ambient-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 12% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 45%),
                radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 65% 90%, rgba(16, 185, 129, 0.1) 0%, transparent 45%);
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
  }

  /* Content Container: Starts at 380px to GUARANTEE zero overlap with the circular avatar */
  .container {
    margin-left: 380px;
    width: 1140px;
    height: 100%;
    padding: 34px 40px 34px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }

  /* Top Status & Experience Row */
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .status-tag {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(14, 165, 233, 0.14);
    border: 1.5px solid rgba(56, 189, 248, 0.5);
    padding: 7px 18px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 800;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .status-dot {
    width: 9px;
    height: 9px;
    background: #38bdf8;
    border-radius: 50%;
    box-shadow: 0 0 12px #38bdf8;
  }
  .exp-tag {
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.16);
    padding: 7px 18px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 700;
    color: #e2e8f0;
  }

  /* Name & Title Block */
  .hero-block {
    margin: 2px 0;
  }
  .hero-name {
    font-size: 54px;
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  .hero-title {
    font-size: 22px;
    font-weight: 700;
    color: #38bdf8;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .hero-sub {
    color: #cbd5e1;
    font-weight: 500;
    font-size: 19px;
  }

  /* Enterprise Proof & Metrics Band */
  .highlight-band {
    background: rgba(15, 23, 42, 0.85);
    border: 1.5px solid rgba(148, 163, 184, 0.25);
    border-radius: 14px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  }
  .clients-box {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .clients-label {
    font-size: 13px;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .chips {
    display: flex;
    gap: 8px;
  }
  .chip {
    background: rgba(255, 255, 255, 0.09);
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    padding: 5px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
  }

  .metrics-box {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .metric {
    font-size: 14px;
    font-weight: 700;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .metric span {
    font-size: 17px;
    font-weight: 900;
  }
  .metric.cyan span { color: #38bdf8; }
  .metric.green span { color: #34d399; }
  .metric.purple span { color: #c084fc; }

  /* Bottom Stack & Portfolio Link */
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stack-list {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .stack-label {
    font-size: 12.5px;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-right: 4px;
  }
  .pill {
    background: rgba(255, 255, 255, 0.07);
    border: 1.5px solid rgba(255, 255, 255, 0.16);
    padding: 5px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #e2e8f0;
  }
  .portfolio-badge {
    background: rgba(14, 165, 233, 0.16);
    border: 1.5px solid rgba(56, 189, 248, 0.5);
    padding: 7px 18px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 800;
    color: #38bdf8;
    letter-spacing: 0.02em;
  }
</style>
</head>
<body>
  <div class="ambient-bg"></div>
  <div class="grid-pattern"></div>

  <div class="container">
    <div class="top-row">
      <div class="status-tag">
        <div class="status-dot"></div>
        Senior Full Stack & Backend Systems Architect
      </div>
      <div class="exp-tag">
        7+ Years Production Experience
      </div>
    </div>

    <div class="hero-block">
      <h1 class="hero-name">Sourabh Ambarshetti</h1>
      <div class="hero-title">
        High-Throughput Distributed Systems
        <span style="color:#475569;">•</span>
        <span class="hero-sub">Applied AI (RAG & Autonomous Agents)</span>
      </div>
    </div>

    <div class="highlight-band">
      <div class="clients-box">
        <span class="clients-label">Enterprise Architecture:</span>
        <div class="chips">
          <span class="chip">Lenovo</span>
          <span class="chip">HP</span>
          <span class="chip">Dell</span>
          <span class="chip">Hitachi Astemo</span>
        </div>
      </div>

      <div class="metrics-box">
        <div class="metric cyan">
          <span>-77%</span> Latency
        </div>
        <div class="metric green">
          <span>Zero OOM</span> Crashes
        </div>
        <div class="metric purple">
          <span>&lt;15m</span> Fintech Rule Engine
        </div>
      </div>
    </div>

    <div class="bottom-row">
      <div class="stack-list">
        <span class="stack-label">Core Stack:</span>
        <span class="pill">Node.js</span>
        <span class="pill">TypeScript</span>
        <span class="pill">Python</span>
        <span class="pill">PostgreSQL</span>
        <span class="pill">Redis</span>
        <span class="pill">AWS / Docker</span>
      </div>
      <div class="portfolio-badge">
        🌐 sourabh-portfolio-beta.vercel.app
      </div>
    </div>
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1584, height: 396 },
    deviceScaleFactor: 2
  });

  await page.setContent(html, { waitUntil: 'networkidle' });

  const publicBannerPath = path.join(__dirname, '../public/linkedin-banner.png');
  const scratchBannerPath = path.join(__dirname, 'perfect_banner.png');

  await page.screenshot({ path: publicBannerPath, type: 'png' });
  await page.screenshot({ path: scratchBannerPath, type: 'png' });

  console.log('Saved 100% Zero-Overlap Retina Banner successfully!');
  await browser.close();
}

generatePerfectBanner().catch(console.error);
