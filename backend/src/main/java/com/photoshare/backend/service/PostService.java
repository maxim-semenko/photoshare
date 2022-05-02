package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.entity.Post;

public interface PostService {

    Post create(CreatePostRequest request);
}
