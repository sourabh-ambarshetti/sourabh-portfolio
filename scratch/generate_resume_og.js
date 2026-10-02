const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

async function generateResumeOG() {
  const resumePreviewPath = path.join(__dirname, '../public/resume-preview.png');
  let resumePreviewUri = '';
  if (fs.existsSync(resumePreviewPath)) {
    const b64 = fs.readFileSync(resumePreviewPath).toString('base64');
    resumePreviewUri = `data:image/png;base64,${b64}`;
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
  
  .glow-indigo {
    position: absolute;
    top: -120px;
    left: -100px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0) 70%);
    pointer-events: none;
  }
  .glow-emerald {
    position: absolute;
    bottom: -150px;
    right: -100px;
    width: 650px;
    height: 650px;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 70%);
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
    background: rgba(15, 23, 42, 0.8);
    border: 1.5px solid rgba(148, 163, 184, 0.2);
    border-radius: 24px;
    padding: 44px 50px;
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
  }

  .left-content {
    flex: 1;
    max-width: 620px;
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
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(129, 140, 248, 0.4);
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    color: #a5b4fc;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .format-tag {
    font-size: 13px;
    font-weight: 700;
    color: #34d399;
    background: rgba(16, 185, 129, 0.12);
    padding: 6px 12px;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .hero-titles {
    margin-top: 14px;
    margin-bottom: 12px;
  }
  .name {
    font-size: 46px;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    background: linear-gradient(135deg, #ffffff 40%, #cbd5e1 75%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .role-title {
    font-size: 20px;
    font-weight: 600;
    color: #818cf8;
    margin-top: 6px;
  }
  .client-cred {
    font-size: 14px;
    color: #94a3b8;
    margin-top: 6px;
  }
  .client-cred strong {
    color: #f1f5f9;
  }

  .features-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 12px 0;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #cbd5e1;
    font-weight: 500;
  }
  .feature-icon {
    color: #34d399;
    font-size: 16px;
    font-weight: 800;
  }

  .bottom-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
  }
  .pdf-pill {
    padding: 8px 16px;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.35);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fca5a5;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .url-label {
    font-size: 13px;
    color: #94a3b8;
  }
  .url-label strong {
    color: #e2e8f0;
  }

  .right-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;
    perspective: 1000px;
  }
  .resume-sheet {
    width: 320px;
    height: 440px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(99, 102, 241, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    transform: rotate(2deg);
    transition: transform 0.3s ease;
  }
  .resume-sheet img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
</style>
</head>
<body>
  <div class="glow-indigo"></div>
  <div class="glow-emerald"></div>
  <div class="grid-pattern"></div>

  <div class="card-container">
    <div class="left-content">
      <div>
        <div class="badge-row">
          <div class="status-badge">
            📄 Official Curriculum Vitae
          </div>
          <div class="format-tag">ATS-Optimized · Selectable Text</div>
        </div>

        <div class="hero-titles">
          <h1 class="name">Sourabh Ambarshetti</h1>
          <div class="role-title">Senior Full Stack & Backend Engineer · Applied AI</div>
          <div class="client-cred">Proven Production Systems for <strong>Lenovo · HP · Dell · Hitachi Astemo</strong></div>
        </div>
      </div>

      <div class="features-list">
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span><strong>Single-Column Layout</strong>: 100% parseable by Workday, Greenhouse & Lever</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span><strong>Engineering Metrics</strong>: -77% Ingestion Latency, Zero V8 Crashes, sub-15m Turnaround</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✓</span>
          <span><strong>7+ Years Production Experience</strong>: Node.js, TypeScript, PostgreSQL, Applied AI</span>
        </div>
      </div>

      <div class="bottom-row">
        <div class="pdf-pill">
          ⬇ PDF Format (2 Pages)
        </div>
        <div class="url-label">
          Available at: <strong>sourabh-portfolio-beta.vercel.app</strong>
        </div>
      </div>
    </div>

    <div class="right-content">
      <div class="resume-sheet">
        <img src="${resumePreviewUri}" alt="Resume Preview" />
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
  
  const publicResumeOgPath = path.join(__dirname, '../public/resume-og.png');
  const scratchResumeOgPath = path.join(__dirname, 'resume-og.png');

  await page.screenshot({ path: publicResumeOgPath, type: 'png' });
  await page.screenshot({ path: scratchResumeOgPath, type: 'png' });

  console.log('Saved Resume OG image successfully to:', publicResumeOgPath);
  await browser.close();
}

generateResumeOG().catch(console.error);
