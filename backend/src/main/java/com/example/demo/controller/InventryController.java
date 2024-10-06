package com.example.demo.controller;

import com.example.demo.dto.InventryDTO;

import com.example.demo.service.InventryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/public/inventry")
public class InventryController {

    @Autowired
    private InventryService inventryService;

    @PostMapping("/add")
    public ResponseEntity<InventryDTO> addInventry(@RequestBody InventryDTO inventryDTO) {
        InventryDTO addedInventry = inventryService.addInventry(inventryDTO);
        return ResponseEntity.ok(addedInventry);
    }

    @GetMapping("/all")
    public ResponseEntity<List<InventryDTO>> getAllInventry() {
        List<InventryDTO> allInventry = inventryService.getAllInventry();
        return ResponseEntity.ok(allInventry);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventryDTO> getInventryById(@PathVariable Long id) {
        InventryDTO inventryDTO = inventryService.getInventryById(id);
        if (inventryDTO != null) {
            return ResponseEntity.ok(inventryDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
