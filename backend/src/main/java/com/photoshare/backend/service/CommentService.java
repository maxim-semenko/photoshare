package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreateCommentRequest;
import com.photoshare.backend.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    Page<Comment> findAllByPostId(Pageable pageable, Long postId);

    Comment findById(Long id);

    Comment save(CreateCommentRequest request);

    Comment deleteByCommentIdAndUserId(Long commentId, Long userId);

}
