package com.example.demo.dto;

import java.time.LocalDate;

public class WarrantyClaimDTO {

    private Long id;
    private String itemName;
    private LocalDate purchaseDay;
    private LocalDate createdDate;
    private String issue;
    private String solution;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public LocalDate getPurchaseDay() {
        return purchaseDay;
    }

    public void setPurchaseDay(LocalDate purchaseDay) {
        this.purchaseDay = purchaseDay;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }
}
