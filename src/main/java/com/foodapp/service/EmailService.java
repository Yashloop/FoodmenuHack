package com.foodapp.service;

import com.foodapp.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationSuccessEmail(User user) {
        send(user.getEmail(), "Registration Successful", "Welcome " + user.getName() + ", your account is ready.");
    }

    public void sendOrderConfirmationEmail(User user, Long orderId) {
        send(user.getEmail(), "Order Confirmed", "Your order #" + orderId + " has been placed successfully.");
    }

    public void sendOrderCancellationEmail(User user, Long orderId) {
        send(user.getEmail(), "Order Cancelled", "Your order #" + orderId + " has been cancelled.");
    }

    private void send(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Email sent to {} for subject '{}'", to, subject);
        } catch (Exception ex) {
            log.warn("Email sending failed for {} (subject: {}): {}", to, subject, ex.getMessage());
        }
    }
}
