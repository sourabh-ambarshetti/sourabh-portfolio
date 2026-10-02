const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function generateBanner() {
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1584px;
    height: 396px;
    background: #070b13;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #f8fafc;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  /* Ambient glowing meshes */
  .glow-left {
    position: absolute;
    top: -100px;
    left: -80px;
    width: 480px;
    height: 480px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.22) 0%, rgba(14, 165, 233, 0) 70%);
    pointer-events: none;
  }
  .glow-center {
    position: absolute;
    bottom: -120px;
    left: 450px;
    width: 600px;
    height: 400px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0) 70%);
    pointer-events: none;
  }
  .glow-right {
    position: absolute;
    top: -80px;
    right: -80px;
    width: 550px;
    height: 450px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, rgba(16, 185, 129, 0) 70%);
    pointer-events: none;
  }

  /* Architectural Grid */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  /* Left Avatar Safe Zone (Subtle aesthetic framing) */
  .avatar-safe-zone {
    width: 320px;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 50px;
  }
  .network-nodes {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 1px dashed rgba(56, 189, 248, 0.25);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .node-inner {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.2);
  }
  .node-tag {
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* Main Content Area (Safely positioned to the right of the avatar) */
  .content-area {
    flex: 1;
    height: 100%;
    padding: 34px 50px 34px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }

  .top-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(14, 165, 233, 0.1);
    border: 1px solid rgba(14, 165, 233, 0.3);
    padding: 5px 14px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 700;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .pulse-dot {
    width: 7px;
    height: 7px;
    background: #38bdf8;
    border-radius: 50%;
    box-shadow: 0 0 10px #38bdf8;
  }
  .experience-badge {
    font-size: 12.5px;
    font-weight: 700;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 5px 14px;
    border-radius: 9999px;
  }

  /* Identity & Titles */
  .identity-block {
    margin-top: 4px;
  }
  .name {
    font-size: 42px;
    font-weight: 900;
    letter-spacing: -0.025em;
    line-height: 1.1;
    background: linear-gradient(135deg, #ffffff 40%, #e2e8f0 75%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle {
    font-size: 18px;
    font-weight: 600;
    color: #38bdf8;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .subtitle-sep {
    color: #475569;
  }
  .subtitle-sub {
    color: #cbd5e1;
    font-weight: 500;
    font-size: 16px;
  }

  /* Enterprise Clients & Impact Band */
  .middle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.14);
    border-radius: 12px;
    padding: 10px 18px;
    margin: 8px 0;
  }
  .clients-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .clients-label {
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .client-chips {
    display: flex;
    gap: 8px;
  }
  .client-chip {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    color: #f1f5f9;
    letter-spacing: 0.02em;
  }

  .metrics-group {
    display: flex;
    gap: 16px;
  }
  .metric-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: #cbd5e1;
    font-weight: 600;
  }
  .metric-item strong {
    color: #34d399;
  }
  .metric-item.indigo strong {
    color: #a78bfa;
  }

  /* Bottom Tech Stack & Portfolio Bar */
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stack-pills {
    display: flex;
    gap: 7px;
    align-items: center;
  }
  .stack-label {
    font-size: 11px;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-right: 4px;
  }
  .pill {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    color: #cbd5e1;
  }
  .portfolio-link-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(14, 165, 233, 0.12);
    border: 1px solid rgba(14, 165, 233, 0.35);
    padding: 5px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #38bdf8;
  }
</style>
</head>
<body>
  <div class="glow-left"></div>
  <div class="glow-center"></div>
  <div class="glow-right"></div>
  <div class="grid-pattern"></div>

  <!-- Safe area on the left where the circular avatar sits -->
  <div class="avatar-safe-zone">
    <div class="network-nodes">
      <div class="node-inner"></div>
    </div>
  </div>

  <!-- High-impact content area on the right -->
  <div class="content-area">
    <div class="top-meta-row">
      <div class="status-pill">
        <div class="pulse-dot"></div>
        Senior & Staff Backend Systems Architect
      </div>
      <div class="experience-badge">7+ Years Production Experience</div>
    </div>

    <div class="identity-block">
      <h1 class="name">Sourabh Ambarshetti</h1>
      <div class="subtitle">
        Senior Full Stack & Backend Engineer
        <span class="subtitle-sep">/</span>
        <span class="subtitle-sub">Applied AI (RAG & Autonomous Agents)</span>
      </div>
    </div>

    <div class="middle-row">
      <div class="clients-group">
        <span class="clients-label">Enterprise Architecture:</span>
        <div class="client-chips">
          <span class="client-chip">Lenovo</span>
          <span class="client-chip">HP</span>
          <span class="client-chip">Dell</span>
          <span class="client-chip">Hitachi Astemo</span>
        </div>
      </div>
      <div class="metrics-group">
        <div class="metric-item">
          <strong>-77%</strong> Ingestion Latency
        </div>
        <div class="metric-item indigo">
          <strong>Zero OOM</strong> Heap Crashes
        </div>
        <div class="metric-item">
          <strong>&lt;15m</strong> Fintech Rule Engine
        </div>
      </div>
    </div>

    <div class="bottom-row">
      <div class="stack-pills">
        <span class="stack-label">Stack:</span>
        <span class="pill">Node.js (v18/v20)</span>
        <span class="pill">TypeScript</span>
        <span class="pill">Python</span>
        <span class="pill">PostgreSQL</span>
        <span class="pill">Redis</span>
        <span class="pill">FastAPI</span>
        <span class="pill">AWS / Docker</span>
      </div>
      <div class="portfolio-link-badge">
        🌐 sourabh-portfolio-beta.vercel.app
      </div>
    </div>
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1584, height: 396 }
  });

  await page.setContent(html, { waitUntil: 'networkidle' });

  const publicBannerPath = path.join(__dirname, '../public/linkedin-banner.png');
  const scratchBannerPath = path.join(__dirname, 'linkedin-banner.png');

  await page.screenshot({ path: publicBannerPath, type: 'png' });
  await page.screenshot({ path: scratchBannerPath, type: 'png' });

  console.log('Saved LinkedIn Banner to:');
  console.log('-', publicBannerPath);
  console.log('-', scratchBannerPath);

  await browser.close();
}

generateBanner().catch(console.error);
