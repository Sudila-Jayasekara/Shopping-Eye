package com.example.demo.service;

import com.example.demo.entity.Feedback;
import com.example.demo.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Get feedbacks by item ID
    public List<Feedback> getFeedbackByItemId(Long itemId) {
        return feedbackRepository.findByItemId(itemId);
    }

    // Add a new feedback
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}
