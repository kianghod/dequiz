import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizType, timeLimit } = location.state || {};

  // Redirect if no quiz data
  useEffect(() => {
    if (!quizType || !timeLimit) {
      navigate('/');
      return;
    }
  }, [quizType, timeLimit, navigate]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert to seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const questionsRef = useRef([]);
  const totalTime = timeLimit * 60;

  // Sample questions based on quiz type
  const getQuestions = () => {
    if (quizType === 'design') {
      return [
        {
          question: "Which cognitive bias can cause users to stick with the first solution or information they come across when navigating a digital product?",
          choices: [
            "Recency bias",
            "Anchoring bias",
            "Sunk cost fallacy",
            "Confirmation bias"
          ],
          correct: 1,
          tags: ["Cognitive Bias", "User Psychology"],
          answerDetail: "Anchoring bias describes the tendency to rely heavily on the first piece of information encountered (the 'anchor') when making decisions. In UX, this bias can affect onboarding, pricing, or navigation choices, leading users to stick with initial solutions even if better ones exist elsewhere."
        },
        {
          question: "In information architecture, which technique is commonly used to understand how users group and categorize information concepts?",
          choices: [
            "Tree testing",
            "Card sorting",
            "Task analysis",
            "Stakeholder interviews"
          ],
          correct: 1,
          tags: ["Information Architecture", "Research"],
          answerDetail: "Card sorting allows users to organize content into categories that make sense to them, revealing how real people understand and group information—an essential research step for optimizing site structure and navigation."
        },
        {
          question: "Which metric is most appropriate to evaluate the efficiency of a user interface in a usability test?",
          choices: [
            "Net Promoter Score (NPS)",
            "Task completion rate",
            "Time on Task",
            "System Usability Scale (SUS)"
          ],
          correct: 2,
          tags: ["Usability", "Metrics"],
          answerDetail: "Time on task measures how long users take to complete a specific task, reflecting interface efficiency. Shorter times indicate a more intuitive and efficient design, assuming the task is completed correctly."
        },
        {
          question: "A/B testing is most reliable when:",
          choices: [
            "Changes are tested with small sample sizes",
            "Multiple elements are changed at once",
            "The test is run long enough for statistical significance",
            "Segmentation is ignored"
          ],
          correct: 2,
          tags: ["A/B Testing", "Analytics"],
          answerDetail: "A/B tests require a sufficiently large sample size and duration to achieve statistical significance; otherwise, observed differences might be due to chance rather than the tested changes."
        },
        {
          question: "Which principle is most at risk when decorative images are used instead of descriptive icons in navigation?",
          choices: [
            "Learnability",
            "Affordance",
            "Consistency",
            "Feedback"
          ],
          correct: 1,
          tags: ["Affordance", "Visual Design"],
          answerDetail: "Affordance refers to the cues that suggest how an object should be used. Decorative images may confuse users about what actions are available, reducing the interface's intuitiveness."
        },
        {
          question: 'In service design, a "moment of truth" best describes:',
          choices: [
            "A UI mockup",
            "Any user interaction with a service",
            "A critical touchpoint affecting user perception",
            "Behind-the-scenes business process"
          ],
          correct: 2,
          tags: ["Service Design", "Experience Mapping"],
          answerDetail: "A 'moment of truth' is a pivotal interaction that dramatically impacts users' perceptions of the brand or service, often determining satisfaction or dissatisfaction."
        },
        {
          question: "What kind of accessibility testing involves using keyboard-only navigation to verify interactive element access?",
          choices: [
            "Heuristic evaluation",
            "Cognitive walkthrough",
            "Manual accessibility audit",
            "Automated script testing"
          ],
          correct: 2,
          tags: ["Accessibility", "Testing"],
          answerDetail: "Manual accessibility audits frequently involve hands-on tasks such as navigating pages with a keyboard to ensure every interactive element is reachable and usable, which screen readers and automated tools might miss."
        },
        {
          question: "Which of the following best demonstrates the application of the Pareto Principle in feature prioritization?",
          choices: [
            "Spend equal time on all features",
            "Focus on features used by 80% of users",
            "Eliminate all advanced settings",
            "Prioritize only backend code"
          ],
          correct: 1,
          tags: ["Feature Prioritization", "Pareto"],
          answerDetail: "The 80/20 rule (Pareto Principle) advises focusing on the 20% of features that bring 80% of the value, ensuring resources improve what's most impactful for most users."
        },
        {
          question: "Which research method helps uncover the rationale behind users' actions in natural settings?",
          choices: [
            "A/B testing",
            "Contextual inquiry",
            "Surveys",
            "Analytics review"
          ],
          correct: 1,
          tags: ["Qualitative Research", "Observational Methods"],
          answerDetail: "Contextual inquiry involves observing and interviewing users in their typical environment, discovering real motivations and challenges that may be overlooked in lab settings."
        },
        {
          question: "A usability test reveals that users consistently skip a crucial step on a mobile form—even after redesign. What's a method to uncover root causes?",
          choices: [
            "Increase font size",
            "Add more steps",
            "Conduct retrospective think-aloud interviews",
            "Remove validation"
          ],
          correct: 2,
          tags: ["Usability", "User Research"],
          answerDetail: "Retrospective think-alouds (users narrate their thinking after task completion) can reveal unconscious misinterpretations, workflow obstacles, or missed cues."
        },
        {
          question: 'The "law of proximity" in Gestalt psychology helps UX designers by:',
          choices: [
            "Encouraging lots of visual clutter",
            "Spacing related items closely",
            "Only using color in design",
            "Ignoring groupings"
          ],
          correct: 1,
          tags: ["Gestalt Principles", "UI"],
          answerDetail: "The law of proximity holds that objects placed near each other are perceived as grouped, aiding users in navigating content and understanding structure."
        },
        {
          question: 'Which usability heuristic would be violated if "Cancel" and "Delete" buttons are placed too close together with similar styling?',
          choices: [
            "Visibility of system status",
            "Error prevention",
            "Match between system and real world",
            "User control and freedom"
          ],
          correct: 1,
          tags: ["Heuristics", "Error Prevention"],
          answerDetail: "Error prevention recommends designing interfaces that help users avoid mistakes. Poorly separated destructive and non-destructive buttons can lead to critical errors."
        },
        {
          question: 'What aspect of usability is improved by providing \"undo\" functionality for destructive actions?',
          choices: [
            "Efficiency",
            "Memorability",
            "User control and freedom",
            "Flexibility"
          ],
          correct: 2,
          tags: ["Heuristics", "User Control"],
          answerDetail: "Offering \"undo\" enhances user control and freedom, giving users the ability to easily recover from mistakes and increasing confidence in using the system."
        },
        {
          question: "What is the main UX risk of relying on infinite scroll on content-heavy sites?",
          choices: [
            "Consistent branding",
            "Sticky navigation",
            "Disorientation and loss of location context",
            "Increased form submissions"
          ],
          correct: 2,
          tags: ["Patterns", "Content Design"],
          answerDetail: "Infinite scroll can cause disorientation as users lose sense of their place and ability to navigate to specific content, impacting findability and accessibility."
        },
        {
          question: "Why is it important to include alt text for non-decorative images in web interfaces?",
          choices: [
            "To improve loading speed",
            "To boost color contrast",
            "To provide information to users who can't see images",
            "To facilitate video embedding"
          ],
          correct: 2,
          tags: ["Accessibility", "Content"],
          answerDetail: "Alt text ensures screen readers convey essential visual information to visually impaired users, supporting accessibility compliance and inclusive design."
        },
        {
          question: "What is a key UX consideration when designing filters for a complex data dashboard?",
          choices: [
            "Use as many filters as possible",
            "Place filters below content",
            "Allow for combination of multiple filter criteria and show active filters clearly",
            "Hide filters behind a hamburger menu"
          ],
          correct: 2,
          tags: ["Data Visualization", "IA"],
          answerDetail: "Effective filter design allows users to combine criteria and immediately see which filters are applied, making data exploration and retrieval intuitive and efficient."
        },
        {
          question: "Which method is most appropriate to assess whether users interpret iconography as intended, before launch?",
          choices: [
            "Conversion analytics",
            "Icon usability testing with first impression tasks",
            "Reviewing competitors' icons",
            "Product release"
          ],
          correct: 1,
          tags: ["Iconography", "Usability Testing"],
          answerDetail: "Conducting first-impression usability tests reveal if icons convey the intended meaning to users, helping refine or replace ambiguous icons before launch."
        },
        {
          question: "Which approach best supports accessibility for users with motor impairments?",
          choices: [
            "Small interactive targets",
            "Drag-and-drop mandatory for all tasks",
            "Large, well-spaced buttons compatible with keyboard navigation",
            "Only voice commands"
          ],
          correct: 2,
          tags: ["Accessibility", "Interaction"],
          answerDetail: "Larger targets and spacing accommodate fine-motor challenges, while keyboard navigation aids those unable to use a mouse or touchscreen accurately."
        },
        {
          question: 'A service blueprint expands upon a customer journey map by:',
          choices: [
            "Only showing customer emotions",
            "Mapping only the user interface",
            "Incorporating backstage and support processes",
            "Ignoring pain points"
          ],
          correct: 2,
          tags: ["Service Design", "Blueprinting"],
          answerDetail: "Service blueprints illustrate not just what the user experiences but also the back-end processes and support systems that enable those experiences."
        },
        {
          question: "Which technique is best suited for validating the information architecture of an existing product redesign with minimal development time?",
          choices: [
            "Creating a live prototype",
            "Moderated A/B testing",
            "Tree testing",
            "SEO audit"
          ],
          correct: 2,
          tags: ["IA Validation", "Testing"],
          answerDetail: "Tree testing evaluates the clarity and usability of a site's structure by asking users to find items using only menu labels—no UI needed, making it fast and low-cost."
        }
      ];
    } else {
      return [
        {
          question: "Which color is complementary to red?",
          choices: [
            "Blue",
            "Green",
            "Yellow",
            "Cyan"
          ],
          correct: 1,
          tags: ["Color Theory", "Complementary Colors"]
        },
        {
          question: "What color scheme uses three colors equally spaced on the color wheel?",
          choices: [
            "Monochromatic",
            "Analogous",
            "Triadic",
            "Split-complementary"
          ],
          correct: 2,
          tags: ["Color Theory", "Color Schemes"]
        },
        {
          question: "Which color represents trust and stability?",
          choices: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
          ],
          correct: 1,
          tags: ["Color Psychology", "Branding"]
        },
        {
          question: "What is the RGB value for pure white?",
          choices: [
            "0,0,0",
            "255,255,255",
            "128,128,128",
            "100,100,100"
          ],
          correct: 1,
          tags: ["Color Theory", "RGB"]
        },
        {
          question: "Which color temperature is considered warm?",
          choices: [
            "Blue",
            "Green",
            "Red",
            "Purple"
          ],
          correct: 2,
          tags: ["Color Theory", "Color Temperature"]
        }
      ];
    }
  };

  // Shuffle function
  function shuffle(array) {
    const shuffled = [...array];
    let currentIndex = shuffled.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
  }

  // On mount, shuffle questions
  useEffect(() => {
    if (quizType && timeLimit) {
      const qs = getQuestions();
      const shuffled = shuffle(qs);
      setQuestions(shuffled);
      questionsRef.current = shuffled;
      setCurrentQuestionIndex(0);
      setAnsweredQuestions([]);
      setIsLoading(false);
    }
  }, [quizType, timeLimit]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isLoading) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, isLoading]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || isLoading) return; // Prevent multiple selections
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, {
      questionIndex: currentQuestionIndex,
      selectedAnswer: answerIndex,
      isCorrect,
      tags: currentQuestion.tags,
      question: currentQuestion.question,
      choices: currentQuestion.choices,
      correct: currentQuestion.correct,
      answerDetail: currentQuestion.answerDetail
    }]);
    
    setTimeout(() => {
      // Only move to next question if time remains and there are unused questions
      if (timeLeft > 0) {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // If all questions are used, just stay on the last question until time runs out
          setSelectedAnswer(null);
          setShowResult(false);
        }
      }
    }, 2000);
  };

  const finishQuiz = () => {
    navigate('/summary', {
      state: {
        score,
        totalQuestions: questions.length,
        answeredQuestions,
        quizType,
        timeLimit,
        questions: questions // Pass the questions data for detailed view
      }
    });
  };

  const currentQuestion = questions[currentQuestionIndex] || undefined;
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
  const isWarning = timeLeft <= totalTime * 0.3; // Warning when 30% time left
  const isDanger = timeLeft <= totalTime * 0.1; // Danger when 10% time left

  if (isLoading || !currentQuestion || !currentQuestion.choices) {
    return (
      <div className="page" style={{ background: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '18px', color: '#86868b' }}>Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <div className="quiz-header">
          <div className="quiz-score">Score: {score}</div>
          <div className="quiz-timer">
            <div className="timer-text">{formatTime(timeLeft)}</div>
            <div className="timer-bar">
              <div 
                className={`timer-progress ${isDanger ? 'danger' : isWarning ? 'warning' : ''}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <div className="question">
            {currentQuestion.question}
          </div>

          <div className="tags">
            {currentQuestion.tags?.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          <div className="choices-container">
            {currentQuestion.choices?.map((choice, index) => (
              <div
                key={index}
                className={`choice ${
                  showResult
                    ? index === currentQuestion.correct
                      ? 'correct'
                      : index === selectedAnswer && index !== currentQuestion.correct
                      ? 'incorrect'
                      : ''
                    : selectedAnswer === index
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                style={{ cursor: selectedAnswer !== null ? 'default' : 'pointer' }}
              >
                {choice}
              </div>
            ))}
          </div>

          {showResult && (
            <div className="answer-detail-section" style={{
              marginTop: 32,
              background: '#f5f5f7',
              borderRadius: 16,
              padding: 24,
              textAlign: 'left',
              boxShadow: 'none',
              border: '1px solid #e5e5e7',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: selectedAnswer === currentQuestion.correct ? '#34c759' : '#ff3b30', marginBottom: 8 }}>
                {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
              </div>
              <div style={{ marginBottom: 8, color: '#1d1d1f', fontWeight: 500 }}>
                Correct Answer: {currentQuestion.choices[currentQuestion.correct]}
              </div>
              {currentQuestion.answerDetail && (
                <div style={{ color: '#86868b', fontSize: 15, marginTop: 8 }}>
                  <strong>Detail:</strong> {currentQuestion.answerDetail}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 