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
@RequestMapping("/adminuser/wishlist") // base URL
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/create")
    public ResponseEntity<Wishlist> createWishlist(@RequestBody Wishlist wishlist) {
        return wishlistService.saveWishlist(wishlist);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Wishlist>> getAllWishlists() {
        return wishlistService.getAllWishlists();
    }

    @GetMapping("/my")
    public ResponseEntity<Wishlist> getWishlistByUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String email = authentication.getName();
        System.out.println("Authenticated user's email: " + email); // Debugging line
        return wishlistService.getWishlistByUserEmail(email);
    }



}
