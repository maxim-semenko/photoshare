package com.photoshare.backend.service.impl;

import com.photoshare.backend.entity.Like;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseAlreadyExistsException;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.LikeRepository;
import com.photoshare.backend.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final UserServiceImpl userService;
    private final PostServiceImpl postService;

    @Override
    public Like save(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Optional<Like> optionalLike = likeRepository.findByPostAndUser(post, user);
        if (optionalLike.isPresent()) {
            throw new ResourseAlreadyExistsException("Like exists already!");
        }

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);

        return likeRepository.save(like);
    }

    @Override
    public Like delete(Long postId, Long userId) {
        Post post = postService.findById(postId);
        User user = userService.findById(userId);

        Like like = likeRepository.findByPostAndUser(post, user)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Like not found!"));

        likeRepository.deleteById(like.getId());

        return like;
    }
}
