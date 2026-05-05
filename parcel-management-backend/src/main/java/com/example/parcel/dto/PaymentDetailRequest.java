package com.example.parcel.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDetailRequest {
    private Long parcelId;
    private String method;
    private String cardNumber;
    private String cardholderName;
    private String expiryDate;
    private String cvv;
    private String upiId;
}

