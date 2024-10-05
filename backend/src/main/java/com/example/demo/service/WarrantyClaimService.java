package com.example.demo.service;

import com.example.demo.dto.WarrantyClaimDTO;

import java.util.List;

public interface WarrantyClaimService {

    List<WarrantyClaimDTO> getAllClaims();

    WarrantyClaimDTO getClaimById(Long id);

    WarrantyClaimDTO createClaim(WarrantyClaimDTO claimDTO);

    WarrantyClaimDTO updateClaim(Long id, WarrantyClaimDTO claimDTO);

    void deleteClaim(Long id);
}
