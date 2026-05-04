package com.example.parcel.dto;
import lombok.Data;
@Data
public class PaymentStatusUpdate {
    private Long parcelId;
    private Double amount;
    private String status; // SUCCESS, FAILED, PENDING
    private String transactionId;
}
