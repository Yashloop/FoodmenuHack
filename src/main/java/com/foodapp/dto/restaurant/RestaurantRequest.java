package com.foodapp.dto.restaurant;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RestaurantRequest(
        @NotBlank(message = "Restaurant name is required")
        @Size(max = 180, message = "Restaurant name must be at most 180 characters")
        String name,

        @Size(max = 500, message = "Description must be at most 500 characters")
        String description
) {
}
