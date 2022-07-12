package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.service.impl.PostServiceImpl;
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
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Post> findPostById(@PathVariable Long id) {
        return new ResponseEntity<>(postService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<Post>> findAllPostsByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(postService.findAllByUserId(pageable, userId), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER') and #request.userId == authentication.principal.id")
    public ResponseEntity<Post> createPost(@Valid @RequestBody CreatePostRequest request) {
        return new ResponseEntity<>(postService.create(request), HttpStatus.CREATED);
    }

    @DeleteMapping("/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Post> deletePost(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(postService.deleteById(postId), HttpStatus.OK);
    }

    /**
     * The method that returns subscriber's posts of user that he subscribed.
     *
     * @param pageable page and size
     * @param userId   needed user's id
     * @return Page of posts
     */
    @GetMapping("/users/{userId}/subscribes")
    public ResponseEntity<Page<Post>> findAllSubscribesPostByUserId(Pageable pageable, @PathVariable Long userId) {
        return new ResponseEntity<>(postService.findAllSubscribesByUserId(pageable, userId), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/bookmarks")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Page<Post>> findAllBookmarksPostByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(postService.findAllBookmarksByUserId(pageable, userId), HttpStatus.OK);
    }

}
