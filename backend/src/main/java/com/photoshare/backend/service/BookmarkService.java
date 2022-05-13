package com.photoshare.backend.service;

import com.photoshare.backend.entity.Bookmark;
import com.photoshare.backend.entity.Like;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookmarkService {

    Page<Bookmark> findAllByUserId(Pageable pageable, Long userId);

    Bookmark save(Long postId, Long userId);

    Bookmark delete(Long postId, Long userId);
}
