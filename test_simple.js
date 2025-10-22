const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  const page = await browser.newPage();
  
  // アラートをキャプチャ
  page.on('dialog', async dialog => {
    console.log(`📢 アラート: ${dialog.message()}`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('✅ ホーム画面を開きました');

    const filePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    console.log(`📁 ファイル: ${filePath}`);
    
    // 緑のボタン（期初データ）をクリック
    console.log('\n🔄 期初データボタンをクリック...');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser.setFiles(filePath);
    console.log('✅ ファイルを選択');
    await page.waitForTimeout(2000);
    
    // 実行ボタンをクリック
    console.log('\n🔄 実行ボタンをクリック...');
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(4000);
    
    // ④タブに移動（自動遷移しなかった場合）
    try {
      await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
      await page.waitForTimeout(2000);
    } catch (e) {
      // すでに移動している場合はエラーを無視
    }
    
    // データ確認
    const rows = await page.locator('tbody tr').count();
    console.log(`\n📊 テーブルの行数: ${rows}`);
    
    if (rows > 0) {
      console.log('✅ データが読み込まれました！');
    } else {
      console.log('❌ データが読み込まれていません');
    }
    
    await page.screenshot({ path: 'test_simple.png', fullPage: true });
    console.log('📸 スクリーンショット保存');
    
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

