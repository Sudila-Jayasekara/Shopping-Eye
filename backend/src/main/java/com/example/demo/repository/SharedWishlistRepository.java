package com.example.demo.repository;

import com.example.demo.entity.SharedWishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedWishlistRepository extends JpaRepository<SharedWishlist, Long> {
    List<SharedWishlist> findByOwnerId(Long userId); // Add this method
}
