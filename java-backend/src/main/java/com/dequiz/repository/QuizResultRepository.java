package com.dequiz.repository;

import com.dequiz.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    
    @Query("SELECT AVG(qr.score) FROM QuizResult qr")
    Double findAverageScore();
    
    @Query("SELECT qr.quizType FROM QuizResult qr GROUP BY qr.quizType ORDER BY COUNT(qr) DESC LIMIT 1")
    String findMostPopularQuizType();
    
    List<QuizResult> findTop10ByOrderByTimestampDesc();
} 