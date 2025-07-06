import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GRID_SIZE = 6;
const INITIAL_DIFFERENCE = 120; // Much higher contrast to start very easy
const MIN_DIFFERENCE = 25; // Higher minimum for gradual progression
const DIFFICULTY_STEP = 3; // Smaller step for slower progression

function getRandomColor(base = 100, range = 155) {
  // Returns a random RGB color with each channel between base and base+range
  const r = base + Math.floor(Math.random() * range);
  const g = base + Math.floor(Math.random() * range);
  const b = base + Math.floor(Math.random() * range);
  return [r, g, b];
}

function rgbToString([r, g, b]) {
  return `rgb(${r},${g},${b})`;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

const ColorPaletteQuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { timeLimit } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : 60);
  const [score, setScore] = useState(0);
  const [difference, setDifference] = useState(INITIAL_DIFFERENCE);
  const [baseColor, setBaseColor] = useState([0, 0, 0]);
  const [diffColor, setDiffColor] = useState([0, 0, 0]);
  const [diffIndex, setDiffIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Start new round
  const newRound = (nextDiff = difference) => {
    const base = getRandomColor(60, 160);
    // Pick a random channel to change
    const channel = Math.floor(Math.random() * 3);
    const diff = clamp(nextDiff, MIN_DIFFERENCE, 255);
    const diffCol = [...base];
    diffCol[channel] = clamp(base[channel] + (Math.random() > 0.5 ? diff : -diff), 0, 255);
    setBaseColor(base);
    setDiffColor(diffCol);
    setDiffIndex(Math.floor(Math.random() * GRID_SIZE * GRID_SIZE));
  };

  useEffect(() => {
    if (!timeLimit) {
      navigate('/select-time', { state: { quizType: 'color-palette' } });
      return;
    }
    newRound(INITIAL_DIFFERENCE);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const handleBoxClick = idx => {
    if (gameOver) return;
    if (idx === diffIndex) {
      // Correct
      setScore(s => s + 1);
      const nextDiff = clamp(difference - DIFFICULTY_STEP, MIN_DIFFERENCE, INITIAL_DIFFERENCE);
      setDifference(nextDiff);
      newRound(nextDiff);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setDifference(INITIAL_DIFFERENCE);
    setTimeLeft(timeLimit * 60);
    setGameOver(false);
    newRound(INITIAL_DIFFERENCE);
  };

  // Compact top bar
  const TopBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: '#f5f5f7', borderRadius: 10, marginBottom: 16, fontSize: 16 }}>
      <div>Score: <b>{score}</b></div>
      <div>Time: <b>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</b></div>
    </div>
  );

  if (gameOver) {
    return (
      <div className="page">
        <div className="page-content" style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
          <TopBar />
          <h2 style={{ margin: '32px 0 16px' }}>Game Over!</h2>
          <div style={{ fontSize: 22, marginBottom: 24 }}>Your Score: <b>{score}</b></div>
          <button className="btn btn-primary" onClick={handleRestart}>Play Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content" style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
        <TopBar />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: 2, margin: '0 auto', width: 320, height: 320 }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => handleBoxClick(idx)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: rgbToString(idx === diffIndex ? diffColor : baseColor),
                cursor: 'pointer',
                border: '2px solid #fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 24, color: '#86868b', fontSize: 15 }}>
          Select the box with a different color. The game gets harder as you score higher!
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteQuizPage; 