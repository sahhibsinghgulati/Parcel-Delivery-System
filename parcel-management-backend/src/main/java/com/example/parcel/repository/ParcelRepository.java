package com.example.parcel.repository;
import com.example.parcel.entity.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ParcelRepository extends JpaRepository<Parcel, Long> {
    List<Parcel> findBySenderId(Long senderId);
    Optional<Parcel> findByTrackingId(String trackingId);
    List<Parcel> findAll();
}
