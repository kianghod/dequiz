package com.dequiz.service;

import com.dequiz.model.Question;
import com.dequiz.model.QuizResult;
import com.dequiz.repository.QuestionRepository;
import com.dequiz.repository.QuizResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    public List<Question> getQuestionsByType(String type) {
        if (!type.equals("design") && !type.equals("color")) {
            throw new IllegalArgumentException("Invalid quiz type. Must be 'design' or 'color'");
        }
        
        List<Question> questions = questionRepository.findByQuizType(type);
        
        // If no questions in database, return sample questions
        if (questions.isEmpty()) {
            questions = getSampleQuestions(type);
        }
        
        return questions;
    }

    public QuizResult saveQuizResult(QuizResult quizResult) {
        return quizResultRepository.save(quizResult);
    }

    public Map<String, Object> getStatistics() {
        long totalQuizzes = quizResultRepository.count();
        Double averageScore = quizResultRepository.findAverageScore();
        
        // Get most popular quiz type
        String mostPopularType = quizResultRepository.findMostPopularQuizType();
        
        // Get recent activity (last 10 results)
        List<QuizResult> recentActivity = quizResultRepository.findTop10ByOrderByTimestampDesc();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalQuizzes", totalQuizzes);
        stats.put("averageScore", averageScore != null ? averageScore : 0.0);
        stats.put("mostPopularType", mostPopularType != null ? mostPopularType : "design");
        stats.put("recentActivity", recentActivity);
        
        return stats;
    }

    private List<Question> getSampleQuestions(String type) {
        if ("design".equals(type)) {
            return Arrays.asList(
                new Question(
                    "What is the primary purpose of white space in design?",
                    Arrays.asList("To fill empty areas", "To create visual hierarchy and improve readability", 
                                 "To save ink and paper", "To make designs look minimal"),
                    1,
                    Arrays.asList("Design Principles", "Typography"),
                    "design"
                ),
                new Question(
                    "Which color combination creates the highest contrast?",
                    Arrays.asList("Red and Green", "Blue and Yellow", "Black and White", "Purple and Orange"),
                    2,
                    Arrays.asList("Color Theory", "Accessibility"),
                    "design"
                ),
                new Question(
                    "What does UX stand for in design?",
                    Arrays.asList("User Experience", "User Extension", "User Execution", "User Expression"),
                    0,
                    Arrays.asList("UX/UI", "Design Terminology"),
                    "design"
                ),
                new Question(
                    "Which design principle focuses on creating visual connections between elements?",
                    Arrays.asList("Contrast", "Alignment", "Proximity", "Repetition"),
                    2,
                    Arrays.asList("Design Principles", "Layout"),
                    "design"
                ),
                new Question(
                    "What is the golden ratio in design?",
                    Arrays.asList("1:1.618", "1:2", "1:1.5", "1:3"),
                    0,
                    Arrays.asList("Design Principles", "Proportions"),
                    "design"
                )
            );
        } else {
            return Arrays.asList(
                new Question(
                    "Which color is complementary to red?",
                    Arrays.asList("Blue", "Green", "Yellow", "Cyan"),
                    1,
                    Arrays.asList("Color Theory", "Complementary Colors"),
                    "color"
                ),
                new Question(
                    "What color scheme uses three colors equally spaced on the color wheel?",
                    Arrays.asList("Monochromatic", "Analogous", "Triadic", "Split-complementary"),
                    2,
                    Arrays.asList("Color Theory", "Color Schemes"),
                    "color"
                ),
                new Question(
                    "Which color represents trust and stability?",
                    Arrays.asList("Red", "Blue", "Green", "Yellow"),
                    1,
                    Arrays.asList("Color Psychology", "Branding"),
                    "color"
                ),
                new Question(
                    "What is the RGB value for pure white?",
                    Arrays.asList("0,0,0", "255,255,255", "128,128,128", "100,100,100"),
                    1,
                    Arrays.asList("Color Theory", "RGB"),
                    "color"
                ),
                new Question(
                    "Which color temperature is considered warm?",
                    Arrays.asList("Blue", "Green", "Red", "Purple"),
                    2,
                    Arrays.asList("Color Theory", "Color Temperature"),
                    "color"
                )
            );
        }
    }
} 