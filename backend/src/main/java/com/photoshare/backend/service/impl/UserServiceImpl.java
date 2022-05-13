package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.ChatRoomRepository;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found!"));
    }

    @Override
    @Transactional
    public Boolean deleteById(Long id) {
        User user = findById(id);
        userRepository.delete(user);
        return true;
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
}
