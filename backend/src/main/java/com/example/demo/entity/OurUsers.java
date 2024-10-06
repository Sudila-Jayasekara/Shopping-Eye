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

    private String dob;
    private String gender;
    private String phone;
    private String address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "wishlist_id", referencedColumnName = "id")
    private Wishlist wishlist;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Set<SharedWishlist> sharedWishlists = new HashSet<>();

    @ManyToMany(mappedBy = "members")
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
