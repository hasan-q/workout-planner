package com.hasanq.workoutplanner.controller;

import com.hasanq.workoutplanner.dto.AuthResponse;
import com.hasanq.workoutplanner.dto.LoginRequest;
import com.hasanq.workoutplanner.dto.RefreshTokenRequest;
import com.hasanq.workoutplanner.dto.RegisterRequest;
import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.RefreshToken;
import com.hasanq.workoutplanner.security.JwtService;
import com.hasanq.workoutplanner.service.AuthService;
import com.hasanq.workoutplanner.service.RefreshTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final RefreshTokenService refreshTokenService;
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(RefreshTokenService refreshTokenService, AuthService authService, JwtService jwtService) {
        this.refreshTokenService = refreshTokenService;
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        String requestToken = request.getRefreshToken();

        RefreshToken refreshToken = refreshTokenService.findByToken(requestToken)
                .map(refreshTokenService::verifyExpiration)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        AppUser user = refreshToken.getUser();

        String newAccessToken = jwtService.generateToken(refreshToken.getUser());
        return ResponseEntity.ok(new AuthResponse(newAccessToken, requestToken, user.getUsernameValue()));
    }
}
