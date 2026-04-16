package com.foodapp.controller;

import com.foodapp.dto.common.ApiResponse;
import com.foodapp.dto.menu.MenuItemRequest;
import com.foodapp.dto.menu.MenuItemResponse;
import com.foodapp.dto.restaurant.RestaurantRequest;
import com.foodapp.dto.restaurant.RestaurantResponse;
import com.foodapp.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/restaurants")
    public ResponseEntity<RestaurantResponse> addRestaurant(@Valid @RequestBody RestaurantRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addRestaurant(request));
    }

    @DeleteMapping("/restaurants/{id}")
    public ResponseEntity<ApiResponse> deleteRestaurant(@PathVariable Long id) {
        adminService.deleteRestaurant(id);
        return ResponseEntity.ok(new ApiResponse("Restaurant deleted"));
    }

    @PutMapping("/restaurants/{id}")
    public ResponseEntity<RestaurantResponse> updateRestaurant(@PathVariable Long id, @Valid @RequestBody RestaurantRequest request) {
        return ResponseEntity.ok(adminService.updateRestaurant(id, request));
    }

    @PostMapping("/menu")
    public ResponseEntity<MenuItemResponse> addMenuItem(@Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addMenuItem(request));
    }

    @PutMapping("/menu/{id}")
    public ResponseEntity<MenuItemResponse> updateMenuItem(@PathVariable Long id, @Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.ok(adminService.updateMenuItem(id, request));
    }

    @DeleteMapping("/menu/{id}")
    public ResponseEntity<ApiResponse> deleteMenuItem(@PathVariable Long id) {
        adminService.deleteMenuItem(id);
        return ResponseEntity.ok(new ApiResponse("Menu item deleted"));
    }
}
