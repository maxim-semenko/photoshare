package com.photoshare.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class LoginRequest {

    @NotBlank(message = "Username must be not blank!")
    @Size(min = 2, max = 30, message = "Username size must be between 2 and 30!")
    private String username;

    @NotBlank(message = "Password must be not blank!")
    @Size(min = 8, max = 255, message = "Password size must be between 8 and 255!")
    private String password;
}
