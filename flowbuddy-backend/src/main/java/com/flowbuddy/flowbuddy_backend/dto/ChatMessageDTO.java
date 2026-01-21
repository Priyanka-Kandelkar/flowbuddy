package com.flowbuddy.flowbuddy_backend.dto;

public class ChatMessageDTO {

    private String role;
    private String content;

    public ChatMessageDTO() {}

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
