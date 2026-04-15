package com.foodapp.service;

import com.foodapp.dto.auth.AuthResponse;
import com.foodapp.dto.auth.LoginRequest;
import com.foodapp.dto.auth.RegisterRequest;
import com.foodapp.dto.common.ApiResponse;
import com.foodapp.entity.User;
import com.foodapp.entity.enums.Role;
import com.foodapp.exception.BadRequestException;
import com.foodapp.repository.UserRepository;
import com.foodapp.security.AppUserDetailsService;
import com.foodapp.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       AppUserDetailsService appUserDetailsService,
                       JwtService jwtService,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.appUserDetailsService = appUserDetailsService;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public ApiResponse register(RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);
        userRepository.save(user);
        log.info("User registered: {}", user.getEmail());

        emailService.sendRegistrationSuccessEmail(user);
        return new ApiResponse("Registration successful");
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.password())
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));
        var userDetails = appUserDetailsService.loadUserByUsername(email);
        String token = jwtService.generateToken(userDetails, user.getRole().name());
        log.info("User login success: {}", email);
        return new AuthResponse(token, user.getRole().name());
    }

    public ApiResponse logout() {
        log.info("User logout endpoint called");
        return new ApiResponse("Logout successful");
    }
}
