package com.dequiz.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String question;
    
    @ElementCollection
    @CollectionTable(name = "question_choices", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "choice")
    private List<String> choices;
    
    @Column(nullable = false)
    private Integer correctAnswer;
    
    @ElementCollection
    @CollectionTable(name = "question_tags", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "tag")
    private List<String> tags;
    
    @Column(nullable = false)
    private String quizType;
    
    // Constructors
    public Question() {}
    
    public Question(String question, List<String> choices, Integer correctAnswer, 
                   List<String> tags, String quizType) {
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
        this.tags = tags;
        this.quizType = quizType;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getQuestion() {
        return question;
    }
    
    public void setQuestion(String question) {
        this.question = question;
    }
    
    public List<String> getChoices() {
        return choices;
    }
    
    public void setChoices(List<String> choices) {
        this.choices = choices;
    }
    
    public Integer getCorrectAnswer() {
        return correctAnswer;
    }
    
    public void setCorrectAnswer(Integer correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
    
    public List<String> getTags() {
        return tags;
    }
    
    public void setTags(List<String> tags) {
        this.tags = tags;
    }
    
    public String getQuizType() {
        return quizType;
    }
    
    public void setQuizType(String quizType) {
        this.quizType = quizType;
    }
} 