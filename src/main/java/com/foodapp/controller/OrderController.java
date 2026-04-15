package com.foodapp.controller;

import com.foodapp.dto.order.CreateOrderRequest;
import com.foodapp.dto.order.OrderResponse;
import com.foodapp.entity.User;
import com.foodapp.service.OrderService;
import com.foodapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody CreateOrderRequest request) {
        User user = userService.getCurrentUser();
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.placeOrder(request, user));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> getMyOrders() {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(orderService.getMyOrders(user));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long id) {
        User user = userService.getCurrentUser();
        return ResponseEntity.ok(orderService.cancelOrder(id, user));
    }
}
