package com.photoshare.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private UserResponse user;
}
