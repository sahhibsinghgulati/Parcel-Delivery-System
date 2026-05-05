package com.example.parcel.dto;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParcelResponse {
    private Long id;
    private String trackingId;
    private String pickupAddress;
    private String pickupCity;
    private String dropLocation;
    private String dropCity;
    private Double weight;
    private Double cost;
    private LocalDate pickupDate;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

