package com.foodapp.dto.auth;

public record AuthResponse(
        String token,
        String role
) {
}
