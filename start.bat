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

REM 必須ファイルの存在確認
if not exist "%NODE_EXE%" (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║                    ⚠️  エラー                                ║
    echo ╚═══════════════════════════════════════════════════════════════╝
    echo.
    echo Node.js実行ファイルが見つかりません。
    echo パス: %NODE_EXE%
    echo.
    echo 配布用Zipファイルを正しく解凍してください。
    echo.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║                    ⚠️  エラー                                ║
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

REM 同梱Node.jsのみを使用（システムのNode.jsは完全に無視）
set PATH=%NODE_DIR%;%SystemRoot%\system32;%SystemRoot%

echo 使用するNode.js: %NODE_EXE%
"%NODE_EXE%" --version
echo.

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
