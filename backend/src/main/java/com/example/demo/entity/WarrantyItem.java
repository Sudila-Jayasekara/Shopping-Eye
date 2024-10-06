package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarrantyItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @Column(name = "item_id", nullable = false)
    private Long itemId; // Store the ItemListing ID

    @Column(nullable = false)
    private LocalDate purchaseDay; // Store the purchase day as LocalDate

    @Column(nullable = false)
    private String name; // Item name

    @Column(nullable = false)
    private double price; // Item price as double

    @Column(length = 500)
    private String description; // Item description

    @Column(nullable = false)
    private String category; // Item category

    @Column(nullable = false)
    private Integer warrantyTime; // Warranty time in months
}
