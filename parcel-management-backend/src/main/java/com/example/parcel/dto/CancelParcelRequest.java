package com.example.parcel.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CancelParcelRequest {
    private Long parcelId;
    private String reason;
}

