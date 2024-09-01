package com.example.demo.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIPredictionService {

    public String getSuggestedSolution(String issue) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:5000/predict"; // Flask API URL

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("issue", issue);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
        Map<String, String> response = restTemplate.postForObject(url, entity, Map.class);

        return response != null ? response.get("solution") : "No solution found";
    }
}

