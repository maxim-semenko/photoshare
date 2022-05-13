package com.photoshare.backend.service;

import com.photoshare.backend.entity.mail.MailMessage;
import com.photoshare.backend.entity.mail.MailTypeMessage;

public interface MailMessageService {

    MailMessage findByMailTypeMessage(MailTypeMessage mailTypeMessage);
}
