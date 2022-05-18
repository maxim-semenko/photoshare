package com.photoshare.backend.service;

import com.photoshare.backend.entity.BookmarkItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookmarkService {

    Page<BookmarkItem> findAllByUserId(Pageable pageable, Long userId);

    BookmarkItem save(Long postId, Long userId);

    BookmarkItem delete(Long postId, Long userId);
}
