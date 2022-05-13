package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface PostService {

    Page<Post> findAllByUserId(Pageable pageable, Long userId);

    Post findById(Long id);

    Post create(CreatePostRequest request);

    Page<Post> findAllByUserIdSubscribes(Pageable pageable, Long userId);

}
