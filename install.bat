@echo off
echo 🚀 Installing DeQuiz - Interactive Quiz Game
echo ==============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
npm install
cd ..

echo ✅ All dependencies installed successfully!
echo.
echo 🎯 To start the application:
echo    npm run dev          # Start both frontend and Node.js backend
echo    npm run client       # Start only React frontend
echo    npm run server       # Start only Node.js backend
echo.
echo 🌐 Access the application:
echo    Frontend: http://localhost:3000
echo    Node.js Backend: http://localhost:5000
echo.
echo ☕ For Java backend (optional):
echo    cd java-backend
echo    mvn spring-boot:run
echo    Java Backend: http://localhost:8080
pause 