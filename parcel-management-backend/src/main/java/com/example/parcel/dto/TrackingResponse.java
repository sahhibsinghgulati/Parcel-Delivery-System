package com.example.parcel.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingResponse {
    private String trackingId;
    private String status;
    private String pickupAddress;
    private String dropLocation;
    private String message;
}

