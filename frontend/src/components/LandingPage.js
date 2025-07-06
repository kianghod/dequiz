import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

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

  const handleSelectQuizType = (quizType) => {
    navigate('/select-time', { state: { quizType } });
  };

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
                className="quiz-card"
                onClick={() => handleSelectQuizType(type.id)}
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 