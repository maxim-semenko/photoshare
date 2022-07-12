package com.photoshare.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CreateFeedbackRequest {

    @Size(min = 5, max = 50)
    private String title;

    @Size(min = 20, max = 1024)
    private String content;

    @NotBlank
    private String type;
}
