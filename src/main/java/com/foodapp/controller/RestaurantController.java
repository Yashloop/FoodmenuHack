package com.foodapp.controller;

import com.foodapp.dto.menu.MenuItemResponse;
import com.foodapp.dto.restaurant.RestaurantResponse;
import com.foodapp.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public ResponseEntity<List<RestaurantResponse>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}/menu")
    public ResponseEntity<List<MenuItemResponse>> getRestaurantMenu(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurantMenu(id));
    }
}
