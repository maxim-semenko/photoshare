package com.photoshare.backend.service.impl;

import com.photoshare.backend.controller.dto.request.CreateFeedbackRequest;
import com.photoshare.backend.entity.Feedback;
import com.photoshare.backend.entity.FeedbackStatus;
import com.photoshare.backend.entity.FeedbackType;
import com.photoshare.backend.entity.enums.FeedbackStatusEnum;
import com.photoshare.backend.entity.enums.FeedbackTypeEnum;
import com.photoshare.backend.exception.ResourseNotFoundException;
import com.photoshare.backend.repository.FeedbackRepository;
import com.photoshare.backend.repository.FeedbackStatusRepository;
import com.photoshare.backend.repository.FeedbackTypeRepository;
import com.photoshare.backend.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final FeedbackTypeRepository feedbackTypeRepository;
    private final FeedbackStatusRepository feedbackStatusRepository;

    @Override
    public Page<FeedbackType> findAllFeedbackType(Pageable pageable) {
        return feedbackTypeRepository.findAll(pageable);
    }

    @Override
    public Page<FeedbackStatus> findAllFeedbackStatus(Pageable pageable) {
        return feedbackStatusRepository.findAll(pageable);
    }

    @Override
    public Feedback create(CreateFeedbackRequest request) {
        Feedback feedback = Feedback
                .builder()
                .title(request.getTitle())
                .content(request.getContent())
                .feedbackType(findFeedbackTypeByName(FeedbackTypeEnum.valueOf(request.getType())))
                .feedbackStatuses(Set.of(findFeedbackStatusByName(FeedbackStatusEnum.NOT_VIEW)))
                .build();

        return feedbackRepository.save(feedback);
    }

    @Override
    public FeedbackType findFeedbackTypeByName(FeedbackTypeEnum name) {
        return feedbackTypeRepository.findByName(name)
                .orElseThrow(() -> new ResourseNotFoundException("Feedback type not found!"));
    }

    @Override
    public FeedbackStatus findFeedbackStatusByName(FeedbackStatusEnum name) {
        return feedbackStatusRepository.findByName(name)
                .orElseThrow(() -> new ResourseNotFoundException("Feedback status not found!"));
    }
}
