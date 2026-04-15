package com.foodapp.repository;

import com.foodapp.entity.MenuItem;
import com.foodapp.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantOrderByNameAsc(Restaurant restaurant);

    List<MenuItem> findByRestaurantIdOrderByNameAsc(Long restaurantId);
}
