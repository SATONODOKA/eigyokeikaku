const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  const page = await browser.newPage();
  
  page.on('dialog', async dialog => {
    console.log(`📢 ${dialog.message()}`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1500);
    console.log('✅ ホーム画面を開きました\n');

    // 期初データを読み込む
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser.setFiles(detailFilePath);
    await page.waitForTimeout(1000);
    console.log('✅ 期初データを選択\n');

    // 実行ボタンをクリック
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(3000);

    // ④重点外顧客タブを確認
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    console.log('\n📊 UIを確認してください：');
    console.log('  - 社名が改行されて見えるか');
    console.log('  - 実績の数字が見えるか（左1/3）');
    console.log('  - 受注済み額が表示されているか（黄色背景）');
    console.log('  - 今期の目指す状態が広く表示されているか');
    console.log('  - Enterで改行できるか\n');

    // スクリーンショット
    await page.screenshot({ path: 'test_final_ui.png', fullPage: true });
    console.log('📸 スクリーンショット: test_final_ui.png\n');
    
    console.log('✅ ブラウザで確認してください。Enterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

