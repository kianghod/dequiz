import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions, answeredQuestions, quizType, timeLimit } = location.state || {};
  const [showDetails, setShowDetails] = useState(false);

  const handlePlayAgain = () => {
    navigate('/');
  };

  // Calculate category statistics
  const getCategoryStats = () => {
    const categoryCounts = {};
    const categoryCorrect = {};

    answeredQuestions.forEach(answer => {
      answer.tags.forEach(tag => {
        if (!categoryCounts[tag]) {
          categoryCounts[tag] = 0;
          categoryCorrect[tag] = 0;
        }
        categoryCounts[tag]++;
        if (answer.isCorrect) {
          categoryCorrect[tag]++;
        }
      });
    });

    return Object.keys(categoryCounts).map(tag => ({
      tag,
      total: categoryCounts[tag],
      correct: categoryCorrect[tag],
      percentage: Math.round((categoryCorrect[tag] / categoryCounts[tag]) * 100)
    }));
  };

  const categoryStats = getCategoryStats();
  const totalAnswered = answeredQuestions ? answeredQuestions.length : 0;
  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  return (
    <div className="page">
      <div className="page-content">
        <div className="header">
          <h1 className="title">Quiz Complete!</h1>
          <p className="subtitle">Here's how you performed</p>
        </div>

        <div className="summary-card">
          <h2 style={{ fontSize: '28px', marginBottom: '32px', fontWeight: '600', color: '#1d1d1f' }}>
            Final Score
          </h2>
          
          <div className="summary-score">
            {score}/{totalAnswered}
          </div>
          
          <div style={{ fontSize: '18px', color: '#86868b', marginBottom: '40px' }}>
            Accuracy: {accuracy}%
          </div>

          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-value">{score}</div>
              <div className="stat-label">Correct Answers</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{totalAnswered}</div>
              <div className="stat-label">Questions Answered</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{timeLimit} min</div>
              <div className="stat-label">Time Limit</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{quizType === 'design' ? 'Design' : 'Color'}</div>
              <div className="stat-label">Quiz Type</div>
            </div>
          </div>
        </div>

        {/* Expandable Detail Section */}
        <div className="summary-card" style={{ marginTop: 32 }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '0 0 16px 0'
            }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1d1d1f', margin: 0 }}>
              Question Details
            </h2>
            <div style={{ 
              fontSize: '20px', 
              color: '#007aff', 
              fontWeight: '600',
              transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}>
              ▼
            </div>
          </div>
          
          {showDetails && (
            <div style={{ 
              borderTop: '1px solid #e5e5e7', 
              paddingTop: 24,
              animation: 'slideDown 0.3s ease-out'
            }}>
              {answeredQuestions && answeredQuestions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {answeredQuestions.map((ans, idx) => {
                    // Use the question data stored in answeredQuestions
                    const questionData = {
                      question: ans.question,
                      choices: ans.choices,
                      correct: ans.correct,
                      answerDetail: ans.answerDetail
                    };
                    
                    return (
                      <div key={idx} style={{ 
                        background: '#f8f9fa', 
                        borderRadius: 12, 
                        padding: 20, 
                        textAlign: 'left',
                        border: '1px solid #e5e5e7'
                      }}>
                        <div style={{ 
                          fontWeight: 600, 
                          color: '#1d1d1f', 
                          marginBottom: 12,
                          fontSize: '16px',
                          lineHeight: 1.4
                        }}>
                          <span style={{ color: '#007aff', marginRight: 8 }}>Q{idx + 1}:</span>
                          {questionData.question || 'Question not available'}
                        </div>
                        
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ 
                            color: ans.isCorrect ? '#34c759' : '#ff3b30', 
                            fontWeight: 600,
                            fontSize: '14px'
                          }}>
                            Your answer: {questionData.choices ? questionData.choices[ans.selectedAnswer] : 'N/A'}
                          </span>
                          <span style={{ 
                            marginLeft: 16, 
                            color: '#007aff', 
                            fontWeight: 600,
                            fontSize: '14px'
                          }}>
                            Correct: {questionData.choices ? questionData.choices[questionData.correct] : 'N/A'}
                          </span>
                        </div>
                        
                        {questionData.answerDetail && (
                          <div style={{ 
                            color: '#86868b', 
                            fontSize: '14px', 
                            marginTop: 12,
                            padding: 12,
                            background: '#ffffff',
                            borderRadius: 8,
                            border: '1px solid #e5e5e7'
                          }}>
                            <strong style={{ color: '#1d1d1f' }}>Explanation:</strong>
                            <div style={{ marginTop: 4, lineHeight: 1.5 }}>
                              {questionData.answerDetail}
                            </div>
                          </div>
                        )}
                        
                        {ans.tags && ans.tags.length > 0 && (
                          <div style={{ marginTop: 12 }}>
                            {ans.tags.map((tag, tagIdx) => (
                              <span key={tagIdx} style={{
                                background: '#e0f2ff',
                                color: '#007aff',
                                padding: '4px 8px',
                                borderRadius: 12,
                                fontSize: '12px',
                                fontWeight: 500,
                                marginRight: 8
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: '#86868b', textAlign: 'center', padding: 20 }}>
                  No question details available.
                </div>
              )}
            </div>
          )}
        </div>

        {categoryStats.length > 0 && (
          <div className="summary-card" style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px', fontWeight: '600', color: '#1d1d1f' }}>
              Performance by Category
            </h2>
            <div className="summary-stats">
              {categoryStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.percentage}%</div>
                  <div className="stat-label">{stat.tag}</div>
                  <div style={{ fontSize: '12px', color: '#86868b', marginTop: 4 }}>
                    {stat.correct}/{stat.total} correct
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn btn-primary" onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SummaryPage; 