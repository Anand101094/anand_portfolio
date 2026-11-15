@echo off
title Launch Anand Kumar Matrix Portfolio
echo ========================================================
echo   ANAND KUMAR // MATRIX CYBER PORTFOLIO
echo   Senior Frontend Developer & Technical Lead (7+ Years)
echo ========================================================
echo   Opening Portfolio in your default browser...
echo   Press 'T' inside for interactive Matrix CLI
echo   Press '1'-'6' for quick multi-page section hopping
echo   Click 'INSPECT' on any project for full architectural specs
echo ========================================================

set "HTML_PATH=%~dp0index.html"

:: Check for Microsoft Edge
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "file:///%HTML_PATH%"
    goto :done
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" "file:///%HTML_PATH%"
    goto :done
)

:: Check for Google Chrome
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "file:///%HTML_PATH%"
    goto :done
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "file:///%HTML_PATH%"
    goto :done
)

:: Fallback to default browser
start "" "file:///%HTML_PATH%"

:done
echo Portfolio opened.
timeout /t 3 >nul
exit
