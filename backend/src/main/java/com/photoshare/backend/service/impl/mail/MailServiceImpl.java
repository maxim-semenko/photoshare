package com.photoshare.backend.service.impl.mail;


import com.photoshare.backend.controller.dto.request.SendMessageRequest;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.enums.MailMessageTypeEnum;
import com.photoshare.backend.entity.mail.MailCode;
import com.photoshare.backend.entity.mail.MailMessage;
import com.photoshare.backend.entity.mail.MailTypeMessage;
import com.photoshare.backend.repository.MailCodeRepository;
import com.photoshare.backend.service.MailService;
import com.photoshare.backend.service.impl.UserServiceImpl;
import com.photoshare.backend.util.GeneratorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Mail Service implementation that realize MailService interface {@link MailService}.
 *
 * @author Maxim Semenko
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

    private final SenderMailServiceImpl senderMailService;
    private final UserServiceImpl userService;
    private final MailTypeMessageServiceImpl mailTypeMessageService;
    private final MailMessageServiceImpl mailMessageService;
    private final MailCodeRepository mailCodeRepository;

    @Override
    public Boolean performMessage(SendMessageRequest requestSendMessageDTO) {
        User user = userService.findByEmail(requestSendMessageDTO.getEmail());
        MailTypeMessage mailTypeMessage = mailTypeMessageService
                .findByName(MailMessageTypeEnum.valueOf(requestSendMessageDTO.getTypeMessage()));
        MailMessage mailMessage = mailMessageService.findByMailTypeMessage(mailTypeMessage);

        Integer code = GeneratorUtil.generateCode(100000, 999999);
        String emailTo = user.getEmail();
        String text = String.format(mailMessage.getContent(), user.getUsername(), code);
        String subject = mailMessage.getSubject();
        senderMailService.sendMessage(emailTo, subject, text);

        Optional<MailCode> optionalLastMailCode = mailCodeRepository.getLastByUserAndType(user, mailTypeMessage);
        if (optionalLastMailCode.isPresent() && Boolean.TRUE.equals(optionalLastMailCode.get().getIsValid())) {
            MailCode lastMailCode = optionalLastMailCode.get();
            lastMailCode.setIsValid(false);
            mailCodeRepository.save(lastMailCode);
        }

        mailCodeRepository.save(
                MailCode.builder()
                        .user(user)
                        .code(code)
                        .mailTypeMessage(mailTypeMessage)
                        .build());

        return true;
    }

}
