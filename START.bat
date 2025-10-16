@echo off
color 0A
echo ========================================
echo   HR LEAVE TRACKER - Starting Servers
echo ========================================
echo.

cd /d "%~dp0"

echo Starting Backend Server...
start "BACKEND SERVER" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "FRONTEND SERVER" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Wait 30 seconds, then open http://localhost:3000
echo in Chrome, Edge, or Firefox (NOT VS Code browser)
echo.
echo LOGIN CREDENTIALS:
echo Admin:    admin@company.com / admin123
echo HR:       hr@company.com / admin123
echo Employee: rahul.sharma1@company.com / password123
echo.
pause
