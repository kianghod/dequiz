#!/bin/bash

echo "🚀 Installing DeQuiz - Interactive Quiz Game"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ All dependencies installed successfully!"
echo ""
echo "🎯 To start the application:"
echo "   npm run dev          # Start both frontend and Node.js backend"
echo "   npm run client       # Start only React frontend"
echo "   npm run server       # Start only Node.js backend"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Node.js Backend: http://localhost:5000"
echo ""
echo "☕ For Java backend (optional):"
echo "   cd java-backend"
echo "   mvn spring-boot:run"
echo "   Java Backend: http://localhost:8080" 