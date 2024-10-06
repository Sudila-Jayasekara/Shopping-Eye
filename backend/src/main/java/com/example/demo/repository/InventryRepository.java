package com.example.demo.repository;

import com.example.demo.entity.Inventry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventryRepository extends JpaRepository<Inventry, Long> {
    // Additional query methods (if needed) can be defined here
}
