package com.hasanq.workoutplanner.security;

import com.hasanq.workoutplanner.model.AppUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityHelper {

    public static AppUser getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof AppUser) {
            return (AppUser) principal;
        } else {
            throw new RuntimeException("Authenticated principal is not an instance of AppUser");
        }
    }
}
