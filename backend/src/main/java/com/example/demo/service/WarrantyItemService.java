package com.example.demo.service;

import com.example.demo.entity.WarrantyItem;
import com.example.demo.repository.WarrantyItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarrantyItemService {

    private final WarrantyItemRepository warrantyItemRepository;

    @Autowired
    public WarrantyItemService(WarrantyItemRepository warrantyItemRepository) {
        this.warrantyItemRepository = warrantyItemRepository;
    }

    public List<WarrantyItem> findAll() {
        return warrantyItemRepository.findAll();
    }

    public Optional<WarrantyItem> findById(Long id) {
        return warrantyItemRepository.findById(id);
    }

    public WarrantyItem save(WarrantyItem warrantyItem) {
        return warrantyItemRepository.save(warrantyItem);
    }

    public void deleteById(Long id) {
        warrantyItemRepository.deleteById(id);
    }
}
