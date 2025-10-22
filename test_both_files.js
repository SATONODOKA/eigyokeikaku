const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800
  });
  const page = await browser.newPage();
  
  // アラートをキャプチャ
  page.on('dialog', async dialog => {
    console.log(`\n📢 ${dialog.message()}\n`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('✅ ホーム画面を開きました\n');

    // 1. 業績計画用レポート（ダミー）を読み込む
    const spaFilePath = path.join(__dirname, '業績計画用レポート_ダミー.xlsx');
    console.log(`📁 業績計画用レポート: ${spaFilePath}`);
    
    const [fileChooser1] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '業績計画用レポートを読み込む' }).click()
    ]);
    
    await fileChooser1.setFiles(spaFilePath);
    await page.waitForTimeout(2000);
    console.log('✅ 業績計画用レポートを選択\n');

    // 2. 期初データ（詳細版）を読み込む
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    console.log(`📁 期初データ: ${detailFilePath}`);
    
    const [fileChooser2] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser2.setFiles(detailFilePath);
    await page.waitForTimeout(2000);
    console.log('✅ 期初データを選択\n');

    // 3. 実行ボタンをクリック
    console.log('🔄 実行ボタンをクリック...\n');
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(4000);

    // 4. ②業績計画タブを確認
    console.log('\n=== ②業績計画タブのデータ確認 ===\n');
    await page.locator('button').filter({ hasText: '②業績計画' }).click();
    await page.waitForTimeout(2000);
    
    // Bヨミの行数を確認
    const bYomiRows = await page.locator('text=Bヨミ').locator('..').locator('tbody tr').count();
    console.log(`Bヨミの行数: ${bYomiRows}行`);

    // 5. ④重点外顧客タブを確認
    console.log('\n=== ④重点外顧客タブのデータ確認 ===\n');
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    const baseRows = await page.locator('tbody tr').count();
    console.log(`重点外顧客の行数: ${baseRows}行`);
    
    if (baseRows > 0) {
      console.log('\n最初の3社:');
      for (let i = 0; i < Math.min(3, baseRows); i++) {
        const row = page.locator('tbody tr').nth(i);
        const inputs = await row.locator('input').all();
        
        if (inputs.length > 0) {
          const name = await inputs[0].inputValue();
          const val1 = await inputs[1].inputValue();
          const val2 = await inputs[2].inputValue();
          console.log(`  ${i + 1}. ${name} (36上=${val1}, 36下=${val2})`);
        }
      }
    }

    // スクリーンショット
    await page.screenshot({ path: 'test_both_final.png', fullPage: true });
    console.log('\n📸 スクリーンショット: test_both_final.png');
    
    console.log('\n✅ テスト完了。ブラウザで確認してください。Enterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

