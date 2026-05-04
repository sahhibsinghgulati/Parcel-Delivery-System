package com.example.parcel.controller;
import com.example.parcel.dto.AuthRequest;
import com.example.parcel.dto.RegisterRequest;
import com.example.parcel.entity.User;
import com.example.parcel.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.registerUser(request);
        return ResponseEntity.ok("User registered successfully");
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthRequest request) {
        User user = authService.validateLogin(request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login Successful");
        response.put("username", user.getUsername());
        response.put("role", user.getRole().name());
        return ResponseEntity.ok(response);
    }
}
