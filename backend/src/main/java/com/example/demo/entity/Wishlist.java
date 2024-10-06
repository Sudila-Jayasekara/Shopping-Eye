package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ElementCollection
    @CollectionTable(name = "wishlist_items", joinColumns = @JoinColumn(name = "wishlist_id"))
    @Column(name = "item_id")
    private Set<Long> itemIds = new HashSet<>();

    @OneToOne(mappedBy = "wishlist")
    @JsonIgnore
    private OurUsers user;

    // Methods to manage item IDs
    public void addItem(Long itemId) {
        itemIds.add(itemId);
    }

    public void removeItem(Long itemId) {
        itemIds.remove(itemId);
    }
}
