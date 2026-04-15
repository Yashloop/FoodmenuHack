package com.foodapp.service;

import com.foodapp.dto.order.CreateOrderRequest;
import com.foodapp.dto.order.OrderItemRequest;
import com.foodapp.dto.order.OrderItemResponse;
import com.foodapp.dto.order.OrderResponse;
import com.foodapp.entity.FoodOrder;
import com.foodapp.entity.MenuItem;
import com.foodapp.entity.OrderItem;
import com.foodapp.entity.User;
import com.foodapp.entity.enums.OrderStatus;
import com.foodapp.exception.BadRequestException;
import com.foodapp.exception.ForbiddenException;
import com.foodapp.exception.ResourceNotFoundException;
import com.foodapp.repository.FoodOrderRepository;
import com.foodapp.repository.MenuItemRepository;
import com.foodapp.repository.OrderItemRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final FoodOrderRepository foodOrderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final EmailService emailService;

    public OrderService(FoodOrderRepository foodOrderRepository,
                        OrderItemRepository orderItemRepository,
                        MenuItemRepository menuItemRepository,
                        EmailService emailService) {
        this.foodOrderRepository = foodOrderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.emailService = emailService;
    }

    @Transactional
    public OrderResponse placeOrder(CreateOrderRequest request, User user) {
        FoodOrder order = new FoodOrder();
        order.setUser(user);
        order.setStatus(OrderStatus.PLACED);
        order.setTotalAmount(BigDecimal.ZERO);
        FoodOrder savedOrder = foodOrderRepository.save(order);

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemRequest : request.items()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.menuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found: " + itemRequest.menuItemId()));

            if (!menuItem.isAvailable()) {
                throw new BadRequestException("Menu item is unavailable: " + menuItem.getName());
            }

            BigDecimal linePrice = menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.quantity()));
            total = total.add(linePrice);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.quantity());
            orderItem.setPrice(linePrice);
            orderItems.add(orderItem);
        }

        orderItemRepository.saveAll(orderItems);
        savedOrder.setTotalAmount(total);
        foodOrderRepository.save(savedOrder);
        log.info("Order placed: orderId={}, userId={}", savedOrder.getId(), user.getId());
        emailService.sendOrderConfirmationEmail(user, savedOrder.getId());

        return mapToResponse(savedOrder, orderItems);
    }

    @Transactional
    public List<OrderResponse> getMyOrders(User user) {
        return foodOrderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(order -> mapToResponse(order, orderItemRepository.findByOrder(order)))
                .toList();
    }

    @Transactional
    public OrderResponse cancelOrder(Long orderId, User user) {
        FoodOrder order = foodOrderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new ForbiddenException("You are not allowed to cancel this order");
        }

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);
        FoodOrder saved = foodOrderRepository.save(order);
        log.info("Order cancelled: orderId={}, userId={}", saved.getId(), user.getId());
        emailService.sendOrderCancellationEmail(user, saved.getId());

        List<OrderItem> items = orderItemRepository.findByOrder(saved);
        return mapToResponse(saved, items);
    }

    private OrderResponse mapToResponse(FoodOrder order, List<OrderItem> orderItems) {
        List<OrderItemResponse> items = orderItems.stream()
                .map(orderItem -> new OrderItemResponse(
                        orderItem.getId(),
                        orderItem.getMenuItem().getId(),
                        orderItem.getMenuItem().getName(),
                        orderItem.getQuantity(),
                        orderItem.getPrice()
                ))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getStatus().name(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                items
        );
    }
}
