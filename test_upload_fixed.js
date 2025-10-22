const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800
  });
  const page = await browser.newPage();
  
  // コンソールログをキャプチャ
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`🔴 ${msg.text()}`);
    }
  });

  // アラートをキャプチャ
  let alertMessage = '';
  page.on('dialog', async dialog => {
    alertMessage = dialog.message();
    console.log(`\n📢 アラート: ${alertMessage}\n`);
    await dialog.accept();
  });
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('✅ ホーム画面を開きました');

    // 期初データボタンをクリックしてファイル選択ダイアログを開く
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    console.log(`\n📁 期初データファイル: ${detailFilePath}`);
    
    // ファイルチューザーを待機してから緑のボタンをクリック
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('button:has-text("期初データ")') // 緑のボタンをクリック
    ]);
    
    console.log('✅ ファイル選択ダイアログを開きました');
    
    // ファイルを選択
    await fileChooser.setFiles(detailFilePath);
    await page.waitForTimeout(1500);
    console.log('✅ ファイルを選択しました');
    
    // ボタンのテキストが更新されたか確認
    const buttonText = await page.locator('button:has-text("期初データ")').textContent();
    console.log(`   ボタンのテキスト: "${buttonText}"`);
    
    // 実行ボタンをクリック
    console.log('\n🔄 実行ボタンをクリック...');
    await page.click('button:has-text("実行")');
    await page.waitForTimeout(3000);
    
    console.log(`\n📊 処理結果: ${alertMessage || '（アラートなし）'}`);
    
    // ④重点外顧客タブが自動的に開いているはず
    const currentTab = await page.locator('button[class*="border-blue-500"]').textContent();
    console.log(`   現在のタブ: ${currentTab}`);
    
    // まだホームタブなら手動で移動
    if (!currentTab.includes('④')) {
      console.log('\n🔄 ④重点外顧客タブに移動...');
      await page.click('text=④重点外顧客の活動計画');
      await page.waitForTimeout(2000);
    }
    
    // テーブル内のデータ数を確認
    const rows = await page.locator('tbody tr').count();
    console.log(`   テーブルの行数: ${rows}`);
    
    if (rows > 0) {
      console.log('✅ データが読み込まれました！');
      
      // 最初の3行のデータを取得
      for (let i = 0; i < Math.min(3, rows); i++) {
        const row = page.locator('tbody tr').nth(i);
        const inputs = await row.locator('input').all();
        if (inputs.length > 0) {
          const name = await inputs[0].inputValue();
          console.log(`   ${i + 1}行目: ${name}`);
        }
      }
    } else {
      console.log('❌ データが読み込まれていません');
    }
    
    // スクリーンショット
    await page.screenshot({ path: 'test_fixed.png', fullPage: true });
    console.log('\n📸 スクリーンショット: test_fixed.png');
    
    console.log('\n✅ テスト完了。Enterキーで終了...');
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

