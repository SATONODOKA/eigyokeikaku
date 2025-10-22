const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  const page = await browser.newPage();
  
  // コンソールログをキャプチャ
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      console.log(`🔴 Console Error: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  Console Warning: ${text}`);
    } else {
      console.log(`ℹ️  Console: ${text}`);
    }
  });

  // ページエラーをキャプチャ
  page.on('pageerror', error => {
    console.log(`❌ Page Error: ${error.message}`);
  });

  // アラートをキャプチャ
  let alertMessage = '';
  page.on('dialog', async dialog => {
    alertMessage = dialog.message();
    console.log(`\n📢 アラート:\n${alertMessage}\n`);
    await dialog.accept();
  });
  
  try {
    // ホーム画面に移動
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    console.log('✅ ホーム画面を開きました');

    // 期初データ（詳細版）をアップロード
    const detailFilePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
    console.log(`\n📁 期初データをアップロード: ${detailFilePath}`);
    
    // ファイル入力を見つける（2つ目のinput）
    const fileInputs = await page.locator('input[type="file"]').all();
    console.log(`   ファイル入力が ${fileInputs.length} 個見つかりました`);
    
    if (fileInputs.length >= 2) {
      // 2つ目のinput（期初データ用）にファイルをセット
      await fileInputs[1].setInputFiles(detailFilePath);
      await page.waitForTimeout(1000);
      console.log('✅ 期初データファイルを選択しました');
      
      // ボタンのテキストを確認
      const buttonText = await page.locator('button:has-text("実行")').textContent();
      console.log(`   実行ボタンのテキスト: "${buttonText}"`);
      
      // 実行ボタンをクリック
      console.log('\n🔄 実行ボタンをクリック中...');
      await page.click('button:has-text("実行")');
      
      // アラートとページ遷移を待つ
      await page.waitForTimeout(3000);
      
      console.log(`\n📊 アラートメッセージ:\n${alertMessage || '（なし）'}`);
      
      // 現在のURL確認
      const currentUrl = page.url();
      console.log(`   現在のURL: ${currentUrl}`);
      
      // ④重点外顧客タブをクリック
      console.log('\n🔄 ④重点外顧客タブをクリック...');
      await page.click('text=④重点外顧客の活動計画');
      await page.waitForTimeout(2000);
      
      // テーブル内のデータ数を確認
      const rows = await page.locator('tbody tr').count();
      console.log(`   テーブルの行数: ${rows}`);
      
      if (rows > 0) {
        // 最初の行のデータを取得
        const firstRowName = await page.locator('tbody tr').first().locator('input').first().inputValue();
        console.log(`   最初の行の社名: ${firstRowName}`);
      }
      
      // スクリーンショット
      await page.screenshot({ path: 'test_debug.png', fullPage: true });
      console.log('\n✅ スクリーンショットを保存: test_debug.png');
    } else {
      console.error('❌ ファイル入力が見つかりませんでした');
    }
    
    console.log('\n✅ テスト完了。Enterキーで終了...');
    await new Promise(resolve => {
      process.stdin.once('data', resolve);
    });
    
  } catch (error) {
    console.error('❌ エラー:', error);
  } finally {
    await browser.close();
  }
})();

