const { chromium } = require('playwright');

(async () => {
  // ヘッドフルモード（ブラウザが見える）で起動
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300  // 操作をゆっくり見せる
  });
  const page = await browser.newPage();
  
  // ホーム画面
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  console.log('✅ ブラウザを起動しました。ホーム画面を表示しています。');
  console.log('   確認が終わったらEnterキーを押してください...');
  
  // ユーザーの確認を待つ
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });
  
  await browser.close();
})();

