package com.foodapp.dto.restaurant;

import java.time.LocalDateTime;

public record RestaurantResponse(
        Long id,
        String name,
        String description,
        LocalDateTime createdAt
) {
}
