package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreateSubscribeRequest;
import com.photoshare.backend.controller.dto.request.DeleteSubscribeRequest;
import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.repository.SubscribeRepository;
import com.photoshare.backend.service.SubscribeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;
    private final UserServiceImpl userService;

    @Override
    public Subscribe create(CreateSubscribeRequest request) {
        User user = userService.findById(request.getUserId());
        User following = userService.findById(request.getFollowingId());

        Subscribe subscribe = new Subscribe();
        subscribe.setUser(user);
        subscribe.setFollowing(following);
        subscribe.setSubscribedDate(new Date());

        return subscribeRepository.save(subscribe);
    }

    @Override
    public Subscribe delete(DeleteSubscribeRequest request) {
        return null;
    }

    @Override
    public Page<Subscribe> findAllFollowersByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return subscribeRepository.findAllByUser(pageable, user);
    }

    @Override
    public Page<Subscribe> findAllFollowingByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return subscribeRepository.findAllByFollowing(pageable, user);
    }
}
