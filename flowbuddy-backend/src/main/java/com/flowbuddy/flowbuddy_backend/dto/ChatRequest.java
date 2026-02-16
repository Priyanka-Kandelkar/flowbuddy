package com.flowbuddy.flowbuddy_backend.dto;

public class ChatRequest {

    private Integer userId;
    private Integer chatId;  // null = new chat
    private String message;

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getChatId() { return chatId; }
    public void setChatId(Integer chatId) { this.chatId = chatId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}