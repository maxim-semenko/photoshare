package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreatePostRequest;
import com.photoshare.backend.entity.Post;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.PostRepository;
import com.photoshare.backend.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserServiceImpl userService;

    @Override
    public Page<Post> findAllByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return postRepository.findAllByUser(pageable, user);
    }

    @Override
    public Post findById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourseNotFoundException("Error: Post not found!"));
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

    @Override
    public Page<Post> findAllSubscribesByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return postRepository.findAllByUserSubscribes(pageable, user);
    }

    @Override
    public Page<Post> findAllBookmarksByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return postRepository.findAllByUserBookmarks(pageable, user);
    }

    @Override
    public Post deleteById(Long id) {
        Post post = findById(id);
        postRepository.delete(post);

        return post;
    }

}
