@echo off
REM Quick Start - Parcel Management System
REM This script starts backend and frontend cleanly

title Parcel Management System - Quick Start
color 0A

echo.
echo ========================================
echo  PARCEL MANAGEMENT SYSTEM - QUICK START
echo ========================================
echo.

echo [1/4] Killing any existing processes on ports 8080 and 4200...
netstat -ano | findstr :8080 >nul && (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
        taskkill /PID %%a /F 2>nul
    )
    echo [✓] Killed process on port 8080
)

netstat -ano | findstr :4200 >nul && (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4200') do (
        taskkill /PID %%a /F 2>nul
    )
    echo [✓] Killed process on port 4200
)

timeout /t 2 /nobreak

echo.
echo [2/4] Starting Backend (Spring Boot)...
echo [*] Location: E:\Code\Parcel Management System\parcel-management-backend
echo [*] Port: http://localhost:8080
echo.
cd /d "E:\Code\Parcel Management System\parcel-management-backend"
start cmd /k "title Backend - Spring Boot 8080 & color 0B & mvn spring-boot:run"

timeout /t 8 /nobreak

echo.
echo [3/4] Starting Frontend (Angular)...
echo [*] Location: E:\Code\Parcel Management System\parcel-management-frontend
echo [*] Port: http://localhost:4200
echo.
cd /d "E:\Code\Parcel Management System\parcel-management-frontend"
start cmd /k "title Frontend - Angular 4200 & color 0D & npm start"

echo.
timeout /t 3 /nobreak

echo.
echo ========================================
echo  APPLICATIONS LAUNCHING
echo ========================================
echo.
echo [✓] Backend: http://localhost:8080
echo [✓] Frontend: http://localhost:4200
echo.
echo Demo Credentials:
echo   Admin:    admin / admin123
echo   User:     user / user123
echo.
echo Register New Account:
echo   Click "Sign Up" link on login page
echo.
echo Note: Applications may take 1-2 minutes to fully start.
echo       Check the terminal windows for startup progress.
echo       Login page: http://localhost:4200/login
echo       Register page: http://localhost:4200/register
echo.
echo ========================================
echo.
pause


