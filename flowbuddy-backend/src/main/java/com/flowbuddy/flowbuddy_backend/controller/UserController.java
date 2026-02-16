package com.flowbuddy.flowbuddy_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flowbuddy.flowbuddy_backend.dto.UserPreferenceRequest;
import com.flowbuddy.flowbuddy_backend.entity.UserPreference;
import com.flowbuddy.flowbuddy_backend.service.ChatService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    private final ChatService chatService;

    public UserController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/preferences")
    public String savePreferences(
            @RequestBody UserPreferenceRequest request) {

        chatService.savePreferences(
                request.getUserId(),
                request.getTone(),
                request.getGoal(),
                request.getFocusTime());

        return "Preferences saved";
    }

    @GetMapping("/preferences/{userId}")
    public UserPreference getPreferences(@PathVariable Integer userId) {
        return chatService.getPreferences(userId);
    }
}