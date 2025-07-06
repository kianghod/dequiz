import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import SummaryPage from './components/SummaryPage';
import TimeSelectPage from './components/TimeSelectPage';
import ColorPaletteQuizPage from './components/ColorPaletteQuizPage';
import './index.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/select-time" element={<TimeSelectPage />} />
        <Route path="/color-palette-quiz" element={<ColorPaletteQuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App; 