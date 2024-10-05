package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SharedWishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "wishlist_id", nullable = false)
    private SharedWishlist wishlist;

    @ManyToOne
    @JoinColumn(name = "added_by", nullable = false)
    private OurUsers addedBy;
}
