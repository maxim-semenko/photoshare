package com.photoshare.backend.controller;

import com.photoshare.backend.entity.Like;
import com.photoshare.backend.service.impl.LikeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/likes")
public class LikeController {

    private final LikeServiceImpl likeService;

    @Autowired
    public LikeController(LikeServiceImpl likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/posts/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Like> saveLike(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(likeService.save(postId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Like> deleteLike(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(likeService.delete(postId, userId), HttpStatus.OK);
    }
}
