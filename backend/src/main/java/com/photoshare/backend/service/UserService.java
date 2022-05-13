package com.photoshare.backend.service;

import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<User> findAll(Pageable pageable);

    User findByUsername(String username);

    User findByEmail(String email);

    Page<User> findAllByUsernameContaining(Pageable pageable, String username);

    User findById(Long id);

    Boolean deleteById(Long id);

}
