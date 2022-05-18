package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.response.UserResponse;
import com.photoshare.backend.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<UserResponse> findUserById(@PathVariable Long id) {
        return new ResponseEntity<>(UserResponse.mapUserToDTO(userService.findById(id)), HttpStatus.OK);
    }

    @GetMapping("/")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<UserResponse>> findAllUsers(Pageable pageable) {
        return new ResponseEntity<>(UserResponse.mapListUserToDTO(userService.findAll(pageable)), HttpStatus.OK);
    }

    @GetMapping("/byUsername/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllUsersByUsername(Pageable pageable, @PathVariable String username) {
        return new ResponseEntity<>(
                UserResponse.mapListUserToDTO(userService.findAllByUsernameContaining(pageable, username)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    public ResponseEntity<Boolean> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }

}
