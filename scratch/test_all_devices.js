const { chromium, devices } = require('playwright');
const path = require('path');

async function testAllDevicesAndOrientations() {
  const browser = await chromium.launch({ headless: true });

  const testMatrix = [
    // DESKTOPS & MONITORS
    { category: 'Desktop', name: '4K_Ultrawide', width: 2560, height: 1440, isMobile: false },
    { category: 'Desktop', name: 'Full_HD_1080p', width: 1920, height: 1080, isMobile: false },
    
    // LAPTOPS
    { category: 'Laptop', name: 'MacBook_Pro_16', width: 1536, height: 960, isMobile: false },
    { category: 'Laptop', name: 'Common_Laptop', width: 1366, height: 768, isMobile: false },
    { category: 'Laptop', name: 'Small_Laptop', width: 1280, height: 800, isMobile: false },

    // TABLETS (PORTRAIT & LANDSCAPE)
    { category: 'Tablet', name: 'iPad_Pro_Landscape', width: 1366, height: 1024, isMobile: true, hasTouch: true },
    { category: 'Tablet', name: 'iPad_Pro_Portrait', width: 1024, height: 1366, isMobile: true, hasTouch: true },
    { category: 'Tablet', name: 'iPad_Air_Landscape', width: 1180, height: 820, isMobile: true, hasTouch: true },
    { category: 'Tablet', name: 'iPad_Air_Portrait', width: 820, height: 1180, isMobile: true, hasTouch: true },
    { category: 'Tablet', name: 'iPad_Mini_Portrait', width: 768, height: 1024, isMobile: true, hasTouch: true },
    { category: 'Tablet', name: 'iPad_Mini_Landscape', width: 1024, height: 768, isMobile: true, hasTouch: true },

    // MOBILES - PORTRAIT
    { category: 'Mobile Portrait', name: 'iPhone_14_ProMax_Port', width: 430, height: 932, isMobile: true, hasTouch: true },
    { category: 'Mobile Portrait', name: 'Android_412_Port', width: 412, height: 915, isMobile: true, hasTouch: true },
    { category: 'Mobile Portrait', name: 'iPhone_14_Port', width: 390, height: 844, isMobile: true, hasTouch: true },
    { category: 'Mobile Portrait', name: 'iPhone_SE_Port', width: 375, height: 667, isMobile: true, hasTouch: true },
    { category: 'Mobile Portrait', name: 'Android_Compact_Port', width: 360, height: 800, isMobile: true, hasTouch: true },
    { category: 'Mobile Portrait', name: 'Ultra_Small_Port', width: 320, height: 568, isMobile: true, hasTouch: true },

    // MOBILES - LANDSCAPE ORIENTATION
    { category: 'Mobile Landscape', name: 'iPhone_14_ProMax_Land', width: 932, height: 430, isMobile: true, hasTouch: true },
    { category: 'Mobile Landscape', name: 'Android_412_Land', width: 915, height: 412, isMobile: true, hasTouch: true },
    { category: 'Mobile Landscape', name: 'iPhone_14_Land', width: 844, height: 390, isMobile: true, hasTouch: true },
    { category: 'Mobile Landscape', name: 'Android_Compact_Land', width: 800, height: 360, isMobile: true, hasTouch: true },
    { category: 'Mobile Landscape', name: 'iPhone_SE_Land', width: 667, height: 375, isMobile: true, hasTouch: true },
  ];

  console.log(`Starting matrix test across ${testMatrix.length} device configurations...\n`);

  const results = [];
  let failCount = 0;

  for (const item of testMatrix) {
    const context = await browser.newContext({
      viewport: { width: item.width, height: item.height },
      isMobile: item.isMobile,
      hasTouch: item.hasTouch || false,
    });
    const page = await context.newPage();

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Evaluate layout containment & overflow
    const overflowReport = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const docScrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      
      const elements = Array.from(document.querySelectorAll('*'));
      const overflowingElements = [];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1.5) {
          overflowingElements.push({
            tag: el.tagName,
            className: (el.className || '').toString().slice(0, 40),
            right: Math.round(rect.right),
            docWidth: docWidth
          });
        }
      }

      return {
        docWidth,
        docScrollWidth,
        bodyScrollWidth,
        hasHorizontalScroll: docScrollWidth > docWidth || bodyScrollWidth > docWidth,
        overflowCount: overflowingElements.length,
        sample: overflowingElements.slice(0, 3)
      };
    });

    const isPass = !overflowReport.hasHorizontalScroll;
    if (!isPass) failCount++;

    const statusIcon = isPass ? 'PASS ✅' : 'FAIL ❌';
    console.log(`[${item.category}] ${item.name} (${item.width}x${item.height}): ${statusIcon} (docWidth: ${overflowReport.docWidth}, bodyScroll: ${overflowReport.bodyScrollWidth})`);
    if (!isPass) {
      console.log('   Overflowing sample:', JSON.stringify(overflowReport.sample, null, 2));
    }

    // Save screenshots for select key reference form factors
    const saveKeyShots = [
      'Full_HD_1080p',
      'Common_Laptop',
      'iPad_Pro_Portrait',
      'iPad_Mini_Portrait',
      'iPhone_14_Port',
      'iPhone_14_Land',
      'Android_Compact_Port',
      'Ultra_Small_Port'
    ];

    if (saveKeyShots.includes(item.name)) {
      const shotPath = path.join(__dirname, `device_${item.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
    }

    results.push({
      category: item.category,
      device: item.name,
      resolution: `${item.width}x${item.height}`,
      horizontalScroll: overflowReport.hasHorizontalScroll ? 'YES (FAIL)' : 'NO (PASS)',
      docWidth: overflowReport.docWidth,
      scrollWidth: overflowReport.bodyScrollWidth
    });

    await context.close();
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log(`OVERALL SUMMARY: ${testMatrix.length - failCount}/${testMatrix.length} CONFIGURATIONS PASSED`);
  console.log('========================================================================');
  console.table(results);
}

testAllDevicesAndOrientations().catch(err => {
  console.error('Test matrix execution error:', err);
  process.exit(1);
});
