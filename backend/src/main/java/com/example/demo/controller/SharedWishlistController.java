package com.example.demo.controller;

import com.example.demo.entity.OurUsers;
import com.example.demo.entity.SharedWishlist;
import com.example.demo.entity.SharedWishlistItem;
import com.example.demo.service.SharedWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/adminuser/shared-wishlist")
public class SharedWishlistController {

    @Autowired
    private SharedWishlistService sharedWishlistService;


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SharedWishlist>> getWishlistsByUserId(@PathVariable Long userId) {
        List<SharedWishlist> wishlists = sharedWishlistService.getWishlistsByUserId(userId);
        return wishlists.isEmpty() ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : ResponseEntity.ok(wishlists);
    }

    @PostMapping
    public ResponseEntity<SharedWishlist> createWishlist(@RequestBody SharedWishlist wishlist) {
        try {
            SharedWishlist createdWishlist = sharedWishlistService.createWishlist(wishlist);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWishlist); // Use CREATED status
        } catch (Exception e) {
            // Log the error
            System.err.println("Error creating wishlist: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Return an appropriate status code
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<SharedWishlist> getWishlist(@PathVariable Long id) {
        Optional<SharedWishlist> wishlist = sharedWishlistService.getWishlist(id);
        return wishlist.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        sharedWishlistService.deleteWishlist(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{wishlistId}/items")
    public ResponseEntity<SharedWishlist> addItemToWishlist(@PathVariable Long wishlistId, @RequestBody SharedWishlistItem item) {
        SharedWishlist updatedWishlist = sharedWishlistService.addItemToWishlist(wishlistId, item);
        return ResponseEntity.ok(updatedWishlist);
    }

    @DeleteMapping("/{wishlistId}/items/{itemId}")
    public ResponseEntity<SharedWishlist> removeItemFromWishlist(@PathVariable Long wishlistId, @PathVariable Long itemId) {
        SharedWishlist updatedWishlist = sharedWishlistService.removeItemFromWishlist(wishlistId, itemId);
        return ResponseEntity.ok(updatedWishlist);
    }

    @GetMapping("/{wishlistId}/items")
    public ResponseEntity<Set<SharedWishlistItem>> getItems(@PathVariable Long wishlistId) {
        Set<SharedWishlistItem> items = sharedWishlistService.getItems(wishlistId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{wishlistId}/members")
    public ResponseEntity<SharedWishlist> addMemberToWishlist(@PathVariable Long wishlistId, @RequestBody OurUsers member) {
        SharedWishlist updatedWishlist = sharedWishlistService.addMemberToWishlist(wishlistId, member);
        return ResponseEntity.ok(updatedWishlist);
    }

}
