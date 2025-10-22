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
    await page.waitForTimeout(2000);
    
    // ストレージをクリア
    await page.evaluate(() => {
      indexedDB.deleteDatabase('eigyokeikaku-storage');
      localStorage.clear();
    });
    await page.reload();
    await page.waitForTimeout(2000);
    
    console.log('✅ ストレージをクリアしました\n');

    // 期初データを読み込む
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser.setFiles(detailFilePath);
    await page.waitForTimeout(1000);

    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(3000);

    // ④重点外顧客タブで重点顧客に追加
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    const promoteButton = page.locator('button').filter({ hasText: '重点顧客' }).first();
    await promoteButton.click();
    await page.waitForTimeout(3000);
    
    // ③重点顧客タブ
    console.log('\n✨ 新しいレイアウト確認:\n');
    await page.screenshot({ path: 'perfect_layout.png', fullPage: true });
    console.log('📸 スクリーンショット: perfect_layout.png\n');
    
    console.log('📋 レイアウト構成:');
    console.log('  左側（縦スクロール）:');
    console.log('    ├─ 左上: 中長期の目指す状態（3年後、1年後）');
    console.log('    ├─ 左中: 今半期のゴール状態をイメージ');
    console.log('    └─ 左下: 今半期の営業活動の焦点');
    console.log('');
    console.log('  右側:');
    console.log('    ├─ 右上: 過去イベント履歴（h-64固定、スクロール）');
    console.log('    └─ 右下: 月次計画（たっぷりスペース）');
    console.log('');
    console.log('🎯 視線の流れ:');
    console.log('  左側で計画を練る（中長期→今半期ゴール→営業活動の焦点）');
    console.log('  　　↓');
    console.log('  右上で過去を振り返る');
    console.log('  　　↓');
    console.log('  右下で月次に落とし込む');
    
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();

