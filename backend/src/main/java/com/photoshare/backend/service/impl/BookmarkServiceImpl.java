package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.BookmarkItem;
import com.photoshare.backend.entity.BookmarkStorage;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.BookmarkItemRepository;
import com.photoshare.backend.repository.BookmarkStorageRepository;
import com.photoshare.backend.repository.UserRepository;
import com.photoshare.backend.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkItemRepository bookmarkRepository;
    private final BookmarkStorageRepository bookmarkStorageRepository;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;
    private final PostServiceImpl postService;

    @Autowired
    public BookmarkServiceImpl(BookmarkItemRepository bookmarkRepository,
                               BookmarkStorageRepository bookmarkStorageRepository,
                               UserServiceImpl userService,
                               UserRepository userRepository,
                               PostServiceImpl postService) {
        this.bookmarkRepository = bookmarkRepository;
        this.bookmarkStorageRepository = bookmarkStorageRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.postService = postService;
    }

    @Override
    public Page<BookmarkItem> findAllByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        BookmarkStorage bookmarkStorage = bookmarkStorageRepository.findByUser(user)
                .orElseThrow(() -> new ResourseNotFoundException("Bookmark not found!"));

        List<BookmarkItem> bookmarkItems = bookmarkStorage.getBookmarks();
        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), bookmarkItems.size());

        return new PageImpl<>(bookmarkItems.subList(start, end), pageable, bookmarkItems.size());
    }

    @Transactional
    @Override
    public BookmarkItem save(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        BookmarkStorage bookmarkStorage = bookmarkStorageRepository.findByUser(user)
                .orElseThrow(() -> new ResourseNotFoundException("Bookmark not found!"));

        BookmarkItem bookmarkItem = new BookmarkItem();
        bookmarkItem.setPost(post);
        bookmarkItem.setCreatedDate(new Date());
        bookmarkRepository.save(bookmarkItem);
        bookmarkStorage.getBookmarks().add(bookmarkItem);

        bookmarkStorageRepository.save(bookmarkStorage);
        return bookmarkItem;
    }

    @Override
    public BookmarkItem delete(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        BookmarkStorage bookmarkStorage = bookmarkStorageRepository.findByUser(user)
                .orElseThrow(() -> new ResourseNotFoundException("BookmarkStorage not found!"));

//        BookmarkItem bookmarkItem = bookmarkRepository.findByPost(post)
//                .orElseThrow(() -> new ResourseNotFoundException("Bookmark not found!"));

        System.out.println("POST = " + postId);
        System.out.println(Arrays.toString(bookmarkStorage.getBookmarks().toArray()));

        BookmarkItem bookmarkItem = bookmarkStorage
                .getBookmarks()
                .stream()
                .filter(item -> item.getPost().getId().equals(post.getId()))
                .findFirst()
                .orElseThrow(() -> new ResourseNotFoundException("Bookmark not found!"));

        bookmarkStorage.getBookmarks().remove(bookmarkItem);
        bookmarkStorageRepository.save(bookmarkStorage);
        bookmarkRepository.delete(bookmarkItem);

        return bookmarkItem;
    }
}
