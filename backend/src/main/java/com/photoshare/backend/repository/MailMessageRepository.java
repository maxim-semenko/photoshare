package com.photoshare.backend.repository;

import com.photoshare.backend.entity.mail.MailMessage;
import com.photoshare.backend.entity.mail.MailTypeMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * MailMessageRepository for working with entity {@link MailMessage}.
 *
 * @author Maxim Semenko
 * @version 1.0
 */
public interface MailMessageRepository extends JpaRepository<MailMessage, Long> {

    Optional<MailMessage> findByMailTypeMessage(MailTypeMessage mailTypeMessage);

}
