package com.example.demo.dto;

import com.example.demo.entity.OurUsers;
import com.example.demo.entity.Wishlist;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;

    private Long id;
    private String name;
    private String role;
    private String email;
    private String password;
    private String imageUrl;

    // New fields for user registration
    private String dob;          // Date of Birth
    private String gender;       // Gender
    private String phone;        // Phone Number
    private String address;      // Address

    private Wishlist wishlist;
    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;

}
