const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300
  });
  const page = await browser.newPage();
  
  // すべてのコンソールメッセージをキャプチャ
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      console.log(`🔴 ERROR: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️ WARNING: ${text}`);
    } else if (text.includes('Error') || text.includes('error')) {
      console.log(`❗ ${type}: ${text}`);
    }
  });
  
  // ページエラーをキャプチャ
  page.on('pageerror', error => {
    console.log(`\n❌ PAGE ERROR:`);
    console.log(error.message);
    console.log(error.stack);
  });
  
  try {
    console.log('🌐 http://localhost:3000 を開きます...\n');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('\n📸 スクリーンショットを撮影...');
    await page.screenshot({ path: 'error_check.png', fullPage: true });
    
    console.log('✅ スクリーンショット保存: error_check.png');
    console.log('\nブラウザで確認してください。Enterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();

