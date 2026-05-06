const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // Set viewport to the exact size of the mobile-frame
  const context = await browser.newContext({
    viewport: { width: 400, height: 711 },
    recordVideo: {
      dir: 'videos/',
      size: { width: 400, height: 711 }
    }
  });

  const page = await context.newPage();
  
  // Convert local file path to URL
  const fileUrl = 'file://' + path.resolve(__dirname, 'public/ad.html').replace(/\\/g, '/');
  
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl);
  
  console.log('Recording video for 18 seconds to capture full animation...');
  await page.waitForTimeout(18000); // 18 seconds
  
  console.log('Closing browser and finalizing video file...');
  await context.close();
  await browser.close();
  
  console.log('Done! The ad has been rendered to the videos/ directory.');
})();
