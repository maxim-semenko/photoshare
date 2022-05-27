package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {

    Page<Post> findAllByUserId(Pageable pageable, Long userId);

    Post findById(Long id);

    Post create(CreatePostRequest request);

    Page<Post> findAllSubscribesByUserId(Pageable pageable, Long userId);

    Page<Post> findAllBookmarksByUserId(Pageable pageable, Long userId);

    Post deleteById(Long id);

}
