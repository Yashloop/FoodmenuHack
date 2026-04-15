package com.project.foodorder.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private List<OrderItemRequest> items;
}

@Data
class OrderItemRequest {
    private Long menuItemId;
    private int quantity;
}
