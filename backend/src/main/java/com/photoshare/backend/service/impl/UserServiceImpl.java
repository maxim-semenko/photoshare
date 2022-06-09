package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.UpdatePasswordRequest;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.exception.UserPasswordNotMatchesException;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));
    }

    @Override
    @Transactional
    public MessageResponse deleteById(Long id) {
        User user = findById(id);
        userRepository.delete(user);
        return new MessageResponse("Account was deleted successfully!");
    }

    @Override
    public MessageResponse updatePasswordById(UpdatePasswordRequest updatePasswordRequest, Long id) {
        String oldPassword = updatePasswordRequest.getOldPassword();
        String newPassword = updatePasswordRequest.getNewPassword();
        User existUser = findById(id);

        if (!passwordEncoder.matches(oldPassword, existUser.getPassword())) {
            throw new UserPasswordNotMatchesException("User password not matches!");
        }

        existUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existUser);

        return new MessageResponse("User password was updated successfully!");
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));
    }

    @Override
    public Page<User> findAllByUsernameContaining(Pageable pageable, String username) {
        return userRepository.findAllByUsernameContaining(pageable, username);
    }

    @Override
    public Page<User> findAllFollowersByUserId(Pageable pageable, Long userId) {
        User user = findById(userId);
        return userRepository.findAllFollowersByUser(pageable, user);
    }

    @Override
    public Page<User> findAllFollowingsByUserId(Pageable pageable, Long userId) {
        User user = findById(userId);
        return userRepository.findAllFollowingsByUser(pageable, user);
    }
}
