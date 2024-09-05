package com.example.demo.dto;

import lombok.Data;

import java.util.Set;

@Data
public class WishlistDTO { //useto enscapsulate data and transfer between layers
    private Long id;
    private String name;
    private Set<WishlistItemDTO> items;
}
