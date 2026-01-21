package com.flowbuddy.flowbuddy_backend.service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.*;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestAssistantMessage;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;

import java.util.ArrayList;
import java.util.List;

import com.azure.ai.openai.models.ChatRole;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;

import com.flowbuddy.flowbuddy_backend.dto.ChatMessageDTO;
import com.flowbuddy.flowbuddy_backend.dto.ChatRequest;
import com.flowbuddy.flowbuddy_backend.prompt.SystemPrompt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final OpenAIClient client;

    @Value("${azure.openai.deployment}")
    private String deployment;

    public ChatService(OpenAIClient client) {
        this.client =  client;
    }

    public String chat(List<ChatMessageDTO> messages) {

        List<ChatRequestMessage> chatMessages = new ArrayList<>();

        // 1️⃣ System prompt
        chatMessages.add(
                new ChatRequestSystemMessage(SystemPrompt.BASE_PROMPT)
        );

        // 2️⃣ Conversation history
        for (ChatMessageDTO msg : messages) {
            if ("user".equals(msg.getRole())) {
                chatMessages.add(
                        new ChatRequestUserMessage(msg.getContent())
                );
            } else {
                chatMessages.add(
                        new ChatRequestAssistantMessage(msg.getContent())
                );
            }
        }

        // 3️⃣ Send to Azure OpenAI
        ChatCompletionsOptions options =
                new ChatCompletionsOptions(chatMessages);

        ChatCompletions response =
                client.getChatCompletions(deployment, options);

        return response.getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }


}
