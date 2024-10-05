package com.example.demo.repository;

import com.example.demo.entity.SharedWishlist;
import com.example.demo.entity.SharedWishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedWishlistItemRepository extends JpaRepository<SharedWishlistItem, Long> {

}
