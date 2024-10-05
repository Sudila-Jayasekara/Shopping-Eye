package com.example.demo.entity;

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
    private String name;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private OurUsers owner;

    @ManyToMany
    @JoinTable(
            name = "shared_wishlist_members",
            joinColumns = @JoinColumn(name = "wishlist_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private Set<OurUsers> members = new HashSet<>();

    @OneToMany(mappedBy = "wishlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SharedWishlistItem> items = new HashSet<>();

    // Methods to manage members and items
    public void addMember(OurUsers member) {
        members.add(member);
    }

    public void removeMember(OurUsers member) {
        members.remove(member);
    }

    public void addItem(SharedWishlistItem item) {
        items.add(item);
        item.setWishlist(this);
    }

    public void removeItem(SharedWishlistItem item) {
        items.remove(item);
        item.setWishlist(null);
    }
}
