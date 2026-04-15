package com.project.foodorder.repository;

import com.project.foodorder.model.Order;
import com.project.foodorder.model.OrderStatus;
import com.project.foodorder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserAndStatusOrderByCreatedAtDesc(User user, OrderStatus status);
    List<Order> findByUserOrderByCreatedAtDesc(User user);
}
