package com.foodapp.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateOrderRequest(
        @NotEmpty(message = "Order items are required")
        List<@Valid OrderItemRequest> items
) {
}
