const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(1000);
    
    console.log('🗑️  IndexedDBとlocalStorageをクリア中...\n');
    
    // IndexedDBとlocalStorageをクリア
    await page.evaluate(() => {
      // IndexedDBをクリア
      indexedDB.deleteDatabase('eigyokeikaku-storage');
      
      // localStorageをクリア
      localStorage.clear();
      
      return 'クリア完了';
    });
    
    console.log('✅ ストレージをクリアしました');
    console.log('🔄 ページをリロードします...\n');
    
    await page.reload();
    await page.waitForTimeout(2000);
    
    // ③重点顧客タブを確認
    await page.locator('button').filter({ hasText: '③重点顧客' }).click();
    await page.waitForTimeout(1500);
    
    const emptyMessage = await page.locator('text=まだ重点顧客が登録されていません').isVisible();
    console.log(`📋 空メッセージ表示: ${emptyMessage ? '✅ 成功！' : '❌ まだ残っている'}\n`);
    
    await page.screenshot({ path: 'after_clear.png', fullPage: true });
    console.log('📸 スクリーンショット: after_clear.png\n');
    
    console.log('✅ データリセット完了！');
    console.log('\nEnterキーで終了...');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
  } catch (error) {
    console.error('\n❌ エラー:', error.message);
  } finally {
    await browser.close();
  }
})();

