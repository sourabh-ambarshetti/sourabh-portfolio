const { chromium } = require('playwright');
const path = require('path');

async function testMobileResponsiveness() {
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'iphone_14', width: 390, height: 844, isMobile: true },
    { name: 'iphone_se', width: 375, height: 667, isMobile: true },
    { name: 'android_412', width: 412, height: 915, isMobile: true },
    { name: 'tablet_768', width: 768, height: 1024, isMobile: false },
  ];

  const summary = [];

  for (const vp of viewports) {
    console.log(`\n========================================`);
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await context.newPage();
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Check horizontal overflow
    const overflowCheck = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const docScrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      
      const elements = Array.from(document.querySelectorAll('*'));
      const overflowingElements = [];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1) {
          overflowingElements.push({
            tag: el.tagName,
            className: el.className || '',
            id: el.id || '',
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
        overflowingElementsCount: overflowingElements.length,
        overflowSample: overflowingElements.slice(0, 5)
      };
    });

    console.log(`Horizontal scroll detected: ${overflowCheck.hasHorizontalScroll}`);
    console.log(`docWidth: ${overflowCheck.docWidth}, docScrollWidth: ${overflowCheck.docScrollWidth}, bodyScrollWidth: ${overflowCheck.bodyScrollWidth}`);
    if (overflowCheck.hasHorizontalScroll) {
      console.log('Overflowing elements:', JSON.stringify(overflowCheck.overflowSample, null, 2));
    } else {
      console.log('✅ ZERO horizontal scroll! Viewport is 100% contained.');
    }

    // Save full page screenshot
    const screenshotPath = path.join(__dirname, `${vp.name}_v2.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved screenshot: ${screenshotPath}`);

    // Test mobile drawer toggle
    if (vp.isMobile && vp.name === 'iphone_14') {
      const hamburger = await page.$('.mobile-toggle-btn');
      if (hamburger) {
        console.log('\nTesting mobile drawer menu...');
        await hamburger.click();
        await page.waitForTimeout(400); // animation wait
        
        const isDrawerVisible = await page.isVisible('.mobile-drawer');
        console.log(`Mobile drawer opened successfully: ${isDrawerVisible}`);
        
        const drawerScreenshotPath = path.join(__dirname, 'iphone_14_drawer_v2.png');
        await page.screenshot({ path: drawerScreenshotPath });
        console.log(`Saved drawer screenshot: ${drawerScreenshotPath}`);
        
        // Click to close
        await hamburger.click();
        await page.waitForTimeout(400);
      }
    }

    summary.push({
      viewport: vp.name,
      dimensions: `${vp.width}x${vp.height}`,
      hasHorizontalScroll: overflowCheck.hasHorizontalScroll,
      bodyScrollWidth: overflowCheck.bodyScrollWidth,
      docWidth: overflowCheck.docWidth
    });

    await context.close();
  }

  await browser.close();
  console.log('\n========================================');
  console.log('FINAL RESPONSIVENESS REPORT:');
  console.log('========================================');
  console.table(summary);
}

testMobileResponsiveness().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
