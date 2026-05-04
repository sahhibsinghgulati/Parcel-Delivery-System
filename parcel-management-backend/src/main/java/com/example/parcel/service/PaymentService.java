package com.example.parcel.service;

import com.example.parcel.dto.PaymentStatusUpdate;
import com.example.parcel.entity.Parcel;
import com.example.parcel.entity.Payment;
import com.example.parcel.repository.ParcelRepository;
import com.example.parcel.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ParcelRepository parcelRepository;

    public Payment updatePaymentStatus(PaymentStatusUpdate request) {
        if (request.getParcelId() == null) {
            throw new RuntimeException("Parcel ID is required");
        }

        Parcel parcel = parcelRepository.findById(request.getParcelId())
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        Payment payment = paymentRepository.findByParcelId(parcel.getId())
                .orElseGet(() -> Payment.builder()
                        .parcel(parcel)
                        .createdAt(LocalDateTime.now())
                        .build());

        payment.setParcel(parcel);
        payment.setAmount(request.getAmount() != null ? request.getAmount() : parcel.getCost());
        payment.setStatus(mapStatus(request.getStatus()));
        payment.setTransactionId(request.getTransactionId());

        return paymentRepository.save(payment);
    }

    private Payment.PaymentStatus mapStatus(String status) {
        if (status == null) {
            return Payment.PaymentStatus.PAYMENT_PENDING;
        }

        return switch (status.toUpperCase()) {
            case "SUCCESS" -> Payment.PaymentStatus.CONFIRMED;
            case "FAILED" -> Payment.PaymentStatus.PAYMENT_FAILED;
            default -> Payment.PaymentStatus.PAYMENT_PENDING;
        };
    }
}

