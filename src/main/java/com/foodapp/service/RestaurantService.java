package com.foodapp.service;

import com.foodapp.dto.menu.MenuItemResponse;
import com.foodapp.dto.restaurant.RestaurantResponse;
import com.foodapp.entity.Restaurant;
import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.repository.MenuItemRepository;
import com.foodapp.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    public RestaurantService(RestaurantRepository restaurantRepository, MenuItemRepository menuItemRepository) {
        this.restaurantRepository = restaurantRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<RestaurantResponse> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(restaurant -> new RestaurantResponse(
                        restaurant.getId(),
                        restaurant.getName(),
                        restaurant.getDescription(),
                        restaurant.getCreatedAt()))
                .toList();
    }

    public List<MenuItemResponse> getRestaurantMenu(Long restaurantId) {
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        return menuItemRepository.findByRestaurantIdOrderByNameAsc(restaurantId).stream()
                .map(menuItem -> new MenuItemResponse(
                        menuItem.getId(),
                        menuItem.getRestaurant().getId(),
                        menuItem.getName(),
                        menuItem.getPrice(),
                        menuItem.isAvailable()))
                .toList();
    }

    public Restaurant getRestaurantById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
    }
}
