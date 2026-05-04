package com.example.parcel.service;
import com.example.parcel.dto.AuthRequest;
import com.example.parcel.dto.RegisterRequest;
import com.example.parcel.entity.User;
import com.example.parcel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public void registerUser(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }
        User.Role role = User.Role.ROLE_USER;
        if (request.getRole() != null && !request.getRole().isBlank()) {
            role = User.Role.valueOf(request.getRole());
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
    }

    @SuppressWarnings("unused")
    public User validateLogin(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        return user;
    }
}
