package com.photoshare.backend.service;

import com.photoshare.backend.entity.Like;
import com.photoshare.backend.entity.User;

public interface LikeService {

    Like save(Long postId, Long userId);

    Like delete(Long postId, Long userId);
}
