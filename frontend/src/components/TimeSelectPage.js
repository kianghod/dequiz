import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const timeOptions = [
  { value: 1, label: '1 min' },
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' }
];

const TimeSelectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizType } = location.state || {};
  const [selectedTime, setSelectedTime] = useState(null);

  if (!quizType) {
    // If no quiz type is selected, redirect to landing
    navigate('/');
    return null;
  }

  const handleStartQuiz = () => {
    if (selectedTime) {
      if (quizType === 'color-palette') {
        navigate('/color-palette-quiz', {
          state: {
            timeLimit: selectedTime
          }
        });
      } else {
        navigate('/quiz', {
          state: {
            quizType,
            timeLimit: selectedTime
          }
        });
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: 400 }}>
          <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: '600', color: '#1d1d1f' }}>
            Select Time Frame
          </h2>
          <div className="time-grid">
            {timeOptions.map((time) => (
              <div
                key={time.value}
                className={`time-option ${selectedTime === time.value ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time.value)}
              >
                {time.label}
              </div>
            ))}
          </div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
            <button
              className="btn btn-secondary"
              onClick={handleBack}
              style={{ minWidth: 120 }}
            >
              ← Back
            </button>
            <button
              className={`btn ${selectedTime ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleStartQuiz}
              disabled={!selectedTime}
              style={{ minWidth: 120, opacity: selectedTime ? 1 : 0.6, cursor: selectedTime ? 'pointer' : 'not-allowed' }}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelectPage; 