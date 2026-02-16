package com.flowbuddy.flowbuddy_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowbuddy.flowbuddy_backend.entity.UserPreference;

public interface UserPreferenceRepository
        extends JpaRepository<UserPreference, Integer> {

    Optional<UserPreference> findByUserUserId(Integer userId);
}