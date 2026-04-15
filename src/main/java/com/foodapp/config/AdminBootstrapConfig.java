package com.foodapp.config;

import com.foodapp.entity.User;
import com.foodapp.entity.enums.Role;
import com.foodapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminBootstrapConfig {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrapConfig.class);

    @Bean
    CommandLineRunner createDefaultAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.bootstrap.admin.enabled:true}") boolean enabled,
            @Value("${app.bootstrap.admin.name:Admin}") String adminName,
            @Value("${app.bootstrap.admin.email:admin@foodapp.com}") String adminEmail,
            @Value("${app.bootstrap.admin.password:admin123}") String adminPassword) {
        return args -> {
            if (!enabled || userRepository.existsByEmail(adminEmail.toLowerCase())) {
                return;
            }

            User admin = new User();
            admin.setName(adminName);
            admin.setEmail(adminEmail.toLowerCase());
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            log.info("Default admin created: {}", adminEmail);
        };
    }
}
