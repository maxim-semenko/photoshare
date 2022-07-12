package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.LoginRequest;
import com.photoshare.backend.controller.dto.request.RegisterRequest;
import com.photoshare.backend.controller.dto.request.RestorePasswordRequest;
import com.photoshare.backend.controller.dto.response.JwtResponse;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.controller.dto.response.UserResponse;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.enums.MailMessageTypeEnum;
import com.photoshare.backend.entity.enums.RoleEnum;
import com.photoshare.backend.entity.mail.MailCode;
import com.photoshare.backend.entity.mail.MailTypeMessage;
import com.photoshare.backend.exception.EmailAlreadyExistsException;
import com.photoshare.backend.exception.MailCodeException;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.exception.UsernameExistsException;
import com.photoshare.backend.repository.MailCodeRepository;
import com.photoshare.backend.repository.RoleRepository;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.security.JwtUtils;
import com.photoshare.backend.service.AuthService;
import com.photoshare.backend.service.impl.mail.MailTypeMessageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final MailTypeMessageServiceImpl mailTypeMessageService;
    private final MailCodeRepository mailCodeRepository;

    @Override
    public MessageResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameExistsException("Username is already in use!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already in use!");
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
                .orElseThrow(() -> new RuntimeException("Role was not found!"))));

        userRepository.save(user);

        return new MessageResponse("User registered successfully!");
    }

    @Override
    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourseNotFoundException("User was not found!"));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtils.generateJwtToken(authentication);

        return new JwtResponse(token, UserResponse.mapUserToDTO(user));
    }

    @Override
    public MessageResponse restorePassword(RestorePasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourseNotFoundException("User was not found!"));

        MailTypeMessage mailTypeMessage = mailTypeMessageService.findByName(MailMessageTypeEnum.RESTORE_PASSWORD);
        Optional<MailCode> optionalMailCode = mailCodeRepository.getLastByUserAndType(user, mailTypeMessage);
        if (optionalMailCode.isPresent()) {
            MailCode mailCode = optionalMailCode.get();
            if (Boolean.TRUE.equals(mailCode.getIsValid())) {
                if (Objects.equals(mailCode.getCode(), request.getEmailCode())) {
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    userRepository.save(user);
                } else {
                    mailCode.setCountAttempts(mailCode.getCountAttempts() + 1);
                    if (mailCode.getCountAttempts().equals(5)) {
                        mailCode.setIsValid(false);
                    }

                    mailCodeRepository.save(mailCode);
                    throw new MailCodeException("Mail code is not equals. Try again!");
                }
            } else {
                throw new MailCodeException("Mail code is invalid. Send message again!");
            }
        }

        return new MessageResponse("Password was restore successfully!");
    }

}
