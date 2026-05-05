@echo off
REM Parcel Management System - Startup Script (Windows)
REM This script starts both backend and frontend

color 0A
title Parcel Management System - Startup

echo.
echo ========================================
echo  PARCEL MANAGEMENT SYSTEM - STARTUP
echo ========================================
echo.

REM Check if ports are available
echo [*] Checking prerequisites...

REM Set paths
set BACKEND_PATH=E:\Code\Parcel Management System\parcel-management-backend
set FRONTEND_PATH=E:\Code\Parcel Management System\parcel-management-frontend

REM Check if folders exist
if not exist "%BACKEND_PATH%" (
    color 0C
    echo [ERROR] Backend folder not found at %BACKEND_PATH%
    pause
    exit /b 1
)

if not exist "%FRONTEND_PATH%" (
    color 0C
    echo [ERROR] Frontend folder not found at %FRONTEND_PATH%
    pause
    exit /b 1
)

echo [✓] Project folders found

REM Start backend
echo.
echo [STEP 1] Starting Backend (Spring Boot)...
echo [*] Port: http://localhost:8080
cd /d "%BACKEND_PATH%"
start cmd /k "title Backend - Spring Boot & mvn spring-boot:run"

timeout /t 5 /nobreak

REM Start frontend
echo.
echo [STEP 2] Starting Frontend (Angular)...
echo [*] Port: http://localhost:4200
cd /d "%FRONTEND_PATH%"
start cmd /k "title Frontend - Angular & npm start"

echo.
echo ========================================
echo  APPLICATIONS STARTING
echo ========================================
echo.
echo [*] Backend: http://localhost:8080
echo [*] Frontend: http://localhost:4200
echo.
echo Demo Credentials:
echo   Admin:  admin / admin123
echo   User:   user / user123
echo.
echo Note: This may take 1-2 minutes to fully load.
echo       Check the opened terminal windows for progress.
echo.
pause

