package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.UpdatePasswordRequest;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<User> findAll(Pageable pageable);

    User findByUsername(String username);

    User findByEmail(String email);

    Page<User> findAllByUsernameContaining(Pageable pageable, String username);

    Page<User> findAllFollowersByUserId(Pageable pageable, Long userId);

    Page<User> findAllFollowingsByUserId(Pageable pageable, Long userId);

    User findById(Long id);

    MessageResponse deleteById(Long id);

    MessageResponse updatePasswordById(UpdatePasswordRequest updatePasswordRequest, Long id);

}
