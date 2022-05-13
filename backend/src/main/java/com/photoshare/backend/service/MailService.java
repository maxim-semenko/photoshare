package com.photoshare.backend.service;


import com.photoshare.backend.controller.dto.request.RequestSendMessageDTO;

public interface MailService {

    Boolean performMessage(RequestSendMessageDTO requestSendMessageDTO);
}
