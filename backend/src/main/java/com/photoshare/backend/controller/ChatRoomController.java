package com.photoshare.backend.controller;

import com.photoshare.backend.entity.chat.ChatMessage;
import com.photoshare.backend.entity.chat.ChatRoom;
import com.photoshare.backend.service.impl.ChatRoomServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat-rooms")
public class ChatRoomController {

    private final ChatRoomServiceImpl chatRoomService;

    public ChatRoomController(ChatRoomServiceImpl chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @GetMapping("/senders/{senderId}/recipients/{recipientsId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ChatRoom> findBySenderIdAndRecipientId(@PathVariable Long senderId,
                                                                 @PathVariable Long recipientsId) {
        return new ResponseEntity<>(
                chatRoomService.findBySenderIdAndRecipientId(senderId, recipientsId),
                HttpStatus.OK);
    }

    @GetMapping("/history/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<ChatMessage>> findMessagesByChatCode(@PathVariable Long id) {
        return new ResponseEntity<>(
                chatRoomService.findMessagesByChatCode(id),
                HttpStatus.OK);
    }
}
