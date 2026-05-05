package com.example.parcel.service;
import com.example.parcel.dto.AuthRequest;
import com.example.parcel.dto.RegisterRequest;
import com.example.parcel.entity.User;
import com.example.parcel.repository.UserRepository;
import com.example.parcel.util.ValidationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequest request) {
        // Validate inputs
        if (!ValidationUtil.isValidUsername(request.getUsername())) {
            throw new RuntimeException("Username must be 3-20 characters (alphanumeric and underscore only)");
        }
        if (!ValidationUtil.isValidPassword(request.getPassword())) {
            throw new RuntimeException("Password must be at least 8 characters with uppercase, lowercase, and special character");
        }
        if (request.getEmail() != null && !ValidationUtil.isValidEmail(request.getEmail())) {
            throw new RuntimeException("Invalid email format");
        }
        if (request.getPhone() != null && !ValidationUtil.isValidPhone(request.getPhone())) {
            throw new RuntimeException("Phone must be exactly 10 digits");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }
        if (request.getEmail() != null && userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        User.Role role = User.Role.ROLE_USER;
        if (request.getRole() != null && !request.getRole().isBlank()) {
            role = User.Role.valueOf(request.getRole());
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(role)
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(user);
    }

    public User validateLogin(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }
}


