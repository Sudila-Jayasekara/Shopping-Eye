package com.example.demo.controller;

import com.example.demo.entity.ItemListing;
import com.example.demo.service.ItemListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemListingController {

    @Autowired
    private ItemListingService itemListingService;

    @GetMapping
    public List<ItemListing> getAllItems() {
        return itemListingService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemListing> getItemById(@PathVariable Long id) {
        Optional<ItemListing> itemListing = itemListingService.getItemById(id);
        return itemListing.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ItemListing createItem(@RequestBody ItemListing itemListing) {
        return itemListingService.saveItem(itemListing);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemListing> updateItem(@PathVariable Long id, @RequestBody ItemListing itemListingDetails) {
        Optional<ItemListing> existingItem = itemListingService.getItemById(id);
        if (existingItem.isPresent()) {
            ItemListing updatedItem = existingItem.get();
            updatedItem.setQuantity(itemListingDetails.getQuantity());
            updatedItem.setDescription(itemListingDetails.getDescription());
            updatedItem.setCategory(itemListingDetails.getCategory());
            updatedItem.setImageUrl(itemListingDetails.getImageUrl()); // Update image URL
            return ResponseEntity.ok(itemListingService.saveItem(updatedItem));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemListingService.getItemById(id).isPresent()) {
            itemListingService.deleteItem(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}