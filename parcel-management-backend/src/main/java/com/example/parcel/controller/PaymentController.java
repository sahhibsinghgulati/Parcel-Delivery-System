package com.example.parcel.controller;

import com.example.parcel.dto.PaymentStatusUpdate;
import com.example.parcel.entity.Payment;
import com.example.parcel.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

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


