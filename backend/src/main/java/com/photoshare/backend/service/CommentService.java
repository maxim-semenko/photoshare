package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreatedCommentRequest;
import com.photoshare.backend.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    Page<Comment> findAllByPostId(Pageable pageable, Long postId);

    Comment save(CreatedCommentRequest request);

    Comment delete(Long postId, Long userId);

}
