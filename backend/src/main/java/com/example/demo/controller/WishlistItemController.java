package com.example.demo.controller;

import com.example.demo.entity.WishlistItem;
import com.example.demo.service.WishlistItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/wishlist-items")
public class WishlistItemController {
    @Autowired
    private WishlistItemService wishlistItemService;

    @GetMapping
    public List<WishlistItem> getAllWishlistItems() {
        return wishlistItemService.getAllWishlistItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WishlistItem> getWishlistItemById(@PathVariable Long id) {
        Optional<WishlistItem> wishlistItem = wishlistItemService.getWishlistItemById(id);
        return wishlistItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public WishlistItem createWishlistItem(@RequestBody WishlistItem wishlistItem) {
        return wishlistItemService.saveWishlistItem(wishlistItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WishlistItem> updateWishlistItem(@PathVariable Long id, @RequestBody WishlistItem wishlistItem) {
        if (wishlistItemService.getWishlistItemById(id).isPresent()) {
            wishlistItem.setId(id);
            return ResponseEntity.ok(wishlistItemService.saveWishlistItem(wishlistItem));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWishlistItem(@PathVariable Long id) {
        if (wishlistItemService.getWishlistItemById(id).isPresent()) {
            wishlistItemService.deleteWishlistItem(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
