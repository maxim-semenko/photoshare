package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreateSubscribeRequest;
import com.photoshare.backend.controller.dto.request.DeleteSubscribeRequest;
import com.photoshare.backend.entity.Subscribe;

public interface SubscribeService {

    Subscribe create(CreateSubscribeRequest request);

    Subscribe delete(DeleteSubscribeRequest request);
}
