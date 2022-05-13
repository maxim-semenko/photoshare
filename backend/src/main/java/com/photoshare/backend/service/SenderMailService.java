package com.photoshare.backend.service;

public interface SenderMailService {

    /**
     * Method that send message to mail.
     *
     * @param emailTo email address
     * @param subject header of message
     * @param message body of message
     */
    void sendMessage(String emailTo, String subject, String message);

}
