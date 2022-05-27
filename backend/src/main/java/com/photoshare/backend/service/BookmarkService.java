package com.photoshare.backend.service;

import com.photoshare.backend.entity.Bookmark;

public interface BookmarkService {

    Bookmark save(Long postId, Long userId);

    Bookmark delete(Long postId, Long userId);
}
