package com.example.demo.dto;

import lombok.Data;

import java.util.Set;

@Data
public class WishlistDTO {
    private Long id;
    private String name;
    private Set<Long> itemIds;  // Store item IDs directly
}
