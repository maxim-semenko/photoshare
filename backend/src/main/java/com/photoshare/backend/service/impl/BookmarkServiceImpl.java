package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.Bookmark;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.BookmarkRepository;
import com.photoshare.backend.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserServiceImpl userService;
    private final PostServiceImpl postService;

    @Autowired
    public BookmarkServiceImpl(BookmarkRepository bookmarkRepository,
                               UserServiceImpl userService,
                               PostServiceImpl postService) {
        this.bookmarkRepository = bookmarkRepository;
        this.userService = userService;
        this.postService = postService;
    }

    @Override
    public Page<Bookmark> findAllByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return bookmarkRepository.findAllByUser(pageable, user);
    }

    @Override
    public Bookmark save(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Bookmark bookmark = new Bookmark();
        bookmark.setPost(post);
        bookmark.setUser(user);
        bookmark.setCreatedDate(new Date());

        return bookmarkRepository.save(bookmark);
    }

    @Override
    public Bookmark delete(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Bookmark bookmark = bookmarkRepository.findByPostAndUser(post, user)
                .orElseThrow(() -> new ResourseNotFoundException("Bookmark not found!"));
        bookmarkRepository.delete(bookmark);

        return bookmark;
    }
}
