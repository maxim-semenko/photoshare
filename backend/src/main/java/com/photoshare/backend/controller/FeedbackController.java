package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.request.CreateFeedbackRequest;
import com.photoshare.backend.entity.Feedback;
import com.photoshare.backend.entity.FeedbackStatus;
import com.photoshare.backend.entity.FeedbackType;
import com.photoshare.backend.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Feedback>> findAllFeedbacks(Pageable pageable) {
        return new ResponseEntity<>(feedbackService.findAllFeedbacks(pageable), HttpStatus.OK);
    }

    @GetMapping("/types")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<FeedbackType>> findAllFeedbackType(Pageable pageable) {
        return new ResponseEntity<>(feedbackService.findAllFeedbackType(pageable), HttpStatus.OK);
    }

    @GetMapping("/statuses")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Page<FeedbackStatus>> findAllFeedbackStatus(Pageable pageable) {
        return new ResponseEntity<>(feedbackService.findAllFeedbackStatus(pageable), HttpStatus.OK);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Feedback> create(@Valid @RequestBody CreateFeedbackRequest request) {
        return new ResponseEntity<>(feedbackService.create(request), HttpStatus.CREATED);
    }

    //////////////////////////////
    @PatchMapping("/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Feedback> updateStatus(CreateFeedbackRequest request) {
        return new ResponseEntity<>(feedbackService.create(request), HttpStatus.CREATED);
    }

}
