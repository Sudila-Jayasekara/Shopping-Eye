package com.example.demo.controller;

import com.example.demo.entity.Wishlist;
import com.example.demo.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminuser/wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/create")
    public ResponseEntity<Wishlist> createWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.saveWishlist(wishlist);
    }

    @PutMapping("/{id}/add-item/{itemId}")
    public ResponseEntity<Void> addItemToWishlist(@PathVariable Long id, @PathVariable Long itemId) {
        return wishlistService.addItemToWishlist(id, itemId);
    }

    @DeleteMapping("/{id}/remove-item/{itemId}")
    public ResponseEntity<Void> removeItemFromWishlist(@PathVariable Long id, @PathVariable Long itemId) {
        return wishlistService.removeItemFromWishlist(id, itemId);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Wishlist> getWishlistById(@PathVariable Long id) {
        return wishlistService.getWishlistById(id);
    }
}
