package com.photoshare.backend.repository;

import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findBySenderAndRecipient(User sender, User recipient);

}
