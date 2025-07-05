package com.dequiz.controller;

import com.dequiz.model.Question;
import com.dequiz.model.QuizResult;
import com.dequiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/quiz/{type}")
    public ResponseEntity<Map<String, Object>> getQuestionsByType(@PathVariable String type) {
        try {
            List<Question> questions = quizService.getQuestionsByType(type);
            return ResponseEntity.ok(Map.of(
                "type", type,
                "questions", questions
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/quiz-types")
    public ResponseEntity<List<Map<String, Object>>> getQuizTypes() {
        List<Map<String, Object>> quizTypes = List.of(
            Map.of(
                "id", "design",
                "name", "Design Quiz",
                "description", "Test your knowledge about design principles, UI/UX, and creative concepts.",
                "icon", "🎨"
            ),
            Map.of(
                "id", "color",
                "name", "Color Matching",
                "description", "Challenge yourself with color theory, palettes, and matching exercises.",
                "icon", "🌈"
            )
        );
        return ResponseEntity.ok(quizTypes);
    }

    @PostMapping("/quiz/submit")
    public ResponseEntity<Map<String, Object>> submitQuizResult(@RequestBody QuizResult quizResult) {
        try {
            QuizResult savedResult = quizService.saveQuizResult(quizResult);
            return ResponseEntity.ok(Map.of(
                "message", "Quiz results saved successfully",
                "result", savedResult
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = quizService.getStatistics();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "DeQuiz Java API is running!"));
    }
} 