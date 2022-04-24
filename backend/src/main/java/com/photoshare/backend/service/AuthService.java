package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.LoginRequest;
import com.photoshare.backend.controller.dto.request.RegisterRequest;
import com.photoshare.backend.controller.dto.response.JwtResponse;
import com.photoshare.backend.controller.dto.response.MessageResponse;

public interface AuthService {

    MessageResponse register(RegisterRequest request);

    JwtResponse login(LoginRequest request);

}
