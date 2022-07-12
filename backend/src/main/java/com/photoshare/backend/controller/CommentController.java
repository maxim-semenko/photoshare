package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.request.CreateCommentRequest;
import com.photoshare.backend.entity.Comment;
import com.photoshare.backend.service.impl.CommentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentServiceImpl commentService;

    @GetMapping("/posts/{postId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Comment>> findAllCommentsByPostId(@PathVariable Long postId, Pageable pageable) {
        return new ResponseEntity<>(commentService.findAllByPostId(pageable, postId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Comment> findCommentById(@PathVariable Long id) {
        return new ResponseEntity<>(commentService.findById(id), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('USER') and #request.userId == authentication.principal.id")
    public ResponseEntity<Comment> saveComment(@Valid @RequestBody CreateCommentRequest request) {
        return new ResponseEntity<>(commentService.save(request), HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Comment> deleteComment(@PathVariable Long commentId, @PathVariable Long userId) {
        return new ResponseEntity<>(commentService.deleteByCommentIdAndUserId(commentId, userId), HttpStatus.OK);
    }

}
