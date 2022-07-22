package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.UpdatePasswordRequest;
import com.photoshare.backend.controller.dto.request.UpdateUserIsNonLockedRequest;
import com.photoshare.backend.controller.dto.request.UpdateUserRequest;
import com.photoshare.backend.controller.dto.request.UpdateUserRolesRequest;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.entity.Role;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.entity.enums.RoleEnum;
import com.photoshare.backend.exception.EmailAlreadyExistsException;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.exception.UserPasswordNotMatchesException;
import com.photoshare.backend.exception.UsernameExistsException;
import com.photoshare.backend.repository.RoleRepository;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

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
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found by username!"));
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourseNotFoundException("Error: User not found by email!"));
    }

    @Override
    public Page<User> findAllByUsernameContaining(Pageable pageable, String username) {
        return userRepository.findAllByUsernameContaining(pageable, username);
    }

    @Override
    public Page<User> findAllFollowersByUserId(Pageable pageable, Long id) {
        User user = findById(id);
        return userRepository.findAllFollowersByUser(pageable, user);
    }

    @Override
    public Page<User> findAllFollowingsByUserId(Pageable pageable, Long id) {
        User user = findById(id);
        return userRepository.findAllFollowingsByUser(pageable, user);
    }

    @Override
    public User updateById(UpdateUserRequest updateUserRequest, Long id) {
        User user = findById(id);
        if (!updateUserRequest.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(updateUserRequest.getUsername())) {
                throw new UsernameExistsException("Username is already in use!");
            }
        }
        if (!updateUserRequest.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(updateUserRequest.getEmail())) {
                throw new EmailAlreadyExistsException("Email is already in use!");
            }
        }

        user.setFirstname(updateUserRequest.getFirstname());
        user.setLastname(updateUserRequest.getLastname());
        user.setUsername(updateUserRequest.getUsername());
        user.setEmail(updateUserRequest.getEmail());
        user.setAbout(updateUserRequest.getAbout());
        user.setImage(updateUserRequest.getImage());

        return userRepository.save(user);
    }

    @Override
    public User updateUserRolesById(UpdateUserRolesRequest updateUserRolesRequest, Long id) {
        User user = findById(id);
        Set<Role> roles = new HashSet<>();
        updateUserRolesRequest
                .getRoles()
                .forEach(name -> {
                    try {
                        roles.add(roleRepository.findByName(RoleEnum.valueOf(name))
                                .orElseThrow(() -> new ResourseNotFoundException("Error: Role not found!")));
                    } catch (IllegalArgumentException e) {
                        throw new ResourseNotFoundException("Error: RoleEnum is invalid!");
                    }
                });

        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public User updateUserIsNonLockerById(UpdateUserIsNonLockedRequest updateUserIsNonLockedRequest, Long id) {
        User user = findById(id);
        user.setIsAccountNonLocked(updateUserIsNonLockedRequest.getIsNonLocked());

        return userRepository.save(user);
    }


}
