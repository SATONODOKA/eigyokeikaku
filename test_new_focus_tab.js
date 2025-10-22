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
    console.log('📊 ④重点外顧客タブを開きます...\n');
    await page.locator('button').filter({ hasText: '④重点外顧客' }).click();
    await page.waitForTimeout(2000);
    
    // 最初の顧客を重点顧客にする
    console.log('🔘 最初の顧客を重点顧客に追加...\n');
    const promoteButton = page.locator('button').filter({ hasText: '重点顧客' }).first();
    await promoteButton.click();
    await page.waitForTimeout(3000);
    
    // ③重点顧客タブに自動移動しているはず
    console.log('✅ ③重点顧客タブに移動しました\n');
    await page.screenshot({ path: 'focus_tab_initial.png', fullPage: true });
    console.log('📸 初期状態: focus_tab_initial.png\n');
    
    // サブタブ1（中長期）のテキストを入力
    console.log('📝 中長期の目指す状態を入力...\n');
    const threeYearTextarea = page.locator('textarea').filter({ hasText: /3年後/ }).or(page.locator('label:has-text("3年後")').locator('..').locator('textarea'));
    await threeYearTextarea.fill('3年後は戦略的パートナーとして\n年間売上1億円を達成\n継続的な信頼関係を構築');
    await page.waitForTimeout(1000);
    
    const oneYearTextarea = page.locator('label:has-text("1年後")').locator('..').locator('textarea');
    await oneYearTextarea.fill('1年後は主要部門との取引拡大\n年間売上5000万円');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'focus_tab_longterm_filled.png', fullPage: true });
    console.log('📸 中長期入力後: focus_tab_longterm_filled.png\n');
    
    // サブタブ2に切り替え
    console.log('🔄 今半期の営業活動の焦点タブに切り替え...\n');
    await page.locator('button').filter({ hasText: '今半期の営業活動の焦点' }).click();
    await page.waitForTimeout(1000);
    
    // サブタブ2のテキストを入力
    const situationTextarea = page.locator('label:has-text("現状を直視する")').locator('..').locator('textarea');
    await situationTextarea.fill('連続合計5,000万円以上の取引があるが\n特定部門に偏っている状況\n新規部門への展開が課題');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'focus_tab_focus_filled.png', fullPage: true });
    console.log('📸 今半期入力後: focus_tab_focus_filled.png\n');
    
    // 月次計画を入力（下半分にスクロール）
    console.log('📅 月次計画を入力...\n');
    await page.locator('h3:has-text("月次計画")').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    const firstMonthGoal = page.locator('text=10月').locator('..').locator('textarea').first();
    await firstMonthGoal.fill('初回訪問\n●●部長との面談設定\nニーズヒアリング');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'focus_tab_monthly_filled.png', fullPage: true });
    console.log('📸 月次計画入力後: focus_tab_monthly_filled.png\n');
    
    // 保存ボタンをクリック
    console.log('💾 保存ボタンをクリック...\n');
    await page.locator('button').filter({ hasText: '保存' }).last().click();
    await page.waitForTimeout(2000);
    
    // 削除ボタンの確認
    console.log('🗑️ 削除ボタンの位置を確認...\n');
    await page.locator('button').filter({ hasText: '削除' }).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.screenshot({ path: 'focus_tab_final.png', fullPage: true });
    console.log('📸 最終状態: focus_tab_final.png\n');
    
    console.log('\n✅ すべてのテスト完了！');
    console.log('\n確認ポイント:');
    console.log('  1. サブタブが正しく表示され、切り替えができる');
    console.log('  2. テキストエリアが改行で自動拡大する');
    console.log('  3. 月次計画が下半分に表示される');
    console.log('  4. 削除ボタンと保存ボタンが右上にある');
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();

