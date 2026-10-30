@echo off
REM Builds the website into .\dist and runs it locally at http://127.0.0.1:5500
REM Usage: double-click, or run "build-and-run.bat". Stop with stop-server.bat
cd /d "%~dp0"
where npx >nul 2>nul || (echo Node.js is not installed. Get it from https://nodejs.org & pause & exit /b 1)

echo [1/3] Stopping any server on port 5500...
call "%~dp0stop-server.bat" >nul 2>nul

echo [2/3] Building into dist\ ...
if exist dist rmdir /s /q dist
robocopy website dist /E /NFL /NDL /NJH /NJS /NP >nul
if %ERRORLEVEL% GEQ 8 (echo Build failed. & pause & exit /b 1)
copy /y dist\neurosynaptic_site_clone.html dist\index.html >nul
echo     Build OK - output in %CD%\dist

echo [3/3] Starting server on http://127.0.0.1:5500 ...
start "NCPL Website Server" /min cmd /c "npx --yes http-server dist -p 5500 -c-1"
timeout /t 5 /nobreak >nul
start "" "http://127.0.0.1:5500/"
echo Website running. Run stop-server.bat to stop it.
timeout /t 3 >nul
