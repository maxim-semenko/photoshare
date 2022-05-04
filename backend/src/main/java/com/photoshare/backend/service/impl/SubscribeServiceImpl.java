package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreateSubscribeRequest;
import com.photoshare.backend.controller.dto.request.DeleteSubscribeRequest;
import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.entity.User;
import com.photoshare.backend.repository.SubscribeRepository;
import com.photoshare.backend.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;
    private final UserServiceImpl userService;

    @Autowired
    public SubscribeServiceImpl(SubscribeRepository subscribeRepository,
                                UserServiceImpl userService) {
        this.subscribeRepository = subscribeRepository;
        this.userService = userService;
    }

    @Override
    public Subscribe create(CreateSubscribeRequest request) {
        return subscribeRepository.save(new Subscribe());
    }

    @Override
    public Subscribe delete(DeleteSubscribeRequest request) {
        return null;
    }

    @Override
    public Page<Subscribe> findAllByUserId(Pageable pageable, Long userId) {
        User user = userService.findById(userId);
        return subscribeRepository.findAllByUser(pageable, user);
    }
}
