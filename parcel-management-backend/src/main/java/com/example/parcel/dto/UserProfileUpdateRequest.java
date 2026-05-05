package com.example.parcel.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileUpdateRequest {
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
}

