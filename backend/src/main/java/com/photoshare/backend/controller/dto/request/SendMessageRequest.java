package com.photoshare.backend.controller.dto.request;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SendMessageRequest {

    @NotNull
    private String email;

    @NotBlank
    private String typeMessage;

}
