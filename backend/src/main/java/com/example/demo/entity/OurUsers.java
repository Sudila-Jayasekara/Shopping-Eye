package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ourusers")
@Data
public class OurUsers implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String name;
    private String password;
    private String role;
    private String imageUrl;

    // New fields added for user details
    private String dob;          // Date of Birth
    private String gender;       // Gender
    private String phone;        // Phone Number
    private String address;      // Address

    @OneToOne(cascade = CascadeType.ALL) // Cascade to automatically persist the wishlist
    @JoinColumn(name = "wishlist_id", referencedColumnName = "id")
    private Wishlist wishlist;

    // Updated field: Now references SharedWishlist
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL) // Owner of shared wishlists
    private Set<SharedWishlist> sharedWishlists = new HashSet<>();

    // New field to represent the shared wishlists this user is a member of
    @ManyToMany(mappedBy = "members") // Members of shared wishlists
    private Set<SharedWishlist> memberWishlists = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
