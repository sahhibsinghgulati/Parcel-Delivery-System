package com.example.parcel.controller;

import com.example.parcel.dto.*;
import com.example.parcel.service.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/parcels")
public class ParcelController {
    @Autowired
    private ParcelService parcelService;

    @PostMapping
    public ResponseEntity<ParcelResponse> bookParcel(@RequestBody BookParcelRequest request, Authentication authentication) {
        return ResponseEntity.ok(parcelService.bookParcel(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<ParcelResponse>> listParcels(Authentication authentication) {
        return ResponseEntity.ok(parcelService.listParcelsForUser(authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParcelResponse> trackParcel(@PathVariable Long id) {
        return ResponseEntity.ok(parcelService.trackParcel(id));
    }

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<TrackingResponse> trackByTrackingId(@PathVariable String trackingId) {
        return ResponseEntity.ok(parcelService.trackByTrackingId(trackingId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParcelResponse> updateParcel(@PathVariable Long id, @RequestBody UpdateParcelRequest request, Authentication authentication) {
        return ResponseEntity.ok(parcelService.updateParcel(id, request, authentication.getName()));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ParcelResponse> cancelParcel(@PathVariable Long id, @RequestBody CancelParcelRequest request, Authentication authentication) {
        return ResponseEntity.ok(parcelService.cancelParcel(id, request, authentication.getName()));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<ParcelResponse>> getAllParcels() {
        return ResponseEntity.ok(parcelService.getAllParcels());
    }

    @PutMapping("/admin/{id}/status")
    public ResponseEntity<ParcelResponse> updateParcelStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(parcelService.updateParcelStatus(id, request.get("status")));
    }

    @GetMapping("/{id}/invoice")
    public ResponseEntity<InvoiceResponse> generateInvoice(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(parcelService.generateInvoice(id, authentication.getName()));
    }
}


