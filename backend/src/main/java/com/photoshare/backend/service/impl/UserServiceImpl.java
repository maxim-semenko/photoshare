package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public Boolean deleteById(Long id) {
        userRepository.deleteById(id);

        return true;
    }

    @Override
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public Page<User> findAllByUsernameContaining(Pageable pageable, String username) {
        return userRepository.findAllByUsernameContaining(pageable, username);
    }
}
