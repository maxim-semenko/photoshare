package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.controller.dto.request.LoginRequest;
import com.photoshare.backend.controller.dto.request.RegisterRequest;
import com.photoshare.backend.controller.dto.response.JwtResponse;
import com.photoshare.backend.controller.dto.response.MessageResponse;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.service.impl.AuthServiceImpl;
import com.photoshare.backend.service.impl.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostServiceImpl postService;

    @Autowired
    public PostController(PostServiceImpl postService) {
        this.postService = postService;
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER') and #request.userId == authentication.principal.id")
    public ResponseEntity<Post> createPost(@Valid @RequestBody CreatePostRequest request) {
        return new ResponseEntity<>(postService.create(request), HttpStatus.CREATED);
    }

//    @PostMapping("/login")
//    @PreAuthorize("permitAll()")
//    public ResponseEntity<JwtResponse> loginUser(@Valid @RequestBody LoginRequest request) {
//        postService.create(new CreatePostRequest());
//        return new ResponseEntity<>(authService.login(request), HttpStatus.OK);
//    }

}
