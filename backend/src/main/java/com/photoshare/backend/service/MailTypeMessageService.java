package com.photoshare.backend.service;


import com.photoshare.backend.entity.enums.MailMessageTypeEnum;
import com.photoshare.backend.entity.mail.MailTypeMessage;

public interface MailTypeMessageService {

    MailTypeMessage findByName(MailMessageTypeEnum name);
}
