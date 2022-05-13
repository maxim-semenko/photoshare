package com.photoshare.backend.repository;

import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.chat.ChatMessage;
import com.photoshare.backend.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findAllByChatCode(String chatCode);

}
