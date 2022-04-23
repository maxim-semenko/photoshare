package com.photoshare.backend.service;

import com.photoshare.backend.dto.request.LoginRequest;
import com.photoshare.backend.dto.request.RegisterRequest;
import com.photoshare.backend.dto.response.JwtResponse;
import com.photoshare.backend.dto.response.MessageResponse;

public interface AuthService {

    MessageResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

}
