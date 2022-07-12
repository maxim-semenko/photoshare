package com.photoshare.backend.controller;

import com.photoshare.backend.entity.Bookmark;
import com.photoshare.backend.service.impl.BookmarkServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkServiceImpl bookmarkService;

    @PostMapping("/posts/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Bookmark> saveBookmark(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(bookmarkService.save(postId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Bookmark> deleteBookmark(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(bookmarkService.delete(postId, userId), HttpStatus.OK);
    }

}
