@echo off
chcp 65001 >nul
title 配布用Zip作成

echo.
echo ========================================
echo   営業計画管理システム - 配布用Zip作成
echo ========================================
echo.

REM バージョン管理
set /p VERSION=<version.txt 2>nul || set VERSION=1
set ZIPNAME=eigyokeikaku_v%VERSION%.zip

echo 現在のバージョン: v%VERSION%
echo 作成するZipファイル: %ZIPNAME%
echo.

REM 必須ファイルの確認
echo [確認] 必須ファイルの存在チェック...
if not exist "start.bat" (echo ❌ start.bat が見つかりません & pause & exit /b 1)
if not exist "nodejs-portable\node.exe" (echo ❌ nodejs-portable が見つかりません & pause & exit /b 1)
if not exist "node_modules\" (echo ❌ node_modules が見つかりません & pause & exit /b 1)
echo ✅ 全ての必須ファイルが確認できました
echo.

REM 一時ディレクトリのクリーンアップ
set TEMPDIR=temp_package
if exist "%TEMPDIR%" (
    echo [クリーンアップ] 既存の一時フォルダを削除中...
    rmdir /s /q "%TEMPDIR%" 2>nul
    timeout /t 1 /nobreak >nul
)
mkdir "%TEMPDIR%"

REM ファイルコピー
echo.
echo ========================================
echo   ファイルコピー中...
echo ========================================
echo.

echo [1/6] アプリケーション本体をコピー中...
xcopy /E /I /Y /Q "app" "%TEMPDIR%\app" >nul 2>&1
xcopy /E /I /Y /Q "lib" "%TEMPDIR%\lib" >nul 2>&1
xcopy /E /I /Y /Q "public" "%TEMPDIR%\public" >nul 2>&1
echo       ✅ 完了

echo [2/6] 設定ファイルをコピー中...
copy /Y "start.bat" "%TEMPDIR%\" >nul
copy /Y "README.md" "%TEMPDIR%\" >nul
copy /Y "package.json" "%TEMPDIR%\" >nul
copy /Y "package-lock.json" "%TEMPDIR%\" >nul
copy /Y "next.config.mjs" "%TEMPDIR%\" >nul
copy /Y "tailwind.config.ts" "%TEMPDIR%\" >nul
copy /Y "tsconfig.json" "%TEMPDIR%\" >nul
copy /Y "postcss.config.js" "%TEMPDIR%\" >nul
echo       ✅ 完了

echo [3/6] Node.js Portableをコピー中...
xcopy /E /I /Y /Q "nodejs-portable" "%TEMPDIR%\nodejs-portable" >nul 2>&1
echo       ✅ 完了

echo [4/6] node_modules（依存パッケージ）をコピー中...
echo       これには数分かかります。お待ちください...
xcopy /E /I /Y /Q "node_modules" "%TEMPDIR%\node_modules" >nul 2>&1
echo       ✅ 完了

REM Zip作成
echo.
echo ========================================
echo   Zipファイル作成中...
echo ========================================
echo.

echo [5/6] 古いZipファイルを削除中...
if exist "%ZIPNAME%" del /F /Q "%ZIPNAME%" >nul 2>&1
echo       ✅ 完了

echo [6/6] 圧縮処理を実行中...
echo       これには数分かかります。お待ちください...

REM PowerShellで圧縮（7zipがあれば7zipを使う）
where 7z >nul 2>&1
if %errorlevel% equ 0 (
    echo       7zipを使用して圧縮中...
    7z a -tzip "%ZIPNAME%" ".\%TEMPDIR%\*" >nul
) else (
    echo       PowerShellで圧縮中（圧縮レベル: Fastest）...
    powershell -Command "Compress-Archive -Path '%TEMPDIR%\*' -DestinationPath '%ZIPNAME%' -CompressionLevel Fastest -Force"
)

echo       ✅ 完了

REM クリーンアップ
echo.
echo [クリーンアップ] 一時フォルダを削除中...
rmdir /s /q "%TEMPDIR%" 2>nul
echo       ✅ 完了

REM 結果表示
echo.
echo ========================================
echo   完成！
echo ========================================
echo.
echo ファイル名: %ZIPNAME%

REM ファイルサイズ表示
for %%A in (%ZIPNAME%) do set FILESIZE=%%~zA
set /a FILESIZE_MB=%FILESIZE% / 1048576
echo サイズ: %FILESIZE_MB% MB
echo.

REM バージョン更新
set /a NEXT_VERSION=%VERSION% + 1
echo %NEXT_VERSION% > version.txt
echo 次回作成時のバージョン: v%NEXT_VERSION%
echo.

echo ========================================
echo   配布パッケージ内容
echo ========================================
echo - Node.js Portable （実行環境）
echo - node_modules （依存パッケージ）
echo - start.bat （起動スクリプト）
echo - アプリケーション本体
echo.
echo 配布先での使い方：
echo   1. Zipを解凍
echo   2. start.batをダブルクリック
echo   3. 完了！
echo.
pause
