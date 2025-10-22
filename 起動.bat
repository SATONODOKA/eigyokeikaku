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

REM 企業ネットワーク対応（証明書エラー回避）
set NODE_TLS_REJECT_UNAUTHORIZED=0

REM node_modulesが存在しない場合はインストール
if not exist "node_modules\" (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║                    🔧 初回セットアップ                       ║
    echo ╚═══════════════════════════════════════════════════════════════╝
    echo.
    echo 依存パッケージをインストールしています...
    echo インターネット接続が必要です。通常3〜5分かかります。
    echo.
    echo ※ 企業ネットワーク環境に対応しています（証明書検証を無効化）
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo   ※ 進捗は下記に表示されます ※
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
    call "%NPM_CMD%" install --progress=true --loglevel=info
    if %errorlevel% neq 0 (
        echo.
        echo ╔═══════════════════════════════════════════════════════════════╗
        echo ║                    ❌ エラーが発生しました                   ║
        echo ╚═══════════════════════════════════════════════════════════════╝
        echo.
        echo インストールに失敗しました。
        echo 以下を確認してください：
        echo   1. インターネット接続
        echo   2. ファイアウォール設定
        echo   3. ウイルス対策ソフトの設定
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
    echo ✅ セットアップ完了！
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
