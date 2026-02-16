package com.flowbuddy.flowbuddy_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flowbuddy.flowbuddy_backend.dto.ChatRequest;
import com.flowbuddy.flowbuddy_backend.dto.ChatResponse;
import com.flowbuddy.flowbuddy_backend.entity.Chat;
import com.flowbuddy.flowbuddy_backend.entity.Message;
import com.flowbuddy.flowbuddy_backend.service.ChatService;

@RestController
@CrossOrigin
@RequestMapping(value = "/chat", produces = "application/json")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String reply = chatService.chat(
                request.getUserId(),
                request.getChatId(),
                request.getMessage());

        return new ChatResponse(reply);
    }

    @GetMapping("/user/{userId}")
    public List<Chat> getUserChats(@PathVariable Integer userId) {
        return chatService.getUserChats(userId);
    }

    @GetMapping("/{chatId}")
    public List<Message> getChatMessages(@PathVariable Integer chatId) {
        return chatService.getChatMessages(chatId);
    }
}