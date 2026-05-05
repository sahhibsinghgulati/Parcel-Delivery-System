package com.example.parcel.controller;

import com.example.parcel.dto.PaymentDetailRequest;
import com.example.parcel.dto.PaymentStatusUpdate;
import com.example.parcel.entity.Payment;
import com.example.parcel.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validatePayment(@RequestBody PaymentDetailRequest request) {
        try {
            Payment payment = paymentService.validateAndProcessPayment(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("paymentId", payment.getId());
            response.put("message", "Payment details validated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/update-status")
    public ResponseEntity<Map<String, Object>> updateStatus(@RequestBody PaymentStatusUpdate request) {
        Payment payment = paymentService.updatePaymentStatus(request);
        Map<String, Object> response = new HashMap<>();
        response.put("id", payment.getId());
        response.put("parcelId", payment.getParcel().getId());
        response.put("amount", payment.getAmount());
        response.put("status", payment.getStatus());
        response.put("transactionId", payment.getTransactionId());
        return ResponseEntity.ok(response);
    }
}

