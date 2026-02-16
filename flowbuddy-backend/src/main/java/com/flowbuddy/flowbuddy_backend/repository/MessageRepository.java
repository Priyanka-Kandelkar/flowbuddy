package com.flowbuddy.flowbuddy_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.flowbuddy.flowbuddy_backend.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findByChatChatIdOrderByTimestampAsc(Integer chatId);
}