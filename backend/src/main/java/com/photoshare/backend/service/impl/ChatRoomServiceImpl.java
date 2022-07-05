package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.chat.ChatMessage;
import com.photoshare.backend.entity.chat.ChatRoom;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.ChatMessageRepository;
import com.photoshare.backend.repository.ChatRoomRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserServiceImpl userService;

    public ChatRoom findBySenderIdAndRecipientId(Long senderId, Long recipientId) {
        User sender = userService.findById(senderId);
        User recipient = userService.findById(recipientId);

        Optional<ChatRoom> chatRoomOptional = chatRoomRepository.findBySenderAndRecipient(sender, recipient);
        if (chatRoomOptional.isEmpty()) {
            String chatCode = String.format("%s_%s", senderId, recipientId);
            ChatRoom senderRecipient = ChatRoom.builder()
                    .chatCode(chatCode).sender(sender).recipient(recipient).build();

            ChatRoom recipientSender = ChatRoom.builder()
                    .chatCode(chatCode).sender(recipient).recipient(sender).build();

            chatRoomRepository.save(recipientSender);
            return chatRoomRepository.save(senderRecipient);
        }

        return chatRoomOptional.get();
    }

    public List<ChatMessage> findMessagesByChatCode(Long id) {
        ChatRoom chatRoom = chatRoomRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: ChatRoom not found!"));

        return chatMessageRepository.findAllByChatCode(chatRoom.getChatCode());
    }
}
