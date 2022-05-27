package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.LoginRequest;
import com.photoshare.backend.controller.dto.request.RegisterRequest;
import com.photoshare.backend.controller.dto.response.JwtResponse;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.controller.dto.response.UserResponse;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.enums.RoleEnum;
import com.photoshare.backend.exception.EmailExistsException;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.exception.UsernameExistsException;
import com.photoshare.backend.repository.RoleRepository;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.security.JwtUtils;
import com.photoshare.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    JwtUtils jwtUtils;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public MessageResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameExistsException("Error: Username is already in use!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailExistsException("Error: Email is already in use!");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setAbout(request.getAbout());
        user.setImage(request.getImage());
        user.setRoles(Set.of(roleRepository.findByName(RoleEnum.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."))));

        userRepository.save(user);
        return new MessageResponse("User registered successfully!");
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateJwtToken(authentication);

        return new JwtResponse(token, UserResponse.mapUserToDTO(user));
    }
}
