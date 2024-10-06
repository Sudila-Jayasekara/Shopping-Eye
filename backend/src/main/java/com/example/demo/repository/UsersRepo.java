package com.example.demo.repository;

import com.example.demo.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers, Long> {
    Optional<OurUsers> findByEmail(String email);
}
