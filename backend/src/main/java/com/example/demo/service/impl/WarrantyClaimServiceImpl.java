package com.example.demo.service.impl;

import com.example.demo.dto.WarrantyClaimDTO;
import com.example.demo.entity.WarrantyClaim;
import com.example.demo.repository.WarrantyClaimRepository;
import com.example.demo.service.WarrantyClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WarrantyClaimServiceImpl implements WarrantyClaimService {

    @Autowired
    private WarrantyClaimRepository repository;

    @Override
    public List<WarrantyClaimDTO> getAllClaims() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public WarrantyClaimDTO getClaimById(Long id) {
        Optional<WarrantyClaim> claim = repository.findById(id);
        return claim.map(this::convertToDTO).orElse(null);
    }

    @Override
    public WarrantyClaimDTO createClaim(WarrantyClaimDTO claimDTO) {
        WarrantyClaim claim = convertToEntity(claimDTO);
        WarrantyClaim savedClaim = repository.save(claim);
        return convertToDTO(savedClaim);
    }

    @Override
    public WarrantyClaimDTO updateClaim(Long id, WarrantyClaimDTO claimDTO) {
        if (repository.existsById(id)) {
            WarrantyClaim existingClaim = convertToEntity(claimDTO);
            existingClaim.setId(id);
            WarrantyClaim updatedClaim = repository.save(existingClaim);
            return convertToDTO(updatedClaim);
        }
        return null;
    }

    @Override
    public void deleteClaim(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }

    private WarrantyClaimDTO convertToDTO(WarrantyClaim claim) {
        WarrantyClaimDTO dto = new WarrantyClaimDTO();
        dto.setId(claim.getId());
        dto.setItemName(claim.getItemName());
        dto.setPurchaseDay(claim.getPurchaseDay());
        dto.setCreatedDate(claim.getCreatedDate());
        dto.setIssue(claim.getIssue());
        dto.setSolution(claim.getSolution());
        return dto;
    }

    private WarrantyClaim convertToEntity(WarrantyClaimDTO dto) {
        WarrantyClaim claim = new WarrantyClaim();
        claim.setItemName(dto.getItemName());
        claim.setPurchaseDay(dto.getPurchaseDay());
        claim.setCreatedDate(dto.getCreatedDate());
        claim.setIssue(dto.getIssue());
        claim.setSolution(dto.getSolution());
        return claim;
    }
}
