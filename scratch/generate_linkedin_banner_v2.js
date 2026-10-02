const { chromium } = require('@playwright/test');
const path = require('path');

async function generateBannerV2() {
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
  }

  /* Ambient Glows */
  .glow-avatar {
    position: absolute;
    top: 50%;
    left: 175px;
    transform: translate(-50%, -50%);
    width: 380px;
    height: 380px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.28) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%);
    pointer-events: none;
  }
  .glow-top-right {
    position: absolute;
    top: -100px;
    right: -50px;
    width: 600px;
    height: 500px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%);
    pointer-events: none;
  }

  /* Architectural Grid */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
  }

  /* Avatar Halo Ring (Precisely placed where LinkedIn positions your avatar) */
  .avatar-halo {
    position: absolute;
    left: 80px;
    top: 50%;
    transform: translateY(-50%);
    width: 210px;
    height: 210px;
    border-radius: 50%;
    border: 2px dashed rgba(56, 189, 248, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar-halo-inner {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  /* Content Block - Placed safely to the right with large, bold typography */
  .content {
    margin-left: 330px;
    width: 1200px;
    height: 100%;
    padding: 38px 40px 38px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10;
  }

  /* Header Row */
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(14, 165, 233, 0.15);
    border: 1.5px solid rgba(56, 189, 248, 0.45);
    padding: 7px 18px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 800;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .dot {
    width: 8px;
    height: 8px;
    background: #38bdf8;
    border-radius: 50%;
    box-shadow: 0 0 10px #38bdf8;
  }
  .exp-pill {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 7px 18px;
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 700;
    color: #cbd5e1;
  }

  /* Title Block */
  .name {
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -0.025em;
    line-height: 1.05;
    background: linear-gradient(135deg, #ffffff 45%, #e2e8f0 75%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .title {
    font-size: 22px;
    font-weight: 700;
    color: #38bdf8;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .title-sub {
    color: #cbd5e1;
    font-weight: 500;
    font-size: 19px;
  }

  /* Enterprise & Metrics Banner */
  .highlight-band {
    background: rgba(15, 23, 42, 0.85);
    border: 1.5px solid rgba(148, 163, 184, 0.22);
    border-radius: 14px;
    padding: 12px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }
  .clients-box {
    display: flex;
    align-items: center;
    gap: 12px;
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
    gap: 9px;
  }
  .chip {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 5px 13px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.02em;
  }

  .metrics-box {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .metric {
    font-size: 14.5px;
    font-weight: 700;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .metric span {
    font-size: 17px;
    font-weight: 900;
  }
  .metric.cyan span { color: #38bdf8; }
  .metric.green span { color: #34d399; }
  .metric.purple span { color: #c084fc; }

  /* Bottom Row */
  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stack-items {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .stack-label {
    font-size: 13px;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-right: 4px;
  }
  .pill {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    padding: 5px 12px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 700;
    color: #e2e8f0;
  }
  .site-pill {
    background: rgba(14, 165, 233, 0.15);
    border: 1.5px solid rgba(56, 189, 248, 0.4);
    padding: 6px 16px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 800;
    color: #38bdf8;
  }
</style>
</head>
<body>
  <div class="glow-avatar"></div>
  <div class="glow-top-right"></div>
  <div class="grid-pattern"></div>

  <!-- Halo that surrounds your avatar photo on LinkedIn -->
  <div class="avatar-halo">
    <div class="avatar-halo-inner"></div>
  </div>

  <div class="content">
    <div class="header-row">
      <div class="badge">
        <div class="dot"></div>
        Senior Full Stack & Backend Systems Architect
      </div>
      <div class="exp-pill">
        7+ Years Production Experience
      </div>
    </div>

    <div>
      <h1 class="name">Sourabh Ambarshetti</h1>
      <div class="title">
        High-Throughput Distributed Systems
        <span style="color:#475569;">•</span>
        <span class="title-sub">Applied AI (RAG & Autonomous Agents)</span>
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
      <div class="stack-items">
        <span class="stack-label">Core Stack:</span>
        <span class="pill">Node.js (v18/v20)</span>
        <span class="pill">TypeScript</span>
        <span class="pill">Python</span>
        <span class="pill">PostgreSQL</span>
        <span class="pill">Redis</span>
        <span class="pill">AWS / Docker</span>
      </div>
      <div class="site-pill">
        🌐 sourabh-portfolio-beta.vercel.app
      </div>
    </div>
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1584, height: 396 } });
  await page.setContent(html, { waitUntil: 'networkidle' });

  const publicBannerPath = path.join(__dirname, '../public/linkedin-banner.png');
  const scratchBannerPath = path.join(__dirname, 'linkedin-banner-v2.png');

  await page.screenshot({ path: publicBannerPath, type: 'png' });
  await page.screenshot({ path: scratchBannerPath, type: 'png' });

  console.log('Saved High-Legibility Banner V2 to:');
  console.log('-', publicBannerPath);
  console.log('-', scratchBannerPath);

  await browser.close();
}

generateBannerV2().catch(console.error);
