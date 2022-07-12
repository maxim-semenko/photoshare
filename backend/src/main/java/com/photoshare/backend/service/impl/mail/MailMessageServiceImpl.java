package com.photoshare.backend.service.impl.mail;


import com.photoshare.backend.entity.mail.MailMessage;
import com.photoshare.backend.entity.mail.MailTypeMessage;
import com.photoshare.backend.repository.MailMessageRepository;
import com.photoshare.backend.service.MailMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailMessageServiceImpl implements MailMessageService {

    private final MailMessageRepository mailMessageRepository;

    @Override
    public MailMessage findByMailTypeMessage(MailTypeMessage mailTypeMessage) {
        MailMessage mailMessage;
        Optional<MailMessage> optionalMailMessage = mailMessageRepository.findByMailTypeMessage(mailTypeMessage);

        if (optionalMailMessage.isPresent()) {
            mailMessage = optionalMailMessage.get();
        } else {
            log.error("Mail message not found");
            throw new ResourceAccessException("Mail message not found");
        }

        return mailMessage;
    }
}
