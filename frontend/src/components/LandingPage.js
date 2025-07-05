import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedQuizType, setSelectedQuizType] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const quizTypes = [
    {
      id: 'design',
      name: 'Design Quiz',
      description: 'Test your knowledge about design principles, UI/UX, and creative concepts.',
      icon: '🎨'
    },
    {
      id: 'color',
      name: 'Color Matching',
      description: 'Challenge yourself with color theory, palettes, and matching exercises.',
      icon: '🌈'
    }
  ];

  const timeOptions = [
    { value: 1, label: '1 min' },
    { value: 5, label: '5 min' },
    { value: 10, label: '10 min' },
    { value: 15, label: '15 min' },
    { value: 20, label: '20 min' },
    { value: 30, label: '30 min' }
  ];

  const handleStartQuiz = () => {
    if (selectedQuizType && selectedTime) {
      navigate('/quiz', {
        state: {
          quizType: selectedQuizType,
          timeLimit: selectedTime
        }
      });
    }
  };

  const canStart = selectedQuizType && selectedTime;

  return (
    <div className="page">
      <div className="page-content">
        <div className="card">
          <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: '600', color: '#1d1d1f' }}>
            Select Quiz Type
          </h2>
          
          <div className="quiz-grid">
            {quizTypes.map((type) => (
              <div
                key={type.id}
                className={`quiz-card ${selectedQuizType === type.id ? 'selected' : ''}`}
                onClick={() => setSelectedQuizType(type.id)}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                  {type.icon}
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: '600', color: '#1d1d1f' }}>
                  {type.name}
                </h3>
                <p style={{ color: '#86868b', lineHeight: '1.5', fontSize: '16px' }}>
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          {selectedQuizType && (
            <>
              <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: '600', color: '#1d1d1f', marginTop: '40px' }}>
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
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              className={`btn ${canStart ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleStartQuiz}
              disabled={!canStart}
              style={{ opacity: canStart ? 1 : 0.6, cursor: canStart ? 'pointer' : 'not-allowed' }}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 