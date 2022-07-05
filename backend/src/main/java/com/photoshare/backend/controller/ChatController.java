package com.photoshare.backend.controller;

import com.photoshare.backend.entity.chat.ChatMessage;
import com.photoshare.backend.service.impl.ChatServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatServiceImpl chatService;

    @MessageMapping("/chat/addUser")
    public String addUser(@Payload String username, SimpMessageHeaderAccessor headerAccessor) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", username);
        return username;
    }

    @MessageMapping("/send-message")
    public ChatMessage sendChatMessage(@Payload ChatMessage chatMessage) {
        return chatService.sendChatMessage(chatMessage);
    }
}