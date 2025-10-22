const XLSX = require('xlsx');
const fs = require('fs');

// Excelファイルを読み込む
const workbook = XLSX.readFile('業績計画用レポート_詳細版.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// JSONに変換
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('=== XLSXライブラリで読み込んだ結果 ===\n');

// 最初の10行を表示
console.log('最初の10行:');
for (let i = 0; i < Math.min(10, jsonData.length); i++) {
  const row = jsonData[i];
  console.log(`\n行${i} (Excel行${i+1}):`);
  console.log(`  長さ: ${row ? row.length : 0}`);
  if (row) {
    console.log(`  F列 [5]: ${row[5]}`);
    console.log(`  G列 [6]: ${row[6]}`);
    console.log(`  M列 [12]: ${row[12]}`);
  }
}

console.log('\n=== 5行目（配列[4]）の詳細 ===');
if (jsonData[4]) {
  for (let col = 0; col < jsonData[4].length; col++) {
    if (jsonData[4][col]) {
      console.log(`  列${col}: ${jsonData[4][col]}`);
    }
  }
}

