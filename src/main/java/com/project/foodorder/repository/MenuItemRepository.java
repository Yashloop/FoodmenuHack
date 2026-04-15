package com.project.foodorder.repository;

import com.project.foodorder.model.MenuItem;
import com.project.foodorder.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantAndIsAvailableTrue(Restaurant restaurant);
    List<MenuItem> findByRestaurant(Restaurant restaurant);
}
