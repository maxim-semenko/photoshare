package com.photoshare.backend.controller;

import com.photoshare.backend.entity.BookmarkItem;
import com.photoshare.backend.service.impl.BookmarkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bookmarks")
public class BookmarkController {

    private final BookmarkServiceImpl bookmarkService;

    @Autowired
    public BookmarkController(BookmarkServiceImpl bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<Page<BookmarkItem>> findAllBookmarksByUserId(@PathVariable Long userId, Pageable pageable) {
        return new ResponseEntity<>(bookmarkService.findAllByUserId(pageable, userId), HttpStatus.OK);
    }

    @PostMapping("/posts/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<BookmarkItem> saveBookmark(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(bookmarkService.save(postId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/posts/{postId}/users/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
    public ResponseEntity<BookmarkItem> deleteBookmark(@PathVariable Long postId, @PathVariable Long userId) {
        return new ResponseEntity<>(bookmarkService.delete(postId, userId), HttpStatus.OK);
    }

}
