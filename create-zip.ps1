# Zip配布パッケージ作成スクリプト

$ErrorActionPreference = "Stop"

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  営業計画管理システム - Zip作成" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# 作業ディレクトリ
$sourceDir = Get-Location
$tempDir = Join-Path $sourceDir "temp_package"
$zipName = "eigyokeikaku_v1.0.0_" + (Get-Date -Format "yyyyMMdd") + ".zip"
$zipPath = Join-Path $sourceDir $zipName

# 一時ディレクトリを作成
Write-Host "📦 パッケージを準備中..." -ForegroundColor Yellow
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# コピーするファイル・フォルダのリスト
$itemsToCopy = @(
    "app",
    "lib",
    "public",
    "起動.bat",
    "README.md",
    "package.json",
    "package-lock.json",
    "next.config.mjs",
    "tailwind.config.ts",
    "tsconfig.json",
    "postcss.config.mjs",
    ".gitignore"
)

Write-Host "📁 ファイルをコピー中..." -ForegroundColor Yellow
foreach ($item in $itemsToCopy) {
    $sourcePath = Join-Path $sourceDir $item
    if (Test-Path $sourcePath) {
        $destPath = Join-Path $tempDir $item
        if (Test-Path $sourcePath -PathType Container) {
            Copy-Item -Path $sourcePath -Destination $destPath -Recurse -Force
            Write-Host "  ✓ $item/" -ForegroundColor Green
        } else {
            Copy-Item -Path $sourcePath -Destination $destPath -Force
            Write-Host "  ✓ $item" -ForegroundColor Green
        }
    }
}

# 既存のZipファイルを削除
if (Test-Path $zipPath) {
    Write-Host ""
    Write-Host "⚠️  既存のZipファイルを削除中..." -ForegroundColor Yellow
    Remove-Item $zipPath -Force
}

# Zipファイルを作成
Write-Host ""
Write-Host "🗜️  Zipファイルを作成中..." -ForegroundColor Yellow
Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $zipPath -CompressionLevel Optimal

# 一時ディレクトリを削除
Write-Host "🧹 クリーンアップ中..." -ForegroundColor Yellow
Remove-Item $tempDir -Recurse -Force

# 完了
Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "✅ Zip作成完了！" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "📦 ファイル名: $zipName" -ForegroundColor Cyan
Write-Host "📂 保存場所: $sourceDir" -ForegroundColor Cyan
Write-Host ""

# ファイルサイズを表示
$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "💾 ファイルサイズ: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "Distribution Zip file created successfully." -ForegroundColor Green
Write-Host ""

