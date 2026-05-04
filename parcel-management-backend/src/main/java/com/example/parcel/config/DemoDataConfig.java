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

@Configuration
public class DemoDataConfig {
    @Bean
    CommandLineRunner seedDemoData(UserRepository userRepository,
                                   ParcelRepository parcelRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {
            userRepository.findByUsername("admin").orElseGet(() -> userRepository.save(
                    User.builder()
                            .username("admin")
                            .password(passwordEncoder.encode("admin123"))
                            .role(User.Role.ROLE_ADMIN)
                            .build()));

            User user = userRepository.findByUsername("user").orElseGet(() -> userRepository.save(
                    User.builder()
                            .username("user")
                            .password(passwordEncoder.encode("user123"))
                            .role(User.Role.ROLE_USER)
                            .build()));

            if (parcelRepository.count() == 0) {
                parcelRepository.save(Parcel.builder()
                        .sender(user)
                        .receiver("Demo Receiver")
                        .status(Parcel.ParcelStatus.CREATED)
                        .cost(50.0)
                        .createdAt(LocalDateTime.now())
                        .build());
            }
        };
    }
}


