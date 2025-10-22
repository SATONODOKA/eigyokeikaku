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

REM node_modulesの確認（通常は同梱済み）
if not exist "node_modules\" (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║                    ⚠️  警告                                  ║
    echo ╚═══════════════════════════════════════════════════════════════╝
    echo.
    echo node_modulesフォルダが見つかりません。
    echo 配布用Zipが正しく解凍されていない可能性があります。
    echo.
    echo もう一度Zipファイルを解凍し直してください。
    echo.
    pause
    exit /b 1
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
