package com.hasanq.workoutplanner.security;

import com.hasanq.workoutplanner.model.AppUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

import static io.jsonwebtoken.security.Keys.hmacShaKeyFor;

@Service
public class JwtService {

    // Create this in application.properties
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // Create this in application.properties
    @Value("${jwt.refreshExpirationMs}")
    private Long refreshExpirationMs;

    private Key getSigningKey() {
        return hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(AppUser user) {
        Date currentDate = new Date();

        // 1 hour
        Date expiryDate = new Date(currentDate.getTime() + 1000 * 60 * 60);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("username", user.getUsername())
                .setIssuedAt(currentDate)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails user) {
        boolean tokenNotExpired = !isTokenExpired(token);
        String email = extractEmailFromToken(token);

        // getUsername function returns user email
        return email.equals(user.getUsername()) && tokenNotExpired;
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = extractExpirationFromToken(token);
        Date currentDate = new Date();
        return expirationDate.before(currentDate);
    }

    public Date extractExpirationFromToken(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    public String extractEmailFromToken(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
