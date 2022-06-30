package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreateCommentRequest;
import com.photoshare.backend.entity.Comment;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.repository.CommentRepository;
import com.photoshare.backend.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostServiceImpl postService;
    private final UserServiceImpl userService;

    @Override
    public Comment save(CreateCommentRequest request) {
        Post post = postService.findById(request.getPostId());
        User user = userService.findById(request.getUserId());

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setPost(post);
        comment.setUser(user);
        comment.setCreatedAt(new Date());

        return commentRepository.save(comment);
    }

    @Override
    public Comment delete(Long postId, Long userId) {
        return null;
    }

    @Override
    public Page<Comment> findAllByPostId(Pageable pageable, Long postId) {
        Post post = postService.findById(postId);
        return commentRepository.findAllByPost(pageable, post);
    }
}
