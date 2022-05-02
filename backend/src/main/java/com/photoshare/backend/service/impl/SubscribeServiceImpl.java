package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreateSubscribeRequest;
import com.photoshare.backend.controller.dto.request.DeleteSubscribeRequest;
import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.repository.SubscribeRepository;
import com.photoshare.backend.service.SubscribeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;

    @Autowired
    public SubscribeServiceImpl(SubscribeRepository subscribeRepository) {
        this.subscribeRepository = subscribeRepository;
    }

    @Override
    public Subscribe create(CreateSubscribeRequest request) {
        return subscribeRepository.save(new Subscribe());
    }

    @Override
    public Subscribe delete(DeleteSubscribeRequest request) {
        return null;
    }
}
