package com.example.parcel.controller;
import com.example.parcel.dto.CreateParcelRequest;
import com.example.parcel.entity.Parcel;
import com.example.parcel.service.ParcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/parcels")
public class ParcelController {
    @Autowired
    private ParcelService parcelService;
    @PostMapping
    public ResponseEntity<Parcel> createParcel(@RequestBody CreateParcelRequest request, Authentication authentication) {
        return ResponseEntity.ok(parcelService.createParcel(request, authentication.getName()));
    }
    @GetMapping
    public ResponseEntity<List<Parcel>> listParcels(Authentication authentication) {
        return ResponseEntity.ok(parcelService.listParcelsForUser(authentication.getName()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Parcel> trackParcel(@PathVariable Long id) {
        return ResponseEntity.ok(parcelService.trackParcel(id));
    }
}
