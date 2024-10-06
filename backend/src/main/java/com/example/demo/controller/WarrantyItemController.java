package com.example.demo.controller;

import com.example.demo.entity.WarrantyItem;
import com.example.demo.service.WarrantyItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/warranty-items")
public class WarrantyItemController {

    private final WarrantyItemService warrantyItemService;

    @Autowired
    public WarrantyItemController(WarrantyItemService warrantyItemService) {
        this.warrantyItemService = warrantyItemService;
    }

    @GetMapping
    public List<WarrantyItem> getAllWarrantyItems() {
        return warrantyItemService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WarrantyItem> getWarrantyItemById(@PathVariable Long id) {
        return warrantyItemService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public WarrantyItem createWarrantyItem(@RequestBody WarrantyItem warrantyItem) {
        return warrantyItemService.save(warrantyItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WarrantyItem> updateWarrantyItem(@PathVariable Long id, @RequestBody WarrantyItem warrantyItem) {
        return warrantyItemService.findById(id)
                .map(existingItem -> {
                    warrantyItem.setId(existingItem.getId()); // Set the existing ID
                    return ResponseEntity.ok(warrantyItemService.save(warrantyItem));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWarrantyItem(@PathVariable Long id) {
        if (warrantyItemService.findById(id).isPresent()) {
            warrantyItemService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
