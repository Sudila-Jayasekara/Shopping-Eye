package com.example.demo.controller;

import com.example.demo.entity.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import com.example.demo.service.AIPredictionService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/public")
public class PredictionController {

    @Autowired
    private AIPredictionService aiPredictionService;

    @PostMapping("/predict-solution")
    public Map<String, String> predictSolution(@RequestBody Map<String, String> requestBody) {
        System.out.println("Hitted to predict solution 1");
        String issue = requestBody.get("issue");
        String solution = aiPredictionService.getSuggestedSolution(issue);
        Map<String, String> response = new HashMap<>();
        response.put("solution", solution);
        return response;

//        Map<String, String> response = new HashMap<>();
//        response.put("solution", solution);
//        return response;
    }
}
