package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import com.example.demo.service.AIPredictionService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictionController {

    @Autowired
    private AIPredictionService aiPredictionService;

    @PostMapping("/predict-solution")
    public Map<String, String> predictSolution(@RequestBody Map<String, String> requestBody) {
        String issue = requestBody.get("issue");
        String solution = aiPredictionService.getSuggestedSolution(issue);

        Map<String, String> response = new HashMap<>();
        response.put("solution", solution);
        return response;
    }
}
