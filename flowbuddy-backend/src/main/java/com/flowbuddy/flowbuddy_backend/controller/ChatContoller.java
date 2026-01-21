package com.flowbuddy.flowbuddy_backend.controller;

import com.flowbuddy.flowbuddy_backend.dto.ChatRequest;
import com.flowbuddy.flowbuddy_backend.dto.ChatResponse;
import com.flowbuddy.flowbuddy_backend.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/chat", consumes = "application/json", produces = "application/json")
public class ChatContoller {

    private final ChatService chatService;

    public ChatContoller(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String reply = chatService.chat(request.getMessages());
        return new ChatResponse(reply);
    }
}
