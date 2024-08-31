package com.example.demo.controller;

import com.example.demo.dto.WarrantyClaimDTO;
import com.example.demo.service.WarrantyClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warranty-claims")
public class WarrantyClaimController {

    @Autowired
    private WarrantyClaimService warrantyClaimService;

    @PostMapping
    public ResponseEntity<WarrantyClaimDTO> createClaim(@RequestBody WarrantyClaimDTO claimDTO) {
        WarrantyClaimDTO createdClaim = warrantyClaimService.createClaim(claimDTO);
        return ResponseEntity.ok(createdClaim);
    }

    @GetMapping
    public ResponseEntity<List<WarrantyClaimDTO>> getAllClaims() {
        List<WarrantyClaimDTO> claims = warrantyClaimService.getAllClaims();
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WarrantyClaimDTO> getClaimById(@PathVariable Long id) {
        WarrantyClaimDTO claim = warrantyClaimService.getClaimById(id);
        if (claim != null) {
            return ResponseEntity.ok(claim);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarrantyClaimDTO> updateClaim(@PathVariable Long id, @RequestBody WarrantyClaimDTO claimDTO) {
        WarrantyClaimDTO updatedClaim = warrantyClaimService.updateClaim(id, claimDTO);
        if (updatedClaim != null) {
            return ResponseEntity.ok(updatedClaim);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Long id) {
        warrantyClaimService.deleteClaim(id);
        return ResponseEntity.noContent().build();
    }
}
