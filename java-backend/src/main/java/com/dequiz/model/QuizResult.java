package com.dequiz.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quiz_results")
public class QuizResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String quizType;
    
    @Column(nullable = false)
    private Integer score;
    
    @Column(nullable = false)
    private Integer totalQuestions;
    
    @Column(nullable = false)
    private Integer timeLimit;
    
    @ElementCollection
    @CollectionTable(name = "answered_questions", joinColumns = @JoinColumn(name = "result_id"))
    @AttributeOverrides({
        @AttributeOverride(name = "questionIndex", column = @Column(name = "question_index")),
        @AttributeOverride(name = "selectedAnswer", column = @Column(name = "selected_answer")),
        @AttributeOverride(name = "isCorrect", column = @Column(name = "is_correct"))
    })
    private List<AnsweredQuestion> answeredQuestions;
    
    @Column(nullable = false)
    private LocalDateTime timestamp;
    
    // Nested class for answered questions
    @Embeddable
    public static class AnsweredQuestion {
        private Integer questionIndex;
        private Integer selectedAnswer;
        private Boolean isCorrect;
        
        public AnsweredQuestion() {}
        
        public AnsweredQuestion(Integer questionIndex, Integer selectedAnswer, Boolean isCorrect) {
            this.questionIndex = questionIndex;
            this.selectedAnswer = selectedAnswer;
            this.isCorrect = isCorrect;
        }
        
        // Getters and Setters
        public Integer getQuestionIndex() {
            return questionIndex;
        }
        
        public void setQuestionIndex(Integer questionIndex) {
            this.questionIndex = questionIndex;
        }
        
        public Integer getSelectedAnswer() {
            return selectedAnswer;
        }
        
        public void setSelectedAnswer(Integer selectedAnswer) {
            this.selectedAnswer = selectedAnswer;
        }
        
        public Boolean getIsCorrect() {
            return isCorrect;
        }
        
        public void setIsCorrect(Boolean isCorrect) {
            this.isCorrect = isCorrect;
        }
    }
    
    // Constructors
    public QuizResult() {}
    
    public QuizResult(String quizType, Integer score, Integer totalQuestions, 
                     Integer timeLimit, List<AnsweredQuestion> answeredQuestions) {
        this.quizType = quizType;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.timeLimit = timeLimit;
        this.answeredQuestions = answeredQuestions;
        this.timestamp = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getQuizType() {
        return quizType;
    }
    
    public void setQuizType(String quizType) {
        this.quizType = quizType;
    }
    
    public Integer getScore() {
        return score;
    }
    
    public void setScore(Integer score) {
        this.score = score;
    }
    
    public Integer getTotalQuestions() {
        return totalQuestions;
    }
    
    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
    
    public Integer getTimeLimit() {
        return timeLimit;
    }
    
    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }
    
    public List<AnsweredQuestion> getAnsweredQuestions() {
        return answeredQuestions;
    }
    
    public void setAnsweredQuestions(List<AnsweredQuestion> answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
} 