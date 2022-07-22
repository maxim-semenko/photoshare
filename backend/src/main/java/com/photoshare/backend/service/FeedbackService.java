package com.photoshare.backend.service;

import com.photoshare.backend.controller.dto.request.CreateFeedbackRequest;
import com.photoshare.backend.entity.Feedback;
import com.photoshare.backend.entity.FeedbackStatus;
import com.photoshare.backend.entity.FeedbackType;
import com.photoshare.backend.entity.enums.FeedbackStatusEnum;
import com.photoshare.backend.entity.enums.FeedbackTypeEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FeedbackService {

    Page<Feedback> findAllFeedbacks(Pageable pageable);

    Page<FeedbackType> findAllFeedbackType(Pageable pageable);

    Page<FeedbackStatus> findAllFeedbackStatus(Pageable pageable);

    Feedback create(CreateFeedbackRequest request);

    FeedbackType findFeedbackTypeByName(FeedbackTypeEnum name);

    FeedbackStatus findFeedbackStatusByName(FeedbackStatusEnum name);


}
