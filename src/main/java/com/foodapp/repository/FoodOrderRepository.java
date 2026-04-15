package com.foodapp.repository;

import com.foodapp.entity.FoodOrder;
import com.foodapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByUserOrderByCreatedAtDesc(User user);
}
