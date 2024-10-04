package com.example.demo.service;

import com.example.demo.entity.ItemListing;
import com.example.demo.repository.ItemListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemListingService {

    @Autowired
    private ItemListingRepository itemListingRepository;

    // Get all items
    public List<ItemListing> getAllItems() {
        return itemListingRepository.findAll();
    }

    // Get item by ID
    public Optional<ItemListing> getItemById(Long id) {
        return itemListingRepository.findById(id);
    }

    // Add or update an item
    public ItemListing saveItem(ItemListing itemListing) {
        return itemListingRepository.save(itemListing);
    }

    // Delete an item
    public void deleteItem(Long id) {
        if (itemListingRepository.existsById(id)) {
            itemListingRepository.deleteById(id);
        }
    }
}