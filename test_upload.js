const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  const page = await browser.newPage();
  
  try {
    // ホーム画面に移動
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('✅ ホーム画面を開きました');

    // 期初データ（詳細版）をアップロード
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    console.log(`📁 期初データをアップロード: ${detailFilePath}`);
    
    // ファイル入力を見つける（2つ目のinput）
    const fileInputs = await page.locator('input[type="file"]').all();
    console.log(`   ファイル入力が ${fileInputs.length} 個見つかりました`);
    
    if (fileInputs.length >= 2) {
      // 2つ目のinput（期初データ用）にファイルをセット
      await fileInputs[1].setInputFiles(detailFilePath);
      await page.waitForTimeout(1000);
      console.log('✅ 期初データファイルを選択しました');
      
      // 実行ボタンをクリック
      await page.click('button:has-text("実行")');
      console.log('✅ 実行ボタンをクリックしました');
      
      // アラートを待つ
      page.on('dialog', async dialog => {
        console.log(`📢 アラート: ${dialog.message()}`);
        await dialog.accept();
      });
      
      await page.waitForTimeout(3000);
      
      // ④重点外顧客タブをクリック
      await page.click('text=④重点外顧客の活動計画');
      await page.waitForTimeout(2000);
      console.log('✅ ④重点外顧客タブに移動しました');
      
      // スクリーンショット
      await page.screenshot({ path: 'test_base_tab.png', fullPage: true });
      console.log('✅ スクリーンショットを保存: test_base_tab.png');
    } else {
      console.error('❌ ファイル入力が見つかりませんでした');
    }
    
    console.log('\n確認のためブラウザを開いたままにします。Enterキーで終了...');
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('❌ エラー:', error);
  } finally {
    await browser.close();
  }
})();

