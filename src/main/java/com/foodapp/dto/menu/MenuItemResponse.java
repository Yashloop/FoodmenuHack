package com.foodapp.dto.menu;

import java.math.BigDecimal;

public record MenuItemResponse(
        Long id,
        Long restaurantId,
        String name,
        BigDecimal price,
        boolean isAvailable
) {
}
