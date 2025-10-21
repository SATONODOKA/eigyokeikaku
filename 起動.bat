@echo off
chcp 65001 >nul
title 営業計画管理システム

echo.
echo ========================================
echo   営業計画管理システム
echo ========================================
echo.

REM カレントディレクトリを取得
set CURRENT_DIR=%~dp0
set NODE_DIR=%CURRENT_DIR%nodejs-portable
set NODE_EXE=%NODE_DIR%\node.exe
set NPM_CMD=%NODE_DIR%\npm.cmd

REM PATHを設定
set PATH=%NODE_DIR%;%PATH%

REM node_modulesが存在しない場合はインストール
if not exist "node_modules\" (
    echo 初回起動：依存関係をインストールしています...
    echo これには数分かかります。お待ちください...
    echo.
    call "%NPM_CMD%" install
    if %errorlevel% neq 0 (
        echo.
        echo [エラー] インストールに失敗しました。
        echo インターネット接続を確認してください。
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ✅ インストール完了！
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
call "%NPM_CMD%" run dev
