package com.example.demo.dto;

import lombok.Data;

import java.util.Set;

@Data
public class SharedWishlistDTO {
    private Long id;  // Unique identifier for the shared wishlist
    private String sharedWishlistName;  // Name of the shared wishlist
    private Long ownerId;  // ID of the owner of the wishlist
    private Set<Long> itemIds;  // Store item IDs directly
    private Set<Long> memberIds;  // Store IDs of members who have access to the shared wishlist
}
