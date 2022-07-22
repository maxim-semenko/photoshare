package com.photoshare.backend.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UpdateUserRequest {

    @Size(min = 2, max = 30)
    @NotBlank
    private String firstname;

    @Size(min = 2, max = 30)
    @NotBlank
    private String lastname;

    @Size(min = 2, max = 30)
    @NotBlank
    private String username;

    @Size(min = 7, max = 50)
    @NotBlank
    @Email
    private String email;

    @Size(min = 2, max = 256)
    private String about;

    private String image;
}
