package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreateSubscribeRequest;
import com.photoshare.backend.controller.dto.request.DeleteSubscribeRequest;
import com.photoshare.backend.entity.Subscribe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscribeService {

    Subscribe create(CreateSubscribeRequest request);

    Subscribe delete(DeleteSubscribeRequest request);

    Page<Subscribe> findAllFollowersByUserId(Pageable pageable, Long userId);

    Page<Subscribe> findAllFollowingByUserId(Pageable pageable, Long userId);

}
