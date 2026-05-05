package com.example.parcel.service;
import com.example.parcel.dto.*;
import com.example.parcel.entity.Parcel;
import com.example.parcel.entity.User;
import com.example.parcel.repository.ParcelRepository;
import com.example.parcel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ParcelService {
    @Autowired
    private ParcelRepository parcelRepository;
    @Autowired
    private UserRepository userRepository;

    private static final double COST_PER_KG = 5.0;

    // Book a parcel for a user
    public ParcelResponse bookParcel(BookParcelRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double cost = request.getWeight() * COST_PER_KG;
        String trackingId = generateTrackingId();

        Parcel parcel = Parcel.builder()
                .trackingId(trackingId)
                .sender(user)
                .pickupAddress(request.getPickupAddress())
                .pickupCity(request.getPickupCity())
                .pickupContactInfo(request.getPickupContactInfo())
                .dropLocation(request.getDropLocation())
                .dropCity(request.getDropCity())
                .dropContactInfo(request.getDropContactInfo())
                .weight(request.getWeight())
                .cost(cost)
                .pickupDate(request.getPickupDate())
                .status(Parcel.ParcelStatus.CREATED)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Parcel saved = parcelRepository.save(parcel);
        return mapToResponse(saved);
    }

    // Get all parcels for a user
    public List<ParcelResponse> listParcelsForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return parcelRepository.findBySenderId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Track a parcel by tracking ID
    public TrackingResponse trackByTrackingId(String trackingId) {
        Parcel parcel = parcelRepository.findByTrackingId(trackingId)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));
        return TrackingResponse.builder()
                .trackingId(parcel.getTrackingId())
                .status(parcel.getStatus().toString())
                .pickupAddress(parcel.getPickupAddress())
                .dropLocation(parcel.getDropLocation())
                .message("Parcel is " + parcel.getStatus().toString())
                .build();
    }

    // Track a parcel by ID
    public ParcelResponse trackParcel(Long id) {
        Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));
        return mapToResponse(parcel);
    }

    // Update parcel (for users to modify their orders)
    public ParcelResponse updateParcel(Long id, UpdateParcelRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        if (!parcel.getSender().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (!Parcel.ParcelStatus.CREATED.equals(parcel.getStatus())) {
            throw new RuntimeException("Can only update parcels in CREATED status");
        }

        parcel.setPickupAddress(request.getPickupAddress());
        parcel.setPickupCity(request.getPickupCity());
        parcel.setPickupContactInfo(request.getPickupContactInfo());
        parcel.setDropLocation(request.getDropLocation());
        parcel.setDropCity(request.getDropCity());
        parcel.setDropContactInfo(request.getDropContactInfo());
        parcel.setPickupDate(request.getPickupDate());
        parcel.setUpdatedAt(LocalDateTime.now());

        Parcel updated = parcelRepository.save(parcel);
        return mapToResponse(updated);
    }

    // Cancel a parcel
    public ParcelResponse cancelParcel(Long id, CancelParcelRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        if (!parcel.getSender().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        parcel.setStatus(Parcel.ParcelStatus.CANCELLED);
        parcel.setCancelReason(request.getReason());
        parcel.setUpdatedAt(LocalDateTime.now());

        Parcel updated = parcelRepository.save(parcel);
        return mapToResponse(updated);
    }

    // Get all parcels (admin only)
    public List<ParcelResponse> getAllParcels() {
        return parcelRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Update parcel status (admin only)
    public ParcelResponse updateParcelStatus(Long id, String status) {
        Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));
        parcel.setStatus(Parcel.ParcelStatus.valueOf(status));
        parcel.setUpdatedAt(LocalDateTime.now());
        Parcel updated = parcelRepository.save(parcel);
        return mapToResponse(updated);
    }

    // Generate invoice
    public InvoiceResponse generateInvoice(Long id, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Parcel parcel = parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        if (!parcel.getSender().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return InvoiceResponse.builder()
                .parcelId(parcel.getId())
                .trackingId(parcel.getTrackingId())
                .sender(parcel.getSender().getUsername())
                .pickupAddress(parcel.getPickupAddress())
                .dropLocation(parcel.getDropLocation())
                .weight(parcel.getWeight())
                .cost(parcel.getCost())
                .status(parcel.getStatus().toString())
                .createdAt(parcel.getCreatedAt().toString())
                .build();
    }

    private ParcelResponse mapToResponse(Parcel parcel) {
        return ParcelResponse.builder()
                .id(parcel.getId())
                .trackingId(parcel.getTrackingId())
                .pickupAddress(parcel.getPickupAddress())
                .pickupCity(parcel.getPickupCity())
                .dropLocation(parcel.getDropLocation())
                .dropCity(parcel.getDropCity())
                .weight(parcel.getWeight())
                .cost(parcel.getCost())
                .pickupDate(parcel.getPickupDate())
                .status(parcel.getStatus().toString())
                .createdAt(parcel.getCreatedAt())
                .updatedAt(parcel.getUpdatedAt())
                .build();
    }

    private String generateTrackingId() {
        return "TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
