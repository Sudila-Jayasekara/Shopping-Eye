package com.example.demo.controller;

import com.example.demo.entity.Feedback;
import com.example.demo.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/feedback")

public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/item/{itemId}")
    public List<Feedback> getFeedbackByItemId(@PathVariable Long itemId) {
        return feedbackService.getFeedbackByItemId(itemId);
    }

    @PostMapping
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return feedbackService.addFeedback(feedback);
    }
}
