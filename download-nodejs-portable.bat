@echo off
chcp 65001 >nul
title Node.js Portable Download

echo ========================================
echo   Node.js Portable ダウンロード
echo ========================================
echo.

set NODE_VERSION=20.18.0
set DOWNLOAD_URL=https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-win-x64.zip
set ZIP_FILE=node-portable.zip
set EXTRACT_DIR=nodejs-portable

echo Node.js v%NODE_VERSION% (Portable) をダウンロードしています...
echo URL: %DOWNLOAD_URL%
echo.

REM PowerShellでダウンロード
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%ZIP_FILE%'}"

if %errorlevel% neq 0 (
    echo.
    echo ダウンロードに失敗しました。
    pause
    exit /b 1
)

echo.
echo ダウンロード完了！
echo.
echo 解凍しています...

REM 既存のフォルダを削除
if exist "%EXTRACT_DIR%" rmdir /s /q "%EXTRACT_DIR%"

REM 解凍
powershell -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%EXTRACT_DIR%' -Force"

REM node-v20.18.0-win-x64 フォルダの中身を直接 nodejs-portable に移動
for /d %%d in (%EXTRACT_DIR%\node-v*) do (
    xcopy /E /I /Y "%%d\*" "%EXTRACT_DIR%-temp" >nul
    rmdir /s /q "%EXTRACT_DIR%"
    rename "%EXTRACT_DIR%-temp" "%EXTRACT_DIR%"
)

REM Zipファイルを削除
del "%ZIP_FILE%"

echo.
echo ========================================
echo   完了！
echo ========================================
echo.
echo Node.js Portableが準備できました。
echo フォルダ: %EXTRACT_DIR%
echo.
pause

