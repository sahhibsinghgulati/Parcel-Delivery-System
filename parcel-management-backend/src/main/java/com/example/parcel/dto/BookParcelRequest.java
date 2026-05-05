package com.example.parcel.dto;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookParcelRequest {
    private String pickupAddress;
    private String pickupCity;
    private String pickupContactInfo;
    private String dropLocation;
    private String dropCity;
    private String dropContactInfo;
    private Double weight;
    private LocalDate pickupDate;
}

