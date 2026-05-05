package com.example.parcel.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackRequest {
    private Long parcelId;
    private Integer rating;
    private String comment;
}

