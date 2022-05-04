package com.photoshare.backend.controller;

import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.service.impl.SubscribeServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/subscribes")
public class SubscribeController {

    private final SubscribeServiceImpl subscribeService;

    public SubscribeController(SubscribeServiceImpl subscribeService) {
        this.subscribeService = subscribeService;
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<Subscribe>> findAllByUserId(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(subscribeService.findAllByUserId(pageable, id), HttpStatus.OK);
    }
}
