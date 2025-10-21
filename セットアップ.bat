@echo off
chcp 65001 >nul
title 営業計画管理システム - セットアップ

echo.
echo ========================================
echo   営業計画管理システム
echo   初回セットアップ
echo ========================================
echo.

REM Node.jsがインストールされているか確認
where node >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Node.jsがインストールされています
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo   バージョン: %NODE_VERSION%
    echo.
    goto :install_deps
)

echo ❌ Node.jsがインストールされていません
echo.
echo ========================================
echo   Node.jsのインストールが必要です
echo ========================================
echo.
echo 以下の手順でインストールしてください：
echo.
echo 1. ブラウザで以下のURLを開く
echo    https://nodejs.org/
echo.
echo 2. 「推奨版（LTS）」の緑色のボタンをクリック
echo    ※ 通常は左側のボタンです
echo.
echo 3. ダウンロードしたファイルを実行
echo    ※ node-v20.xx.x-x64.msi のようなファイル名
echo.
echo 4. インストーラーの指示に従う
echo    ※ 基本的に「次へ」を押していけばOK
echo.
echo 5. インストール完了後、PCを再起動
echo.
echo 6. もう一度このファイルを実行
echo.
echo ========================================
echo.
echo ブラウザでNode.jsのサイトを開きますか？
echo.
choice /c YN /m "Y=はい N=いいえ"
if %errorlevel% equ 1 (
    start https://nodejs.org/
    echo.
    echo ブラウザが開きました。
    echo 上記の手順に従ってインストールしてください。
)
echo.
pause
exit /b 1

:install_deps
echo 依存関係をインストールしています...
echo これには数分かかります。お待ちください...
echo.

call npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ インストールに失敗しました
    echo.
    echo インターネット接続を確認して、もう一度実行してください。
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ セットアップ完了！
echo ========================================
echo.
echo これで「起動.bat」をダブルクリックすれば
echo システムを使用できます。
echo.
pause

