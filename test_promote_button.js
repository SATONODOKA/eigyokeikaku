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

    // 実行ボタンをクリック
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(3000);

    // ④重点外顧客タブを確認
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    console.log('\n📊 確認ポイント：');
    console.log('  1. 受注済み額（黄色背景）に数字が表示されているか');
    console.log('  2. 操作列に「削除」と「重点顧客にする」ボタンがあるか');
    console.log('  3. 社名が改行されて全文見えるか');
    console.log('  4. 数字の列幅が適切か（左1/3）');
    console.log('  5. テキストエリアが広く、Enterで改行できるか\n');

    // スクリーンショット
    await page.screenshot({ path: 'test_promote_button.png', fullPage: true });
    console.log('📸 スクリーンショット: test_promote_button.png\n');

    console.log('次に「重点顧客にする」ボタンをテストします...');
    await page.waitForTimeout(2000);
    
    // 最初の顧客を重点顧客にする
    const promoteButtons = await page.locator('button').filter({ hasText: '重点顧客' }).all();
    if (promoteButtons.length > 0) {
      console.log('\n「重点顧客にする」ボタンをクリック...');
      await promoteButtons[0].click();
      await page.waitForTimeout(3000);
      
      // ③重点顧客タブに移動したか確認
      const activeTab = await page.locator('button').filter({ hasText: '③重点顧客' }).getAttribute('class');
      console.log('③重点顧客タブに移動:', activeTab?.includes('bg-teal') ? 'はい' : 'いいえ');
      
      await page.screenshot({ path: 'test_focus_tab.png', fullPage: true });
      console.log('📸 スクリーンショット: test_focus_tab.png\n');
    }
    
    console.log('✅ テスト完了。ブラウザで確認してください。Enterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

