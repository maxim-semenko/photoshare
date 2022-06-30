package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.chat.ChatMessage;
import com.photoshare.backend.repository.ChatMessageRepository;
import com.photoshare.backend.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageRepository chatMessageRepository;

    @Override
    public ChatMessage sendChatMessage(ChatMessage chatMessage) {
        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getRecipient().getUsername(),
                "/private", chatMessage);

        return chatMessageRepository.save(chatMessage);
    }
}
