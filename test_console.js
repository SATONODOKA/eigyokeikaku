const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  const page = await browser.newPage();
  
  // コンソールログを全て表示
  page.on('console', msg => {
    console.log(`🖥️  ${msg.text()}`);
  });

  // アラートをキャプチャ
  page.on('dialog', async dialog => {
    console.log(`\n📢 アラート: ${dialog.message()}\n`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('\n✅ ホーム画面を開きました\n');

    const filePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    console.log(`📁 ファイル: ${filePath}\n`);
    
    // 期初データボタンをクリック
    console.log('🔄 期初データボタンをクリック...\n');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser.setFiles(filePath);
    await page.waitForTimeout(2000);
    console.log('✅ ファイルを選択しました\n');
    
    // 実行ボタンをクリック
    console.log('🔄 実行ボタンをクリック...\n');
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(5000);
    
    console.log('\n✅ テスト完了。Enterキーで終了...\n');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

