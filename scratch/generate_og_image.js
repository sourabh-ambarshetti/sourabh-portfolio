const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function generateOG() {
  const photoPath = path.join(__dirname, '../public/sourabh.jpg');
  let photoDataUri = '';
  if (fs.existsSync(photoPath)) {
    const photoBase64 = fs.readFileSync(photoPath).toString('base64');
    photoDataUri = `data:image/jpeg;base64,${photoBase64}`;
  }

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #090d16;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #f8fafc;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Background ambient glows */
  .glow-cyan {
    position: absolute;
    top: -120px;
    left: -100px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(14, 165, 233, 0) 70%);
    pointer-events: none;
  }
  .glow-indigo {
    position: absolute;
    bottom: -150px;
    right: -100px;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0) 70%);
    pointer-events: none;
  }
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
  }

  .card-container {
    width: 1120px;
    height: 550px;
    background: rgba(15, 23, 42, 0.75);
    border: 1.5px solid rgba(148, 163, 184, 0.18);
    border-radius: 24px;
    padding: 44px 50px;
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .left-content {
    flex: 1;
    max-width: 680px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .badge-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.35);
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    color: #34d399;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
  }
  .experience-tag {
    font-size: 13px;
    font-weight: 700;
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 12px;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hero-titles {
    margin-top: 14px;
    margin-bottom: 12px;
  }
  .name {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    background: linear-gradient(135deg, #ffffff 40%, #cbd5e1 75%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .role-title {
    font-size: 21px;
    font-weight: 600;
    color: #38bdf8;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .client-cred {
    font-size: 14px;
    color: #94a3b8;
    margin-top: 6px;
    font-weight: 500;
  }
  .client-cred strong {
    color: #f1f5f9;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 10px;
    margin-bottom: 12px;
  }
  .metric-box {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 12px;
    padding: 10px 14px;
  }
  .metric-val {
    font-size: 20px;
    font-weight: 800;
    color: #38bdf8;
    letter-spacing: -0.01em;
  }
  .metric-val.green {
    color: #34d399;
  }
  .metric-val.indigo {
    color: #a78bfa;
  }
  .metric-label {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 2px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .tech-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
  .pill {
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #e2e8f0;
  }

  .right-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
  }
  .avatar-frame {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    padding: 5px;
    background: linear-gradient(135deg, #0ea5e9, #6366f1, #8b5cf6);
    box-shadow: 0 10px 40px rgba(14, 165, 233, 0.35);
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    background: #1e293b;
    display: block;
  }
  .portfolio-tag {
    margin-top: 24px;
    text-align: center;
    background: rgba(14, 165, 233, 0.1);
    border: 1px solid rgba(14, 165, 233, 0.3);
    border-radius: 12px;
    padding: 8px 18px;
  }
  .portfolio-tag span {
    font-size: 12px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    font-weight: 700;
  }
  .portfolio-tag strong {
    font-size: 14px;
    color: #38bdf8;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="glow-cyan"></div>
  <div class="glow-indigo"></div>
  <div class="grid-pattern"></div>

  <div class="card-container">
    <div class="left-content">
      <div>
        <div class="badge-row">
          <div class="status-badge">
            <div class="status-dot"></div>
            Verified Senior & Lead Engineer
          </div>
          <div class="experience-tag">7+ Years Production Exp</div>
        </div>

        <div class="hero-titles">
          <h1 class="name">Sourabh Ambarshetti</h1>
          <div class="role-title">Senior Full Stack & Backend Engineer · Applied AI</div>
          <div class="client-cred">Enterprise Architecture for <strong>Lenovo · HP · Dell · Hitachi Astemo</strong></div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-box">
          <div class="metric-val">-77% Latency</div>
          <div class="metric-label">Bulk Quote Ingestion</div>
        </div>
        <div class="metric-box">
          <div class="metric-val green">Zero OOM</div>
          <div class="metric-label">V8 Heap Bounds Pruned</div>
        </div>
        <div class="metric-box">
          <div class="metric-val indigo">&lt;15 min Turnaround</div>
          <div class="metric-label">Fintech Rule Engine</div>
        </div>
      </div>

      <div class="tech-pills">
        <span class="pill">Node.js (v18/v20)</span>
        <span class="pill">TypeScript</span>
        <span class="pill">Python / FastAPI</span>
        <span class="pill">PostgreSQL & Redis</span>
        <span class="pill">RAG & Agent Tooling</span>
        <span class="pill">Angular & Next.js</span>
        <span class="pill">AWS / Docker</span>
      </div>
    </div>

    <div class="right-content">
      <div class="avatar-frame">
        <img class="avatar-img" src="${photoDataUri}" alt="Sourabh Ambarshetti" />
      </div>
      <div class="portfolio-tag">
        <span>Live Portfolio & Case Studies</span>
        <strong>sourabh-portfolio-beta.vercel.app</strong>
      </div>
    </div>
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 }
  });

  await page.setContent(html, { waitUntil: 'networkidle' });
  
  const publicOgPath = path.join(__dirname, '../public/og-image.png');
  const publicThumbPath = path.join(__dirname, '../public/thumbnail.png');
  const scratchOgPath = path.join(__dirname, 'og-image.png');

  await page.screenshot({ path: publicOgPath, type: 'png' });
  await page.screenshot({ path: publicThumbPath, type: 'png' });
  await page.screenshot({ path: scratchOgPath, type: 'png' });

  console.log('Saved OG images successfully to:');
  console.log('-', publicOgPath);
  console.log('-', publicThumbPath);
  console.log('-', scratchOgPath);

  await browser.close();
}

generateOG().catch(console.error);
