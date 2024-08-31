package com.example.demo.dto;

import java.time.LocalDate;

public class InventryDTO {

    private int id;
    private String itemName;
    private String itemDescription;
    private LocalDate purchaseDay;
    private int warrantyTime;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public LocalDate getPurchaseDay() {
        return purchaseDay;
    }

    public void setPurchaseDay(LocalDate purchaseDay) {
        this.purchaseDay = purchaseDay;
    }

    public int getWarrantyTime() {
        return warrantyTime;
    }

    public void setWarrantyTime(int warrantyTime) {
        this.warrantyTime = warrantyTime;
    }
}
