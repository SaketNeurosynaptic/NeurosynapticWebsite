@echo off
REM Stops the local NCPL website server running on port 5500
set FOUND=0
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":5500" ^| findstr "LISTENING"') do (
  taskkill /PID %%p /T /F >nul 2>nul
  set FOUND=1
)
if "%FOUND%"=="1" (echo Server on port 5500 stopped.) else (echo No server running on port 5500.)
timeout /t 3 >nul
