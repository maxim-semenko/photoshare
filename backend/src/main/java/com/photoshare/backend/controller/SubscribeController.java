package com.photoshare.backend.controller;

import com.photoshare.backend.entity.Subscribe;
import com.photoshare.backend.service.impl.SubscribeServiceImpl;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class SubscribeController {

    private final SubscribeServiceImpl subscribeService;

    @GetMapping("/users/{id}/followers")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<Subscribe>> findAllFollowersByUserId(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(subscribeService.findAllFollowersByUserId(pageable, id), HttpStatus.OK);
    }

    @GetMapping("/users/{id}/followings")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<Subscribe>> findAllFollowingByUserId(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(subscribeService.findAllFollowingByUserId(pageable, id), HttpStatus.OK);
    }
}
