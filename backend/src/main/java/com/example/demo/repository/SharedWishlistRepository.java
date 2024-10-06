package com.example.demo.repository;

import com.example.demo.entity.OurUsers;
import com.example.demo.entity.SharedWishlist;  // Import your SharedWishlist entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

public interface SharedWishlistRepository extends JpaRepository<SharedWishlist, Long> {
    @Query("SELECT sw FROM SharedWishlist sw JOIN sw.members m WHERE m = :user")
    List<SharedWishlist> findSharedWishlistsByUser(@Param("user") OurUsers user);
}

