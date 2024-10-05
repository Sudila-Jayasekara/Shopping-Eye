package com.example.demo.dto;

import lombok.Data;

import java.util.Set;

@Data
public class SharedWishlistDTO {
    private Long id;
    private String name;
    private Long ownerId;
    private Set<Long> memberIds;
    private Set<SharedWishlistItemDTO> items;
}
