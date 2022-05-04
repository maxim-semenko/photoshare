package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.Like;
import com.photoshare.backend.repository.LikeRepository;
import com.photoshare.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final UserServiceImpl userService;
    private final PostServiceImpl postService;

    @Autowired
    public LikeServiceImpl(LikeRepository likeRepository,
                           UserServiceImpl userService,
                           PostServiceImpl postService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    @Override
    public Like save(Long postId, Long userId) {

        return likeRepository.save(new Like());
    }

    @Override
    public Like delete(Long postId, Long userId) {
        return null;
    }
}
