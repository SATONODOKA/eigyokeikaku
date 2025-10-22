const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '業績計画用レポート_詳細版.xlsx');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('\n📊 Excelファイルの構造確認\n');

// ヘッダー行を探す
let headerRowIndex = -1;
for (let i = 0; i < Math.min(10, jsonData.length); i++) {
  const row = jsonData[i];
  if (row && row[4] && String(row[4]).includes('取引先')) {
    headerRowIndex = i;
    console.log(`ヘッダー行: ${i}行目`);
    console.log(`列の数: ${row.length}`);
    
    // 全ての列を表示
    console.log('\n列のマッピング:');
    row.forEach((cell, idx) => {
      if (cell && String(cell).trim()) {
        console.log(`  [${idx}] = "${cell}"`);
      }
    });
    break;
  }
}

if (headerRowIndex !== -1) {
  // 最初のデータ行を表示
  const firstDataRow = jsonData[headerRowIndex + 1];
  console.log('\n最初のデータ行:');
  firstDataRow.forEach((cell, idx) => {
    if (cell !== undefined && cell !== null && cell !== '') {
      console.log(`  [${idx}] = "${cell}"`);
    }
  });
  
  // M～R列（36上～38下）を探す
  console.log('\n\n🔍 重要な列の値:');
  console.log(`  列4（取引先）: "${firstDataRow[4]}"`);
  console.log(`  列11（M列 36上）: "${firstDataRow[11]}"`);
  console.log(`  列12（N列 36下）: "${firstDataRow[12]}"`);
  console.log(`  列13（O列 37上）: "${firstDataRow[13]}"`);
  console.log(`  列14（P列 37下）: "${firstDataRow[14]}"`);
  console.log(`  列15（Q列 38上）: "${firstDataRow[15]}"`);
  console.log(`  列16（R列 38下）: "${firstDataRow[16]}"`);
  
  // 会社ごとの集計
  console.log('\n\n📈 会社ごとの集計（最初の3社）:');
  const companyData = new Map();
  
  for (let i = headerRowIndex + 1; i < Math.min(headerRowIndex + 20, jsonData.length); i++) {
    const row = jsonData[i];
    if (!row || row.length < 17) continue;
    
    const companyName = row[4] || '';
    if (!companyName || companyName === '-') continue;
    
    const p = Number(row[14]) || 0;  // P列（37下）
    const q = Number(row[15]) || 0;  // Q列（38上）
    
    if (!companyData.has(companyName)) {
      companyData.set(companyName, { p: [], q: [] });
    }
    
    companyData.get(companyName).p.push(p);
    companyData.get(companyName).q.push(q);
  }
  
  let count = 0;
  companyData.forEach((data, name) => {
    if (count < 3) {
      const sumP = data.p.reduce((a, b) => a + b, 0);
      const sumQ = data.q.reduce((a, b) => a + b, 0);
      console.log(`\n  ${name}:`);
      console.log(`    P列（37下）の値: [${data.p.join(', ')}] = ${sumP}`);
      console.log(`    Q列（38上）の値: [${data.q.join(', ')}] = ${sumQ}`);
      count++;
    }
  });
}

console.log('\n');

