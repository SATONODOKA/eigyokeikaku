const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800
  });
  const page = await browser.newPage();
  
  page.on('dialog', async dialog => {
    console.log(`📢 ${dialog.message()}`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1500);

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

    // ④重点外顧客タブ
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    console.log('\n📊 ④重点外顧客タブのボタンをチェック...\n');
    
    // 最初の行の操作ボタンエリアを確認
    const firstRow = page.locator('tbody tr').first();
    const operationCell = firstRow.locator('td').last();
    
    // セル内のボタンを探す
    const buttons = await operationCell.locator('button').all();
    console.log(`  操作列のボタン数: ${buttons.length}`);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const isVisible = await buttons[i].isVisible();
      console.log(`  ボタン${i + 1}: "${text?.trim()}" (表示: ${isVisible})`);
    }
    
    console.log('\n📸 スクリーンショットを撮影...');
    await page.screenshot({ path: 'test_buttons_detail.png', fullPage: true });
    
    // 削除ボタンをクリックしてみる
    console.log('\n🔴 削除ボタンをテスト...');
    const deleteButton = operationCell.locator('button').filter({ hasText: '削除' });
    const deleteVisible = await deleteButton.isVisible();
    console.log(`  削除ボタンが見える: ${deleteVisible}`);
    
    if (deleteVisible) {
      await deleteButton.click();
      await page.waitForTimeout(2000);
      console.log('  削除ボタンをクリック成功！');
    }
    
    // 重点顧客にするボタンをクリックしてみる
    console.log('\n🟦 重点顧客にするボタンをテスト...');
    const promoteButton = operationCell.locator('button').filter({ hasText: '重点顧客' });
    const promoteVisible = await promoteButton.isVisible();
    console.log(`  重点顧客ボタンが見える: ${promoteVisible}`);
    
    if (promoteVisible) {
      await promoteButton.click();
      await page.waitForTimeout(2000);
      console.log('  重点顧客ボタンをクリック成功！');
    }
    
    console.log('\n✅ テスト完了。Enterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();

