package com.photoshare.backend.service;

import com.photoshare.backend.entity.chat.ChatMessage;

public interface ChatService {

    ChatMessage sendChatMessage(ChatMessage chatMessage);
}
