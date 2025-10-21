@echo off
chcp 65001 >nul
title 営業計画管理システム

echo.
echo ========================================
echo   営業計画管理システム
echo ========================================
echo.
echo サーバーを起動しています...
echo.

REM Node.jsがインストールされているか確認
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   ❌ Node.jsがインストールされていません
    echo ========================================
    echo.
    echo 初回起動の前に「セットアップ.bat」を実行してください。
    echo.
    echo セットアップ.batがNode.jsのインストール方法を案内します。
    echo.
    echo ※ このウィンドウを閉じて、
    echo    「セットアップ.bat」をダブルクリックしてください
    echo.
    pause
    exit /b 1
)

REM node_modulesが存在しない場合はインストール
if not exist "node_modules\" (
    echo 初回起動：依存関係をインストールしています...
    echo これには数分かかります。お待ちください...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [エラー] インストールに失敗しました。
        pause
        exit /b 1
    )
    echo.
    echo インストール完了！
    echo.
)

echo サーバーを起動中...
echo.
echo ブラウザが自動で開かない場合は、以下のURLを開いてください：
echo http://localhost:3000
echo.
echo サーバーを停止するには、このウィンドウを閉じてください。
echo ========================================
echo.

REM ブラウザを開く
timeout /t 3 /nobreak >nul
start http://localhost:3000

REM サーバー起動
npm run dev

