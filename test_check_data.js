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
    console.log(`📢 ${dialog.message()}`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('✅ ホーム画面を開きました\n');

    const filePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    
    // 期初データボタンをクリック
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.locator('button').filter({ hasText: '期初データを読み込む' }).click()
    ]);
    
    await fileChooser.setFiles(filePath);
    await page.waitForTimeout(2000);
    console.log('✅ ファイルを選択\n');
    
    // 実行ボタンをクリック
    await page.locator('button').filter({ hasText: '実行' }).click();
    await page.waitForTimeout(4000);
    
    // ④タブが開いているはず
    console.log('\n=== ④重点外顧客タブのデータ確認 ===\n');
    
    // テーブルの行数を確認
    const rows = await page.locator('tbody tr').count();
    console.log(`テーブルの行数: ${rows}行\n`);
    
    if (rows > 0) {
      console.log('最初の5社のデータ:');
      for (let i = 0; i < Math.min(5, rows); i++) {
        const row = page.locator('tbody tr').nth(i);
        const inputs = await row.locator('input').all();
        
        if (inputs.length > 0) {
          const name = await inputs[0].inputValue();
          
          // 実績データ（36上、36下、37上、37下、38上、38下）
          const values = [];
          for (let j = 1; j <= 6; j++) {
            if (inputs[j]) {
              const val = await inputs[j].inputValue();
              values.push(val || '0');
            }
          }
          
          console.log(`  ${i + 1}. ${name}`);
          console.log(`     実績: 36上=${values[0]}, 36下=${values[1]}, 37上=${values[2]}, 37下=${values[3]}, 38上=${values[4]}, 38下=${values[5]}`);
        }
      }
    } else {
      console.log('❌ データが表示されていません');
    }
    
    // スクリーンショット
    await page.screenshot({ path: 'test_data_check.png', fullPage: true });
    console.log('\n📸 スクリーンショット: test_data_check.png');
    
    console.log('\n✅ 確認完了。Enterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

