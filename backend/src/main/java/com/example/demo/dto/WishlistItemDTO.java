package com.example.demo.dto;

import com.example.demo.entity.Wishlist;
import lombok.Data;

@Data
public class WishlistItemDTO {
    private Long id;
    private Long productId;
    private String productName;
}
