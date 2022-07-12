package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.request.UpdatePasswordRequest;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.controller.dto.response.UserResponse;
import com.photoshare.backend.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserResponse> findUserById(@PathVariable Long id) {
        return new ResponseEntity<>(UserResponse.mapUserToDTO(userService.findById(id)), HttpStatus.OK);
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllUsers(Pageable pageable) {
        return new ResponseEntity<>(UserResponse.mapListUserToDTO(userService.findAll(pageable)), HttpStatus.OK);
    }

    @GetMapping("/byUsername/{username}/all")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllUsersByUsername(Pageable pageable, @PathVariable String username) {
        return new ResponseEntity<>(
                UserResponse.mapListUserToDTO(userService.findAllByUsernameContaining(pageable, username)),
                HttpStatus.OK);
    }

    @GetMapping("/byUsername/{username}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserResponse> findUserByUsername(@PathVariable String username) {
        return new ResponseEntity<>(UserResponse.mapUserToDTO(userService.findByUsername(username)), HttpStatus.OK);
    }

    @GetMapping("/{id}/followers")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllFollowersByUserId(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(
                UserResponse.mapListUserToDTO(userService.findAllFollowersByUserId(pageable, id)),
                HttpStatus.OK);
    }

    @GetMapping("/{id}/followings")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<UserResponse>> findAllFollowingsByUserId(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(
                UserResponse.mapListUserToDTO(userService.findAllFollowingsByUserId(pageable, id)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    public ResponseEntity<MessageResponse> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/password")
    @PreAuthorize("hasRole('USER') and #id == authentication.principal.id")
    public ResponseEntity<MessageResponse> updatePassword(@PathVariable Long id,
                                                          @Valid @RequestBody UpdatePasswordRequest request) {
        return new ResponseEntity<>(userService.updatePasswordById(request, id), HttpStatus.OK);
    }

}
