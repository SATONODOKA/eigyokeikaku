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
  
  page.on('console', msg => {
    if (msg.text().includes('受注済み額') || msg.text().includes('order')) {
      console.log('🔍', msg.text());
    }
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

    // 実行ボタンをクリック
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(3000);

    // ④重点外顧客タブ
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    // 最初の行のデータを取得
    const firstRow = page.locator('tbody tr').first();
    const cells = await firstRow.locator('td').all();
    
    console.log('\n📊 最初の行のデータ:');
    for (let i = 0; i < Math.min(10, cells.length); i++) {
      const text = await cells[i].textContent();
      console.log(`  列${i}: "${text?.trim()}"`);
    }
    
    // 受注済み額の列を特定
    const order37Cell = await cells[7]?.textContent();
    const order38Cell = await cells[8]?.textContent();
    console.log(`\n受注済み額:`);
    console.log(`  37下期受注済（列7）: "${order37Cell?.trim()}"`);
    console.log(`  38上期受注済（列8）: "${order38Cell?.trim()}"`);

    // スクリーンショット
    await page.screenshot({ path: 'debug_base_tab.png', fullPage: true });
    console.log('\n📸 スクリーンショット: debug_base_tab.png');
    
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

