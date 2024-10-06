package com.example.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_listing_id", nullable = false)
    private ItemListing item;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double itemTotalPrice;

    @Column(nullable = false)
    private LocalDate purchaseDay;

    // Default constructor
    public CartItem() {}

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ItemListing getItem() {
        return item;
    }

    public void setItem(ItemListing item) {
        this.item = item;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        this.itemTotalPrice = this.item.getPrice() * quantity;  // Calculate total price
    }

    public Double getItemTotalPrice() {
        return itemTotalPrice;
    }

    public void setPurchaseDay(LocalDate purchaseDay) {
        this.purchaseDay = purchaseDay;
    }



}
