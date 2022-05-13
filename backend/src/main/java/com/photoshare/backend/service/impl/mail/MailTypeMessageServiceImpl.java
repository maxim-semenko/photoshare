package com.photoshare.backend.service.impl.mail;


import com.photoshare.backend.entity.enums.MailMessageTypeEnum;
import com.photoshare.backend.entity.mail.MailTypeMessage;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.MailTypeMessageRepository;
import com.photoshare.backend.service.MailTypeMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class MailTypeMessageServiceImpl implements MailTypeMessageService {

    private final MailTypeMessageRepository mailTypeMessageRepository;

    @Autowired
    public MailTypeMessageServiceImpl(MailTypeMessageRepository mailTypeMessageRepository) {
        this.mailTypeMessageRepository = mailTypeMessageRepository;
    }

    @Override
    public MailTypeMessage findByName(MailMessageTypeEnum name) {
        MailTypeMessage mailTypeMessage;
        Optional<MailTypeMessage> optionalMailTypeMessage = mailTypeMessageRepository.findByName(name);

        if (optionalMailTypeMessage.isPresent()) {
            mailTypeMessage = optionalMailTypeMessage.get();
        } else {
            log.info("Mail type message not found");
            throw new ResourseNotFoundException("Mail type message not found");
        }

        return mailTypeMessage;
    }
}
