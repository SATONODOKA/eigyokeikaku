@echo off
chcp 65001 >nul
title Zip Package Creator

echo ========================================
echo   配布用Zipパッケージ作成
echo ========================================
echo.

set DATE=%date:~0,4%%date:~5,2%%date:~8,2%
set ZIPNAME=eigyokeikaku_v1.0.0_%DATE%.zip

REM Node.js Portableがあるか確認
if not exist "nodejs-portable\node.exe" (
    echo ❌ Node.js Portableが見つかりません
    echo.
    echo 先に「download-nodejs-portable.bat」を実行してください。
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js Portable: OK

REM node_modulesの確認とインストール
if not exist "node_modules\" (
    echo.
    echo ⚠️ node_modulesが見つかりません。インストールします...
    echo.
    call nodejs-portable\npm.cmd install
    if %errorlevel% neq 0 (
        echo.
        echo ❌ npm installに失敗しました
        pause
        exit /b 1
    )
)

echo ✓ node_modules: OK
echo.
echo パッケージを作成しています...
echo.

REM Temporary directory
set TEMPDIR=temp_package
if exist "%TEMPDIR%" rmdir /s /q "%TEMPDIR%"
mkdir "%TEMPDIR%"

echo ファイルをコピー中...
xcopy /E /I /Y "app" "%TEMPDIR%\app" >nul
xcopy /E /I /Y "lib" "%TEMPDIR%\lib" >nul
xcopy /E /I /Y "public" "%TEMPDIR%\public" >nul 2>nul
copy /Y "起動.bat" "%TEMPDIR%\" >nul
copy /Y "README.md" "%TEMPDIR%\" >nul
copy /Y "package.json" "%TEMPDIR%\" >nul
copy /Y "package-lock.json" "%TEMPDIR%\" >nul
copy /Y "next.config.mjs" "%TEMPDIR%\" >nul
copy /Y "tailwind.config.ts" "%TEMPDIR%\" >nul
copy /Y "tsconfig.json" "%TEMPDIR%\" >nul
copy /Y "postcss.config.mjs" "%TEMPDIR%\" >nul
copy /Y ".gitignore" "%TEMPDIR%\" >nul

echo.
echo Node.js Portableをコピー中...
xcopy /E /I /Y "nodejs-portable" "%TEMPDIR%\nodejs-portable" >nul

echo.
echo node_modules（依存パッケージ）をコピー中...
echo これには数分かかる場合があります...
xcopy /E /I /Y "node_modules" "%TEMPDIR%\node_modules" >nul

echo.
echo Zipファイルを作成中...

REM Delete old zip if exists
if exist "%ZIPNAME%" del "%ZIPNAME%"

REM Create zip using PowerShell
powershell -Command "Compress-Archive -Path '%TEMPDIR%\*' -DestinationPath '%ZIPNAME%' -CompressionLevel Optimal"

REM Cleanup
echo クリーンアップ中...
rmdir /s /q "%TEMPDIR%"

echo.
echo ========================================
echo   完成！
echo ========================================
echo.
echo ファイル名: %ZIPNAME%
echo.

REM ファイルサイズを表示
for %%A in (%ZIPNAME%) do set FILESIZE=%%~zA
set /a FILESIZE_MB=%FILESIZE% / 1048576
echo サイズ: %FILESIZE_MB% MB
echo.
echo このZipファイルには：
echo - Node.js Portable （インストール不要）
echo - node_modules （依存パッケージ同梱）
echo - 起動.bat （ダブルクリックで即起動）
echo - 営業計画管理システム本体
echo が含まれています。
echo.
echo ★ 配布先での使い方：
echo   1. Zipを解凍
echo   2. 「起動.bat」をダブルクリック
echo   3. すぐにブラウザが開きます（インストール不要！）
echo.
echo ★ メリット：
echo   - インターネット接続不要
echo   - ファイアウォール/プロキシ関係なし
echo   - 待ち時間なし（即起動）
echo.
pause

