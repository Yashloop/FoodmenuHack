package com.foodapp.service;

import java.text.SimpleDateFormat;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.foodapp.entity.FoodOrder;
import com.foodapp.entity.OrderItem;
import com.foodapp.entity.User;
import com.foodapp.repository.FoodOrderRepository;
import com.foodapp.repository.OrderItemRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final FoodOrderRepository foodOrderRepository;
    private final OrderItemRepository orderItemRepository;
    
    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender,
                       FoodOrderRepository foodOrderRepository,
                       OrderItemRepository orderItemRepository) {
        this.mailSender = mailSender;
        this.foodOrderRepository = foodOrderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public void sendRegistrationSuccessEmail(User user) {
        String htmlContent = buildRegistrationEmailHtml(user);
        sendHtmlEmail(user.getEmail(), "Welcome to FoodHub - Registration Successful! 🎉", htmlContent);
    }

    public void sendOrderConfirmationEmail(User user, Long orderId) {
        try {
            FoodOrder order = foodOrderRepository.findById(orderId).orElse(null);
            if (order == null) {
                log.warn("Order not found for orderId: {}", orderId);
                return;
            }
            List<OrderItem> items = orderItemRepository.findByOrder(order);
            String htmlContent = buildOrderConfirmationEmailHtml(user, order, items);
            sendHtmlEmail(user.getEmail(), "Order Confirmation - Order #" + orderId + " 🎕", htmlContent);
        } catch (Exception ex) {
            log.warn("Error building order confirmation email: {}", ex.getMessage());
            sendSimpleEmail(user.getEmail(), "Order Confirmed", "Your order #" + orderId + " has been placed successfully.");
        }
    }

    public void sendOrderCancellationEmail(User user, Long orderId) {
        try {
            FoodOrder order = foodOrderRepository.findById(orderId).orElse(null);
            if (order == null) {
                log.warn("Order not found for orderId: {}", orderId);
                return;
            }
            String htmlContent = buildOrderCancellationEmailHtml(user, order);
            sendHtmlEmail(user.getEmail(), "Order Cancelled - Order #" + orderId + " ❌", htmlContent);
        } catch (Exception ex) {
            log.warn("Error building order cancellation email: {}", ex.getMessage());
            sendSimpleEmail(user.getEmail(), "Order Cancelled", "Your order #" + orderId + " has been cancelled.");
        }
    }

    private String buildRegistrationEmailHtml(User user) {
        return "<!DOCTYPE html>" +
               "<html>" +
               "<head>" +
               "  <meta charset='UTF-8'>" +
               "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
               "  <style>" +
               "    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }" +
               "    .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }" +
               "    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }" +
               "    .header h1 { margin: 0; font-size: 28px; }" +
               "    .content { padding: 30px; }" +
               "    .greeting { font-size: 18px; color: #10b981; margin-bottom: 20px; font-weight: bold; }" +
               "    .message { margin: 20px 0; color: #555; }" +
               "    .highlight { background-color: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; }" +
               "    .features { margin: 20px 0; }" +
               "    .features li { margin: 10px 0; color: #555; }" +
               "    .cta-button { display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }" +
               "    .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }" +
               "  </style>" +
               "</head>" +
               "<body>" +
               "  <div class='container'>" +
               "    <div class='header'>" +
               "      <h1>🍽️ Welcome to FoodHub!</h1>" +
               "    </div>" +
               "    <div class='content'>" +
               "      <p class='greeting'>Hi " + user.getName() + ",</p>" +
               "      <p class='message'>Thank you for registering with FoodHub! Your account has been successfully created and is ready to use.</p>" +
               "      <div class='highlight'>" +
               "        <strong>✓ Account Details:</strong><br>" +
               "        Email: " + user.getEmail() + "<br>" +
               "        Name: " + user.getName() + "<br>" +
               "      </div>" +
               "      <p class='message'>You can now:</p>" +
               "      <ul class='features'>" +
               "        <li>🔍 Browse restaurants and menus</li>" +
               "        <li>🛒 Place food orders</li>" +
               "        <li>📱 Track your orders in real-time</li>" +
               "        <li>💳 Manage your account settings</li>" +
               "      </ul>" +
               "      <a href='http://localhost:5173' class='cta-button'>Start Ordering Now!</a>" +
               "      <p class='message'>If you have any questions or need assistance, feel free to reach out to us.</p>" +
               "      <p class='message'>Happy ordering!<br><strong>The FoodHub Team</strong></p>" +
               "    </div>" +
               "    <div class='footer'>" +
               "      <p>This is an automated email. Please do not reply directly to this message.</p>" +
               "      <p>&copy; 2026 FoodHub. All rights reserved.</p>" +
               "    </div>" +
               "  </div>" +
               "</body>" +
               "</html>";
    }

    private String buildOrderConfirmationEmailHtml(User user, FoodOrder order, List<OrderItem> items) {
        StringBuilder itemsHtml = new StringBuilder();
        for (OrderItem item : items) {
            itemsHtml.append("    <tr>" +
                           "      <td style='padding: 10px; border-bottom: 1px solid #eee;'>").append(item.getMenuItem().getName()).append("</td>" +
                           "      <td style='padding: 10px; border-bottom: 1px solid #eee; text-align: center;'>").append(item.getQuantity()).append("</td>" +
                           "      <td style='padding: 10px; border-bottom: 1px solid #eee; text-align: right;'>$").append(item.getPrice()).append("</td>" +
                           "    </tr>");
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, yyyy HH:mm");
        String orderDate = dateFormat.format(order.getCreatedAt());

        return "<!DOCTYPE html>" +
               "<html>" +
               "<head>" +
               "  <meta charset='UTF-8'>" +
               "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
               "  <style>" +
               "    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }" +
               "    .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }" +
               "    .header { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; }" +
               "    .header h1 { margin: 0; font-size: 28px; }" +
               "    .order-id { font-size: 14px; opacity: 0.9; margin-top: 10px; }" +
               "    .content { padding: 30px; }" +
               "    .greeting { font-size: 18px; color: #3b82f6; margin-bottom: 20px; font-weight: bold; }" +
               "    .order-status { background-color: #dbeafe; padding: 15px; border-radius: 5px; margin-bottom: 20px; }" +
               "    .status-badge { display: inline-block; background-color: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; }" +
               "    .order-items { width: 100%; border-collapse: collapse; margin: 20px 0; }" +
               "    .order-items th { background-color: #f3f4f6; padding: 10px; text-align: left; font-weight: bold; }" +
               "    .order-summary { background-color: #f9fafb; padding: 15px; border-radius: 5px; text-align: right; margin: 20px 0; }" +
               "    .total { font-size: 20px; font-weight: bold; color: #3b82f6; margin-top: 10px; }" +
               "    .info-box { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }" +
               "    .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }" +
               "  </style>" +
               "</head>" +
               "<body>" +
               "  <div class='container'>" +
               "    <div class='header'>" +
               "      <h1>✓ Order Confirmed</h1>" +
               "      <div class='order-id'>Order #" + order.getId() + "</div>" +
               "    </div>" +
               "    <div class='content'>" +
               "      <p class='greeting'>Hi " + user.getName() + ",</p>" +
               "      <p>Thank you for your order! We've received it and are preparing your food.</p>" +
               "      <div class='order-status'>" +
               "        <strong>Order Status: </strong><span class='status-badge'>" + order.getStatus().name() + "</span><br>" +
               "        <strong>Order Date: </strong>" + orderDate + "" +
               "      </div>" +
               "      <h3>Order Details:</h3>" +
               "      <table class='order-items'>" +
               "        <thead>" +
               "          <tr>" +
               "            <th>Item Name</th>" +
               "            <th style='text-align: center;'>Quantity</th>" +
               "            <th style='text-align: right;'>Price</th>" +
               "          </tr>" +
               "        </thead>" +
               "        <tbody>" +
               itemsHtml.toString() +
               "        </tbody>" +
               "      </table>" +
               "      <div class='order-summary'>" +
               "        <div>Subtotal: $" + order.getTotalAmount() + "</div>" +
               "        <div>Delivery Fee: $0.00</div>" +
               "        <div class='total'>Total: $" + order.getTotalAmount() + "</div>" +
               "      </div>" +
               "      <div class='info-box'>" +
               "        <strong>⏱️ Estimated Delivery Time:</strong><br>" +
               "        Your order will be delivered within 30-45 minutes." +
               "      </div>" +
               "      <p>You can track your order status in your account dashboard.</p>" +
               "      <p>Thank you for choosing FoodHub!<br><strong>The FoodHub Team</strong></p>" +
               "    </div>" +
               "    <div class='footer'>" +
               "      <p>This is an automated email. Please do not reply directly to this message.</p>" +
               "      <p>&copy; 2026 FoodHub. All rights reserved.</p>" +
               "    </div>" +
               "  </div>" +
               "</body>" +
               "</html>";
    }

    private String buildOrderCancellationEmailHtml(User user, FoodOrder order) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, yyyy HH:mm");
        String orderDate = dateFormat.format(order.getCreatedAt());

        return "<!DOCTYPE html>" +
               "<html>" +
               "<head>" +
               "  <meta charset='UTF-8'>" +
               "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
               "  <style>" +
               "    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }" +
               "    .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }" +
               "    .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; }" +
               "    .header h1 { margin: 0; font-size: 28px; }" +
               "    .order-id { font-size: 14px; opacity: 0.9; margin-top: 10px; }" +
               "    .content { padding: 30px; }" +
               "    .greeting { font-size: 18px; color: #ef4444; margin-bottom: 20px; font-weight: bold; }" +
               "    .cancellation-info { background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }" +
               "    .order-details { background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; }" +
               "    .refund-info { background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; }" +
               "    .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; }" +
               "  </style>" +
               "</head>" +
               "<body>" +
               "  <div class='container'>" +
               "    <div class='header'>" +
               "      <h1>Order Cancelled</h1>" +
               "      <div class='order-id'>Order #" + order.getId() + "</div>" +
               "    </div>" +
               "    <div class='content'>" +
               "      <p class='greeting'>Hi " + user.getName() + ",</p>" +
               "      <p>Your order has been cancelled as requested.</p>" +
               "      <div class='cancellation-info'>" +
               "        <strong>✓ Cancellation Confirmed</strong><br>" +
               "        Order #" + order.getId() + " has been successfully cancelled." +
               "      </div>" +
               "      <div class='order-details'>" +
               "        <strong>Order Details:</strong><br>" +
               "        Order Number: #" + order.getId() + "<br>" +
               "        Original Order Date: " + orderDate + "<br>" +
               "        Order Total: $" + order.getTotalAmount() + "" +
               "      </div>" +
               "      <div class='refund-info'>" +
               "        <strong>💰 Refund Information:</strong><br>" +
               "        Your payment of $" + order.getTotalAmount() + " will be refunded to your original payment method within 3-5 business days." +
               "      </div>" +
               "      <p>If you have any questions about this cancellation or if you didn't request this, please contact our support team immediately.</p>" +
               "      <p>We hope to serve you again soon!<br><strong>The FoodHub Team</strong></p>" +
               "    </div>" +
               "    <div class='footer'>" +
               "      <p>This is an automated email. Please do not reply directly to this message.</p>" +
               "      <p>&copy; 2026 FoodHub. All rights reserved.</p>" +
               "    </div>" +
               "  </div>" +
               "</body>" +
               "</html>";
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indicates HTML
            mailSender.send(mimeMessage);
            log.info("HTML Email sent from {} to {} for subject '{}'", fromEmail, to, subject);
        } catch (MessagingException ex) {
            log.error("Failed to send HTML email to {}: {}", to, ex.getMessage(), ex);
        } catch (Exception ex) {
            log.error("Unexpected error sending email to {}: {}", to, ex.getMessage(), ex);
        }
    }

    private void sendSimpleEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Simple Email sent from {} to {} for subject '{}'", fromEmail, to, subject);
        } catch (Exception ex) {
            log.error("Failed to send simple email to {}: {}", to, ex.getMessage(), ex);
        }
    }
}
