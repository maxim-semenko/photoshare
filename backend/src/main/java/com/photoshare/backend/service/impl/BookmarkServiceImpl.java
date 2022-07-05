package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.Bookmark;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseAlreadyExistsException;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.BookmarkRepository;
import com.photoshare.backend.service.BookmarkService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserServiceImpl userService;
    private final PostServiceImpl postService;

    @Transactional
    @Override
    public Bookmark save(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Optional<Bookmark> optionalBookmark = bookmarkRepository.findByPostAndUser(post, user);
        if (optionalBookmark.isPresent()) {
            throw new ResourseAlreadyExistsException("Bookmark exists already!");
        }

        Bookmark bookmark = new Bookmark();
        bookmark.setPost(post);
        bookmark.setCreatedDate(new Date());
        bookmark.setUser(user);

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
