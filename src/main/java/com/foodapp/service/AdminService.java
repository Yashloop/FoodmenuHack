package com.foodapp.service;

import com.foodapp.dto.menu.MenuItemRequest;
import com.foodapp.dto.menu.MenuItemResponse;
import com.foodapp.dto.restaurant.RestaurantRequest;
import com.foodapp.dto.restaurant.RestaurantResponse;
import com.foodapp.entity.MenuItem;
import com.foodapp.entity.Restaurant;
import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.repository.MenuItemRepository;
import com.foodapp.repository.RestaurantRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private static final Logger log = LoggerFactory.getLogger(AdminService.class);

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    public AdminService(RestaurantRepository restaurantRepository, MenuItemRepository menuItemRepository) {
        this.restaurantRepository = restaurantRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Transactional
    public RestaurantResponse addRestaurant(RestaurantRequest request) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.name().trim());
        restaurant.setDescription(request.description());
        Restaurant saved = restaurantRepository.save(restaurant);
        log.info("Admin added restaurant {}", saved.getName());
        return mapRestaurant(saved);
    }

    @Transactional
    public void deleteRestaurant(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        restaurantRepository.deleteById(id);
        log.info("Admin deleted restaurant with id {}", id);
    }

    @Transactional
    public RestaurantResponse updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
        restaurant.setName(request.name().trim());
        restaurant.setDescription(request.description());
        Restaurant saved = restaurantRepository.save(restaurant);
        log.info("Admin updated restaurant with id {}", id);
        return mapRestaurant(saved);
    }

    @Transactional
    public MenuItemResponse addMenuItem(MenuItemRequest request) {
        Restaurant restaurant = restaurantRepository.findById(request.restaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
        MenuItem menuItem = new MenuItem();
        menuItem.setRestaurant(restaurant);
        menuItem.setName(request.name().trim());
        menuItem.setPrice(request.price());
        menuItem.setAvailable(Boolean.TRUE.equals(request.isAvailable()));
        MenuItem saved = menuItemRepository.save(menuItem);
        log.info("Admin added menu item {} for restaurant {}", saved.getName(), restaurant.getId());
        return mapMenuItem(saved);
    }

    @Transactional
    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found"));

        if (!menuItem.getRestaurant().getId().equals(request.restaurantId())) {
            Restaurant restaurant = restaurantRepository.findById(request.restaurantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
            menuItem.setRestaurant(restaurant);
        }
        menuItem.setName(request.name().trim());
        menuItem.setPrice(request.price());
        menuItem.setAvailable(Boolean.TRUE.equals(request.isAvailable()));
        MenuItem saved = menuItemRepository.save(menuItem);
        log.info("Admin updated menu item with id {}", id);
        return mapMenuItem(saved);
    }

    @Transactional
    public void deleteMenuItem(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Menu item not found");
        }
        menuItemRepository.deleteById(id);
        log.info("Admin deleted menu item with id {}", id);
    }

    private RestaurantResponse mapRestaurant(Restaurant restaurant) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getCreatedAt()
        );
    }

    private MenuItemResponse mapMenuItem(MenuItem menuItem) {
        return new MenuItemResponse(
                menuItem.getId(),
                menuItem.getRestaurant().getId(),
                menuItem.getName(),
                menuItem.getPrice(),
                menuItem.isAvailable()
        );
    }
}
