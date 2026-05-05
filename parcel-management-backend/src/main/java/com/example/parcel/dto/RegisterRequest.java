package com.example.parcel.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String role; // ROLE_USER or ROLE_ADMIN
}
