package com.example.demo.repository;

import com.example.demo.entity.WarrantyItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarrantyItemRepository extends JpaRepository<WarrantyItem, Long> {
    // You can define custom query methods here if needed
}
