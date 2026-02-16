package com.flowbuddy.flowbuddy_backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestAssistantMessage;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import com.flowbuddy.flowbuddy_backend.entity.Chat;
import com.flowbuddy.flowbuddy_backend.entity.Message;
import com.flowbuddy.flowbuddy_backend.entity.User;
import com.flowbuddy.flowbuddy_backend.entity.UserPreference;
import com.flowbuddy.flowbuddy_backend.prompt.SystemPrompt;
import com.flowbuddy.flowbuddy_backend.repository.ChatRepository;
import com.flowbuddy.flowbuddy_backend.repository.MessageRepository;
import com.flowbuddy.flowbuddy_backend.repository.UserPreferenceRepository;
import com.flowbuddy.flowbuddy_backend.repository.UserRepository;

@Service
public class ChatService {

    private final OpenAIClient client;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final UserPreferenceRepository preferenceRepository;

    @Value("${azure.openai.deployment}")
    private String deployment;

    public ChatService(OpenAIClient client,
            UserRepository userRepository,
            ChatRepository chatRepository,
            MessageRepository messageRepository,
            UserPreferenceRepository preferenceRepository) {

        this.client = client;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.preferenceRepository = preferenceRepository;
    }

    public String chat(Integer userId,
            Integer chatId,
            String userMessage) {

        // 1️⃣ Get User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Create or Fetch Chat
        Chat chat;

        if (chatId == null) {
            chat = new Chat();
            chat.setUser(user);
            chat.setTitle("New Chat");
            chat.setCreatedAt(LocalDateTime.now());
            chat = chatRepository.save(chat);
        } else {
            chat = chatRepository.findById(chatId)
                    .orElseThrow(() -> new RuntimeException("Chat not found"));
        }

        // 3️⃣ Save User Message
        Message userMsg = new Message();
        userMsg.setChat(chat);
        userMsg.setSender("user");
        userMsg.setMessage(userMessage);
        messageRepository.save(userMsg);

        // 4️⃣ Load Chat History
        List<Message> history = messageRepository.findByChatChatIdOrderByTimestampAsc(chat.getChatId());

        // 5️⃣ Build Azure Message List
        List<ChatRequestMessage> chatMessages = new ArrayList<>();

        UserPreference pref = preferenceRepository.findByUserUserId(userId).orElse(null);

        String dynamicPrompt = SystemPrompt.BASE_PROMPT;

        if (pref != null) {

            if ("Gentle".equals(pref.getTone())) {
                dynamicPrompt += "\nSpeak in a calm and supportive tone.";
            }

            if ("Motivational".equals(pref.getTone())) {
                dynamicPrompt += "\nBe energetic and push the user to take action.";
            }

            if ("Straight Forward".equals(pref.getTone())) {
                dynamicPrompt += "\nBe direct and concise.";
            }

            dynamicPrompt += "\nUser focus time: " + pref.getFocusTime();
            dynamicPrompt += "\nUser goal: " + pref.getGoal();
        }

        // System Prompt
        chatMessages.add(
                new ChatRequestSystemMessage(SystemPrompt.BASE_PROMPT));

        // Conversation history
        for (Message msg : history) {
            if ("user".equals(msg.getSender())) {
                chatMessages.add(
                        new ChatRequestUserMessage(msg.getMessage()));
            } else {
                chatMessages.add(
                        new ChatRequestAssistantMessage(msg.getMessage()));
            }
        }

        // 6️⃣ Call Azure OpenAI
        ChatCompletionsOptions options = new ChatCompletionsOptions(chatMessages);

        ChatCompletions response = client.getChatCompletions(deployment, options);

        String assistantReply = response.getChoices()
                .get(0)
                .getMessage()
                .getContent();

        // 7️⃣ Save Assistant Reply
        Message assistantMsg = new Message();
        assistantMsg.setChat(chat);
        assistantMsg.setSender("flowbuddy");
        assistantMsg.setMessage(assistantReply);
        messageRepository.save(assistantMsg);

        return assistantReply;
    }

    public List<Chat> getUserChats(Integer userId) {
        return chatRepository.findByUserUserIdOrderByCreatedAtDesc(userId);
    }

    // SAVE METHOD
    public void savePreferences(Integer userId,
            String tone,
            String goal,
            String focusTime) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserPreference pref = preferenceRepository.findByUserUserId(userId)
                .orElse(new UserPreference());

        pref.setUser(user);
        pref.setTone(tone);
        pref.setGoal(goal);
        pref.setFocusTime(focusTime);

        preferenceRepository.save(pref);
    }

    public UserPreference getPreferences(Integer userId) {
    return preferenceRepository
            .findByUserUserId(userId)
            .orElse(null);
    }
    public List<Message> getChatMessages(Integer chatId) {
    return messageRepository
            .findByChatChatIdOrderByTimestampAsc(chatId);
    }
}
