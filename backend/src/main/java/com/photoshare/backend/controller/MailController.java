package com.photoshare.backend.controller;


import com.photoshare.backend.controller.dto.request.SendMessageRequest;
import com.photoshare.backend.service.impl.mail.MailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * REST controller for mails requests.
 *
 * @author Maxim Semenko
 * @version 1.0
 */
@RestController
@RequestMapping("/api/v1/mail")
public class MailController {

    private final MailServiceImpl mailService;

    @Autowired
    public MailController(MailServiceImpl mailService) {
        this.mailService = mailService;
    }

    @PostMapping("")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Boolean> sendMessage(@Valid @RequestBody SendMessageRequest request) {
        return new ResponseEntity<>(mailService.performMessage(request), HttpStatus.OK);
    }

}
