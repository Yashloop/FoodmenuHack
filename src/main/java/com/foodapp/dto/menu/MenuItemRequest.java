package com.foodapp.dto.menu;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record MenuItemRequest(
        @NotNull(message = "Restaurant ID is required")
        Long restaurantId,

        @NotBlank(message = "Menu item name is required")
        @Size(max = 180, message = "Menu item name must be at most 180 characters")
        String name,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.01", message = "Price must be greater than 0")
        BigDecimal price,

        @NotNull(message = "Availability is required")
        Boolean isAvailable
) {
}
