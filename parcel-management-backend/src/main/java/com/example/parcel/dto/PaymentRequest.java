package com.example.parcel.dto;
import lombok.Data;
@Data
public class PaymentRequest {
    private Long parcelId;
    private Double amount;
}
