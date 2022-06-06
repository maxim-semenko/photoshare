package com.photoshare.backend.service;


import com.photoshare.backend.controller.dto.request.SendMessageRequest;

public interface MailService {

    Boolean performMessage(SendMessageRequest requestSendMessageDTO);
}
