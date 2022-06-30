package com.photoshare.backend.service.impl.mail;

import com.photoshare.backend.service.SenderMailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * SenderMail Service implementation that realize SenderMailService interface {@link SenderMailService}.
 *
 * @author Maxim Semenko
 * @version 1.0
 */
@Service
@AllArgsConstructor
@Slf4j
public class SenderMailServiceImpl implements SenderMailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendMessage(String emailTo, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("maks.semenko@gmail.com");
        mailMessage.setTo(emailTo);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        try {
            mailSender.send(mailMessage);
        } catch (MailException e) {
            log.error("Can't send mail message: " + e);
        }
    }

}
