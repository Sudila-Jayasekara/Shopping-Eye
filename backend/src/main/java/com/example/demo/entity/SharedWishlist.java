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
public class SharedWishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sharedWishlistName;

    @ElementCollection
    @CollectionTable(name = "shared_wishlist_items", joinColumns = @JoinColumn(name = "wishlist_id"))
    @Column(name = "item_id")
    private Set<Long> itemIds = new HashSet<>();

    // Owner of the shared wishlist
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private OurUsers owner;

    // Members who can access the shared wishlist
    @ManyToMany
    @JoinTable(
            name = "shared_wishlist_members",
            joinColumns = @JoinColumn(name = "wishlist_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private Set<OurUsers> members = new HashSet<>();

    // Methods to manage item IDs
    public void addItem(Long itemId) {
        itemIds.add(itemId);
    }

    public void removeItem(Long itemId) {
        itemIds.remove(itemId);
    }

    // Methods to manage members
    public void addMember(OurUsers user) {
        members.add(user);
    }

    public void removeMember(OurUsers user) {
        members.remove(user);
    }
}
