@echo off
chcp 65001 >nul
title Zip Package Creator

echo ======================================
echo   Zip Package Creator
echo ======================================
echo.

set DATE=%date:~0,4%%date:~5,2%%date:~8,2%
set ZIPNAME=eigyokeikaku_v1.0.0_%DATE%.zip

echo Creating package...
echo.

REM Temporary directory
set TEMPDIR=temp_package
if exist "%TEMPDIR%" rmdir /s /q "%TEMPDIR%"
mkdir "%TEMPDIR%"

echo Copying files...
xcopy /E /I /Y "app" "%TEMPDIR%\app" >nul
xcopy /E /I /Y "lib" "%TEMPDIR%\lib" >nul
xcopy /E /I /Y "public" "%TEMPDIR%\public" >nul 2>nul
copy /Y "セットアップ.bat" "%TEMPDIR%\" >nul
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
echo Creating ZIP file...

REM Delete old zip if exists
if exist "%ZIPNAME%" del "%ZIPNAME%"

REM Create zip using PowerShell
powershell -Command "Compress-Archive -Path '%TEMPDIR%\*' -DestinationPath '%ZIPNAME%' -CompressionLevel Optimal"

REM Cleanup
echo Cleaning up...
rmdir /s /q "%TEMPDIR%"

echo.
echo ======================================
echo   ZIP Creation Complete!
echo ======================================
echo.
echo File: %ZIPNAME%
echo.
echo Distribution package is ready.
echo.
pause

