package com.example.parcel.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "parcels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Parcel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;
    @Column(nullable = false)
    private String receiver;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParcelStatus status;
    @Column(nullable = false)
    private Double cost;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    public enum ParcelStatus {
        CREATED, IN_TRANSIT, DELIVERED, CANCELLED
    }
}
