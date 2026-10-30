@echo off
REM Starts the NCPL website locally at http://127.0.0.1:5500 (requires Node.js)
cd /d "%~dp0"
where npx >nul 2>nul || (echo Node.js is not installed. Get it from https://nodejs.org & pause & exit /b 1)
netstat -ano | findstr ":5500" | findstr "LISTENING" >nul && (echo Server already running on port 5500. & start "" "http://127.0.0.1:5500/website/neurosynaptic_site_clone.html" & exit /b 0)
echo Starting NCPL website server on http://127.0.0.1:5500 ...
start "NCPL Website Server" /min cmd /c "npx --yes http-server -p 5500 -c-1"
timeout /t 5 /nobreak >nul
start "" "http://127.0.0.1:5500/website/neurosynaptic_site_clone.html"
echo Server started. Run stop-server.bat to stop it.
