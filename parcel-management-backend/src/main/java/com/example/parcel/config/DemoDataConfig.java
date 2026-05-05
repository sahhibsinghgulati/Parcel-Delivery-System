package com.example.parcel.config;

import com.example.parcel.entity.Parcel;
import com.example.parcel.entity.User;
import com.example.parcel.repository.ParcelRepository;
import com.example.parcel.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.UUID;

@Configuration
public class DemoDataConfig {
    @Bean
    CommandLineRunner seedDemoData(UserRepository userRepository,
                                   ParcelRepository parcelRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {
            User admin = userRepository.findByUsername("admin").orElseGet(() -> userRepository.save(
                    User.builder()
                            .username("admin")
                            .password(passwordEncoder.encode("admin123"))
                            .email("admin@parcel.com")
                            .name("Admin User")
                            .phone("9876543210")
                            .address("123 Admin Street")
                            .city("Delhi")
                            .state("Delhi")
                            .zipCode("110001")
                            .role(User.Role.ROLE_ADMIN)
                            .createdAt(LocalDateTime.now())
                            .build()));

            User user = userRepository.findByUsername("user").orElseGet(() -> userRepository.save(
                    User.builder()
                            .username("user")
                            .password(passwordEncoder.encode("user123"))
                            .email("user@parcel.com")
                            .name("Test User")
                            .phone("9123456789")
                            .address("456 User Avenue")
                            .city("Mumbai")
                            .state("Maharashtra")
                            .zipCode("400001")
                            .role(User.Role.ROLE_USER)
                            .createdAt(LocalDateTime.now())
                            .build()));

            if (parcelRepository.count() == 0) {
                parcelRepository.save(Parcel.builder()
                        .trackingId("TRK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                        .sender(user)
                        .pickupAddress("123 Sender Street")
                        .pickupCity("Delhi")
                        .pickupContactInfo("9876543210")
                        .dropLocation("456 Receiver Road")
                        .dropCity("Mumbai")
                        .dropContactInfo("9123456789")
                        .weight(5.0)
                        .cost(25.0)
                        .pickupDate(LocalDate.now())
                        .status(Parcel.ParcelStatus.CREATED)
                        .createdAt(LocalDateTime.now())
                        .build());
            }
        };
    }
}




