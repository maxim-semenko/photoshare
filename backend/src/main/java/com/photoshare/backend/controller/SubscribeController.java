package com.photoshare.backend.controller;

import com.photoshare.backend.controller.dto.request.CreateSubscribeRequest;
import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.service.impl.SubscribeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/subscribes")
@RequiredArgsConstructor
public class SubscribeController {

    private final SubscribeServiceImpl subscribeService;

//    @GetMapping("/users/{id}/followers")
//    @PreAuthorize("permitAll()")
//    public ResponseEntity<Page<Subscribe>> findAllFollowersByUserId(@PathVariable Long id, Pageable pageable) {
//        return new ResponseEntity<>(subscribeService.findAllFollowersByUserId(pageable, id), HttpStatus.OK);
//    }
//
//    @GetMapping("/users/{id}/followings")
//    @PreAuthorize("permitAll()")
//    public ResponseEntity<Page<Subscribe>> findAllFollowingByUserId(@PathVariable Long id, Pageable pageable) {
//        return new ResponseEntity<>(subscribeService.findAllFollowingByUserId(pageable, id), HttpStatus.OK);
//    }

    @PostMapping("/")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Subscribe> createSubscribe(@Valid @RequestBody CreateSubscribeRequest request) {
        return new ResponseEntity<>(subscribeService.create(request), HttpStatus.OK);
    }
}
