package com.project.foodorder.controller;

import com.project.foodorder.dto.ApiResponse;
import com.project.foodorder.dto.JwtResponse;
import com.project.foodorder.dto.LoginRequest;
import com.project.foodorder.dto.RegisterRequest;
import com.project.foodorder.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        JwtResponse jwtResponse = authService.register(request);
        return ResponseEntity.ok(new ApiResponse(201, "User registered successfully", jwtResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        JwtResponse jwtResponse = authService.login(request);
        return ResponseEntity.ok(new ApiResponse(200, "Login successful", jwtResponse));
    }
}
