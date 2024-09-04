package com.example.demo.repository;

import com.example.demo.entity.ItemListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemListingRepository extends JpaRepository<ItemListing, Long> {
    // You can remove custom query methods if you want to match the PaymentRepository style
}