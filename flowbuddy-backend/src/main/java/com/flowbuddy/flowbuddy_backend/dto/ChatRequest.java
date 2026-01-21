package com.flowbuddy.flowbuddy_backend.dto;

import java.util.List;

public class ChatRequest {

    private List<ChatMessageDTO> messages;

    public ChatRequest() {}

    public List<ChatMessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessageDTO> messages) {
        this.messages = messages;
    }
}
