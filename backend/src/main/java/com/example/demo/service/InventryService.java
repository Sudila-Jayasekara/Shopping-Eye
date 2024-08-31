package com.example.demo.service;

import com.example.demo.dto.InventryDTO;
import com.example.demo.entity.Inventry;
import com.example.demo.repository.InventryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InventryService {

    @Autowired
    private InventryRepository inventryRepository;

    public InventryDTO addInventry(InventryDTO inventryDTO) {
        Inventry inventry = new Inventry();
        inventry.setItemName(inventryDTO.getItemName());
        inventry.setItemDescription(inventryDTO.getItemDescription());
        inventry.setPurchaseDay(inventryDTO.getPurchaseDay());
        inventry.setWarrantyTime(inventryDTO.getWarrantyTime());

        Inventry savedInventry = inventryRepository.save(inventry);
        return mapToDTO(savedInventry);
    }

    public List<InventryDTO> getAllInventry() {
        return inventryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public InventryDTO getInventryById(Long id) {
        Optional<Inventry> inventry = inventryRepository.findById(id);
        return inventry.map(this::mapToDTO).orElse(null);
    }

    private InventryDTO mapToDTO(Inventry inventry) {
        InventryDTO inventryDTO = new InventryDTO();
        inventryDTO.setId(inventry.getId());
        inventryDTO.setItemName(inventry.getItemName());
        inventryDTO.setItemDescription(inventry.getItemDescription());
        inventryDTO.setPurchaseDay(inventry.getPurchaseDay());
        inventryDTO.setWarrantyTime(inventry.getWarrantyTime());
        return inventryDTO;
    }
}
