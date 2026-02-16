package com.flowbuddy.flowbuddy_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowbuddy.flowbuddy_backend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}