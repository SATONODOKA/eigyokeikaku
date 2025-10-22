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
    
    // ③重点顧客タブに自動移動
    console.log('✅ ③重点顧客タブに移動しました\n');
    await page.screenshot({ path: 'final_layout_initial.png', fullPage: true });
    console.log('📸 初期状態: final_layout_initial.png\n');
    
    // 左上：中長期を入力
    console.log('📝 左上：中長期の目指す状態を入力...\n');
    const threeYearLabel = page.locator('label:has-text("3年後")');
    const threeYearTextarea = threeYearLabel.locator('..').locator('textarea');
    await threeYearTextarea.fill('3年後は戦略的パートナーとして\n年間売上1億円を達成');
    await page.waitForTimeout(1000);
    
    // 右上：今半期のゴールを入力
    console.log('📝 右上：今半期のゴール状態をイメージを入力...\n');
    const peopleLabel = page.locator('label:has-text("① 人・関係性")').first();
    const peopleTextarea = peopleLabel.locator('..').locator('textarea');
    await peopleTextarea.fill('人材開発部の●●様と継続的な接点\n信頼関係を構築');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'final_layout_goals.png', fullPage: true });
    console.log('📸 ゴール入力後: final_layout_goals.png\n');
    
    // 右中：営業活動の焦点を入力
    console.log('📝 右中：営業活動の焦点を入力...\n');
    const situationLabel = page.locator('label:has-text("現状を直視する")');
    const situationTextarea = situationLabel.locator('..').locator('textarea');
    await situationTextarea.fill('連続合計5,000万円以上の取引\n特定部門に偏っている状況');
    await page.waitForTimeout(1000);
    
    // 右下：月次計画にスクロール
    console.log('📅 右下：月次計画を表示...\n');
    await page.locator('h3:has-text("月次計画")').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'final_layout_complete.png', fullPage: true });
    console.log('📸 完成状態: final_layout_complete.png\n');
    
    console.log('\n✅ すべてのテスト完了！');
    console.log('\n✨ 新しいレイアウト:');
    console.log('  左上：中長期の目指す状態（3年後、1年後）');
    console.log('  左下：過去イベント・活動履歴');
    console.log('  右上：今半期のゴール状態をイメージ');
    console.log('  右中：今半期の営業活動の焦点');
    console.log('  右下：月次計画');
    console.log('\n視線の流れ：');
    console.log('  左上（中長期）→ 右上（今半期ゴール）');
    console.log('     ↓              ↓');
    console.log('  左下（過去）  → 右下（月次計画）');
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();

