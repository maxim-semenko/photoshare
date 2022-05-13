package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.Like;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.LikeRepository;
import com.photoshare.backend.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
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
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);

        return likeRepository.save(like);
    }

    @Transactional
    @Override
    public Like delete(Long postId, Long userId) {
        log.info("postId = " + postId);
        log.info("userId = " + userId);

        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Like like = likeRepository.findByPostAndUser(post, user)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Like not found!"));

        log.info("likeId = " + like.getId());
        likeRepository.deleteById(like.getId());

        return like;
    }
}
