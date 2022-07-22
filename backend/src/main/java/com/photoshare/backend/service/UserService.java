package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.UpdatePasswordRequest;
import com.photoshare.backend.controller.dto.request.UpdateUserIsNonLockedRequest;
import com.photoshare.backend.controller.dto.request.UpdateUserRequest;
import com.photoshare.backend.controller.dto.request.UpdateUserRolesRequest;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.entity.Role;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface UserService {

    Page<User> findAll(Pageable pageable);

    User findById(Long id);

    User findByUsername(String username);

    User findByEmail(String email);

    Page<User> findAllByUsernameContaining(Pageable pageable, String username);

    Page<User> findAllFollowersByUserId(Pageable pageable, Long id);

    Page<User> findAllFollowingsByUserId(Pageable pageable, Long id);

    User updateById(UpdateUserRequest updateUserRequest, Long id);

    MessageResponse deleteById(Long id);

    MessageResponse updatePasswordById(UpdatePasswordRequest updatePasswordRequest, Long id);

    User updateUserRolesById(UpdateUserRolesRequest updateUserRolesRequest, Long id);

    User updateUserIsNonLockerById(UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest, Long id);

}
