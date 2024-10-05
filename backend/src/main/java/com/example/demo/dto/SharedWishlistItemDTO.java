package com.example.demo.dto;

import lombok.Data;

@Data
public class SharedWishlistItemDTO {
    private Long id;
    private Long itemId;
    private Long addedById;
}
