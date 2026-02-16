package com.flowbuddy.flowbuddy_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowbuddy.flowbuddy_backend.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    List<Chat> findByUserUserIdOrderByCreatedAtDesc(Integer userId);
}