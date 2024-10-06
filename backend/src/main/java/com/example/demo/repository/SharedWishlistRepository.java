package com.example.demo.repository;

import com.example.demo.entity.OurUsers;
import com.example.demo.entity.SharedWishlist;  // Import your SharedWishlist entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SharedWishlistRepository extends JpaRepository<SharedWishlist, Long> {
    List<SharedWishlist> findByMembersContaining(OurUsers user);
}
