package com.example.parcel.service;

import com.example.parcel.dto.PaymentDetailRequest;
import com.example.parcel.dto.PaymentStatusUpdate;
import com.example.parcel.entity.Parcel;
import com.example.parcel.entity.Payment;
import com.example.parcel.repository.ParcelRepository;
import com.example.parcel.repository.PaymentRepository;
import com.example.parcel.util.ValidationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ParcelRepository parcelRepository;

    public Payment validateAndProcessPayment(PaymentDetailRequest request) {
        Parcel parcel = parcelRepository.findById(request.getParcelId())
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        Payment.PaymentMethod method = Payment.PaymentMethod.valueOf(request.getMethod().toUpperCase());

        // Validate based on payment method
        switch (method) {
            case CREDIT_CARD:
            case DEBIT_CARD:
                validateCardDetails(request);
                break;
            case UPI:
                validateUPI(request);
                break;
        }

        Payment payment = Payment.builder()
                .parcel(parcel)
                .amount(parcel.getCost())
                .method(method)
                .status(Payment.PaymentStatus.PAYMENT_PENDING)
                .transactionId("TXN-" + System.currentTimeMillis())
                .createdAt(LocalDateTime.now())
                .build();

        return paymentRepository.save(payment);
    }

    private void validateCardDetails(PaymentDetailRequest request) {
        if (request.getCardNumber() == null || !ValidationUtil.isValidCardNumber(request.getCardNumber())) {
            throw new RuntimeException("Invalid card number");
        }
        if (request.getCvv() == null || !ValidationUtil.isValidCVV(request.getCvv())) {
            throw new RuntimeException("Invalid CVV");
        }
        if (request.getExpiryDate() == null || !ValidationUtil.isValidExpiryDate(request.getExpiryDate())) {
            throw new RuntimeException("Invalid expiry date");
        }
        if (request.getCardholderName() == null || request.getCardholderName().trim().isEmpty()) {
            throw new RuntimeException("Invalid cardholder name");
        }
    }

    private void validateUPI(PaymentDetailRequest request) {
        if (request.getUpiId() == null || !ValidationUtil.isValidUPI(request.getUpiId())) {
            throw new RuntimeException("Invalid UPI ID");
        }
    }

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
        payment.setUpdatedAt(LocalDateTime.now());

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

