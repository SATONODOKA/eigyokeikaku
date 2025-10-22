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

    // 1. ③重点顧客タブを確認（空の状態）
    console.log('📋 ③重点顧客タブをチェック...');
    await page.locator('button').filter({ hasText: '③重点顧客' }).click();
    await page.waitForTimeout(1500);
    
    const emptyMessage = await page.locator('text=まだ重点顧客が登録されていません').isVisible();
    console.log(`  - 空メッセージ表示: ${emptyMessage ? '✅' : '❌'}\n`);
    
    await page.screenshot({ path: 'test_empty_focus.png', fullPage: true });
    console.log('📸 スクリーンショット: test_empty_focus.png\n');

    // 2. ⓪ホームタブに戻って期初データを読み込む
    await page.locator('button').filter({ hasText: '⓪ホーム' }).click();
    await page.waitForTimeout(1000);
    
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser.setFiles(detailFilePath);
    await page.waitForTimeout(1000);

    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(3000);

    // 3. ④重点外顧客タブを確認
    console.log('📊 ④重点外顧客タブをチェック...');
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    console.log('  - テキストエリアの自動リサイズをテスト中...');
    
    // 最初の行の「どんな状態に...」欄に長文を入力
    const firstTextarea = page.locator('textarea').filter({ hasText: /どんな状態に/ }).first();
    await firstTextarea.click();
    await firstTextarea.fill('これは長い文章です。\n改行すると高さが自動的に広がるはずです。\nもう1行追加します。\nさらに追加。');
    await page.waitForTimeout(1000);
    
    console.log('  - 長文入力完了\n');
    
    await page.screenshot({ path: 'test_base_tab_resize.png', fullPage: true });
    console.log('📸 スクリーンショット: test_base_tab_resize.png\n');

    // 4. 重点顧客にするボタンをテスト
    console.log('🎯 「重点顧客にする」ボタンをテスト...');
    const promoteButton = page.locator('button').filter({ hasText: '重点顧客' }).first();
    await promoteButton.click();
    await page.waitForTimeout(3000);
    
    // ③重点顧客タブに移動したか確認
    const focusCustomerName = await page.locator('button').filter({ hasText: '株式会社' }).first().textContent();
    console.log(`  - 追加された顧客: ${focusCustomerName}\n`);
    
    await page.screenshot({ path: 'test_focus_with_customer.png', fullPage: true });
    console.log('📸 スクリーンショット: test_focus_with_customer.png\n');

    console.log('✅ すべてのテスト完了！\n');
    console.log('確認ポイント:');
    console.log('  1. ③重点顧客タブで「まだ登録がありません」メッセージが表示される');
    console.log('  2. ④重点外顧客タブでテキストエリアが改行で自動拡大する');
    console.log('  3. 「重点顧客にする」ボタンで③に追加される');
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

