package com.photoshare.backend.controller;

import com.photoshare.backend.entity.Post;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @GetMapping("/{id}")
    private ResponseEntity<Post> findPostById(@PathVariable String id) {
        return null;
    }

    @GetMapping("/users/{userId}")
    private ResponseEntity<Post> findAllPostsByUserId(@PathVariable String userId) {
        return null;
    }

    @PutMapping("/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    private ResponseEntity<Post> updatePostById(@PathVariable String postId, @PathVariable String userId) {
        return null;
    }

    @DeleteMapping("/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    private ResponseEntity<Post> deletePostById(@PathVariable String postId, @PathVariable String userId) {
        return null;
    }
}
