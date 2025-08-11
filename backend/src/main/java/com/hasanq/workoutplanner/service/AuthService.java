package com.hasanq.workoutplanner.service;

import com.hasanq.workoutplanner.repository.AppUserRepository;
import com.hasanq.workoutplanner.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

public class AuthService {
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final RefreshTokenService refreshTokenService;
}
