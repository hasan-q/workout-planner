package com.hasanq.workoutplanner.repository;

import com.hasanq.workoutplanner.model.AppUser;
import com.hasanq.workoutplanner.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByUser(AppUser user);
    Optional<RefreshToken> findByToken(String token);
    void deleteByUserId(Long id);
}
