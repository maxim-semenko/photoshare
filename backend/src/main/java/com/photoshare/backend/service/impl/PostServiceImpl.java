package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.repository.PostRepository;
import com.photoshare.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserServiceImpl userService;

    @Autowired
    public PostServiceImpl(PostRepository postRepository,
                           UserServiceImpl userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Override
    public Post create(CreatePostRequest request) {
        User user = userService.findById(request.getUserId());

        Post post = new Post();
        post.setUser(user);
        post.setDescription(request.getDescription());
        post.setImage(request.getImage());
        post.setCreatedDate(new Date());

        return postRepository.save(post);
    }
}