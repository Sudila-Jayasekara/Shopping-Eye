package com.example.demo.controller;

import com.example.demo.dto.SharedWishlistDTO; // Import the SharedWishlistDTO
import com.example.demo.entity.OurUsers;
import com.example.demo.entity.SharedWishlist; // Import the SharedWishlist entity
import com.example.demo.service.SharedWishlistService; // Import the SharedWishlist service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminuser/shared-wishlist")
public class SharedWishlistController {
    @Autowired
    private SharedWishlistService sharedWishlistService;

    @PostMapping("/create")
    public ResponseEntity<SharedWishlist> createSharedWishlist(@RequestBody SharedWishlistDTO sharedWishlistDTO) {
        return sharedWishlistService.saveSharedWishlist(sharedWishlistDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSharedWishlist(@PathVariable Long id) {
        return sharedWishlistService.deleteSharedWishlist(id);
    }

    @PutMapping("/{id}/add-item/{itemId}")
    public ResponseEntity<Void> addItemToSharedWishlist(@PathVariable Long id, @PathVariable Long itemId) {
        return sharedWishlistService.addItemToSharedWishlist(id, itemId);
    }

    @DeleteMapping("/{id}/remove-item/{itemId}")
    public ResponseEntity<Void> removeItemFromSharedWishlist(@PathVariable Long id, @PathVariable Long itemId) {
        return sharedWishlistService.removeItemFromSharedWishlist(id, itemId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SharedWishlist> getSharedWishlistById(@PathVariable Long id) {
        return sharedWishlistService.getSharedWishlistById(id);
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<OurUsers>> getAllMembersForSharedWishlist(@PathVariable Long id) {
        return sharedWishlistService.getAllMembersForSharedWishlist(id);
    }

    @PostMapping("/{id}/add-member/{userId}")
    public ResponseEntity<Void> addMemberToSharedWishlist(@PathVariable Long id, @PathVariable Long userId) {
        return sharedWishlistService.addMemberToSharedWishlist(id, userId);
    }

    @DeleteMapping("/{id}/remove-member/{userId}")
    public ResponseEntity<Void> removeMemberFromSharedWishlist(@PathVariable Long id, @PathVariable Long userId) {
        return sharedWishlistService.removeMemberFromSharedWishlist(id, userId);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SharedWishlist>> getAllSharedWishlistsForUser(@PathVariable Long userId) {
        return sharedWishlistService.getAllSharedWishlistsForUser(userId);
    }


}

